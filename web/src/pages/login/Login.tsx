import { useState } from 'react'
import { Button, Form, Input, message } from 'antd'
import { LockOutlined, UserOutlined, ReadOutlined, ArrowRightOutlined } from '@ant-design/icons'
import LoginContainer from '../../components/loginContainer/LoginContainer'
import { login, register } from '@/http/api'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const [flag, setFlag] = useState(true)
  const navigate = useNavigate()

  const onFinish = (values: any) => {
    if (flag) {
      login(values).then((res: any) => {
        if (res.status) {
          message.success(res.msg)
          localStorage.setItem('docs-token', res.body.access_token)
          localStorage.setItem('docs-user', JSON.stringify(res.body.userInfo))
          navigate('/dashboard/work')
        } else {
          message.warning(res.msg)
        }
      })
    } else {
      register(values).then((res: any) => {
        if (res.status) {
          message.success(res.msg)
        } else {
          message.warning(res.msg)
        }
      })
    }
    console.log('Received values of form: ', values)
  }
  return (
    <div className='flex justify-center items-center w-full h-full relative z-50'>
      <div className='absolute w-full h-full left-0 top-0 z-[1]'>
        <LoginContainer />
      </div>
      <div
        className='relative z-40 w-[360px] py-5 px-10 mt-[-120px] rounded'
        style={{
          boxShadow: 'px 0px 0px rgba(58, 127, 158, 0.35)',
          background: 'rgba(165, 165, 165, .58)',
        }}
      >
        <p className='pt-2 pb-8 text-center font-bold	text-lg'>水墨知识文档库</p>
        <Form name='normal_login' initialValues={{ username: 'lp', password: 'lp111223' }} onFinish={onFinish}>
          <Form.Item name='username' rules={[{ required: true, message: '用户名不能为空' }]}>
            <Input prefix={<UserOutlined />} placeholder='请输入用户名' />
          </Form.Item>
          <Form.Item
            name='password'
            rules={[
              { required: true, message: '密码不能为空' },
              { min: 6, message: '密码最少为6位' },
            ]}
          >
            <Input prefix={<LockOutlined />} type='password' placeholder='请输入密码' />
          </Form.Item>
          {flag ? null : (
            <Form.Item
              name='email'
              rules={[
                { required: true, message: '密码不能为空' },
                { type: 'email', message: '邮箱格式不正确' },
              ]}
            >
              <Input prefix={<ReadOutlined />} type='email' placeholder='请输入邮箱' />
            </Form.Item>
          )}
          <Form.Item>
            <div className='text-right cursor-pointer' onClick={() => setFlag(!flag)}>
              <ArrowRightOutlined className='mr-1' />
              <span className='relative top-[-1px]'>{flag ? '立即注册' : '马上登录'}</span>
            </div>
          </Form.Item>
          <Form.Item>
            <Button
              type='primary'
              htmlType='submit'
              className='w-full'
              style={{
                background: 'linear-gradient(to right, #908f8f 0%, #3a3a3a 100%)',
                borderColor: 'transparent',
                border: 'none',
              }}
            >
              {flag ? '登录' : '注册'}
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}

export default Login
