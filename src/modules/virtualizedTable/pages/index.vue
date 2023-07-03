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
    <div
      v-if="visibleValue"
    >
      <PersonChangeDialog
        v-model="visibleValue"
        :type="currentType"
        :cur-data="currentData"
        @get-dialog-table-data="getDialogTableData"
      />
    </div>
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
import { ElOption, TableV2FixedDir, ElIcon, Alignment } from 'element-plus'
// import ArrowDown from 'element-plus'
import { Filter, Switch, CircleCloseFilled, ArrowDown } from '@element-plus/icons-vue'
import type { ExpandedRowsChangeHandler, RowExpandHandler, Column, InputInstance, ElInput, ElSelect } from 'element-plus'
import PersonChangeDialog from '@/modules/personChangeDialog/pages/PersonChangeDialog.vue'
import DialogDemo from '../components/dialogDemo.vue'
import virtualizedTableData from '../data/index'

const proxy = getCurrentInstance()?.proxy as ComponentPublicInstanceCostom

const visibleValue = ref(false)
const currentData = ref({})
const currentType = ref('')

const getDialogTableData = () => {
  // visibleValue.value = false
}

// 表头一整行的类名
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
  value: string|Array<any>
  intermediate?: boolean
  options?: Array<any>
  onChange?: (value: string) => void
  forwardRef?: (el: InputInstance) => void
}
// 输入框单元格
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
    label: '合并范围内',
    value: '合并范围内'
  },
  {
    label: '合并范围外',
    value: '合并范围外'
  }
])
// 下拉框单元格
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
// 点击出现弹框单元格
const SelectDialogCell: FunctionalComponent<SelectionCellProps> = ({
  value,
  onChange
}) => {
  return (
    <div class="table-v2-inline-dialog-col">
      {
        Array.isArray(value)
        ? <span v-if={value} class="dialog-cell-span" title={value?.map(item=>item.name).join('、')}>{value?.map(item=>item.name).join('、')}</span> 
        : <span v-else class="dialog-cell-span" title={value}>{value}</span>
      }
      
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

// 渲染下拉框
const SelectCellRenderer = ({ rowData, column }) => {
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
    select.value = el
    if (el) {
      el.focus?.()
    }
  }
  return rowData.editing ? (
    <SelectCell
      forwardRef={setRef}
      value={rowData[column.dataKey!]}
      onChange={onChange}
      onKeydownEnter={onExitEditMode}
      // onMouseout={onExitEditMode}
      // onBlur={onExitEditMode}
    />
  ) : (
    <SelectDialogCell
      forwardRef={setRef} 
      value={rowData[column.dataKey!]}
      onChange={onChange}
      onClick={onEnterEditMode}
      // onMouseover={onEnterEditMode}
    />
  )
}
// 渲染点击弹框
const DialogCellRenderer = ({ rowData, column }) => {
  const onChange = (value: string) => {
    console.log('改变数据33',value)
    rowData[column.dataKey!] = value
  }
  const onClick = (key: string) => {
    console.log('点击单元格--', key, rowData[column.dataKey!])
    currentData.value = rowData[column.dataKey!]
    visibleValue.value = true
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
// 渲染输入框
const InputCellRenderer = ({ rowData, column }) => {
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
// 渲染单行文字溢出框
const EllipsisCellRenderer = ({ rowData, column }) => {
  return (
    <div class="ellipsis-cell">
      <span class="ellipsis-cell-span" title={rowData[column.dataKey!]}>
        {rowData[column.dataKey!]}
      </span>
    </div>
  )
}

const generateColumns = (length = 10, prefix = 'column-', props?: any) => {
  // console.log(props, '❤️')
  // let arr = Array.from({ length }).map((_, columnIndex) => ({
  //   ...props,
  //   key: `${ prefix }${ columnIndex }`,  // 唯一标识符
  //   dataKey: `${ prefix }${ columnIndex }`,  // 该列数据的实际值
  //   title: `Column ${ columnIndex }`,  // 表头名称
  //   width: 200,
  //   editable: false,  // 是否可编辑，实际情况下 可根据此变量判断类名
  //   headerClass: 'header-col-class'  // 列表头类名
  // }))
  // console.log('Columns-arr', arr)

  const headerArr = [
    {
      key: 'index',
      dataKey: 'index',
      title: '序号',
      width: 55,
      align: 'center',
      editable: false,
      headerClass: 'header-col-class index-col',
      cellRenderer: EllipsisCellRenderer
    },
    {
      key: 'name',
      dataKey: 'name',
      title: '组成部分名称',
      width: 500,
      editable: false,
      headerClass: 'header-col-class',
      cellRenderer: EllipsisCellRenderer
    },
    {
      key: 'template_name',
      dataKey: 'template_name',
      title: '当前使用模板',
      width: 300,
      editable: false,
      headerClass: 'header-col-class',
      cellRenderer: EllipsisCellRenderer
    },
    {
      key: 'relation',
      dataKey: 'relation',
      title: '关联方关系',
      width: 200,
      editable: false,
      headerClass: 'header-col-class',
      cellRenderer: EllipsisCellRenderer
    },
    {
      key: 'merge_scope',
      dataKey: 'merge_scope',
      title: '合并范围内/合并范围外',
      width: 200,
      editable: true,
      headerClass: 'header-col-class editable-col',
      cellRenderer: SelectCellRenderer
    },
    {
      key: 'project_name',
      dataKey: 'project_name',
      title: '所属项目名称',
      width: 400,
      editable: false,
      headerClass: 'header-col-class',
      cellRenderer: EllipsisCellRenderer
    },
    {
      key: 'person_in_charge_of_onsite',
      dataKey: 'person_in_charge_of_onsite',
      title: '负责人',
      width: 400,
      editable: true,
      headerClass: 'header-col-class editable-col',
      cellRenderer: DialogCellRenderer
    },
    {
      key: 'members',
      dataKey: 'members',
      title: '项目组成员',
      width: 400,
      editable: true,
      headerClass: 'header-col-class editable-col',
      cellRenderer: DialogCellRenderer
    }
  ]
  return headerArr
}

const generateData = (
  columns: ReturnType<typeof generateColumns>,
  length = 200,
  prefix = 'row-'
) => {
  // let arr = Array.from({ length }).map((_, rowIndex) => {
  //   return columns.reduce(
  //     (rowData, column, columnIndex) => {
  //       // console.log('🆕', rowData)
  //       rowData[column.dataKey] = `Row ${ rowIndex } - Col ${ columnIndex }`
  //       return rowData
  //     },
  //     {
  //       id: `${prefix}${rowIndex}`,
  //       editing: false,
  //       parentId: null
  //     }
  //   )
  // })

  const tableData = virtualizedTableData.testTabledata.data.map((item, index) => {
    return {
      id: item.id,
      index: item.index+1,
      name: item.name,
      template_name: item.template_name,
      relation: item.relation,
      merge_scope: item.merge_scope,
      project_name: item.project_name,
      person_in_charge_of_onsite: item.person_in_charge_of_onsite,
      members: item.members,
      uuid: item.uuid
    }
  })

  return tableData
}

const columns: Column<any>[] = generateColumns()


// columns[0] = {
//   ...columns[0],
//   title: 'input Column',
//   editable: true,
//   headerClass: 'editable-col',
//   cellRenderer: ({ rowData, column }) => {
//     // rowData.editing = true
//     const onChange = (value: string) => {
//       console.log('改变数据',value)
//       rowData[column.dataKey!] = value
//     }
//     const onEnterEditMode = () => {
//       console.log('点击单元格')
//       rowData.editing = true
//     }

//     const onExitEditMode = () => {
//       // console.log('停止编辑')
//       rowData.editing = false
//     }
//     const input = ref()
//     const setRef = (el) => {
//       input.value = el
//       if (el) {
//         el.focus?.()
//       }
//     }
//     // console.log('改变第一列',rowData.editing)
//     // return rowData.editing ? (
//     return (
//       <InputCell
//         forwardRef={setRef}
//         value={rowData[column.dataKey!]}
//         onChange={onChange}
//         onBlur={onExitEditMode}
//         onKeydownEnter={onExitEditMode}
//       />
//     )
//     // ) : (
//     //   <div class="table-v2-inline-editing-trigger" onClick={onEnterEditMode}>
//     //     {rowData[column.dataKey!]+22}
//     //   </div>
//     // )
//   }
// }

// columns[2] = {
//   ...columns[2],
//   title: 'select Column',
//   editable: true,
//   headerClass: 'editable-col',
//   cellRenderer: ({ rowData, column }) => {
//     const onChange = (value: string) => {
//       console.log('改变数据11',value)
//       rowData[column.dataKey!] = value
//       rowData.editing = false
//     }
//     const onEnterEditMode = () => {
//       console.log('单元格',rowData[column.dataKey!])
//       rowData.editing = true
//     }

//     const onExitEditMode = () => {
//       // console.log('停止编辑11')
//       rowData.editing = false
//     }
//     const select = ref()
//     const setRef = (el) => {
//       // console.log('el', el)
//       select.value = el
//       if (el) {
//         el.focus?.()
//       }
//     }
//     // rowData.editing ?
//     return (
//       <SelectCell
//         forwardRef={setRef}
//         value={rowData[column.dataKey!]}
//         onChange={onChange}
//         onBlur={onExitEditMode}
//         onKeydownEnter={onExitEditMode}
//       />
//     )
//       // : (
//       // <div class="table-v2-inline-editing-trigger" onMouseover={onEnterEditMode}>
//       //   {1+rowData[column.dataKey!]}
//       // </div>
//     // )
//   }
// }

// columns[4] = {
//   ...columns[4],
//   title: 'dialog Column',
//   editable: true,
//   headerClass: 'editable-col',
  // cellRenderer: ({ rowData, column }) => {
  //   // resolveComponent 接收字符串，解析对应的 element-plus 图标组件
  //   // const elIcon = resolveComponent('ArrowDown');
  //   // console.log('column.dataKey',column.dataKey)
  //   const onChange = (value: string) => {
  //     console.log('改变数据33',value)
  //     rowData[column.dataKey!] = value
  //   }
  //   const onClick = (key: string) => {
  //     console.log('点击单元格--',key, rowData[column.dataKey!])
  //     // rowData[column.dataKey!] = value
  //     const data = reactive({data:rowData[column.dataKey!]})
  //     proxy.$ModalDialog({
  //       title: '弹框',
  //       dialogWidth: '500px',
  //       confirmText: '提交',
  //       showLeftFooter: false,
  //       renderComponent: {
  //         data,
  //         component: DialogDemo
  //       },
  //       async onConfirm(instance: any) {
  //         const isValid = await instance.validationRules()
  //         console.log('isValid', isValid)
  //         // 如果验证未通过
  //         if (!isValid) {
  //           console.log('验证未通过')
  //           return Promise.reject(new Error('验证未通过'))
  //         } else {
  //           console.log('验证通过', data)
  //         }
  //       }
  //     })
  //   }
  //   const dialog = ref()
  //   const setRef = (el) => {
  //     dialog.value = el
  //     if (el) {
  //       el.focus?.()
  //     }
  //   }
  //   return (
  //     <SelectDialogCell
  //       forwardRef={setRef} 
  //       value={rowData[column.dataKey!]}
  //       onChange={onChange}
  //       onClick={onClick}
  //     />
  //   )
  // }
// }

// 响应式数据
const data = ref(generateData(columns, 2))

</script>

<style scoped lang="scss">
:deep(){
  .el-table-v2__main{
    border-style: solid;
    border-color: #dfe5f3 !important;
    border-width: 1px;
  }
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
    &:last-of-type div{
      border: none;
    }
    &.is-align-center .el-table-v2__cell-text{
      justify-content: space-around;
    }
    .el-input{
      padding: 0 !important;
      border: 0 !important;
      .el-input__wrapper{
        box-shadow: none !important;
      }
    }
    .ellipsis-cell{
      width: 100%;
      .ellipsis-cell-span{
        width: 100%;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
  }
  .el-table-v2__header-wrapper{
    .header-col-class{
      background-color: #ebeef5;
      color: #333;
      display: flex;
      justify-content: space-around;
      border-right-style: solid;
      border-color: #dfe5f3 !important;
      border-width: 1px;
      &:last-of-type{
        border: none;
      }
    }
    .editable-col{
      background-color: #D7E6FB;
      color: #333;
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
      .dialog-cell-span{
        width: calc(100% - 10px);
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
  }
}
</style>
