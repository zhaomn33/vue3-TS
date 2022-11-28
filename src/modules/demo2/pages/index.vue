<template>
  <div>
    demo2
  </div>
</template>

<script lang="ts">
import { ElMessage } from 'element-plus'
import {
  defineComponent,
  ref
} from 'vue'

export default defineComponent({
  name: 'demo2',
  components: {},
  props: {},
  setup() {
    // 验证规则
    const validationRules = async() => {
      return new Promise((resolve) => {
        console.log('resolve',resolve)
        resolve(true)
        ElMessage.success('验证成功')
      })
    }

    return {
      validationRules
    }
  }

})
</script>