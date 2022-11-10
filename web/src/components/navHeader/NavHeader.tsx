import { useNavigate } from 'react-router-dom'
import { Dropdown, MenuProps } from 'antd'
import { UserOutlined, EditOutlined, LogoutOutlined } from '@ant-design/icons'
import Logo from '@/assets/images/logo.png'
import User from '@/assets/images/headerImage.png'

const NavHeader = () => {
  const navigate = useNavigate()
  const user = JSON.parse(localStorage.getItem('docs-user')!)
  const items: MenuProps['items'] = [
    {
      key: '1',
      icon: <UserOutlined />,
      label: <span>个人资料</span>,
    },
    {
      key: '2',
      icon: <EditOutlined />,
      label: <span>修改密码</span>,
    },
    {
      key: '3',
      icon: <LogoutOutlined />,
      label: <span>退出登录</span>,
    },
  ]

  const goHome = () => {
    navigate('/dashboard/work')
  }

  return (
    <div className='h-13'>
      <div
        className='h-full bg-white'
        style={{
          boxShadow: '0 2px 3px 0 rgb(100 100 100 / 6%)',
        }}
      >
        <div className='flex h-full max-w-[1260px] pl-4 pr-4 ml-auto mr-auto'>
          <div className='w-[360px] text-lg leading-[48px] flex items-center cursor-pointer' onClick={goHome}>
            <div>
              <img src={Logo} alt='logo' className='h-8 w-8' />
            </div>
            <div>水墨文档</div>
          </div>
          <div className='flex-1'></div>
          <Dropdown menu={{ items }} placement='bottom' arrow>
            <div className='flex items-center h-13 cursor-pointer'>
              <img src={User} alt='user' className='w-7 h-7' />
              <span className='ml-1'>{user?.username}</span>
            </div>
          </Dropdown>
        </div>
      </div>
    </div>
  )
}

export default NavHeader
