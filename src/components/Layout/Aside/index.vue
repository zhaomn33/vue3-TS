<template>
  <el-menu
    class="el-menu-vertical-demo"
    :default-active="defaultActive"
    :router="true"
  >
    <template
      v-for="item in menuList"
      :key="item"
    >
    <!-- v-if="!item?.children" -->
      <el-menu-item
        :index="item.to.name"
        :route="item.to"
      >
        <template #title>{{ item.name }}</template>
      </el-menu-item>
      <!-- <el-sub-menu
        v-else
      >
      </el-sub-menu> -->
    </template>
  </el-menu>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue'
import { RouteLocationNamedRaw, useRoute } from 'vue-router'

const menuList = [
  {
    icon:'',
    name:'demo',
    to:{ name : 'demo'}
  },
  {
    icon:'',
    name:'demo2',
    to:{ name : 'demo2'}
  },
]

const route = useRoute()

const defaultActive = ref('/demo')


</script>

<style lang="scss" scoped>
.el-menu{
  height: 100%;

}
</style>