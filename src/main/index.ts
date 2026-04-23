import { app, shell, BrowserWindow, ipcMain } from 'electron'
import { dirname, join } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import icon from '../../resources/icon.png?asset'
import { getRoomList, loadRoomData, loadRoomList } from './ipc/file'
import * as fs from 'fs'
import { connectWebSocket, registerWebSocketIPC } from './ipc/websocket'
import { randomUUID } from 'node:crypto'

import dotenv from 'dotenv'
dotenv.config()
function createWindow(): void {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 900,
    height: 664,
    show: false,
    titleBarStyle: 'hidden',
    titleBarOverlay: {
      color: '#e0e0e0',
      symbolColor: '#c0c1c2',
      height: 49
    },
    autoHideMenuBar: true,
    ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false
    }
  })

  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
  })

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  // HMR for renderer base on electron-vite cli.
  // Load the remote URL for development or the local html file for production.
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }
}

function settingCheck(): void {

  const vaildDirectory = (directoryPath: string) => {
    if (!fs.existsSync(directoryPath)) {
      fs.mkdirSync(directoryPath, { recursive: true })
    }
  }

  const vaildFile = (filePath: string, content: unknown) => {
    const dir = dirname(filePath)
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true })
    if (!fs.existsSync(filePath)) fs.writeFileSync(filePath, JSON.stringify(content))
  }

  const appSettingPath = join(app.getPath('appData'), 'TeamsAndMessenger', 'setting.json')
  const dummyAppSetting = {UUID: randomUUID()}
  vaildFile(appSettingPath, dummyAppSetting)

  // ChatRoomList File
  const settingPath = join(app.getPath('appData'), 'TeamsAndMessenger', 'data', 'roomlist.json')
  const dummyRoomList = [
    {
      roomID: '260421-S-AMPLMN',
      name: 'AAA',
      lastMessage: 'Hello',
      lastMessageTime: '2026-04-21 10:00:00',
      unreadCount: 0
    },
    {
      roomID: '260421-S-SCEBWE',
      name: 'BBB',
      lastMessage: 'Hello',
      lastMessageTime: '2026-04-21 10:00:00',
      unreadCount: 0
    },
    {
      roomID: '260421-S-JBSBXV',
      name: 'CCC',
      lastMessage: 'Hello',
      lastMessageTime: '2026-04-21 10:00:00',
      unreadCount: 0
    }
  ]
  vaildFile(settingPath, dummyRoomList)

  // ChatRoom Single DataDirectory
  const chatroomSingleDataDirectoryPath = join(app.getPath('appData'), 'TeamsAndMessenger', 'data', 'rooms', 'single')
  vaildDirectory(chatroomSingleDataDirectoryPath)

  // ChatRoom Group DataDirectory
  const chatroomGroupDataDirectoryPath = join(app.getPath('appData'), 'TeamsAndMessenger', 'data', 'rooms', 'Group')
  vaildDirectory(chatroomGroupDataDirectoryPath)

}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(async () => {
  // Set app user model id for windows
  electronApp.setAppUserModelId('com.electron')

  // Default open or close DevTools by F12 in development
  // and ignore CommandOrControl + R in production.
  // see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  // IPC test
  ipcMain.on('ping', () => console.log('pong'))

  settingCheck()
  createWindow()
  loadRoomData()
  loadRoomList()
  registerWebSocketIPC()


  const roomList = await getRoomList()
  if((await connectWebSocket(process.env.MAIN_VITE_WS_URL ?? 'ws://localhost:8080')).success) {
    for(const room of roomList) {
      console.log(room.roomID)
      // await chatSendMessageText(room.roomID, 'Hello')
    }
  }

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

// In this file you can include the rest of your app"s specific main process
// code. You can also put them in separate files and require them here.

ipcMain.handle('chat-send-message-text', (_event, roomId: string, message: string) => {
  console.log({ roomId, message })
  return { success: true }
})
