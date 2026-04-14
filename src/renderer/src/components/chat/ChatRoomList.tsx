import { Divider, Flex, List } from 'antd'
import SiderHeader from './SideHeader'
import ChatRoomItem from './ChatRoomItem'

/* eslint-disable react/prop-types */
type Props = {
  chatRoomId: string
  setChatRoomId: React.Dispatch<React.SetStateAction<string>>
}

const ChatRoomList: React.FC<Props> = ({ chatRoomId, setChatRoomId }) => {
  const dividerStyle = {
    margin: 0
  }

  const roomList = [
    {
      roomID: '250502-S-AMPLMN',
      icon: '',
      name: 'AAA',
      lastSendTime: '2025-04-28T14:30:00+09:00',
      lastMessage: 'Hellooooooooooooooooooooooooooooooo',
      isNewMessage: true
    },
    {
      roomID: '250502-S-SCEBWE',
      icon: '',
      name: 'BBB',
      lastSendTime: '2024-04-26T14:30:00+09:00',
      lastMessage: 'Bye',
      isNewMessage: false
    },
    {
      roomID: '250502-S-JBSBXV',
      icon: '',
      name: 'BBB',
      lastSendTime: '2025-04-29T14:30:00+09:00',
      lastMessage: 'Bye',
      isNewMessage: false
    }
  ]
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
