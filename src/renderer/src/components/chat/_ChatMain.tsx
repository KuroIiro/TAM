import { Flex } from 'antd'
import ChatView from './ChatView'
import ChatMessageBox from './ChatMessageBox'
import '../../assets/styles/scrollbar.css'
import { useRef, useEffect, useCallback } from 'react'

type Props = {
  activeTabKey: string
}

function ChatMain({ activeTabKey }: Props): JSX.Element {
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  // 初期表示時に最下部にスクロール
  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = scrollContainerRef.current.scrollHeight
    }
  }, [activeTabKey])

  // ChatMessageBoxで送信後に親のスクロール位置を更新
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
              <ChatView />
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

  return <>{renderContent()}</>
}

export default ChatMain
