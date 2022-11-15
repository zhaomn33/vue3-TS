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
      <el-menu-item
        v-if="!item.children"
        :index="item.to.name"
        :route="item.to"
      >
        <template #title>{{ item.name }}</template>
      </el-menu-item>
      <el-sub-menu
        v-else
        :index="item.name"
      >
        <template #title>
          <span>{{ item.name }}</span>
        </template>
        <el-menu-item
          v-for="childrenItem in item.children"
          :key="childrenItem.name"
          :index="childrenItem.to.name"
          :route="childrenItem.to"
        >
          {{ childrenItem.name }}
        </el-menu-item>
      </el-sub-menu>
    </template>
  </el-menu>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue'
import { RouteLocationNamedRaw, useRoute } from 'vue-router'

// 菜单列表
const menuList = [
  {
    icon:'',
    name:'demo',
    to:{ name : 'demo'}
  },
  {
    icon:'',
    name:'demoList',
    children:[
      {
        icon:'',
        name:'demo2',
        to:{ name : 'demo2'}
      },
      {
        icon:'',
        name:'demo3',
        to:{ name : 'demo3'}
      }
    ]
  },
]

const route = useRoute()

const defaultActive = ref('demo')


</script>

<style lang="scss" scoped>
.el-menu{
  height: 100%;

}
</style>