import { Divider, Flex, Input } from 'antd'
import { SendOutlined, PlusOutlined, SmileOutlined, EditOutlined } from '@ant-design/icons'
import { useState } from 'react'

function ChatMessageBox(): JSX.Element {
  const [message, setMessage] = useState('')

  const sendMessageText = async (): Promise<void> => {
    await window.chatAPI.chatSendMessageText('1', 'test')
    setMessage('')
  }

  const handlePressEnter = (): void => {
    sendMessageText()
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setMessage(e.target.value)
  }

  const chatRoomFooterStyle = {
    // padding: '0 0 0 0'
  }

  const messageInputStyle = {
    padding: '6px 10px 6px 10px',
    margin: '0px 16px 0px 16px'
  }

  const handleIconClick = (): void => {
    console.log('push')
  }

  const messageActionItem = (): JSX.Element => {
    return (
      <Flex gap={12}>
        <EditOutlined onClick={handleIconClick} />
        <SmileOutlined onClick={handleIconClick} />
        <PlusOutlined onClick={handleIconClick} />
        <Divider type="vertical" style={{ margin: '0' }} />
        <SendOutlined onClick={sendMessageText} />
      </Flex>
    )
  }

  return (
    <>
      <Flex align="center" justify="space-between" style={chatRoomFooterStyle}>
        <Input
          value={message}
          onChange={handleChange}
          suffix={messageActionItem()}
          placeholder="メッセージを入力"
          style={messageInputStyle}
          onPressEnter={handlePressEnter}
        />
      </Flex>
    </>
  )
}

export default ChatMessageBox
