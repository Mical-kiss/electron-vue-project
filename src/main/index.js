import { app, BrowserWindow, globalShortcut, clipboard, ipcMain, Notification } from 'electron'
// import { app, BrowserWindow, Tray, Menu, globalShortcut, clipboard, ipcMain, Notification } from 'electron'
import { dataStore } from '../util/clipStore'
if (process.env.NODE_ENV !== 'development') {
  global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\')
}
console.log(app.getPath('userData'))
let mainWindow
let enableClipFlag = true
const winURL = process.env.NODE_ENV === 'development'
  ? `http://localhost:9080`
  : `file://${__dirname}/index.html`

function createWindow () {
  // const appIcon = new Tray('/Users/zx/Downloads/00chromeDonwload/矩形复制 15@2x.png')
  mainWindow = new BrowserWindow({
    height: 500,
    useContentSize: false,
    width: 700,
    icon: '/Users/zx/Downloads/tinypng_output/b.png'
  })
  /* const contextMenu = Menu.buildFromTemplate([
    { label: 'enable save clipboard',
      type: 'checkbox',
      checked: true,
      click () {
        enableClipFlag = !enableClipFlag
      }
    },
    { label: 'quiet',
      type: 'normal',
      click () {
        app.quit()
      }
    }
  ]) */
  // appIcon.setToolTip('This is my application.')
  // appIcon.setContextMenu(contextMenu)

  globalShortcut.register('CommandOrControl+1', () => {
    // console.log(clipboard.readText('selection'))
    // console.log(clipboard.readImage('selection'))
    // console.log('enableClipFlag:' + enableClipFlag)
    if (!enableClipFlag) return
    dataStore.addTrack(clipboard.readText('selection'))
  })

  mainWindow.loadURL(winURL)

  mainWindow.on('closed', () => {
    mainWindow = null
  })
}

ipcMain.on('deleteMessage', (event, arg) => {
  console.log(arg) // prints "ping"
  const myNotice = new Notification({
    body: `删除了第${++arg}条`
  })
  myNotice.show()
})
app.on('ready', createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})

/**
 * Auto Updater
 *
 * Uncomment the following code below and install `electron-updater` to
 * support auto updating. Code Signing with a valid certificate is required.
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-electron-builder.html#auto-updating
 */

/*
import { autoUpdater } from 'electron-updater'

autoUpdater.on('update-downloaded', () => {
  autoUpdater.quitAndInstall()
})

app.on('ready', () => {
  if (process.env.NODE_ENV === 'production') autoUpdater.checkForUpdates()
})
 */
