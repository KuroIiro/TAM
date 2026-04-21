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
  lastSendTime: string
  lastMessage: string
  isNewMessage: boolean
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
