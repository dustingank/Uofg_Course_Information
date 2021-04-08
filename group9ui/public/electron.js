const { app, BrowserWindow } = require('electron')
const path = require("path")
const isDev = require("electron-is-dev")

function createWindow () {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    }
  })
  
  win.loadURL(
      isDev ? "http://cis4250-09.socs.uoguelph.ca:3006" : `file://${path.join(__dirname, "../build/index.html")}`
      )

    win.openDevTools()
}

app.whenReady().then(createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})