<template>
  <div class="virtualized-table-container">
    <el-auto-resizer>
      <template #default="{ height, width }">
        <el-table-v2
          :columns="columns"
          :data="data"
          :width="width"
          :height="height"
          :header-height="40"
          fixed
        />
      </template>
    </el-auto-resizer>
  </div>
</template>

<script lang="tsx">
import {
  defineComponent,
  getCurrentInstance
} from 'vue'
export default defineComponent({
  name: 'VirtualizedTable'
})
</script>

<script setup lang="tsx">
import { computed, ref, FunctionalComponent,resolveComponent,ComponentPublicInstanceCostom,reactive } from 'vue'
import { ElOption, TableV2FixedDir, ElIcon } from 'element-plus'
// import ArrowDown from 'element-plus'
import { Filter, Switch, CircleCloseFilled, ArrowDown } from '@element-plus/icons-vue'
import type { ExpandedRowsChangeHandler, RowExpandHandler, Column, InputInstance, ElInput, ElSelect } from 'element-plus'
import DialogDemo from '../components/dialogDemo.vue'

const proxy = getCurrentInstance()?.proxy as ComponentPublicInstanceCostom

const getheaderClass = (param: {
  columns: Column<any>[]
  headerIndex: number
}) => {
  console.log('headerIndex', param.headerIndex, 'column', param.columns)
  param.columns.forEach((item:any) => {
    if (item?.editable) {
      return 'editable-col🍎'
    }
  })
}

type SelectionCellProps = {
  value: string
  intermediate?: boolean
  options?: Array<any>
  onChange: (value: string) => void
  forwardRef?: (el: InputInstance) => void
}

const InputCell: FunctionalComponent<SelectionCellProps> = ({
  value,
  onChange,
  forwardRef
}) => {
  return (
    <ElInput ref={forwardRef as any} modelValue={value} onInput={onChange} />
  )
}

const selectOptions = ref([
  {
    label: 'Row 1 - Col 1',
    value: 'Row 1 - Col 1'
  },
  {
    label: 'Row 0 - Col 1',
    value: 'Row 0 - Col 1'
  }
])
const SelectCell: FunctionalComponent<SelectionCellProps> = ({
  value,
  onChange,
  forwardRef
}) => {
  return (
    // <ElSelect ref={forwardRef as any} modelValue={value} onChange={onChange} />
    <ElSelect ref={forwardRef as any} modelValue={value} onChange={onChange} >
      {{
        default: () => (
          selectOptions.value.map((item, index) => {
            return (
              <ElOption
                key={index}
                label={item.label}
                value={item.value}
              />
            )
          })
        )
      }}
    </ElSelect>
  )
}

const SelectDialogCell: FunctionalComponent<SelectionCellProps> = ({
  value,
  onChange
}) => {
  return (
    <div class="table-v2-inline-dialog-col">
      <span>{value}</span>
      <ElIcon class="cursor-pointer">
        {{
          default: () => (
            <ArrowDown />
          )
        }}
      </ElIcon>
    </div>
  )
}

const generateColumns = (length = 10, prefix = 'column-', props?: any) => {
  // console.log(props, '❤️')
  let arr = Array.from({ length }).map((_, columnIndex) => ({
    ...props,
    key: `${ prefix }${ columnIndex }`,  // 唯一标识符
    dataKey: `${ prefix }${ columnIndex }`,  // 该列数据的实际值
    title: `Column ${ columnIndex }`,  // 表头名称
    width: 200,
    editable: false,  // 是否可编辑，实际情况下 可根据此变量判断类名
    headerClass: 'header-col-class'  // 列表头类名
  }))
  // console.log('Columns-arr', arr)
  return arr
}

const generateData = (
  columns: ReturnType<typeof generateColumns>,
  length = 200,
  prefix = 'row-'
) => {
  let arr = Array.from({ length }).map((_, rowIndex) => {
    return columns.reduce(
      (rowData, column, columnIndex) => {
        // console.log('🆕', rowData)
        rowData[column.dataKey] = `Row ${ rowIndex } - Col ${ columnIndex }`
        return rowData
      },
      {
        id: `${prefix}${rowIndex}`,
        editing: false,
        parentId: null
      }
    )
  })
  return arr
}

const columns: Column<any>[] = generateColumns(5)

columns[0] = {
  ...columns[0],
  title: 'input Column',
  editable: true,
  headerClass: 'editable-col',
  cellRenderer: ({ rowData, column }) => {
    // rowData.editing = true
    const onChange = (value: string) => {
      console.log('改变数据',value)
      rowData[column.dataKey!] = value
    }
    const onEnterEditMode = () => {
      console.log('点击单元格')
      rowData.editing = true
    }

    const onExitEditMode = () => {
      // console.log('停止编辑')
      rowData.editing = false
    }
    const input = ref()
    const setRef = (el) => {
      input.value = el
      if (el) {
        el.focus?.()
      }
    }
    // console.log('改变第一列',rowData.editing)
    // return rowData.editing ? (
    return (
      <InputCell
        forwardRef={setRef}
        value={rowData[column.dataKey!]}
        onChange={onChange}
        onBlur={onExitEditMode}
        onKeydownEnter={onExitEditMode}
      />
    )
    // ) : (
    //   <div class="table-v2-inline-editing-trigger" onClick={onEnterEditMode}>
    //     {rowData[column.dataKey!]+22}
    //   </div>
    // )
  }
}

columns[2] = {
  ...columns[2],
  title: 'select Column',
  editable: true,
  headerClass: 'editable-col',
  cellRenderer: ({ rowData, column }) => {
    const onChange = (value: string) => {
      console.log('改变数据11',value)
      rowData[column.dataKey!] = value
      rowData.editing = false
    }
    const onEnterEditMode = () => {
      console.log('单元格',rowData[column.dataKey!])
      rowData.editing = true
    }

    const onExitEditMode = () => {
      // console.log('停止编辑11')
      rowData.editing = false
    }
    const select = ref()
    const setRef = (el) => {
      // console.log('el', el)
      select.value = el
      if (el) {
        el.focus?.()
      }
    }
    // rowData.editing ?
    return (
      <SelectCell
        forwardRef={setRef}
        value={rowData[column.dataKey!]}
        onChange={onChange}
        onBlur={onExitEditMode}
        onKeydownEnter={onExitEditMode}
      />
    )
      // : (
      // <div class="table-v2-inline-editing-trigger" onMouseover={onEnterEditMode}>
      //   {1+rowData[column.dataKey!]}
      // </div>
    // )
  }
}

columns[4] = {
  ...columns[4],
  title: 'dialog Column',
  editable: true,
  headerClass: 'editable-col',
  cellRenderer: ({ rowData, column }) => {
    // resolveComponent 接收字符串，解析对应的 element-plus 图标组件
    // const elIcon = resolveComponent('ArrowDown');
    const onChange = (value: string) => {
      console.log('改变数据33',value)
      rowData[column.dataKey!] = value
    }
    const onClick = (key: string) => {
      console.log('点击单元格--',key, rowData[column.dataKey!])
      // rowData[column.dataKey!] = value
      const data = reactive({data:rowData[column.dataKey!]})
      proxy.$ModalDialog({
        title: '弹框',
        dialogWidth: '500px',
        confirmText: '提交',
        showLeftFooter: false,
        renderComponent: {
          data,
          component: DialogDemo
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
    const dialog = ref()
    const setRef = (el) => {
      dialog.value = el
      if (el) {
        el.focus?.()
      }
    }
    return (
      <SelectDialogCell
        forwardRef={setRef} 
        value={rowData[column.dataKey!]}
        onChange={onChange}
        onClick={onClick}
      />
    )
  }
}

// 响应式数据
const data = ref(generateData(columns, 2))

</script>

<style scoped lang="scss">
:deep(){
  // .el-table-v2__row{
  //   &:hover{
  //     background-color: #f5f7fa;
  //     .el-table-v2__row-cell .el-select .el-input__wrapper{
  //       background-color: #f5f7fa;
  //     }
  //   }
  // }
  .el-table-v2__row-cell{
    padding: 0;
    div:first-child{
      height: 100%;
      width: 100%;
      padding: 0 8px;
      border-right-style: solid;
      border-color: #dfe5f3 !important;
      border-width: 1px;
      border-radius: 0;
      display: flex;
      align-items: center;
    }
    .el-input{
      padding: 0 !important;
      border: 0 !important;
      .el-input__wrapper{
        box-shadow: none !important;
      }
    }
  }
  .el-table-v2__header-wrapper{
    .header-col-class{
      background-color: #ebeef5;
    }
    .editable-col{
      background-color: #D7E6FB;
    }
  }
}
.virtualized-table-container{
  padding: 24px;
  height: 100%;
  width: 100%;
  :deep(){
    .el-select {
      height: 100%;
      width: 100%;
      padding: 0 !important;
      border: 0 !important;

      .select-trigger , .el-input{
        height: 100%;
        width: 100%;
        padding: 0;
        border: 0;
        .el-input__wrapper{
          width: 100%;
          height: 100%;
          box-shadow: none;
          // box-shadow: -1px 0 1px -1px #aaa, 1px 0 1px -1px #aaa;
          // border: 0 !important;
          .el-input__inner{
            height: 100%;
            width: 100%;
          }
        }
      }
    }
    .table-v2-inline-dialog-col{
      width: 100%;
      height: 100%;
      // display: flex;
      // align-items: center;
      justify-content: space-between;
      cursor: pointer;
      padding: 8px;
      .el-icon{
        color: #a8abb2;
      }
    }
  }
}
</style>
