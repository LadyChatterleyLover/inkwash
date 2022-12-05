import axios, { AxiosRequestConfig, ResponseType } from 'axios'
import QS from 'qs'
import { message } from 'antd'

const service = axios.create({
  baseURL: '/api',
  timeout: 10000,
})

service.interceptors.request.use(
  (config) => {
    config.headers!['Authorization'] = 'Bearer ' + localStorage.getItem('docs-token')
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

service.interceptors.response.use(
  (response) => {
    if (response.data.status) {
      return response.data
    } else {
      message.error(response.data.message || response.data.msg || response.data.errMsg)
      return Promise.reject(response)
    }
  },
  (err) => {
    if (err && err.response) {
      switch (err.response.status) {
        case 400:
          err.message = '错误请求'
          break
        case 401:
          err.message = '未授权，请重新登录'
          window.location.pathname = '/login'
          break
        case 403:
          err.message = '没有访问权限，拒绝访问'
          break
        case 404:
          err.message = '请求错误,未找到该资源'
          break
        case 405:
          err.message = '请求方法未允许'
          break
        case 408:
          err.message = '请求超时'
          break
        case 500:
          err.message = err.response.data.message
          break
        case 501:
          err.message = '网络未实现'
          break
        case 502:
          err.message = '网络错误'
          break
        case 503:
          err.message = '服务不可用'
          break
        case 504:
          err.message = '网络超时'
          break
        default:
          err.message = `连接错误${err.response.msg}`
      }
    } else {
      err.message = '连接到服务器失败'
    }
    message.error(err.response)
    return Promise.reject(err.response)
  }
)

interface IResponseData<T> {
  body: T[]
  code: number
  status: boolean
  msg: string
}

export default {
  //get请求
  get<T>(url: string, params?: any, responseType?: ResponseType, headers?: any): Promise<IResponseData<T>> {
    return service.get(url, {
      params: params ?? {},
      headers: {
        ...(headers || {}),
      },
      responseType,
    })
  },
  // //post请求
  post<T>(url: string, params?: any, _object = {}): Promise<IResponseData<T>> {
    return service.post(url, params, { ..._object })
  },
  postFormData<T>(url: string, params?: any, headers?: any): Promise<IResponseData<T>> {
    return service.post(url, {
      headers: {
        ...(headers || {}),
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      data: QS.stringify(params) || {},
    })
  },
  put<T>(url: string, params?: any, _object = {}): Promise<IResponseData<T>> {
    return service.put(url, params)
  },
  delete<T>(url: string, params?: any, _object = {}): Promise<IResponseData<T>> {
    return service.delete(url, {
      params: params,
      ..._object,
    })
  },
}
