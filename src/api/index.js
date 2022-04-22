import request from '../utils/request'
import { getToken } from '../utils/token'

// 登录 - 登录接口
// axios内部，会把参数对象转成json字符串格式发送给后台，并且会自动添加请求头
export const loginAPI = ({ mobile, code }) => {
  return request({
    url: '/v1_0/authorizations',
    method: 'POST',
    data: {
      mobile,
      code
    }
  })
}

// 频道 - 获取所有频道
export const getAllChannelsAPI = () => {
  return request({
    url: '/v1_0/channels',
    method: 'GET'
  })
}

// 频道 - 获取用户选择的频道
export const getUserChannelsAPI = () => {
  return request({
    url: '/v1_0/user/channels',
    method: 'GET',
    headers: {
      Authorization: 'Bearer ' + getToken()
    }
  })
}

// 获取新闻列表
export const getArticleListAPI = ({ channel_id, timestamp }) => {
  return request({
    url: '/v1_0/articles',
    method: 'GET',
    headers: {
      Authorization: 'Bearer ' + getToken()
    },
    params: {
      channel_id,
      timestamp
    }
  })
}
