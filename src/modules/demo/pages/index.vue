<template>
  <div class="demo-containter">
    <el-button
      type="primary"
      @click="handleDialog"
    >
      测试弹框
    </el-button>
    <el-button
      type="primary"
      @click="handleDelete({ name: '《名称》' })"
    >
      测试删除弹框
    </el-button>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  getCurrentInstance,
  ComponentPublicInstanceCostom,
  ref,
  reactive
} from 'vue'
import demo2 from '@/modules/demo2/pages/index.vue'

export default defineComponent({
  name: 'Demo',
  components: {},
  props: {},
  setup() {
    const proxy = getCurrentInstance()?.proxy as ComponentPublicInstanceCostom

    const handleDialog = () => {
      console.log('测试弹框成功')
      const data = reactive({
        data: []
      })
      proxy.$ModalDialog({
        title: '弹框',
        dialogWidth: '500px',
        confirmText: '提交',
        showLeftFooter: false,
        renderComponent: {
          data,
          component: demo2
        },
        async onConfirm(instance: any) {
          const isValid = await instance.validationRules()
          console.log('isValid', isValid)
          // 如果验证未通过
          if (!isValid) {
            console.log('验证未通过')
            return Promise.reject(new Error('验证未通过'))
          } else {
            console.log('验证通过', data)
          }
        }
      })
    }

    const handleDelete = (row: any) => {
      console.log('测试删除弹框成功')
      // 确认删除弹框
      proxy.$DeleteDialog({
        renderComponent: {
          data: row.name
        },
        async onConfirm() {
          console.log('确认删除')
        }
      })
    }

    return {
      handleDialog,
      handleDelete
    }
  }
})
</script>

<style lang="scss" scoped>
.demo-containter{
  padding: 24px 16px;
}
</style>
