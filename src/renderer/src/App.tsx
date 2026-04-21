import { Flex, Layout } from 'antd'
import { motion } from 'framer-motion'

const { Header, Sider, Content } = Layout
import { Route, Routes, Link, useLocation } from 'react-router-dom'
import Home from './pages/Home'
import Activity from './pages/Activity'
import Chat from './pages/Chat'
import Group from './pages/Group'
import AppHeader from './components/common/AppHeader'
import PageButton from './components/common/PageButton'
import {
  HomeOutlined,
  BellOutlined,
  TeamOutlined,
  SettingOutlined,
  PlusSquareOutlined,
  HistoryOutlined,
  EllipsisOutlined,
  CommentOutlined
} from '@ant-design/icons'
import Quest from './pages/Quest'

function App(): JSX.Element {
  const headerStyle: React.CSSProperties = {
    textAlign: 'center',
    height: 49,
    padding: '0 0px',
    width: '100vw',
    // lineHeight: '64px',
    backgroundColor: '#e0e0e0'
  }
  const contentStyle: React.CSSProperties = {
    // textAlign: 'center',
    // minHeight: 120,
    // lineHeight: '120px',
    // color: '#fff',
    backgroundColor: '#FBFBFB'
  }
  const siderStyle: React.CSSProperties = {
    textAlign: 'center',
    backgroundColor: '#e9e9e9'
  }
  const layoutStyle = {
    overflow: 'hidden',
    width: '100vw',
    height: '100vh'
  }

  const sidebarItems = [
    { path: '/', icon: HomeOutlined, name: 'Home' },
    { path: '/activity', icon: BellOutlined, name: 'Activity' },
    { path: '/chat', icon: CommentOutlined, name: 'Chat' },
    { path: '/group', icon: TeamOutlined, name: 'Group' },
    { path: '/quest', icon: HistoryOutlined, name: 'Quest' },
    { path: '/setting', icon: SettingOutlined, name: 'Setting' },
    { path: '/otherapp', icon: EllipsisOutlined, name: '' },
    { path: '/appstore', icon: PlusSquareOutlined, name: 'App' }
  ]

  const location = useLocation()
  const currentPath = location.pathname
  const index = sidebarItems.findIndex((item) => item.path === currentPath)
  const barTop = index !== -1 ? index * 65 : 0

  return (
    <>
      <Layout style={layoutStyle}>
        <Header style={headerStyle}>
          <AppHeader />
        </Header>
        <Layout>
          <Sider width="70px" style={siderStyle}>
            <div style={{ position: 'relative', height: '100%' }}>
              <motion.div
                style={{
                  position: 'absolute',
                  left: 0,
                  width: '4px',
                  height: '60px',
                  backgroundColor: '#67AE6E',
                  borderRadius: '2px',
                  boxShadow: '0 0 6px rgba(22, 255, 80, 0.5)'
                }}
                animate={{ top: barTop }}
                whileHover={{ left: 4 }}
                transition={{
                  top: { type: 'spring', stiffness: 300, damping: 30 },
                  left: { type: 'tween', duration: 0.3 }
                }}
              />
              <Flex gap={5} vertical>
                {sidebarItems.map((item) => (
                  <Link to={item.path} key={item.path}>
                    <PageButton
                      name={item.name}
                      icon={item.icon}
                      select={item.path == currentPath}
                    />
                  </Link>
                ))}
              </Flex>
            </div>
          </Sider>
          <Content style={contentStyle}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/activity" element={<Activity />} />
              <Route path="/chat" element={<Chat />} />
              <Route path="/group" element={<Group />} />
              <Route path="/quest" element={<Quest />} />
              <Route path="/setting" element={<Home />} />
              <Route path="/otherapp" element={<Home />} />
              <Route path="/appstore" element={<Home />} />
            </Routes>
          </Content>
        </Layout>
      </Layout>
    </>
  )
}

export default App
