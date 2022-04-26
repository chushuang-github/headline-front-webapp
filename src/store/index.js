import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userPhoto: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Ftp.67gu.com%2Fshowimg.php%3Furl%3Dhttp%3A%2F%2Fuploads.xuexila.com%2Fallimg%2F1702%2F867-1F211151433.jpg&refer=http%3A%2F%2Ftp.67gu.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1653568304&t=e5f12454d8415c56d64f74bc86411916'
  },
  mutations: {
    SET_USER_PHOTO (state, payload) {
      state.userPhoto = payload
    }
  },
  actions: {
  },
  modules: {
  }
})
