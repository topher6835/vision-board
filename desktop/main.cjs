const { app, BrowserWindow } = require('electron');
const { spawn } = require('node:child_process');
const crypto = require('node:crypto');
const path = require('node:path');

let backend;
const token = crypto.randomBytes(32).toString('hex');

function startBackend() {
  const root = path.resolve(__dirname, '..');
  backend = spawn('mvn', ['-f', path.join(root, 'backend/pom.xml'), 'spring-boot:run'], {
    cwd: root,
    env: { ...process.env, VISION_BOARD_API_TOKEN: token },
    stdio: 'inherit'
  });
  backend.on('error', (error) => console.error('Could not start Spring Boot. Is Maven installed?', error));
}

async function waitForBackend() {
  for (let attempt = 0; attempt < 60; attempt += 1) {
    try {
      const response = await fetch('http://127.0.0.1:8765/api/health', { headers: { 'X-App-Token': token } });
      if (response.ok) return;
    } catch (_) {}
    await new Promise((resolve) => setTimeout(resolve, 500));
  }
  console.warn('Backend did not become healthy within 30 seconds; renderer will still open.');
}

async function createWindow() {
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
  if (!app.isPackaged) await window.loadURL('http://127.0.0.1:5173');
  else await window.loadFile(path.join(__dirname, 'dist/index.html'));
}

app.whenReady().then(async () => {
  startBackend();
  await waitForBackend();
  await createWindow();
});
app.on('window-all-closed', () => { if (process.platform !== 'darwin') app.quit(); });
app.on('before-quit', () => { if (backend && !backend.killed) backend.kill(); });
