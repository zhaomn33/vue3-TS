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
    <DemoCom
      :btn-text="'点击+1'"
      @click="()=>text1+1"
    />
    <DemoCom
      :btn-text="'点击+2'"
      @click="()=>text2+2"
    />
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
import threeJS from '@/modules/threeJS/pages/index.vue'
import DemoCom from '../components/demoCom.vue'

export default defineComponent({
  name: 'Demo',
  components: { DemoCom },
  props: {},
  setup() {
    const proxy = getCurrentInstance()?.proxy as ComponentPublicInstanceCostom

    const text1 = 0
    const text2 = 0

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
          component: threeJS
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
      text1,
      text2,
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
