import axios from '../utils/request'

// 频道 - 获取所有频道
export const getAllChannelsAPI = () => {
  return axios({
    url: '/v1_0/channels',
    method: 'GET'
  })
}
