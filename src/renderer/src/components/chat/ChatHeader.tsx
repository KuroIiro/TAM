/* eslint-disable react/prop-types */
import { Flex, Space, Tabs, TabsProps, Typography } from 'antd'
const { Text } = Typography
import StickyBox from 'react-sticky-box'
import { ConfigProvider } from 'antd'

type Props = {
  tabIndex: string
  setTabIndex: React.Dispatch<React.SetStateAction<string>>
}

const ChatHeader: React.FC<Props> = ({ tabIndex, setTabIndex }) => {
  const chatRoomHeaderStyle = {
    height: '55px', // Header の高さいっぱいにする
    width: '100%', // Header の幅いっぱいにする
    // padding: '0 16px' // 左右に少し余白を追加
    zIndex: 10
  }

  const tabsStyle = {
    color: 'red',
    inkBarColor: '#1477ff',
    height: '55px'
  }

  const tabBarStyle = {
    margin: '0 0 0 0'
  }

  const tabBarTheme = {
    components: {
      Tabs: {
        inkBarColor: '#328E6E',
        itemActiveColor: 'black',
        itemHoverColor: 'black',
        itemSelectedColor: 'black'
      }
    }
  }

  const items: TabsProps['items'] = [
    {
      key: '1',
      label: 'チャット'
    }
  ]

  const onChange = (key: string): void => {
    setTabIndex(key)
    console.log(key)
  }

  const renderTabBar: TabsProps['renderTabBar'] = (props, DefaultTabBar) => (
    <StickyBox offsetTop={64} offsetBottom={2} style={{ zIndex: 1 }}>
      <DefaultTabBar {...props} style={tabBarStyle} />
    </StickyBox>
  )

  return (
    <>
      <Flex
        gap="middle"
        align="center"
        justify="flex-start"
        style={chatRoomHeaderStyle}
        vertical={false}
      >
        <Text strong style={{ margin: 10 }}>
          名前
        </Text>
        <Space />
        <ConfigProvider theme={tabBarTheme}>
          <Tabs
            activeKey={tabIndex}
            onChange={onChange}
            items={items}
            style={tabsStyle}
            renderTabBar={renderTabBar}
          />
        </ConfigProvider>
      </Flex>
    </>
  )
}

export default ChatHeader
