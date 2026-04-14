import { contextBridge, ipcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'

// Custom APIs for renderer
const chatAPI = {
  chatSendMessageText: (roomId: string, message: string): Promise<void> =>
    ipcRenderer.invoke('chat-send-message-text', roomId, message),
  loadRoomTalk: (type: string, roomId: string): Promise<void> =>
    ipcRenderer.invoke('load-room-talk', type, roomId)
}
const api = {}

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('api', api)
    contextBridge.exposeInMainWorld('chatAPI', chatAPI)
  } catch (error) {
    console.error(error)
  }
} else {
  // @ts-ignore (define in dts)
  window.electron = electronAPI
  // @ts-ignore (define in dts)
  window.api = api
}
