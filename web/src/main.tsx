import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import 'antd/dist/antd.css'
import { ConfigProvider } from 'antd'
import zhCN from 'antd/es/locale/zh_CN'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <ConfigProvider locale={zhCN}>
    <App />
  </ConfigProvider>
)
