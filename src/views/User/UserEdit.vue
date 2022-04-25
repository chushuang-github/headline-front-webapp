<template>
  <div class="user-edit-container">
    <!-- Header 区域 -->
    <van-nav-bar title="编辑资料" left-arrow @click-left="$router.back()" fixed />

    <!-- 用户资料 -->
    <van-cell-group class="action-card">
      <van-cell title="头像" is-link center>
        <template #default>
          <van-image @click="imageClickFn" round class="avatar" :src="profile.photo"/>
          <!-- file选择框 -->
          <input
            type="file"
            ref="input"
            v-show="false"
            accept="image/*"
            @change="onFileChange"
          />
        </template>
      </van-cell>
      <van-cell title="名称" is-link :value="profile.name" @click="nameClickFn" />
      <van-cell title="生日" is-link :value="profile.birthday" @click="birthdayClickFn" />
    </van-cell-group>

    <!-- 姓名修改弹窗 -->
    <van-dialog
      v-model="show"
      title="修改名称"
      showCancelButton
      :before-close="beforeCloseFn"
    >
      <van-field v-model="inputUserName" input-align="center" v-focus placeholder="请输入名称" />
    </van-dialog>

    <!-- 生日修改弹窗 -->
    <van-popup v-model="birthdayShow" position="bottom" round>
      <van-datetime-picker
        v-model="currentDate"
        type="date"
        title="选择出生日期"
        :min-date="minDate"
        :max-date="maxDate"
        @cancel="birthdayShow = false"
        @confirm="onConfirm"
      />
    </van-popup>
  </div>
</template>

<script>
import { getProfileAPI, updatePhotoAPI, updateProfileAPI } from '../../api'
import { Notify } from 'vant'
import { dateFormat } from '../../utils/date'
export default {
  name: 'UserEdit',
  data () {
    return {
      profile: {},
      show: false, // 姓名弹窗的输入和隐藏
      inputUserName: '',
      birthdayShow: false,
      currentDate: new Date(),
      minDate: new Date(1900, 0, 1),
      maxDate: new Date()
    }
  },
  async created () {
    const res = await getProfileAPI()
    this.profile = res.data.data
  },
  methods: {
    // 点击头像，在这里使用js代码调用input框的点击事件
    // 打开input框，进行文件选择，有点移花接木的意思
    imageClickFn () {
      this.$refs.input.click()
    },
    // input框选择了文件，使用formData上传文件
    async onFileChange (e) {
      // 用户取消选中图片
      if (e.target.files.length === 0) return
      // 选择的文件对象：e.target.files[0]
      const file = e.target.files[0]
      // 创建formData对象，并且使用append方法向formData插入key-value
      const formData = new FormData()
      formData.append('photo', file)
      console.log(formData)
      const res = await updatePhotoAPI(formData)
      this.profile.photo = res.data.data.photo
    },
    // 姓名点击事件
    nameClickFn () {
      this.inputUserName = this.profile.name
      this.show = true
    },
    // 姓名弹窗关闭前，进行验证，调用 done() 后关闭弹窗，调用 done(false) 阻止弹窗关闭
    async beforeCloseFn (action, done) {
      // 用户点击了确认
      if (action === 'confirm') {
        // 使用正则表达式进行验证，姓名必须是1-7位的中文/英文/数字
        // \u4e00-\u9fa5：就是中文的范围，\u开头的是一个unicode码的字符
        // 计算机中，对字符(中文)有多种编码，计算机眼中只有0和1 -> 编码成一种表现形式
        // utf-8是针对Unicode的一种可变长度字符编码，utf-8会编码成我们认识的中文字符
        // url编码：中文'你好'转为url编码，格式为 %E4%BD%A0%E5%A5%BD
        // 官网：https://www.bejson.com/convert/unicode_chinese/
        // unicode编码：中文'你好'转为unicode编码，格式为 \u4f60\u597d
        // \u4e00对应中文'一'，中文的开始; \u9fa5对应中文'龥'，中文的结束
        // 表示文字的正则/[一-龥]/ 或者 /[\u4e00-\u9fa5]/
        // 下面的正则表达式还有一个问题{1,7}，中间不能有空格
        const reg = /^[a-zA-Z0-9\u4e00-\u9fa5]{1,7}$/
        if (reg.test(this.inputUserName)) {
          // 通过正则校验，调用done关闭弹窗，并且发送请求，修改姓名
          done()
          await updateProfileAPI({ name: this.inputUserName })
          this.profile.name = this.inputUserName
        } else {
          // 没有通过正则校验
          done(false)
          Notify({ type: 'warning', message: '用户名只能是1-7位中英数字组件' })
        }
      } else {
        done()
      }
    },
    // 生日点击事件
    birthdayClickFn () {
      this.currentDate = new Date(this.profile.birthday)
      this.birthdayShow = true
    },
    // 生日确定事件
    async onConfirm (value) {
      const birthday = dateFormat(value)
      await updateProfileAPI({ birthday })
      this.profile.birthday = birthday
      this.birthdayShow = false
    }
  }
}
</script>

<style lang="less" scoped>
.user-edit-container {
  padding-top: 46px;
  .avatar {
    width: 50px;
    height: 50px;
  }
}
</style>
