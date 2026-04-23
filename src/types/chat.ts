export type ChatData = {
  message: string
  timestamp?: string
}

export type ChatResponse = {
  success: boolean
  filename: string
  data: ChatData
}

export type ChatRoomInfo = {
  roomID: string
  icon: string
  name: string
  lastMessageTime: string
  lastMessage: string
  unreadCount: number
}

export type ChatMessage = {
  id: string
  self: boolean
  senderId: string
  senderName: string
  content: string
  timestamp: string
  type: 'text' | 'image' | 'file'
  reaction: ChatReaction[]
  read: ChatRead[]
  reply: ChatReply
  transfer: ChatTransfer
}

export type ChatRead = {
  senderId: string
  senderName: string
  timestamp: string
}

export type ChatReaction = {
  reaction: string
  senderId: string
  senderName: string
  timestamp: string
}

export type ChatReply = {
  isActive: boolean
  id: string
  type: string
  content: string
  senderName: string
  timestamp: string
}

export type ChatTransfer = {
  isActive: boolean
  id: string
  type: string
  content: string
  senderName: string
  timestamp: string
}

export type ChatTab = {
  key: string
  label: string
  content?: React.ReactNode
}
