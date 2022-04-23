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

// 搜索 - 联想菜单
export const suggestListAPI = (q) => {
  return request({
    url: '/v1_0/suggestion',
    params: {
      q
    }
  })
}

// 搜索结果列表
export const searchListAPI = ({ page = 1, per_page = 10, q }) => {
  return request({
    url: '/v1_0/search',
    params: {
      page,
      per_page,
      q
    }
  })
}

// 根据文章id获取文章详情
export const getArticleDetailAPI = (art_id) => {
  return request({
    url: `/v1_0/articles/${art_id}`
  })
}

// 关注作者
export const followAuthorAPI = (userId) => {
  return request({
    url: '/v1_0/user/followings',
    method: 'POST',
    data: {
      target: userId
    }
  })
}

// 取消关注作者
export const unFollowAuthorAPI = (userId) => {
  return request({
    url: `/v1_0/user/followings/${userId}`,
    method: 'DELETE'
  })
}

// 点赞
export const likeArtAPI = (artId) => {
  return request({
    url: '/v1_0/article/likings',
    method: 'POST',
    data: {
      target: artId
    }
  })
}

// 取消点赞
export const dislikeArtAPI = (artId) => {
  return request({
    url: `/v1_0/article/likings/${artId}`,
    method: 'DELETE'
  })
}
