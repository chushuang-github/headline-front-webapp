<template>
  <div>
    <!-- 搜索页面头部 -->
    <div class="search-header">
      <!-- 后退按钮 -->
      <van-icon
        name="arrow-left"
        color="white"
        size="0.48rem"
        class="goback"
        @click="$router.back()"
      />
      <!-- 搜索组件 -->
      <van-search
        v-focus
        v-model.trim="kw"
        placeholder="请输入搜索关键词"
        background="#007BFF"
        shape="round"
        @input="onInput"
        @search="searchFn(kw, 'search')"
      />
    </div>

    <!-- 搜索建议列表 -->
    <div class="sugg-list" v-if="kw.length && suggestList.length">
      <!-- 使用v-html解析带有标签的字符串 -->
      <div
        class="sugg-item"
        v-for="item in suggestList"
        :key="item"
        v-html="lightFn(item, kw)"
        @click="searchFn(item)"
      />
    </div>

    <!-- 搜索历史 -->
    <div class="search-history" v-else>
      <!-- 标题 -->
      <van-cell title="搜索历史">
        <!-- 使用 right-icon 插槽来自定义右侧图标 -->
        <template #right-icon>
          <van-icon name="delete" class="search-icon" @click="deleteSearchHistory" />
        </template>
      </van-cell>
      <!-- 历史列表 -->
      <div class="history-list">
        <span
          class="history-item"
          v-for="(item, index) in history"
          :key="index"
          @click="searchFn(item, 'history')"
        >{{ item }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { suggestListAPI } from '../../api'
export default {
  name: 'Search',
  data () {
    return {
      kw: '', // 搜索关键字
      timer: null,
      suggestList: [],
      history: JSON.parse(localStorage.getItem('his')) || []
    }
  },
  methods: {
    // 输入框内容变化时触发 (要做防抖的操作)
    onInput () {
      clearInterval(this.timer)
      if (this.kw.length === 0) {
        this.suggestList = []
      } else {
        this.timer = setTimeout(async () => {
          const res = await suggestListAPI(this.kw)
          const list = res.data.data.options
          if (list[0] === null) {
            this.suggestList = []
            return
          }
          this.suggestList = list
        }, 300)
      }
    },
    // 处理关键字高亮的功能函数
    // str：完整字符串；target：需要高亮的关键字(输入框里面的内容)
    lightFn (str, target) {
      // 字符串replace方法替换匹配到的第一个字符
      // 字符串replaceAll方法替换匹配到的所有的字符 (但是不忽略大小写)
      // return str.replaceAll(target, `<span style="color: red;">${target}</span>`)

      // replace方法：第一个参数可以是正则，第二个参数可以写一个函数
      // 正则的匹配条件，如果使用变量，就不能使用语法糖的简化写法
      // i：忽略大小写；g：全局匹配
      const reg = new RegExp(target, 'ig')
      return str.replace(reg, (match, p1, p2) => {
        // 回调函数会默认传入几个参数:
        // match: 匹配到的字符串
        // p1: 匹配到的字符串的索引
        // p2: 完整字符串
        return `<span style="color: red;">${match}</span>`
      })
    },
    searchFn (kw, type) {
      // 搜索回车和点击列表，需要本地缓存，做搜索历史的效果
      if (type === 'search' || type === 'history') {
        if (kw.length) this.history.push(kw)
      }
      // 我们需要下面的watch监听器先执行，在进行跳转，所以加了一个定时器，异步执行
      setTimeout(() => {
        if (kw.length) this.$router.push(`/search_result/${kw}`)
      })
    },
    // 删除搜索历史
    deleteSearchHistory () {
      localStorage.removeItem('his')
      this.history = []
    }
  },
  watch: {
    history: {
      deep: true,
      handler () {
        // 去重
        const list = [...new Set(this.history)]
        localStorage.setItem('his', JSON.stringify(list))
      }
    }
  }
}
</script>

<style scoped lang="less">
.search-header {
  height: 46px;
  display: flex;
  align-items: center;
  background-color: #007bff;
  overflow: hidden;
  /*后退按钮*/
  .goback {
    padding-left: 14px;
  }
  /*搜索组件*/
  .van-search {
    flex: 1;
  }
}
/*搜索建议列表样式 */
.sugg-list {
  .sugg-item {
    padding: 0 15px;
    border-bottom: 1px solid #f8f8f8;
    font-size: 14px;
    line-height: 50px;
    // 实现省略号的三行代码
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}
/**搜索历史 */
.search-icon {
  font-size: 16px;
  line-height: inherit;
}

.history-list {
  padding: 0 10px;
  .history-item {
    display: inline-block;
    font-size: 12px;
    padding: 8px 14px;
    background-color: #efefef;
    margin: 10px 8px 0px 8px;
    border-radius: 10px;
  }
}
</style>
