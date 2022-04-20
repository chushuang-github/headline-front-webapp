<template>
  <div id="app"></div>
</template>

<script>
import { getAllChannelsAPI } from './api'
export default {
  name: 'App',
  async created () {
    // 使用try...catch捕获await函数的错误信息
    try {
      const res = await getAllChannelsAPI()
      console.log(res)
    } catch (err) {
      console.log(err)
    }
  }
}
</script>

<style lang="less"></style>
