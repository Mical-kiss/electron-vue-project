import { app, BrowserWindow, Tray, Menu, globalShortcut, clipboard } from 'electron'
import { dataStore } from '../util/clipStore'
if (process.env.NODE_ENV !== 'development') {
  global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\')
}

let mainWindow
const winURL = process.env.NODE_ENV === 'development'
  ? `http://localhost:9080`
  : `file://${__dirname}/index.html`

function createWindow () {
  const appIcon = new Tray('/Users/zx/Downloads/00chromeDonwload/矩形@2x.png')
  mainWindow = new BrowserWindow({
    height: 563,
    useContentSize: false,
    width: 1000,
    icon: '/Users/zx/Downloads/tinypng_output/b.png'
  })
  const contextMenu = Menu.buildFromTemplate([
    { label: 'enable save clipboard',
      type: 'radio',
      checked: true,
      click () {
        console.log(111)
      }
    },
    { label: 'quiet', type: 'radio' }
  ])
  appIcon.setToolTip('This is my application.')
  appIcon.setContextMenu(contextMenu)
  globalShortcut.register('CommandOrControl+1', () => {
    console.log(clipboard.readText('selection'))
    dataStore.addTrack(clipboard.readText('selection'))
  })
  mainWindow.loadURL(winURL)

  mainWindow.on('closed', () => {
    mainWindow = null
  })
}

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
