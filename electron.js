const { app, BrowserWindow } = require('electron');
const path = require('path');

function createWindow() {
  const win = new BrowserWindow({
    width: 1280,
    height: 800,
    fullscreen: true,   // 🚀 Always fullscreen
    autoHideMenuBar: true, // hides menu bar
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  });

  // Load your PWA entry (index.html)
  win.loadFile('index.html');

  // Optionally: Open DevTools (remove this for production)
  // win.webContents.openDevTools();
}

app.whenReady().then(() => {
  createWindow();

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit();
});
