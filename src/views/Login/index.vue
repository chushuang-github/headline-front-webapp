<template>
  <div>
    <van-nav-bar title="黑马头条 - 登录" />
    <div>
      <van-form @submit="onSubmit" :show-error="false">
        <van-field
          v-model="user.mobile"
          name="mobile"
          label="手机号"
          placeholder="请输入11位手机号"
          required
          autocomplete="off"
          clearable
          :rules="[
            { required: true, message: '请填写手机号' },
            { pattern: /^1[3-9]\d{9}$/, message: '手机号格式不正确' }
          ]"
        />
        <van-field
          v-model="user.code"
          type="password"
          name="code"
          label="密码"
          placeholder="请输入6位密码"
          required
          autocomplete="off"
          clearable
          :rules="[
            { required: true, message: '请填写密码' },
            { pattern: /^\d{6}$/, message: '密码必须6位' }
          ]"
        />
        <div style="margin: 16px;">
          <van-button
            round
            block
            type="info"
            native-type="submit"
            :loading="isLoading"
            :disabled="isLoading"
            loading-text="正在登录中..."
          >登录</van-button>
        </div>
      </van-form>
    </div>
  </div>
</template>

<script>
import { loginAPI } from '../../api'
import { Notify } from 'vant'
import { setToken } from '../../utils/token'
export default {
  data () {
    return {
      user: {
        mobile: '15905560621',
        // 验证码(密码-必须是246810，后台规定死的，无论手机号是什么都是这个)
        code: '246810'
      },
      isLoading: false // 登录按钮加载状态
    }
  },
  methods: {
    async onSubmit () {
      this.isLoading = true
      try {
        const res = await loginAPI(this.user)
        Notify({ type: 'success', message: '登录成功' })
        setToken(res.data.data.token)
      } catch (err) {
        Notify({ type: 'danger', message: '账号或者密码错误' })
      }
      this.isLoading = false
    }
  }
}
</script>

<style lang="less" scoped>
// 组件的根标签，父组件里面是可以直接通过组件根标类名修改样式的
// .van-nav-bar {
//   background: #007bff;
// }
/* /deep/ 就是把data-v-hash值选择器写到类名的前面 */
// /deep/ .van-nav-bar__title {
//   color: white;
// }
</style>
