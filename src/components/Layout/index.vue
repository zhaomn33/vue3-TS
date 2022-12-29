<template>
  <div class="common-layout">
    <el-container>
      <el-header
        style="background-color: #9be"
      >
        <Header
          :header-data="headerData"
        />
      </el-header>
      <el-container>
        <el-aside>
          <Aside />
        </el-aside>
        <el-main>
          <router-view v-slot="{ Component }">
            <KeepAlive>
              <Component :is="Component" />
            </KeepAlive>
          </router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const headerData = {
  title: '项目名称11',
  port: '管理端11'
}
</script>

<style scoped lang="scss">
.common-layout{
  padding: 0;
  height: 100%;
  :deep(){
    .el-container.is-vertical{
      height: 100%;
    }
    .el-aside, .el-main{
      padding: 0;
    }
    .el-header{
      padding: 6px 16px;
      height: 50px;
    }
    .el-aside{
      width: auto;
    }
  }
}
</style>
