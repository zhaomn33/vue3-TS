<template>
  <div class="demo-table-contain">
    <PublicTable
      :table-data="tableData"
      :table-header-data="tableHeaderData"
      :table-header-width="tableHeaderWidth"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive } from 'vue'
import { ElMessage } from 'element-plus'

export default defineComponent({
  name: 'Demo3'
})
</script>

<script lang="ts" setup>
const DEFAULT_PAGINATION_PARAMS = {
  total: 50,
  page: 1,
  limit: 20
}
const paginationAttrs = reactive(
  Object.assign({}, DEFAULT_PAGINATION_PARAMS)
)
const tableData = ref<Array<any>>([])
const handleSearchTableData = async(params = {}) => {
  const requestPaginationParams = Object.assign(
    {},
    DEFAULT_PAGINATION_PARAMS,
    params
  )

  const mockResponse = {
    error: 0,
    msg: 'ok',
    data: {
      total: 50, // 总数据条目数 total | count
      page: 1, // 当前页码
      limit: 20, // 每页多少条目
      results: new Array(50).fill('').map((item, index) => {
        return {
          index: index + 1 + '',
          id: 'xxxxx',
          paramsTableName: '这是参数表名称',
          partType: '这是构件类型',
          createdBy: '张三',
          showDelete: Math.random() > 0.5 ? 1 : 0
        }
      })
    }
  }

  const { data, error } = mockResponse

  if (error) return

  tableData.value = data.results
  paginationAttrs.limit = data.limit
  paginationAttrs.page = data.page
  paginationAttrs.total = data.total
}
handleSearchTableData()

const tableHeaderData = ref([
  {
    name: '序号',
    prop: 'index',
    attrs: {
      minWidth: 50,
      align: 'center'
    }
  },
  {
    name: '参数表名称',
    prop: 'paramsTableName'
  },
  {
    name: '是否可删除',
    prop: 'showDelete'
  },
  {
    name: '构件类型',
    prop: 'partType'
  },
  {
    name: '创建人',
    prop: 'createdBy'
  }
])
const tableHeaderWidth = ref([])

</script>

<style lang="scss" scoped>
.demo-table-contain{
  padding: 24px;
  height: 1200px;
}
</style>
