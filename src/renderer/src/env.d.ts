/// <reference types="vite/client" />

declare global {
  interface Window {
    chatAPI: {
      loadRoomTalk: (type: string, roomId: string) => Promise<string>
      chatSendMessageText: (roomId: string, message: string) => Promise<void>
    }
  }
}
