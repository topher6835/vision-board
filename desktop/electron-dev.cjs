const { spawn } = require('node:child_process');

const appRoot = require('node:path').resolve(__dirname, '..');
const environment = { ...process.env };
delete environment.ELECTRON_RUN_AS_NODE;

const electron = spawn('electron', ['.'], {
  cwd: appRoot,
  env: environment,
  stdio: 'inherit',
  detached: process.platform === 'darwin'
});

let firstSignal;
let firstSignalAt;
let forceExitTimer;

function onTerminationSignal(signal) {
  const now = Date.now();
  if (!firstSignal) {
    firstSignal = signal;
    firstSignalAt = now;
    electron.kill(signal);
    return;
  }

  // Ctrl+C reaches the terminal group and is also relayed by concurrently.
  // Coalesce that immediate duplicate while keeping a later second signal forceful.
  if (now - firstSignalAt < 250) return;

  // Forward a genuine second signal so the main process can force-stop its backend group.
  electron.kill(signal);
  forceExitTimer = setTimeout(() => {
    try {
      if (process.platform === 'darwin' && electron.pid) process.kill(-electron.pid, 'SIGKILL');
      else electron.kill('SIGKILL');
    } catch (_) {}
    process.exit(1);
  }, 1_000);
}

process.on('SIGINT', () => onTerminationSignal('SIGINT'));
process.on('SIGTERM', () => onTerminationSignal('SIGTERM'));

electron.once('error', (error) => {
  console.error('Could not start Electron:', error.message);
  process.exitCode = 1;
});

electron.once('close', (code, signal) => {
  if (forceExitTimer) clearTimeout(forceExitTimer);
  process.exitCode = firstSignal ? 0 : (code ?? 1);
  if (signal && !firstSignal) console.error(`Electron exited after ${signal}.`);
});
