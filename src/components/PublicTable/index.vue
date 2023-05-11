<template>
  <div class="public-table-wrapper">
    <el-table
      ref="refTable"
      class="public-table"
      :data="tableData"
      height="100%"
      style="width: 100%;"
    >
      <el-table-column
        v-if="isMultiple"
        align="center"
        type="selection"
        width="55"
      />
      <TableHeader
        v-for="(tableHeaderItem, tableHeaderIndex) in tableHeaderData"
        :key="tableHeaderIndex"
        :index="tableHeaderIndex"
        :table-header-item="tableHeaderItem"
        :table-header-width="tableHeaderWidth"
      />
      <FixedColumnRender
        :target="fixedColumnSlot"
      />
    </el-table>
  </div>
</template>

<script lang="ts">
import { defineComponent, getCurrentInstance, onMounted, PropType, ref, shallowRef, useSlots, watchEffect } from 'vue'
import { ElTable } from 'element-plus'
import { ITableHeader, RenderList } from '@/components/types'
import FixedColumnRender from './fixed-column/Render.vue'

export default defineComponent({
  name: 'PublicTable'
})
</script>

<script lang="ts" setup>
const props = defineProps({
  isMultiple: {
    type: Boolean,
    default: false
  },
  tableData: {
    type: Array as PropType<Array<any>>,
    default: () => []
  },
  tableHeaderData: {
    type: Array as PropType<Array<ITableHeader>>,
    default: () => []
  },
  tableHeaderWidth: {
    type: Array as PropType<Array<number>>,
    default: () => []
  }
})

const slots = useSlots()

/**
 * 仅仅渲染插槽中的 PublicTableFixedColumn 的组件，所以这将过滤掉其他组件;
 * 并且当 PublicTableFixedColumn 发生改变时，插槽内容需要重新修正
 */
const fixedColumnSlot = shallowRef()
watchEffect(
  () => {
    if (slots.default) {
      const fixedColumn = slots.default().filter((slotItem: any) => {
        return slotItem.type.name === 'PublicTableFixedColumn'
      })
      fixedColumnSlot.value = fixedColumn
    }
  }
)

watchEffect(
  () => {
    console.log('-22--slots', slots.default)
    if (slots.default) {
      console.log('-11--slots', slots.default)
      // const fixedColumn = slots.default().filter((slotItem: any) => {
      //   return slotItem.type.name === 'PublicTableFixedColumn'
      // })
    }
  }
)

onMounted(() => {
  if (slots.default) {
    console.log('---slots', slots.default)
  } else {
    console.log('nothing')
  }
})
</script>

<style lang="scss" scoped>
.public-table-wrapper{
  height: 100%;
}
</style>
