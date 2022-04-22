import request from '../utils/request'

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
    method: 'GET'
  })
}

// 更新覆盖频道
export const updateChannelAPI = ({ channels }) => {
  return request({
    url: '/v1_0/user/channels',
    method: 'PUT',
    data: {
      channels
    }
  })
}

// 删除频道
export const deleteChannelAPI = (id) => {
  return request({
    url: `/v1_0/user/channels/${id}`,
    method: 'DELETE'
  })
}

// 获取新闻列表
export const getArticleListAPI = ({ channel_id, timestamp }) => {
  return request({
    url: '/v1_0/articles',
    method: 'GET',
    params: {
      channel_id,
      timestamp
    }
  })
}

// 文章 - 不感兴趣功能，target是不喜欢的文章id
export const dislikeArticleAPI = (artId) => {
  return request({
    url: '/v1_0/article/dislikes',
    method: 'POST',
    data: {
      target: artId
    }
  })
}

// 文章 - 反馈垃圾内容
export const articleReportsAPI = ({ artId, type, remark }) => {
  return request({
    url: '/v1_0/article/reports',
    method: 'POST',
    data: {
      target: artId,
      type,
      remark: ''
    }
  })
}
