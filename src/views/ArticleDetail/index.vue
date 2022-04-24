<template>
  <div>
    <!-- Header 区域 -->
    <van-nav-bar fixed title="文章详情" left-arrow @click-left="$router.back()" />

    <!-- 文章信息区域 -->
    <div class="article-container">
      <!-- 文章标题 -->
      <h1 class="art-title">{{ artDetail.title }}</h1>

      <!-- 用户信息 -->
      <van-cell center :title="artDetail.aut_name" :label="format(artDetail.pubdate)">
        <template #icon>
          <img :src="artDetail.aut_photo" class="avatar" alt="">
        </template>
        <template #default>
          <div>
            <van-button
              type="info"
              size="mini"
              v-if="artDetail.is_followed"
              @click="followedFn(true)"
            >已关注</van-button>
            <van-button
              icon="plus"
              type="info"
              size="mini"
              plain v-else
              @click="followedFn(false)"
            >关注</van-button>
          </div>
        </template>
      </van-cell>

      <!-- 分割线 -->
      <van-divider></van-divider>

      <!-- 文章内容 -->
      <div class="art-content" v-html="artDetail.content"></div>

      <!-- 分割线 -->
      <van-divider>End</van-divider>

      <!-- 点赞 -->
      <!-- attitude：-1-无态度；0-不喜欢；1-已点赞 -->
      <div class="like-box">
        <van-button
          icon="good-job"
          type="danger"
          size="small"
          v-if="artDetail.attitude === 1"
          @click="loveFn(true)"
        >已点赞</van-button>
        <van-button
          icon="good-job-o"
          type="danger"
          plain
          size="small"
          v-else
          @click="loveFn(false)"
        >点赞</van-button>
      </div>
    </div>

    <!-- 评论路由 -->
    <CommentList />
  </div>
</template>

<script>
import {
  getArticleDetailAPI,
  followAuthorAPI,
  unFollowAuthorAPI,
  likeArtAPI,
  dislikeArtAPI
} from '../../api'
import { timeAgo } from '../../utils/date'
import CommentList from './CommentList.vue'
export default {
  name: 'ArticleDetail',
  components: {
    CommentList
  },
  data () {
    return {
      artDetail: {}
    }
  },
  async created () {
    const res = await getArticleDetailAPI(this.$route.query.art_id)
    this.artDetail = res.data.data
  },
  methods: {
    format: timeAgo,
    // 关注作者，取消关注作者：type为，true是取消关注；false是关注
    async followedFn (type) {
      if (type) {
        // 取消关注
        this.artDetail.is_followed = false
        await unFollowAuthorAPI(this.artDetail.aut_id)
      } else {
        // 关注
        this.artDetail.is_followed = true
        await followAuthorAPI(this.artDetail.aut_id)
      }
    },
    // 点赞，取消点赞：type，true是取消点赞；false是点赞
    async loveFn (type) {
      if (type) {
        // 取消点赞
        this.artDetail.attitude = 0
        await dislikeArtAPI(this.artDetail.art_id)
      } else {
        // 点赞
        this.artDetail.attitude = 1
        await likeArtAPI(this.artDetail.art_id)
      }
    }
  }
}
</script>

<style scoped lang="less">
.article-container {
  padding: 10px;
  margin-top: 46px;
}
.art-title {
  font-size: 16px;
  font-weight: bold;
  margin: 10px 0;
}

.art-content {
  font-size: 12px;
  line-height: 24px;
  width: 100%;
  overflow-x: scroll;
  word-break: break-all;
  /deep/ img{
    width: 100%;
  }
  /deep/ pre {
    white-space: pre-wrap;
    word-wrap: break-word;
  }
}

.van-cell {
  padding: 5px 0;
  &::after {
    display: none;
  }
}

.avatar {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: #f8f8f8;
  margin-right: 5px;
  border: none;
}

.like-box {
  display: flex;
  justify-content: center;
}
</style>
