<template>
  <div class="container">
    <!-- 固定导航 -->
    <van-nav-bar
      fixed
      left-arrow
      @click-left="$router.back()"
      title="小思同学"
    ></van-nav-bar>

    <!-- 聊天主体区域 -->
    <div class="chat-list">
      <div v-for="(item, index) in list" :key="index">
        <!-- 左侧是机器人小思 -->
        <div class="chat-item left" v-if="item.name !== 'me'">
          <van-image fit="cover" round src="https://img.yzcdn.cn/vant/cat.jpeg" />
          <div class="chat-pao">{{ item.msg }}</div>
        </div>

        <!-- 右侧是当前用户 -->
        <div class="chat-item right" v-else>
          <div class="chat-pao">{{ item.msg }}</div>
          <van-image fit="cover" round :src="userPhoto" />
        </div>
       </div>
    </div>

    <!-- 对话区域 -->
    <div class="reply-container van-hairline--top">
      <van-field placeholder="说点什么..." v-model="word">
        <template #button>
          <span style="font-size:12px; color:#999" @click="sendFn">提交</span>
        </template>
      </van-field>
    </div>
  </div>
</template>

<script>
// 导入socket.io-client包，包的版本和后端要对应起来
// socket.io-client是前端的包，下载socket.io包是后端的
import { io } from 'socket.io-client'
import { getToken } from '../../utils/token'
import { mapState } from 'vuex'
export default {
  name: 'Chat',
  data () {
    return {
      // 输入框的内容
      word: '',
      // 所有的聊天消息
      list: [
        // 只根据 name 属性，即可判断出这个消息应该渲染到左侧还是右侧
        { name: 'xs', msg: 'hi，你好！我是小思' },
        { name: 'me', msg: '我是编程小王子' }
      ],
      // 客户端和服务器进行连接的socket对象
      socket: null
    }
  },
  computed: {
    ...mapState(['userPhoto'])
  },
  created () {
    // 注意1：io是建立socket连接，和axios没有关系，地址要写完整
    // 注意2：地址也可以写成 'ws://toutiao.itheima.net'
    this.socket = io('http://toutiao.itheima.net', {
      query: {
        token: getToken()
      },
      transports: ['websocket']
    })
    // 建立连接的事件
    this.socket.on('connect', () => {
      console.log('与服务器建立了连接')
    })
    // 接收到消息的事件
    this.socket.on('message', data => {
      // 把服务器发送过来的消息，存储到 list 数组中
      this.list.push({
        name: 'xs',
        msg: data.msg
      })
      // 接收消息，页面滚动，让消息显示出来
      this.$nextTick(() => {
        this.scrollToBottom()
      })
    })
  },
  // 组件被销毁之前，清空socked对象
  beforeDestroy () {
    // 关闭连接
    this.socket.close()
    // 销毁 websocket 实例对象
    this.socket = null
  },
  methods: {
    // 向服务端发送消息
    sendFn () {
      // 判断内容是否为空
      if (!this.word) return
      // 把消息发送给 websocket 服务器
      this.socket.emit('message', {
        msg: this.word,
        timestamp: new Date().getTime()
      })
      // 添加聊天消息到 list 列表中
      this.list.push({
        name: 'me',
        msg: this.word
      })
      // 数据变化，页面真实DOM更新是异步的
      // this.$nextTick回调函数会在页面DOM更新之后执行
      // 发送消息，页面滚动，让消息显示出来
      this.$nextTick(() => {
        this.scrollToBottom()
      })
      // 清空文本框的内容
      this.word = ''
    },
    // 滚动到页面底部
    // 获取原生DOM, 调用scrollIntoView方法, 让标签滚到可视窗口
    // 如果下面没有更多内容了, 是不一定会滚到头的
    scrollToBottom () {
      // 获取到所有的聊天 Item 项
      const chatItem = document.querySelectorAll('.chat-item')
      // 获取到最后一项对应的 DOM 元素
      const lastItem = chatItem[chatItem.length - 1]
      // 调用 scrollIntoView() 方法，显示这个元素
      lastItem.scrollIntoView({
        behavior: 'smooth' // 动画平滑
      })
    }
  }
}
</script>

<style lang="less" scoped>
.container {
  height: 100%;
  width: 100%;
  position: absolute;
  left: 0;
  top: 0;
  box-sizing: border-box;
  background: #fafafa;
  padding: 46px 0 50px 0;
  .chat-list {
    height: 100%;
    overflow-y: scroll;
    .chat-item {
      padding: 10px;
      .van-image {
        vertical-align: top;
        width: 40px;
        height: 40px;
      }
      .chat-pao {
        vertical-align: top;
        display: inline-block;
        min-width: 40px;
        max-width: 70%;
        min-height: 40px;
        line-height: 38px;
        border: 0.5px solid #c2d9ea;
        border-radius: 4px;
        position: relative;
        padding: 0 10px;
        background-color: #e0effb;
        word-break: break-all;
        font-size: 14px;
        color: #333;
        // 对话框的三角形
        &::before {
          content: '';
          width: 10px;
          height: 10px;
          position: absolute;
          top: 12px;
          border-top: 0.5px solid #c2d9ea;
          border-right: 0.5px solid #c2d9ea;
          background: #e0effb;
        }
      }
    }
  }
}
.chat-item.left {
  // 对话框在左边边
  text-align: left;
  .chat-pao {
    margin-left: 15px;
    margin-right: 0;
    &::before {
      left: -5px;
      transform: rotate(-135deg);
    }
  }
}
.chat-item.right {
  // 对话库在右边
  text-align: right;
  .chat-pao {
    margin-left: 0;
    margin-right: 15px;
    &::before {
      right: -6px;
      transform: rotate(45deg);
    }
  }
}
.reply-container {
  position: fixed;
  left: 0;
  bottom: 0;
  height: 44px;
  width: 100%;
  background: #f5f5f5;
  z-index: 9999;
}
</style>
