<template>
  <div>
    <!-- 评论列表 -->
    <div
      class="cmt-list"
      :class="{
        'art-cmt-container-1': isShowCmtInput,
        'art-cmt-container-2': !isShowCmtInput
      }"
    >
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多评论了，请发表评论"
        :immediate-check="false"
        @load="onLoad"
      >
        <!-- 评论的 Item 项 -->
        <div class="cmt-item" v-for="obj in commentsList" :key="obj.com_id">
          <!-- 头部区域 -->
          <div class="cmt-header">
            <!-- 头部左侧 -->
            <div class="cmt-header-left">
              <img :src="obj.aut_photo" alt="" class="avatar">
              <span class="uname">{{ obj.aut_name }}</span>
            </div>
            <!-- 头部右侧 -->
            <div class="cmt-header-right">
              <van-icon name="like" size="16" color="red" v-if="obj.is_liking" @click="likeFn(true, obj)" />
              <van-icon name="like-o" size="16" color="gray" v-else @click="likeFn(false, obj)" />
            </div>
          </div>
          <!-- 主体区域 -->
          <div class="cmt-body">
            {{ obj.content }}
          </div>
          <!-- 尾部区域 -->
          <div class="cmt-footer">{{ format(obj.pubdate) }}</div>
        </div>
      </van-list>
    </div>

    <!-- 发布评论 -->
    <div>
      <!-- 底部添加评论区域 - 1 -->
      <div class="add-cmt-box van-hairline--top" v-if="isShowCmtInput">
        <van-icon name="arrow-left" size="0.48rem" @click="$router.back()" />
        <div class="ipt-cmt-div" @click="toggleShow">发表评论</div>
        <div class="icon-box">
          <van-badge :content="total_count === 0 ? '' : total_count" max="99">
            <van-icon name="comment-o" size="0.53333334rem" @click="commentClickFn" />
          </van-badge>
          <van-icon name="star-o" size="0.53333334rem" />
          <van-icon name="share-o" size="0.53333334rem" />
        </div>
      </div>

      <!-- 底部添加评论区域 - 2 -->
      <div class="cmt-box van-hairline--top" v-else>
        <!-- 直接使用标签的autofocus，也能实现自动聚焦 -->
        <!-- 监听失去焦点事件，进行评论框切换 -->
        <textarea
          ref="textarea"
          v-focus
          v-model.trim="comText"
          placeholder="友善评论、理性发言、阳光心灵"
          @blur="blurFn"
        ></textarea>
        <van-button
          type="default"
          :disabled="comText.length ? false : true"
          @click="publishCommentFn"
        >发布</van-button>
      </div>
    </div>
  </div>
</template>

<script>
import { commentsListAPI, likeCommentAPI, dislikeCommentAPI, publishCommentAPI } from '../../api'
import { timeAgo } from '../../utils/date'
export default {
  name: 'CommentList',
  data () {
    return {
      commentsList: [], // 评论列表
      total_count: 0, // 评论总数量
      offset: null, // 偏移量评论id
      isShowCmtInput: true,
      comText: '',
      loading: false,
      finished: false
    }
  },
  async created () {
    const res = await commentsListAPI({
      id: this.$route.query.art_id
    })
    this.commentsList = res.data.data.results
    this.total_count = res.data.data.total_count
    this.offset = res.data.data.last_id
    // 网页打开，没有评论，res结果是空数组
    // 空数组表示没有评论，让finished变为true，就会出现 '没有更多评论了，请发表评论' 这句话
    if (res.data.data.results.length === 0) {
      this.finished = true
    }
  },
  // 分享功能思路
  // 开放平台：https://open.weixin.qq.com/
  // 分享到朋友圈/微信好友 -> 微信平台 -> 去微信的开发者平台上面申请权限，注册公司资质
  // 分享到微博 -> 微博开发平台 > 注册账号，调用人家平台封装的js代码，调用他们的接口
  // 结论：分享到什么平台，就去对应平台的开发平台去查看文档
  methods: {
    format: timeAgo,
    async likeFn (type, obj) {
      if (type) {
        // 评论小星星取消点赞
        obj.is_liking = false
        await dislikeCommentAPI(obj.com_id)
      } else {
        // 评论小星星点赞
        obj.is_liking = true
        await likeCommentAPI(obj.com_id)
      }
    },
    // 显示评论输入框
    toggleShow () {
      this.isShowCmtInput = false
    },
    // 评论个数按钮的点击事件 (第一天评论滑动到最上面)
    commentClickFn () {
      // 只要设置window.scrollTo(0, 文字内容的高度)
      // scrollHeight:滚动区域的高度；scrollTop:垂直滚动条滚动的距离
      // 获取文章滚动区域的高度，文章内容的根标签是在另一个组件里面的
      // JS代码是在html+css运行后，真实DOM已经在网页上了，用document获取标签是ok的
      // 所以通过下面的方式获取另一个组件的标签，是可以的
      // 方式一：
      // const articalHeight = document.querySelector('.article-container').scrollHeight
      // window.scrollTo({
      //   top: articalHeight,
      //   behavior: 'smooth'
      // })
      // 方式二：Element的scrollIntoView()方法会滚动元素的父容器
      // 使调用scrollIntoView()的DOM元素对用户可见 (具体去MDN文档里面查看)
      document.querySelector('.like-box').scrollIntoView({
        behavior: 'smooth'
      })
    },
    // 评论输入框失去焦点事件
    blurFn () {
      setTimeout(() => {
        this.isShowCmtInput = true
        this.comText = ''
      }, 10)
    },
    // 发布评论
    async publishCommentFn () {
      const res = await publishCommentAPI({
        id: this.$route.query.art_id,
        content: this.comText
      })
      this.commentsList.unshift(res.data.data.new_obj)
      this.total_count++
      // 发布完评论，滚动到新发布的评论的位置
      this.commentClickFn()
    },
    // 评论加载更多
    async onLoad () {
      if (!this.commentsList.length) {
        this.loading = false
        return
      }
      const res = await commentsListAPI({
        id: this.$route.query.art_id,
        offset: this.offset
      })
      this.commentsList.push(...res.data.data.results)
      this.offset = res.data.data.last_id
      this.total_count = res.data.data.total_count
      this.loading = false
      if (res.data.data.last_id === null) {
        this.finished = true
      }
    }
  }
}
</script>

<style scoped lang="less">
.cmt-list {
  padding: 10px;
  .cmt-item {
    padding: 15px 0;
    + .cmt-item {
      border-top: 1px solid #f8f8f8;
    }
    .cmt-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      .cmt-header-left {
        display: flex;
        align-items: center;
        .avatar {
          width: 40px;
          height: 40px;
          background-color: #f8f8f8;
          border-radius: 50%;
          margin-right: 15px;
        }
        .uname {
          font-size: 12px;
        }
      }
    }
    .cmt-body {
      font-size: 14px;
      line-height: 28px;
      text-indent: 2em;
      margin-top: 6px;
      word-break: break-all;
    }
    .cmt-footer {
      font-size: 12px;
      color: gray;
      margin-top: 10px;
    }
  }
}
// 外层容器
.art-cmt-container-1 {
  padding-bottom: 46px;
}
.art-cmt-container-2 {
  padding-bottom: 80px;
}

// 发布评论的盒子 - 1
.add-cmt-box {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  box-sizing: border-box;
  background-color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 46px;
  line-height: 46px;
  padding-left: 10px;
  .ipt-cmt-div {
    flex: 1;
    border: 1px solid #efefef;
    border-radius: 15px;
    height: 30px;
    font-size: 12px;
    line-height: 30px;
    padding-left: 15px;
    margin-left: 10px;
    background-color: #f8f8f8;
  }
  .icon-box {
    width: 40%;
    display: flex;
    justify-content: space-evenly;
    line-height: 0;
  }
}

.child {
  width: 20px;
  height: 20px;
  background: #f2f3f5;
}

// 发布评论的盒子 - 2
.cmt-box {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 80px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 12px;
  padding-left: 10px;
  box-sizing: border-box;
  background-color: white;
  textarea {
    flex: 1;
    height: 66%;
    border: 1px solid #efefef;
    background-color: #f8f8f8;
    resize: none;
    border-radius: 6px;
    padding: 5px;
  }
  .van-button {
    height: 100%;
    border: none;
  }
}
</style>
