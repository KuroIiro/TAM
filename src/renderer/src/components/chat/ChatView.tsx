import { Flex, Card } from 'antd'
import type { ChatMessage, ChatResponse } from 'src/types/chat'
import Message from './parts/Message'

type Props = {
  chatData: ChatResponse
}

function ChatView({ chatData }: Props): JSX.Element {
  if (chatData == null) {
    return <div>Loading...</div>
  }
  console.log('chatData', chatData)
  const ContentCard = (): JSX.Element => (
    <Card style={{ width: '100%', height: '40%' }}>
      <p>aa</p>
    </Card>
  )
  return (
    <Flex vertical gap="middle">
      {chatData?.data.map((message: ChatMessage) => (
        <Message key={message.id} chatData={message} />
      ))}
    </Flex>
  )
}

export default ChatView
