// 操作token的方法
const key = 'geek-itheima'

// 设置token
export const setToken = (token) => {
  localStorage.setItem(key, token)
}

// 获取token
export const getToken = () => {
  return localStorage.getItem(key)
}

// 删除token
export const removeToken = (token) => {
  localStorage.removeItem(key)
}
