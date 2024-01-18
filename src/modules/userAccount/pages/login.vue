<template>
  <div class="login-container">
    <el-form
      ref="ruleForms"
      class="login-box"
      :model="userInfo"
      :rules="rules"
      @keyup.enter="handleSubmit()"
    >
      <h2 class="text-login">登录</h2>
      <el-form-item
        label="用户名:"
        label-width="70"
        prop="username"
      >
        <el-input
          v-model="userInfo.username"
          type="text"
          placeholder="请输入用户名"
        />
      </el-form-item>
      <el-form-item
        label="密码:"
        label-width="70"
        prop="password"
      >
        <el-input
          v-model="userInfo.password"
          type="password"
          placeholder="请输入密码"
        />
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          class="submitBtn"
          :loading="loading"
          @click="handleSubmit()"
        >
          登录
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  reactive,
  ref
} from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import useUserAccount from '@/modules/UserAccount/store'
import requestSuite from '@/utils/request'

export default defineComponent({
  name: 'Login',
  components: {},
  props: {},
  setup() {
    const router = useRouter()
    const store = useUserAccount()

    // 表单提交状态
    const loading = ref(false)

    const ruleForms = ref()
    const userInfo = reactive({
      username: 'admin',
      password: '123456'
    })
    const rules = {
      username: [{
        required: true,
        message: '请输入用户名',
        trigger: 'change'
      }],
      password: [{
        required: true,
        message: '请输入密码',
        trigger: 'change'
      }]
    }

    const handleSubmit = () => {
      // console.log('ruleForms.value',ruleForms.value)
      ruleForms.value.validate(async(valid:boolean) => {
        // console.log('valid',valid)
        // 校验失败则退出
        if (!valid) return
        // 验证通过 展示 loading
        loading.value = true
        // 请求提交
        try {
          if (!userInfo.username || !userInfo.password) {
            ElMessage.error('用户名或密码不能为空!')
            return
          }
          // const login = await requestSuite.post('/api/login', userInfo)
          // console.log(login, 'login')
        } catch (e) {
          console.log('eeeeee')
          throw Error(e.message)
        }

        const data = store.login(userInfo).finally(() => {
          ElMessage.success('登录成功!')
          router.push('/').then(() => {
            loading.value = false
            console.log('登录成功')
          })
        })
        // console.log('handleSubmit data',data)
      })
    }

    return {
      ruleForms,
      userInfo,
      rules,
      loading,

      handleSubmit
    }
  }
})

</script>

<style lang="scss" scoped>
.login-container{
  width: 100%;
  height: 100%;
  .login-box{
    width: 450px;
    height: 300px;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
    padding: 35px 45px 20px;
    background: #fff;
    border: 1px solid #eaeaea;
    border-radius: 5px;
    box-shadow: 0 0 25px #d6d4d4;
    .text-login{
      margin: 0 auto 30px;
      text-align: center;
    }
    :deep(){
      .el-input{
        margin-bottom: 10px;
      }
    }
    .submitBtn{
      width: 100%;
      margin-top: 20px;
    }
  }
}
</style>
