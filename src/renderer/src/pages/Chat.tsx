import ChatRoom from '@renderer/components/chat/ChatRoom'
import ChatRoomList from '@renderer/components/chat/ChatRoomList'
import { Layout } from 'antd'
import { Content } from 'antd/es/layout/layout'
import Sider from 'antd/es/layout/Sider'

function Chat(): JSX.Element {
  const siderStyle = {
    height: '100vh',
    backgroundColor: '#f1f1f1',
    borderRight: '1px solid #E5E5E5'
  }
  const contentStyle = {
    height: '100vh',
    backgroundColor: '#FFFFFF'
  }
  return (
    <>
      <Layout>
        <Sider breakpoint="md" collapsedWidth="0" style={siderStyle} width={240}>
          <ChatRoomList />
        </Sider>
        <Content style={contentStyle}>
          <ChatRoom />
        </Content>
      </Layout>
    </>
  )
}

export default Chat
