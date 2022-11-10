import { ReactNode, useState } from 'react'
import {
  AppstoreOutlined,
  BlockOutlined,
  CreditCardOutlined,
  FileOutlined,
  FieldTimeOutlined,
  StarOutlined,
  DeleteOutlined,
  UsergroupAddOutlined,
} from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'

interface MenuItem {
  name: string
  path: string
  icon: ReactNode
}

const NavSide = () => {
  const navigate = useNavigate()
  const [currentIndex, setCurrentIndex] = useState(0)
  const menus: MenuItem[] = [
    {
      name: '工作台',
      path: '/dashboard/work',
      icon: <AppstoreOutlined />,
    },
    {
      name: '我的文档',
      path: '/dashboard/document',
      icon: <FileOutlined />,
    },
    {
      name: '协作编辑',
      path: '/dashboard/cooperation',
      icon: <BlockOutlined />,
    },
    {
      name: '我的模板',
      path: '/dashboard/template',
      icon: <CreditCardOutlined />,
    },
    {
      name: '我的团队',
      path: '/dashboard/group',
      icon: <UsergroupAddOutlined />,
    },
    {
      name: '我的收藏',
      path: '/dashboard/collection',
      icon: <StarOutlined />,
    },
    {
      name: '最近浏览',
      path: '/dashboard/history',
      icon: <FieldTimeOutlined />,
    },
    {
      name: '回收站',
      path: '/dashboard/recycle-bin',
      icon: <DeleteOutlined />,
    },
  ]

  const clickItem = (item: MenuItem, index: number) => {
    setCurrentIndex(index)
    navigate(item.path)
  }

  return (
    <div className='w-[200px]'>
      {menus.map((item, index) => {
        return (
          <div
            key={index}
            className='flex items-center leading-10 cursor-pointer mb-3'
            style={{
              color: currentIndex === index ? '#333' : '#8c8c8c',
              fontWeight: currentIndex === index ? '700' : '400',
            }}
            onClick={() => clickItem(item, index)}
          >
            <div>{item.icon}</div>
            <div className='ml-2 text-base'>{item.name}</div>
          </div>
        )
      })}
    </div>
  )
}

export default NavSide
