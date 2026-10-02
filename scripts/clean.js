const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// 1. Kill any lingering zombie node processes locking port 3000 on Windows
try {
  if (process.platform === 'win32') {
    const netstatOut = execSync('netstat -ano | findstr :3000 | findstr LISTENING', { encoding: 'utf-8', stdio: ['pipe', 'pipe', 'ignore'] });
    const lines = netstatOut.trim().split('\n');
    for (const line of lines) {
      const parts = line.trim().split(/\s+/);
      const pid = parts[parts.length - 1];
      if (pid && pid !== '0' && pid !== process.pid.toString()) {
        try {
          execSync(`taskkill /F /PID ${pid}`, { stdio: 'ignore' });
          console.log(`[clean] Freed port 3000 from stale process PID ${pid}`);
        } catch {}
      }
    }
  }
} catch {
  // No processes on port 3000
}

// 2. Clear .next directory cleanly
const nextDir = path.join(__dirname, '..', '.next');
if (fs.existsSync(nextDir)) {
  try {
    fs.rmSync(nextDir, { recursive: true, force: true, maxRetries: 3, retryDelay: 100 });
    console.log('[clean] Cleared .next cache.');
  } catch (err) {
    if (process.platform === 'win32') {
      try {
        execSync(`cmd /c rmdir /s /q "${nextDir}"`, { stdio: 'ignore' });
        console.log('[clean] Cleared .next cache via rmdir.');
      } catch (e) {
        console.warn('[clean] Note on .next:', e.message);
      }
    }
  }
}

