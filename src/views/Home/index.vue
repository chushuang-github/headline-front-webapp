<template>
  <div>
    <div>
      <van-nav-bar fixed>
        <template v-slot:left>
          <img src="../../assets/toutiao_logo.png" class="logo" />
        </template>
        <template #right>
          <!-- postcss只能将style标签里面px转为rem，这里面的size大小自己写成0.48rem才能适配 -->
          <!-- 18 / 37.5 = 0.48 -->
          <van-icon name="search" color="#ffffff" size="0.48rem" />
        </template>
      </van-nav-bar>
    </div>
    <div class="main">
      <van-tabs v-model="channelId" sticky offset-top="1.226667rem" animated>
        <van-tab
          v-for="item in userChannelList"
          :key="item.id"
          :name="item.id"
          :title="item.name"
        >
          <ArticleList :channelId="channelId" />
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>

<script>
import { getUserChannelsAPI } from '../../api'
import ArticleList from './components/ArticleList'
export default {
  name: 'Home',
  components: {
    ArticleList
  },
  data () {
    return {
      channelId: 0,
      userChannelList: []
    }
  },
  async created () {
    const res = await getUserChannelsAPI()
    this.userChannelList = res.data.data.channels
  }
}
</script>

<style lang="less" scoped>
.logo {
  width: 100px;
  height: 30px;
}
.main {
  padding-top: 46px;
}
</style>
