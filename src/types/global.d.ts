export {}

declare global {
  interface Window {
    chatAPI: {
      loadRoomTalk: (type: string, roomId: string) => Promise<ChatResponse>
      loadRoomList: () => Promise<ChatRoomInfo[]>
      chatSendMessageText: (roomId: string, message: string) => Promise<void>
    }
  }
}

type ChatData = {
  message: string
  timestamp?: string
}

type ChatResponse = {
  success: boolean
  filename: string
  data: ChatData
}
