<template>
  <div class="header">
    <el-page-header :icon="null">
      <template #title>
        <img
          src="@/assets/svg/sun-logo.svg"
          alt="log"
          class="system-logo-img"
        >
        <h2 class="title">{{ headerData.title }}</h2>
      </template>
      <template #content>
        <!-- 可做成动态切换 需要时可修改 -->
        <span class="subTitle">{{ headerData.port }}</span>
      </template>
      <template #extra>
        <el-dropdown
          trigger="click"
        >
          <div class="user">
            <div class="userContain">
              <img
                src="@/assets/svg/user.svg"
                alt=""
              >
              <span class="username">BJ9334</span>
            </div>
            <img
              src="@/assets/svg/logout.svg"
              alt=""
            >
          </div>
          <template #dropdown>
            <el-dropdown-item
              @click="handleLogout"
            >
              <span>退出登录</span>
            </el-dropdown-item>
          </template>
        </el-dropdown>
      </template>
    </el-page-header>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const props = defineProps({
  headerData: {
    type: Object,
    default: () => {
      return {
        title: '这里是默认项目名称',
        port: '这里是默认端'
      }
    }
  }
})

const handleLogout = () => {
  console.log('handleLogout')
  window.location.href = '/login'
}
</script>

<style scoped lang="scss">
.header {
  .system-logo-img{
    height: 40px;
    background-color: lightblue;
  }
  :deep(){
    .el-page-header{
      .el-page-header__title{
        display: flex;
        align-items: center;
        .title{
          margin-left: 16px;
        }
      }
      .el-page-header__content{
        .subTitle{
          font-size: 18px;
          font-weight: 600;
        }
      }
      .el-page-header__extra{
        display: flex;
        .user{
          display: flex;
          align-items: center;
          color: #fff;
          .userContain{
            cursor: pointer;
            display: flex;
            align-items: center;
            .username{
              margin: 0 10px;
            }
          }
          img{
            width: 16px;
            height: 16px;
            cursor: pointer;
          }
        }
      }
    }
  }
}
</style>
