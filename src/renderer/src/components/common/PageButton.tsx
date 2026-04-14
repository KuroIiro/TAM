/* eslint-disable react/prop-types */
import { AntdIconProps } from '@ant-design/icons/lib/components/AntdIcon'
import { Button } from 'antd'

type Props = {
  name: string
  icon: React.ComponentType<AntdIconProps>
  select: boolean
}

const PageButton: React.FC<Props> = ({ name, icon: Icon, select }) => {
  const color = select ? '#328E6E' : '#494949'
  return (
    <Button
      type="text"
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        height: '60px',
        width: '70px',
        padding: 0,
        color
      }}
    >
      <Icon style={{ fontSize: '20px' }} />
      <span style={{ fontSize: '10px' }}>{name}</span>
    </Button>
  )
}

export default PageButton
