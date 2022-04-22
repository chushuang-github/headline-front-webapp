// 封装基于axios的网络请求
import axios from 'axios'
import router from '../router'
import { getToken } from './token'
import { Notify } from 'vant'

// 新建一个新的axios实例
const instance = axios.create({
  baseURL: 'http://toutiao.itheima.net', // 基地址
  timeout: 20000
})

// 请求拦截器
instance.interceptors.request.use(config => {
  // http状态码为2xx，3xx，就会进入这里
  if (getToken()?.length > 0 && config.headers.Authorization === undefined) {
    config.headers.Authorization = `Bearer ${getToken()}`
  }
  return config
}, err => {
  // http状态码为4xx，5xx，就会进入这里
  return Promise.reject(err)
})

// 响应拦截器
instance.interceptors.response.use(res => {
  // http状态码为2xx，3xx，就会进入这里
  return res
}, err => {
  // http状态码为4xx，5xx，就会进入这里
  console.dir(err)
  // 响应状态码为401，就表示身份认证过期(token失效)，跳转登录页面
  if (err.response.status === 401) {
    Notify({ type: 'warning', message: '身份已过期，请重新登录' })
    router.replace('/login')
  }
  return Promise.reject(err)
})

// 导出自定义函数, 参数对象解构赋值
export default ({ url, method = 'GET', params, data, headers }) => {
  return instance({
    url,
    method,
    params,
    data,
    headers
  })
}
