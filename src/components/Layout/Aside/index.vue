<template>
  <div :class="['menu-contain', isCollapse ? 'menu-collapse':'']">
    <el-menu
      class="el-menu-vertical-demo"
      :default-active="defaultActive"
      :router="true"
      :collapse="isCollapse"
      :collapse-transition="false"
      text-color="#333"
    >
      <template
        v-for="item in menuList"
        :key="item"
      >
        <el-menu-item
          v-if="!item.children"
          :index="item.index"
          :route="item.to"
        >
          <el-icon>
            <svg
              class="icon"
              aria-hidden="true"
            >
              <use :href="item.icon" />
            </svg>
          </el-icon>
          <template #title>
            <span>{{ item.name }}</span>
          </template>
        </el-menu-item>
        <el-sub-menu
          v-else
          :index="item.name"
        >
          <template #title>
            <el-icon>
              <svg
                class="icon"
                aria-hidden="true"
              >
                <use :href="item.icon" />
              </svg>
            </el-icon>
            <span>{{ item.name }}</span>
          </template>
          <el-menu-item
            v-for="childrenItem in item.children"
            :key="childrenItem.name"
            :index="childrenItem.index"
            :route="childrenItem.to"
          >
            <el-icon>
              <svg
                class="icon"
                aria-hidden="true"
              >
                <use :href="childrenItem.icon" />
              </svg>
            </el-icon>
            <span>{{ childrenItem.name }}</span>
          </el-menu-item>
        </el-sub-menu>
      </template>
    </el-menu>
    <div
      class="collapseBtn"
      @click="handleCollapse"
    >
      <Expand
        v-if="isCollapse"
        style="width: 1.2em; height: 1.2em;"
      />
      <Fold
        v-else
        style="width: 1.2em; height: 1.2em;"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue'
import { RouteLocationNamedRaw, useRoute } from 'vue-router'
const route = useRoute()
// 菜单列表
const menuList = [
  {
    icon: '#icon-hetongduanguanli',
    name: 'demo',
    index: 'demo',
    to: { name: 'demo' }
  },
  {
    icon: '#icon-hetongduanguanli',
    name: 'demoList',
    index: 'demoList',
    children: [
      {
        icon: '#icon-dictionaries',
        name: 'threeJS',
        index: 'threeJS',
        to: { name: 'threeJS' }
      },
      {
        icon: '#icon-dictionaries',
        name: 'svg',
        index: 'svg',
        to: { name: 'svg' }
      },
      {
        icon: '#icon-dictionaries',
        name: 'echarts',
        index: 'echarts',
        to: { name: 'echarts' }
      },
      {
        icon: '#icon-dictionaries',
        name: 'canvasDemo',
        index: 'canvasDemo',
        to: { name: 'canvasDemo' }
      }
    ]
  },
  {
    icon: '#icon-hetongduanguanli',
    name: '虚拟化表格',
    index: 'virtualizedTable',
    to: { name: 'virtualizedTable' }
  }
]

// 默认激活的页面
const defaultActive = computed(() => {
  const name = route.name as string
  if (name){
    return name
  } else {
    return 'demo'
  }
})

const isCollapse = ref(false)
const handleCollapse = () => {
  isCollapse.value = !isCollapse.value
}

</script>

<style lang="scss" scoped>
.menu-contain{
  position: relative;
  height: 100%;
  width: 200px;
  .el-menu{
    height: 100%;
    .el-menu-vertical-demo:not(.el-menu--collapse) {
      width: 200px;
    }
  }
  .collapseBtn{
    width: 100%;
    height: 30px;
    position: absolute;
    bottom: 0;
    border-right:1px solid #dcdfe6;
    border-top:1px solid #dcdfe6;
    display: flex;
    justify-content: space-around;
    align-items: center;
    cursor: pointer;
  }
  &.menu-collapse{
    width: auto;
  }
}
</style>
