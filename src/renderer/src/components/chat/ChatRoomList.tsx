import { Divider, Flex, List } from 'antd'
import SiderHeader from './SideHeader'
import ChatRoomItem from './ChatRoomItem'
import { useState } from 'react'
import { useEffect } from 'react'
import { setRoomId } from '@renderer/features/chat/roomId'
import { useDispatch } from 'react-redux'

/* eslint-disable react/prop-types */
type ChatRoomInfo = {
  roomID: string
  icon: string
  name: string
  lastMessageTime: string
  lastMessage: string
  unreadCount: number
}

const ChatRoomList: React.FC = () => {
  const dispatch = useDispatch()
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

  return (
    <>
      <Flex vertical>
        <SiderHeader />
        <Divider style={dividerStyle} />
        <List
          itemLayout="horizontal"
          dataSource={roomList}
          renderItem={(item) => (
            <ChatRoomItem
              key={item.roomID}
              {...item}
              onClick={() => dispatch(setRoomId(item.roomID))}
            />
          )}
        />
      </Flex>
    </>
  )
}

export default ChatRoomList
