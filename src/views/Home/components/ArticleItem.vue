<template>
  <div>
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
          <van-icon name="cross" />
        </div>
      </template>
    </van-cell>
  </div>
</template>

<script>
import { timeAgo } from '../../../utils/date'
export default {
  name: 'ArticleItem',
  props: {
    item: {
      type: Object,
      default: () => ({})
    }
  },
  methods: {
    formatTime: timeAgo
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
