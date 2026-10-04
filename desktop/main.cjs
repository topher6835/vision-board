const { app, BrowserWindow, dialog } = require('electron');
const { spawn } = require('node:child_process');
const crypto = require('node:crypto');
const path = require('node:path');

const STARTUP_TIMEOUT_MS = 30_000;
const token = crypto.randomBytes(32).toString('hex');
let backend;
let backendSpawnError;
let backendExit;
let backendReady;
let mainWindow;
let windowCreation;
let quitCleanup;
let quitting = false;
let startupErrorShown = false;
let cleanupComplete = false;
let terminationSignalCount = 0;

function startBackend() {
  if (backendReady) return backendReady;
  backendReady = new Promise((resolve, reject) => {
    const root = path.resolve(__dirname, '..');
    backend = spawn('mvn', ['-f', path.join(root, 'backend/pom.xml'), 'spring-boot:run'], {
      cwd: root,
      env: { ...process.env, VISION_BOARD_API_TOKEN: token },
      stdio: 'inherit',
      detached: process.platform === 'darwin'
    });
    backend.once('error', (error) => {
      backendSpawnError = error;
      reject(new Error('The Java backend process could not be started.'));
    });
    backend.once('exit', (code, signal) => {
      backendExit = { code, signal };
    });
    backend.once('spawn', resolve);
  });
  return backendReady;
}

async function waitForBackend() {
  const deadline = Date.now() + STARTUP_TIMEOUT_MS;
  while (Date.now() < deadline) {
    if (backendSpawnError) throw new Error('The Java backend process could not be started.');
    if (backendExit) throw new Error('The Java backend stopped during startup.');
    try {
      const response = await fetch('http://127.0.0.1:8765/api/health', {
        headers: { 'X-App-Token': token },
        signal: AbortSignal.timeout(1_000)
      });
      if (response.ok) return;
      if (response.status === 401) throw new Error('The Java backend rejected its launch credentials.');
    } catch (error) {
      if (error.message === 'The Java backend rejected its launch credentials.') throw error;
    }
    await new Promise((resolve) => setTimeout(resolve, 400));
  }
  throw new Error('The Java backend did not become ready before the startup timeout.');
}

function createMainWindow() {
  if (mainWindow && !mainWindow.isDestroyed()) return Promise.resolve(mainWindow);
  if (windowCreation) return windowCreation;

  windowCreation = (async () => {
    const window = new BrowserWindow({
      width: 1100,
      height: 760,
      webPreferences: {
        preload: path.join(__dirname, 'preload.cjs'),
        contextIsolation: true,
        sandbox: true,
        nodeIntegration: false
      }
    });
    mainWindow = window;
    window.once('closed', () => {
      if (mainWindow === window) mainWindow = undefined;
    });
    try {
      if (!app.isPackaged) await window.loadURL('http://127.0.0.1:5173');
      else await window.loadFile(path.join(__dirname, 'dist/index.html'));
      return window;
    } catch (error) {
      window.destroy();
      throw error;
    }
  })().finally(() => { windowCreation = undefined; });
  return windowCreation;
}

function ensureBackendReady() {
  return startBackend().then(() => waitForBackend());
}

async function ensureMainWindow() {
  await ensureBackendReady();
  return createMainWindow();
}

function processGroupExists(pid) {
  try {
    process.kill(-pid, 0);
    return true;
  } catch (error) {
    return error.code !== 'ESRCH';
  }
}

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function waitForProcessGroupExit(pid, timeoutMs) {
  const deadline = Date.now() + timeoutMs;
  while (Date.now() < deadline && processGroupExists(pid)) await delay(100);
  return !processGroupExists(pid);
}

async function stopBackend() {
  if (!backend || !backend.pid) return;
  const pid = backend.pid;
  if (process.platform === 'darwin') {
    try { process.kill(-pid, 'SIGTERM'); } catch (error) { if (error.code !== 'ESRCH') console.error('Could not stop backend process group.', error); }
    if (!(await waitForProcessGroupExit(pid, 2_000))) {
      try { process.kill(-pid, 'SIGKILL'); } catch (error) { if (error.code !== 'ESRCH') console.error('Could not force-stop backend process group.', error); }
      await waitForProcessGroupExit(pid, 500);
    }
  } else if (backend.exitCode === null && backend.signalCode === null) {
    backend.kill('SIGTERM');
    const exited = await Promise.race([
      new Promise((resolve) => backend.once('close', () => resolve(true))),
      delay(2_000).then(() => false)
    ]);
    if (!exited) backend.kill('SIGKILL');
  }
}

function cleanUpBackend() {
  if (!quitCleanup) quitCleanup = stopBackend().finally(() => { cleanupComplete = true; });
  return quitCleanup;
}

function failStartup(error) {
  if (quitting) return;
  quitting = true;
  if (!startupErrorShown) {
    startupErrorShown = true;
    dialog.showErrorBox('Vision Board could not start', error.message || 'The application could not start.');
  }
  app.quit();
}

function handleTerminationSignal(signal) {
  terminationSignalCount += 1;
  if (terminationSignalCount === 1) {
    console.info(`Received ${signal}; requesting orderly shutdown.`);
    app.quit();
    return;
  }

  // A repeated signal is an explicit request to abandon a stuck orderly shutdown.
  console.error('Received a second termination signal; forcing shutdown.');
  if (backend && backend.pid) {
    try {
      if (process.platform === 'darwin') process.kill(-backend.pid, 'SIGKILL');
      else backend.kill('SIGKILL');
    } catch (_) {}
  }
  process.exit(1);
}

process.on('SIGINT', () => handleTerminationSignal('SIGINT'));
process.on('SIGTERM', () => handleTerminationSignal('SIGTERM'));

app.whenReady().then(() => ensureMainWindow()).catch(failStartup);

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0 && !quitting) ensureMainWindow().catch(failStartup);
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

app.on('before-quit', (event) => {
  quitting = true;
  if (cleanupComplete) return;
  event.preventDefault();
  cleanUpBackend().finally(() => app.quit());
});
