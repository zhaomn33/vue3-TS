<template>
  <div class="login-container">
    <el-form
      class="login-box"
      ref="ruleForms"
      :model="userData"
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
          type="text"
          placeholder="请输入用户名"
          v-model="userData.username"
        />
      </el-form-item>
      <el-form-item
        label="密码:"
        label-width="70"
        prop="password"
      >
        <el-input
          type="password"
          placeholder="请输入密码"
          v-model="userData.password"
        />
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          class="submitBtn"
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

export default defineComponent({
  name: 'Login',
  components: {},
  props: {},
  setup() {
    const router = useRouter()

    const ruleForms = ref()
    const userData = reactive({
      username:'',
      password:''
    })
    const rules = {
      username:[{
        required:true,
        message:"请输入用户名",
        trigger:"change"
      }],
      password:[{
        required:true,
        message:"请输入密码",
        trigger:"change"
      }]
    }

    const handleSubmit = () => {
      console.log('ruleForms.value',ruleForms.value)
      ruleForms.value.validate(async(valid)=>{
        console.log('valid',valid)
        // 校验失败则退出
        if(!valid) return

        ElMessage.success('登录成功!')
        router.push('/')
      })
    }

    return {
      ruleForms,
      userData,
      rules,

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