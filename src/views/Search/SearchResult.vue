<template>
  <div>
    <!-- 搜索结果页-头部导航 -->
    <div class="search-result-container">
      <!-- 点击实现后退效果 -->
      <van-nav-bar
        title="搜索结果"
        left-arrow
        @click-left="$router.go(-1)"
        fixed
      />
    </div>

    <!-- 搜索列表 -->
    <div>
      <van-list
        v-model="loading"
        :finished="finished"
        :immediate-check="false"
        finished-text="没有更多了"
        offset="50"
        @load="onLoad"
      >
        <ArticleItem
          v-for="item in articleList"
          :key="item.art_id"
          :item="item"
          :isShow="false"
          @click.native="$router.push(`/article_detail?art_id=${item.art_id}`)"
        />
      </van-list>
    </div>
  </div>
</template>

<script>
import { searchListAPI } from '../../api'
import ArticleItem from '../../components/ArticleItem.vue'
export default {
  name: 'SearchResult',
  components: {
    ArticleItem
  },
  data () {
    return {
      page: 1,
      articleList: [],
      loading: false,
      finished: false
    }
  },
  async created () {
    const res = await searchListAPI({
      page: this.page,
      q: this.$route.params.kw
    })
    this.articleList = res.data.data.results
  },
  methods: {
    // 轮动到底部，执行此函数
    async onLoad () {
      this.page++
      const res = await searchListAPI({
        page: this.page,
        q: this.$route.params.kw
      })
      const list = res.data.data.results
      if (list.length === 0) {
        this.finished = true
        return
      }
      this.articleList.push(...list)
      this.loading = false
    }
  }
}
</script>

<style lang="less" scoped>
.search-result-container {
  padding-top: 46px;
}
</style>
