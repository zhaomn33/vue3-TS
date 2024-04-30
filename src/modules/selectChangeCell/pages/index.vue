<template>
  <div class="select-change-container">
    <el-table
      :data="tableData"
      style="width: 100%"
    >
      <el-table-column
        prop="date"
        label="Date"
        width="180"
      />
      <el-table-column
        prop="name"
        label="Name"
        width="180"
        class-name="editable-select"
      >
        <template #default="{ row }">
          <EditableCell
            v-model="row.name"
            :options="options"
          />
        </template>
      </el-table-column>
      <el-table-column
        prop="address"
        label="Address"
      />
    </el-table>
  </div>
</template>

<script lang="ts">
// 切换下拉框单元格
import {
  defineComponent,
  getCurrentInstance
} from 'vue'
export default defineComponent({
  name: 'SelectChangeCell'
})
</script>

<script setup lang="ts">
import EditableCell from './editableCell.vue'
const proxy = getCurrentInstance()?.proxy
const tableData = [
  {
    date: '2016-05-03',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles'
  },
  {
    date: '2016-05-02',
    name: '张三',
    address: 'No. 189, Grove St, Los Angeles'
  },
  {
    date: '2016-05-04',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles'
  }
]
const options = [
  {
    value: '张三',
    label: '张三'
  },
  {
    value: '李四',
    label: '李四'
  }
]
</script>

<style scoped lang="scss">
.select-change-container{
  height: 100%;
  width: 100%;
  :deep(){
    .editable-select{
      padding: 0;
      .cell{
        padding: 0;
        height: 100%;
        width: 100%;
      }
    }
  }
}
</style>
