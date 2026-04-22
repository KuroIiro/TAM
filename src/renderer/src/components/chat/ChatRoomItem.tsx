/* eslint-disable react/prop-types */
import { Avatar, Badge, Flex, List, Typography } from 'antd'
import { parseLastSendTime, isToday, isThisYear } from '../../utils/formatters/DateFormat'
import { useSelector } from 'react-redux'
import { store } from '../../app/store'

const { Text } = Typography

type ChatRoomItemProps = {
  roomID: string
  name: string
  icon: string
  lastMessage: string
  lastMessageTime: string
  unreadCount?: number
  onClick: () => void
}

const ChatRoomItem: React.FC<ChatRoomItemProps> = ({
  roomID,
  name,
  icon,
  lastMessage,
  lastMessageTime,
  unreadCount = 0,
  onClick
}) => {
  const time = parseLastSendTime(lastMessageTime)

  const isActive = roomID === useSelector((state: ReturnType<typeof store.getState>) => state.roomId.roomId)

  
  let formattedTime = ''
  if (time) {
    if (isToday(time)) {
      formattedTime = `${time.hour.toString().padStart(2, '0')}:${time.minute
        .toString()
        .padStart(2, '0')}`
    } else if (isThisYear(time)) {
      formattedTime = `${time.month}/${time.day}`
    } else {
      formattedTime = `${time.year}/${time.month}/${time.day}`
    }
  }
  return (
    <List.Item
      style={{
        cursor: 'pointer',
        backgroundColor: isActive ? '#e6f7ff' : 'transparent',
        padding: '6px 10px'
      }}
      onClick={onClick}
    >
      <Flex vertical={false} align="center" gap="small" style={{ width: 210 }}>
        <Badge dot={unreadCount > 0}>
          <Avatar src={icon || undefined}>{name[0]}</Avatar>
        </Badge>
        <Flex vertical style={{ flex: 1, minWidth: 0 }}>
          <Flex justify="space-between" style={{ width: '100%' }}>
            <Text strong={unreadCount > 0} style={{ fontSize: 12 }}>
              {name}
            </Text>
            <Text strong={unreadCount > 0} style={{ fontSize: 10, whiteSpace: 'nowrap' }}>
              {formattedTime}
            </Text>
          </Flex>
          <Text ellipsis style={{ fontSize: 12, maxWidth: 200 }} strong={unreadCount > 0}>
            {lastMessage}
          </Text>
        </Flex>
      </Flex>
    </List.Item>
  )
}

export default ChatRoomItem
