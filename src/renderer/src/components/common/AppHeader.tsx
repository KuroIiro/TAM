import { AliwangwangOutlined } from '@ant-design/icons'
import { Flex, Input } from 'antd'

function AppHeader(): JSX.Element {
  return (
    <>
      <Flex justify={'center'} align={'flex-start'} style={{ padding: '10px', height: 49 }}>
        {/* icon */}
        <Flex
          justify={'center'}
          align={'center'}
          style={{ position: 'absolute', left: 8, top: -4, width: 64, height: 64 }}
        >
          <AliwangwangOutlined />
        </Flex>

        {/* search */}
        <Input.Search
          placeholder="検索"
          style={{ maxWidth: 400, width: '100%', WebkitAppRegion: 'no-drag' }}
          allowClear
        />
      </Flex>
    </>
  )
}

export default AppHeader
