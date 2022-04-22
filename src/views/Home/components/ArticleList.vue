<template>
  <div>
    <!-- list实现上拉加载 -->
    <!-- immediate-check：是否在初始化时立即执行滚动位置检查 -->
    <!-- offset：滚动条与底部距离小于 offset 时触发load事件 -->
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
      <van-list
        v-model="loading"
        :finished="finished"
        :immediate-check="false"
        finished-text="没有更多了"
        offset="50"
        @load="onLoad"
      >
        <ArticleItem
          v-for="item in list"
          :key="item.art_id"
          :item="item"
          @disLikeEV="disLikeFn"
          @reportEV="reportFn"
        />
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import ArticleItem from './ArticleItem'
import { Notify } from 'vant'
import { getArticleListAPI, dislikeArticleAPI, articleReportsAPI } from '../../../api'
export default {
  name: 'ArticleList',
  props: {
    channelId: {
      type: Number,
      default: 0
    }
  },
  components: {
    ArticleItem
  },
  data () {
    return {
      list: [],
      loading: false,
      finished: false,
      timestamp: new Date().getTime(),
      isLoading: false
    }
  },
  created () {
    // 获取文章列表数据
    this.getArticleListFn()
  },
  methods: {
    async getArticleListFn () {
      // 发送网络请求
      const res = await getArticleListAPI({
        channel_id: this.channelId,
        timestamp: this.timestamp
      })

      // 下拉刷新，list里面只放入请求的10条数据；上拉加载，list里面push进去请求回来的10条数据
      if (this.isLoading) {
        this.list = res.data.data.results
      } else {
        this.list.push(...res.data.data.results)
      }
      this.timestamp = res.data.data.pre_timestamp

      // 关闭底部加载状态
      this.loading = false
      // res.data.data.pre_timestamp === null，表示当前是最后一页数据
      if (res.data.data.pre_timestamp === null) {
        this.finished = true
      }

      // 关闭顶部加载状态
      this.isLoading = false
    },
    // 底部加载事件方法，底部加载事件，组件会自动把loading改为true
    async onLoad () {
      this.getArticleListFn()
    },
    // 下拉刷新
    async onRefresh () {
      this.timestamp = new Date().getTime()
      this.getArticleListFn()
    },
    // 不感兴趣
    async disLikeFn (artId) {
      try {
        await dislikeArticleAPI(artId)
        Notify({ type: 'success', message: '反馈成功' })
      } catch (err) {
        console.log('失败了')
      }
    },
    // 反馈垃圾内容
    async reportFn (artId, type) {
      try {
        await articleReportsAPI({ artId, type })
        Notify({ type: 'success', message: '举报成功' })
      } catch (err) {
        console.log('失败了')
      }
    }
  }
}
</script>
