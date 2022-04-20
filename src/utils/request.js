// 封装基于axios的网络请求
import axios from 'axios'
// 新建一个新的axios实例
const instance = axios.create({
  baseURL: 'http://toutiao.itheima.net', // 基地址
  timeout: 20000
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
