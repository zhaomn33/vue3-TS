<template>
  <div class="person-dialog-box">
    <el-button @click="handleClick">点击选择人员弹框</el-button>
    <PersonChangeDialog
      v-model="visibleValue"
      :cur-data="currentData"
      :type="currentType"
    />
  </div>
</template>

<script lang="ts">
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
import PersonChangeDialog from './PersonChangeDialog.vue'

const { proxy } = getCurrentInstance() as any
const visibleValue = ref(true)
const currentData = ref({})
const currentType = ref('')

const handleClick = () => {
  visibleValue.value = true
}

</script>

<style scoped lang="scss">
.person-dialog-box{
  padding: 24px;
}
</style>
