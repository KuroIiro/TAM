/* eslint-disable react/prop-types */
import { EllipsisOutlined, FilterOutlined, FormOutlined } from '@ant-design/icons'
import { Button, Tooltip, Typography } from 'antd'

const { Text } = Typography

import { Flex } from 'antd'

function HeaderOptionNewChat(): JSX.Element {
  return (
    <Tooltip placement="top" title="その他のオプション">
      <Button type="text" style={{ height: 30, width: 30 }}>
        <EllipsisOutlined style={{ fontSize: '12px' }} />
      </Button>
    </Tooltip>
  )
}

function HeaderOptionFilter(): JSX.Element {
  return (
    <Tooltip placement="top" title="フィルター">
      <Button type="text" style={{ height: 30, width: 30 }}>
        <FilterOutlined style={{ fontSize: '12px' }} />
      </Button>
    </Tooltip>
  )
}

function HeaderOptionOther(): JSX.Element {
  return (
    <Tooltip placement="top" title="新しいチャット">
      <Button type="text" style={{ height: 30, width: 30 }}>
        <FormOutlined style={{ fontSize: '12px' }} color="#FFFFF" />
      </Button>
    </Tooltip>
  )
}

function SiderHeader(): JSX.Element {
  return (
    <>
      <Flex
        align="center"
        justify="space-between"
        style={{ marginLeft: 10, marginRight: 10, height: 55 }}
      >
        <Text strong style={{ margin: 0 }}>
          チャット
        </Text>
        <Flex gap="5" align="center">
          <HeaderOptionNewChat />
          <HeaderOptionFilter />
          <HeaderOptionOther />
        </Flex>
      </Flex>
    </>
  )
}

export default SiderHeader
