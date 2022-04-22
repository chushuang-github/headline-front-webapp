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
      <!-- 编辑频道的图标 -->
      <van-icon name="plus" size="0.37333334rem" class="moreChannels" @click="show = true" />
    </div>

    <!-- 频道管理的弹窗层 -->
    <van-popup class="channel_popup" v-model="show" get-container="body">
      <ChannelEdit
        :userList="userChannelList"
        :unCheckList="unCheckChannelList"
        @addChannelEV="addChannelFn"
        @removeChannelEV="removeChannelFn"
        @closeEV="show = false"
        v-model="channelId"
      />
    </van-popup>
  </div>
</template>

<script>
import { getUserChannelsAPI, getAllChannelsAPI, updateChannelAPI, deleteChannelAPI } from '../../api'
import ArticleList from './components/ArticleList'
import ChannelEdit from './ChannelEdit'
export default {
  name: 'Home',
  components: {
    ArticleList,
    ChannelEdit
  },
  data () {
    return {
      channelId: 0,
      userChannelList: [],
      allChannelList: [],
      show: false
    }
  },
  async created () {
    const res = await getUserChannelsAPI()
    this.userChannelList = res.data.data.channels

    const res2 = await getAllChannelsAPI()
    this.allChannelList = res2.data.data.channels
  },
  computed: {
    unCheckChannelList () {
      return this.allChannelList.filter(obj => {
        return !this.userChannelList.find(item => item.id === obj.id)
      })
    }
  },
  methods: {
    // 添加频道
    async addChannelFn (channelObj) {
      this.userChannelList.push(channelObj)
      await updateChannelAPI({
        channels: this.userChannelList.filter(item => item.id !== 0).map((list, i) => ({ id: list.id, seq: i + 1 }))
      })
    },
    // 删除频道
    async removeChannelFn (channelObj) {
      const index = this.userChannelList.findIndex(item => item.id === channelObj.id)
      this.userChannelList.splice(index, 1)
      await deleteChannelAPI(channelObj.id)
    }
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

// 设置 tabs 容器的样式
/deep/ .van-tabs__wrap {
  padding-right: 30px;
  background-color: #fff;
}

// 设置小图标的样式
.moreChannels {
  position: fixed;
  top: 62px;
  right: 8px;
  z-index: 999;
}
.channel_popup {
  width: 100vw;
  height: 100vh;
}
</style>
