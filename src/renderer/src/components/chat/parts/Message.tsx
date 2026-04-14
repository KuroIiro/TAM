import { COLORS } from '@renderer/utils/constants'
import { Card } from 'antd'
import { ChatMessage } from 'src/types/chat'

type Props = {
  chatData: ChatMessage
}

function Message({ chatData }: Props): JSX.Element {
  const messageStyle = {
    width: '100%',
    height: '40%',
    backgroundColor: chatData.self ? COLORS.MYMESSAGE : COLORS.OTHERMESSAGE,
    borderRadius: '6px'
  }
  return (
    <Card style={messageStyle}>
      <p>{chatData.content}</p>
    </Card>
  )
}

export default Message
