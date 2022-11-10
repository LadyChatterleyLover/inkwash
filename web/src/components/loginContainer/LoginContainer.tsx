import Bg from '../../assets/images/login-bg/0.png'
import BgOne from '../../assets/images/login-bg/1.png'
import BgTwo from '../../assets/images/login-bg/2.png'
import style from './index.module.scss'

const LoginContainer = () => {
  return (
    <div className='w-full h-full overflow-hidden '>
      <img src={Bg} className='w-full absolute left-0 bottom-0 z-10 select-none	' />
      <img src={BgOne} className={`w-[15%] absolute bottom-[10%] left-[85%] z-20 select-none ${style['bg-1']}`} />
      <img src={BgTwo} className={`w-[12%] absolute bottom-[75%] left-1/2 z-30 select-none	${style['bg-2']}`} />
    </div>
  )
}

export default LoginContainer
