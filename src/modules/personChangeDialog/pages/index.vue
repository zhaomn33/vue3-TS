<template>
  <div class="h-full w-full">
    <el-button @click="handleClick">点击选择人员弹框</el-button>
    <PersonChangeDialog
      v-model="visibleValue"
      :cur-data="currentData"
      :type="currentType"
    />
  </div>
</template>

<script lang="ts">
// 选择人员弹框
import { ElMessage } from 'element-plus'
import {
  ref,
  defineComponent,
  getCurrentInstance
} from 'vue'
export default defineComponent({
  name: 'PersonChangeDemo'
})
</script>

<script lang="ts" setup>
import PersonChangeDialog, { Data } from './PersonChangeDialog.vue'

const { proxy } = getCurrentInstance() as any
const visibleValue = ref(false)
const currentData = ref<Array<Data>>([])
const currentType = ref('')

const handleClick = () => {
  currentData.value = [
    {
      name: '111',
      code: 'BJ0001'
    }
  ]
  visibleValue.value = true
}

</script>

<style scoped lang="scss">
</style>
