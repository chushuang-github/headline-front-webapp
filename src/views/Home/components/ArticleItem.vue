<template>
  <div class="aaa">
    <van-cell>
      <!-- 标题区域的插槽 -->
      <template #title>
        <div class="title-box">
          <!-- 标题 -->
          <span>{{ item.title }}</span>
          <!-- 单图 -->
          <img v-if="item.cover.type === 1" :src="item.cover.images[0]" class="thumb" />
        </div>
        <!-- 三图 -->
        <div class="thumb-box" v-if="item.cover.type > 1">
          <img v-for="img in item.cover.images" :key="img" :src="img" class="thumb">
        </div>
      </template>
      <!-- label 区域的插槽 -->
      <template #label>
        <div class="label-box">
          <div>
            <span>{{ item.aut_name }}</span>
            <span>{{ item.comm_count }}评论</span>
            <span>{{ formatTime(item.pubdate) }}</span>
          </div>
          <!-- 反馈按钮 -->
          <van-icon name="cross" @click="show = true" />
        </div>
      </template>
    </van-cell>
    <!-- 反馈面板 -->
    <van-action-sheet
      v-model="show"
      :actions="actions"
      :cancel-text="bottomText"
      get-container="body"
      @select="onSelect"
      @cancel="onCancel"
      @closed="onClosed"
    />
  </div>
</template>

<script>
import { timeAgo } from '../../../utils/date'
import { firstActions, secondActions } from '../../../api/report'
export default {
  name: 'ArticleItem',
  props: {
    item: {
      type: Object,
      default: () => ({})
    }
  },
  data () {
    return {
      show: false,
      actions: firstActions,
      bottomText: '取消'
    }
  },
  methods: {
    formatTime: timeAgo,
    // 点击选项触发
    onSelect (action, index) {
      if (action.name === '反馈垃圾内容') {
        this.actions = secondActions
        this.bottomText = '返回'
      } else if (action.name === '不感兴趣') {
        this.$emit('disLikeEV', this.item.art_id)
        // 关闭面板
        this.show = false
      } else {
        this.$emit('reportEV', this.item.art_id, action.value)
        this.show = false
      }
    },
    // 点击取消按钮触发
    onCancel () {
      if (this.bottomText === '返回') {
        this.show = true
        this.actions = firstActions
        this.bottomText = '取消'
      }
    },
    // 关闭面板触发
    onClosed () {
      this.actions = firstActions
      this.bottomText = '取消'
    }
  }
}
</script>

<style lang="less" scoped>
/* 标题样式 */
.title-box {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

/* label描述样式 */
.label-box {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

/* 文章信息span */
.label-box span {
  margin: 0 3px;
  &:first-child {
    margin-left: 0;
  }
}

/* 图片的样式, 矩形黄金比例：0.618 */
.thumb {
  width: 113px;
  height: 70px;
  background-color: #f8f8f8;
  object-fit: cover;
}

/* 三图, 图片容器 */
.thumb-box {
  display: flex;
  justify-content: space-between;
}
</style>
