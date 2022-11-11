<template>
  <div class="common-layout">
    <el-container>
      <el-header>
        <Header />
      </el-header>
      <el-container>
        <Aside />
        <Main />
      </el-container>
    </el-container>
  </div>
</template>

<script lang="ts">

</script>

<style scoped lang="scss">
.common-layout{
  padding: 0;
  :deep(){
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