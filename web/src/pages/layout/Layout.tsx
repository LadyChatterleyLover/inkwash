import Navheader from '@/components/navHeader/NavHeader'
import NavSide from '@/components/navSide/NavSide'
import { Outlet } from 'react-router-dom'

const Layout = () => {
  return (
    <div
      className='h-full'
      style={{
        background: '#fafafa',
      }}
    >
      <Navheader />
      <div className='h-full flex max-w-[1260px] pl-4 pr-4 ml-auto mr-auto pt-5 px-2'>
        <NavSide />
        <Outlet />
      </div>
    </div>
  )
}

export default Layout
