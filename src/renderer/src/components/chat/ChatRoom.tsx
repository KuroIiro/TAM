import { Divider, Flex, Layout } from 'antd'
import { useRef, useEffect, useState, useCallback } from 'react'
import ChatView from './ChatView'
import ChatHeader from './ChatHeader'
import ChatMessageBox from './ChatMessageBox'

/* eslint-disable react/prop-types */
type Props = {
  chatRoomId: string
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

const ChatRoom: React.FC<Props> = ({ chatRoomId }) => {
  const [chat, setChat] = useState<ChatResponse | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [activeTabKey, setActiveTabKey] = useState<string>('1')
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  const layoutStyle = {
    overflow: 'hidden',
    height: '100vh'
  }

  useEffect(() => {
    const fetchChat = async (): Promise<void> => {
      try {
        const result = await window.chatAPI.loadRoomTalk('single', chatRoomId)
        const resultJson = JSON.stringify(result)
        console.log("success", resultJson["success"])
        setChat(result)
      } catch (err) {
        // console.error(err)
        setError('読み込みに失敗しました')
      }
    }
    if (chatRoomId != '') {
      fetchChat()
    }

    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = scrollContainerRef.current.scrollHeight
    }
  }, [chatRoomId])

  const scrollToBottom = useCallback(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = scrollContainerRef.current.scrollHeight
    }
  }, [])

  const renderContent = (): JSX.Element => {
    switch (activeTabKey) {
      case '1':
        return (
          <Flex
            vertical
            style={{
              height: '100%',
              width: '100%',
              overflow: 'hidden'
            }}
          >
            {/* チャット表示エリア - カスタムスクロールバー付き */}
            <div
              ref={scrollContainerRef}
              className="modern-scrollbar"
              style={{
                flex: 1,
                overflow: 'auto',
                padding: '16px',
                backgroundColor: '#ffffff'
              }}
            >
              <ChatView chatData={chat} />
            </div>
            {/* メッセージ入力エリア - 下部固定 */}
            <div
              style={{
                flexShrink: 0,
                height: '120px',
                padding: '12px 16px',
                backgroundColor: '#ffffff'
              }}
            >
              <ChatMessageBox />
            </div>
          </Flex>
        )
      case '2':
        return <h1>Tab 2 Content</h1>
      case '3':
        return <h1>Tab 3 Content</h1>
      default:
        return <h1>Default Content</h1>
    }
  }

  return (
    <Flex gap="middle" wrap style={layoutStyle}>
      <Layout style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
        <ChatHeader tabIndex={activeTabKey} setTabIndex={setActiveTabKey} />
        <Divider style={{ margin: 0 }} />
        {renderContent()}
      </Layout>

      {/* <Flex vertical>
        <h1>{chatRoomId}</h1>
        <h2>{chat ? chat.data.message : '読み込み中...'}</h2>
      </Flex> */}
    </Flex>
  )
}

export default ChatRoom
