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

// 评论列表
// type: a-对文章的评论；c-对评论的评论
// source：文章id或者评论id
// offset：评论偏移个数；limit：评论个数
export const commentsListAPI = ({ type = 'a', id, offset = null, limit = 10 }) => {
  // axios只针对params，如果发现键值对，值为null或者undefined，会忽略此参数名和值不携带在url后面
  // axios对body参数的key+value，如果value值null或者undefined，是不会忽略的，会传递给后台的
  return request({
    url: '/v1_0/comments',
    params: {
      type,
      source: id,
      offset,
      limit
    }
  })
}

// 评论小星星点赞
export const likeCommentAPI = (comId) => {
  return request({
    url: '/v1_0/comment/likings',
    method: 'POST',
    data: {
      target: comId
    }
  })
}

// 评论小星星取消点赞
export const dislikeCommentAPI = (comId) => {
  return request({
    url: `/v1_0/comment/likings/${comId}`,
    method: 'DELETE'
  })
}

// 发布评论
export const publishCommentAPI = ({ id, content, art_id = null }) => {
  const data = {
    target: id,
    content
  }
  if (art_id !== null) {
    data.art_id = art_id
  }
  return request({
    url: '/v1_0/comments',
    method: 'POST',
    data
  })
}

// 获取用户信息
export const getUserInfoAPI = () => {
  return request({
    url: '/v1_0/user'
  })
}

// 获取用户基本信息
export const getProfileAPI = () => {
  return request({
    url: '/v1_0/user/profile'
  })
}

// 用户- 更新头像
// 注意: formData的值必须是一个表单对象
// '{"a": 10, "b": 20}'  对象格式的JSON字符串
// new FormData()        表单对象
// 如果你的请求体内容是表单对象，浏览器会自动携带请求头Content-Type为multipart/form-data
export const updatePhotoAPI = (formData) => {
  return request({
    url: '/v1_0/user/photo',
    method: 'PATCH',
    data: formData
  })
}

// 修改名称
// obj：{ name, gender, birthday, intro }
export const updateProfileAPI = (obj) => {
  return request({
    url: '/v1_0/user/profile',
    method: 'PATCH',
    data: obj
  })
}
