import { Divider, Flex, List } from 'antd'
import SiderHeader from './SideHeader'
import ChatRoomItem from './ChatRoomItem'
import { useState } from 'react'
import { useEffect } from 'react'

/* eslint-disable react/prop-types */
type ChatRoomInfo = {
  roomID: string
  icon: string
  name: string
  lastMessageTime: string
  lastMessage: string
  unreadCount: number
}

type Props = {
  chatRoomId: string
  setChatRoomId: React.Dispatch<React.SetStateAction<string>>
}

const ChatRoomList: React.FC<Props> = ({ chatRoomId, setChatRoomId }) => {
  const dividerStyle = {
    margin: 0
  }
  const [roomList, setRoomList] = useState<ChatRoomInfo[]>([])
  useEffect(() => {
    const fetchRoomList = async () => {
      const roomList: ChatRoomInfo[] = await window.chatAPI.loadRoomList()
      setRoomList(roomList)
    }
    fetchRoomList()
  }, [])

  const convertRoomList = (roomList: ChatRoomInfo[]): ChatRoomInfo[] => {
    return roomList
      .map((item) => ({
        roomID: item.roomID,
        name: item.name,
        icon: item.icon,
        lastMessage: item.lastMessage,
        lastMessageTime: item.lastMessageTime,
        unreadCount: item.unreadCount
    }))
    .sort((a, b) => {
      const aTime = Date.parse(a.lastMessageTime.replace(' ', 'T'))
      const bTime = Date.parse(b.lastMessageTime.replace(' ', 'T'))
      return bTime - aTime
    })
  }
  return (
    <>
      <Flex vertical>
        <SiderHeader />
        <Divider style={dividerStyle} />
        <List
          itemLayout="horizontal"
          dataSource={convertRoomList(roomList)}
          renderItem={(item) => (
            <ChatRoomItem
              key={item.roomID}
              {...item}
              isActive={chatRoomId === item.roomID}
              onClick={() => setChatRoomId(item.roomID)}
            />
          )}
        />
      </Flex>
    </>
  )
}

export default ChatRoomList
