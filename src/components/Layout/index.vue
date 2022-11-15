<template>
  <div class="common-layout">
    <el-container>
      <el-header>
        <Header />
      </el-header>
      <el-container>
        <el-aside width="240px">
          <Aside />
        </el-aside>
        <el-main>
          <router-view/>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script lang="ts">

</script>

<style scoped lang="scss">
.common-layout{
  padding: 0;
  height: 100%;
  :deep(){
    .el-container.is-vertical{
      height: 100%;
    }
    .el-header, .el-aside, .el-main{
      padding: 0;
    }
    .el-header{
      background-color: skyblue;
      padding: 0 16px;
    }
  }
}
</style>