<template>
  <div
    class="cell-container"
  >
    <div
      v-if="!isSelect||readonly"
      class="is-not-select"
      :class="{'select-empty' : !modelValue}"
      @click="handleClick"
    >
      <span>{{ isSelectValue?isSelectValue:'请选择' }}</span>
      <el-icon><ArrowDown /></el-icon>
    </div>
    <el-select
      v-else
      ref="selectRef"
      :model-value="isSelectValue"
      placeholder="请选择"
      :class="{'select-empty' : !modelValue}"
      @change="handleChange($event)"
      @visible-change="(val)=>{if(!val) isSelect = false}"
    >
      <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      />
    </el-select>
  </div>
</template>

<script lang="ts">
// 点击-下拉框和单元格转变
import { ref, defineComponent, watch, onMounted, nextTick } from 'vue'
export default defineComponent({
  name: 'EditableCell'
})
</script>

<script setup lang="ts">
const prop = defineProps({
  modelValue: {
    type: String || Object,
    default: ''
  },
  options: {
    type: Array<any>,
    default: []
  },
  rowData: {
    type: Object,
    default: () => {}
  },
  readonly: {
    type: Boolean,
    default: false
  }
})
const emit = defineEmits(['update:modelValue', 'dataChange'])

const isSelect = ref(false)
const isSelectValue = ref('')

const selectRef = ref(null)

// 数据改变
const handleChange = (val: any) => {
  isSelect.value = false
  emit('update:modelValue', val)
  emit('dataChange', val, prop.rowData)
  isSelectValue.value = val
}
// 点击单元格
const handleClick = () => {
  if (prop.readonly) return
  isSelect.value = true
  nextTick(() => {
    console.log('selectRef.value', selectRef.value)
    selectRef.value && (selectRef.value.visible = true)
  })
}

onMounted(() => {
  watch(
    () => prop.modelValue,
    () => {
      if (prop.modelValue) {
        isSelectValue.value = prop.modelValue
      }
    },
    {
      immediate: true
    }
  )
})

</script>

<style lang="scss" scoped>
.cell-container {
  height: 100%;
  width: 100%;

  .is-not-select{
    width: 100%;
    height: 100%;
    padding-left: 11px;
    padding-right: 11px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    span{
      width: calc(100% - 10px);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .el-icon{
      color: #c0c4cc;
    }
  }

  .el-select{
    width: 100%;
    height: 100%;

    :deep(){

      .select-trigger{
        height: 100%;

        .el-input{
          height: 100%;

          .el-input__wrapper{
            border-radius: 0;
            box-shadow: none;

            .el-input_inner{
              height: 100%;
            }
          }
        }
      }
    }
  }

  .select-empty{
    box-shadow: 0 0 0 1px #FA5555 inset !important;

    span{
      color: #c0c4cc
    }

    :deep(){

      .select-trigger .el-input__wrapper{
        box-shadow: 0 0 0 1px #FA5555 inset !important;
      }
    }
  }
}
</style>
