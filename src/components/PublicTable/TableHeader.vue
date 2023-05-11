<template>
  <el-table-column
    :prop="tableHeaderItem.prop"
    :label="tableHeaderItem.name"
    :width="tableHeaderWidth[index]"
    v-bind="tableHeaderItem.attrs"
  />
</template>

<script lang="ts">
import {
  defineComponent,
  PropType,
  ref
} from 'vue'
import { ITableHeader, RenderList } from '@/components/types'

export default defineComponent({
  name: 'TableHeader',
  components: {
  },
  inheritAttrs: false,
  props: {
    tableHeaderItem: {
      type: Object as PropType<ITableHeader>,
      default: () => ({})
    },
    tableHeaderWidth: {
      type: Array as PropType<Array<number>>,
      default: () => ([])
    },
    index: {
      type: Number as PropType<number>,
      default: () => 0
    }
  },
  setup() {

    return {
    }
  }
})
</script>

<style scoped lang="scss">

</style>
