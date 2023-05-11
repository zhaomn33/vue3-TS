<template>
  <!-- 操作列，固定，宽度暂时定 130 -->
  <el-table-column
    :label="headerText"
    fixed="right"
    align="center"
    :width="width"
    v-bind="$attrs"
  >
    <template #default="scope">
      {{ scope }}
    </template>
  </el-table-column>
</template>

<script lang="ts">
import {
  defineComponent,
  getCurrentInstance
} from 'vue'

/**
 * fixed-column 操作列基础组件
 */
export default defineComponent({
  name: 'PublicTableFixedColumn'
})
</script>

<script lang="ts" setup>
const proxy = getCurrentInstance()?.proxy

defineProps({
  headerText: {
    type: String,
    default: '操作'
  },
  // 是否隐藏分隔符，默认展示; false 展示，true 隐藏
  hiddenSplit: {
    type: Boolean,
    default: false
  },
  width: {
    type: [Number, String],
    default: 160
  }
})

</script>

<style lang="scss" scoped>

</style>
