<template>
  <div class="person-flow-dialog-box">
    <el-dialog
      :model-value="modelValue"
      :before-close="handleBeforeClose"
      :show-close="false"
      destroy-on-close
      width="800"
    >
      <template #header="{ close }">
        <div class="header-title">
          <h3 class="current-title-box">选择{{ type==='member'?'项目组成员':'负责人' }}</h3>
          <span
            class="title-close-icon"
            @click="close"
          >
            <el-icon><CloseBold /></el-icon>
          </span>
        </div>
      </template>
      <div class="person-dialog-body">
        <div class="person-dialog-left">
          <el-input
            v-model="inputSearchValue"
            class="left-top-input"
            placeholder="请输入用户名或员工代码搜索"
            style="width: 100%;"
            :prefix-icon="Search"
            @input="handleInput"
          />
          <el-table
            ref="selectionTableRef"
            v-loading="tableLoading"
            :data="tableData"
            @select="handleSelectionChange"
            @select-all="handleSelectAll"
          >
            <el-table-column
              type="selection"
              width="30"
            />
            <el-table-column
              prop="name"
              label="姓名"
              width="60"
            />
            <el-table-column
              prop="code"
              label="员工代码"
              width="80"
            />
            <el-table-column
              prop="job"
              label="职级"
              width="80"
            />
            <el-table-column
              prop="org"
              label="部门"
              show-overflow-tooltip
              width="140"
            />
          </el-table>
          <el-pagination
            v-model:current-page="currentPage"
            v-model:page-size="pageSize"
            layout="prev, pager, next, jumper"
            :total="total"
            @current-change="handleCurrentChange"
          />
        </div>
        <div class="person-dialog-right">
          <div class="dialog-right-title">
            <span class="dialog-right-title-text">已选：</span>
            <span
              class="dialog-right-title-btn"
              @click="handleClear"
            >清空</span>
          </div>
          <div class="dialog-right-clear">
            <div
              v-for="(item, index) in checkedList"
              :key="item.code"
              class="dialog-right-clear-list"
            >
              <span class="all-list-text">
                <IconFont
                  class="show-user-role-icon"
                  icon="icon-user"
                />
                <div class="list-item-span">
                  <span>{{ item.name }}</span>
                  <span>{{ ` [ ${item.code} ] ` }}</span>
                </div>
              </span>
              <el-icon
                class="show-close-icon"
                icon="icon-close"
                @click="handleDeleteItem(index,item.code)"
              >
                <CloseBold />
              </el-icon>
            </div>
          </div>
        </div>
      </div>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="cancelEvent">取消</el-button>
          <el-button
            type="primary"
            @click="saveEvent"
          >
            保存
          </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { ElMessage } from 'element-plus'
import { Search } from '@element-plus/icons-vue'
import { defineComponent, ref, getCurrentInstance, nextTick, onMounted } from 'vue'
// import { useHomeFrontStore } from '@/modules/HomeFront/store/index'
import personData from '../data/index'

export interface Data {
  name: string
  code: string
}

export default defineComponent({
  name: 'PersonChangeDialog',
  components: {},
  props: {
    modelValue: {
      type: Boolean,
      default: false
    },
    curData: {
      type: Array<Data>,
      default: () => {
        return [{}]
      }
    },
    type: {
      type: String,
      default: 'response'
    },
    curIndex: {
      type: Number,
      default: 0
    }
  },
  emits: ['update:modelValue', 'getDialogTableData'],
  setup(props, { emit }) {
    // const storeHomeFront = useHomeFrontStore()

    const { proxy } = getCurrentInstance() as any
    const total = ref(50)
    const currentPage = ref(1)
    const pageSize = ref(20)
    // 已选中list
    const checkedList = ref<Array<Data>>([])
    const inputSearchValue = ref('')
    const tableLoading = ref(false)

    const tableData = ref([])
    const getTableList = async() => {
      tableLoading.value = true
      // const { error, data } = await storeHomeFront.getCompanyPersonInfo({
      //   emp_info: inputSearchValue.value,
      //   page: currentPage.value,
      //   limit: pageSize.value
      // })

      const { error, data } = personData.testPersonData

      if (!error) {
        tableData.value = data.results as any
        total.value = data.total
        currentPage.value = data.page
        pageSize.value = data.limit
      }
      tableLoading.value = false
    }
    // 获取默认表格数据
    const getDefaultTable = () => {
      console.log(props.curData, 'props.curData')
      Object.keys(props.curData).length && props.curData?.forEach((item) => {
        checkedList.value.push({
          name: item.name,
          code: item.code
        })
        console.log(item, 'item')
        tableData.value?.forEach((tableItem:any) => {
          if (tableItem.code == item.code) {
            proxy.$refs.selectionTableRef?.toggleRowSelection(tableItem, true)
          }
        })
      })
    }

    // 搜索获取接口数据
    const handleSearch = async(value = '') => {
      tableLoading.value = true
      if (value !== '') inputSearchValue.value = value
      await getTableList()

      tableLoading.value = false
      nextTick(
        () => {
          if (checkedList.value?.length && tableData.value?.length) {
            checkedList.value.forEach((checkItem: any) => {
              tableData.value.forEach((item: any) => {
                if (checkItem.code == item.code) {
                  proxy.$refs.selectionTableRef?.toggleRowSelection(item, true)
                }
              })
            })
          } else {
            proxy.$refs.selectionTableRef?.clearSelection()
          }
        }
      )
    }
    // input防抖
    const handleInput = _.debounce(() => {
      console.log('input')
      // 输入间隙超过规定时间才搜索
      handleSearch(inputSearchValue.value)
    }, 500)

    // 表格选中-设置右侧列表
    const handleSelectionChange = (selection:any, row:any) => {
      // console.log('handleSelectionChange', selection, row, '🍎', selection.indexOf(row))
      if (selection.indexOf(row) === -1) {
        // 从表格删除
        checkedList.value.forEach((item, index) => {
          if (item.code == row.code) {
            checkedList.value.splice(index, 1)
            proxy.$refs.selectionTableRef?.toggleRowSelection(row, false)
          }
        })
      } else {
        // 从表格添加
        checkedList.value.push({
          name: row.name,
          code: row.code
        })
        proxy.$refs.selectionTableRef?.toggleRowSelection(row, true)
      }
    }
    // 全选/全不选
    const handleSelectAll = (selection:any) => {
      // console.log('handleSelecAll', selection, checkedList.value)
      // 右侧列表已经选择的数据
      let selectedMarkList = checkedList.value.map((item: any) => item.code)
      // 当前页选中行的标记列表
      let pageSelectedMarkList = Array.isArray(selection) ? selection.map((item) => item?.code) : []
      tableData.value.forEach((row: any) => {
        // 当前页的数据
        if (pageSelectedMarkList.includes(row?.code)) {
          // 如果当前页的数据不在已选中的列表内，全选时push进右侧列表-左侧未选，右侧push
          if (!selectedMarkList.includes(row?.code)) {
            checkedList.value.push({
              name: row.name,
              code: row.code
            })
          }
        } else if (selectedMarkList.includes(row?.code)) {
          // 选中列表内有当前数据
          if (row?.code) {
            // 从右侧列表内删除-左侧已选，右侧删除
            checkedList.value.filter((item: any, index: number) => {
              if (item.code === row?.code) {
                checkedList.value.splice(index, 1)
              }
            })
          }
        }
      })
    }

    const handleBeforeClose = () => {
      emit('update:modelValue', false)
    }

    // 清空
    const handleClear = () => {
      // 右侧列表，已选都清空
      checkedList.value = []
      // 表格清空
      proxy.$refs.selectionTableRef?.clearSelection()
    }

    // 删除某个角色/人员
    const handleDeleteItem = (index: any, code: any) => {
      // 左侧列表删除
      checkedList.value.splice(index, 1)
      tableData.value.forEach((tableItem:any) => {
        if (tableItem.code === code) {
          // 左侧树删除
          proxy.$refs.selectionTableRef?.toggleRowSelection(tableItem, false)
        }
      })
    }

    // 取消
    const cancelEvent = () => {
      emit('update:modelValue', false)
    }

    // 保存
    const saveEvent = () => {
      // console.log('保存前的校验****', checkedList.value, props.type)
      if (!checkedList.value.length && props.type === 'response') {
        ElMessage.error('请选择负责人')
        return
      }
      emit('getDialogTableData', checkedList.value, props.type, props.curIndex)
      emit('update:modelValue', false)
      ElMessage.success('保存成功')
    }

    // 页数改变
    const handleCurrentChange = async(val: number) => {
      currentPage.value = val
      await handleSearch()
    }

    onMounted(async() => {
      await handleSearch()
      getDefaultTable()
    })

    return {
      tableLoading,
      inputSearchValue,
      Search,
      tableData,
      checkedList,
      currentPage,
      pageSize,
      total,
      handleCurrentChange,
      handleBeforeClose,
      handleClear,
      handleDeleteItem,
      cancelEvent,
      saveEvent,
      handleSelectionChange,
      handleSearch,
      handleSelectAll,
      handleInput
    }
  }
})
</script>

<style scoped lang="scss">
.person-flow-dialog-box {

  :deep() {

    .el-dialog {
      border-radius: 4px;

      .el-dialog__header {
        width: 100%;
        height: 54px;
        display: flex;
        align-items: center;
        padding: 16px;
        border-bottom: 1px solid #dcdee0;
      }

      .el-dialog__body {
        padding: 16px 24px;
      }

      .el-dialog__footer {
        border-top: 1px solid #dcdee0;
        padding: 12px 24px;

        .el-button {
          border-radius: 2px;
        }
      }
    }
  }

  .header-title {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .title-close-icon {

      .el-icon{
        width: 1.2em;
        height: 1.2em;
      }

      &:hover {
        cursor: pointer;
      }
    }
  }

  .person-dialog-body {
    width: 100%;
    display: flex;
    height: 400px;
    overflow: hidden;

    .person-dialog-left {
      display: inline-block;
      width: 60%;
      height: 400px;

      .left-top-input{
        margin-bottom: 16px;
      }

      :deep(.public-table-wrapper){
        height: calc(100% - 48px);
      }

      :deep(){

        .el-table--fit{
          height: calc(100% - 77px);

          .el-tooltip{
            margin: 0 !important;
          }
        }

        .el-pagination{
          float: right;

          .el-pagination__jump{
            margin-left: 0;

            .el-pagination__editor{
              width: 42px;
              height: 26px;
            }
          }
        }
      }
    }

    .person-dialog-right {
      display: inline-block;
      width: 40%;
      height: 400px;
      border: 1px solid #dcdee0;
      border-radius: 4px;
      margin-left: 24px;

      .dialog-right-title {
        width: 100%;
        height: 46px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 16px;
        border-bottom: 1px solid #dcdee0;

        .dialog-right-title-btn {
          color: #155bd4;

          &:hover {
            cursor: pointer;
          }
        }

        .dialog-right-title-text {
          font-weight: 500;
          color: #323233;
        }
      }

      .dialog-right-clear{
        padding: 12px;
        height: calc(100% - 46px);
        overflow: auto;
      }

      .dialog-right-clear-list {
        height: 42px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 12px;

        &:hover{
          background-color: #EFF1F4;
          border-radius: 4px;
        }

        .all-list-text {
          display: flex;
          align-items: center;

          .list-item-span{
            display: flex;
            align-items: center;

            span{
              line-height: 20px;

              &:first-of-type{
                margin-right: 16px;
              }
            }
          }

          .show-user-role-icon {
            cursor: pointer;
            margin-right: 8px;
          }
        }

        .show-close-icon {
          font-size: 14px;

          &:hover {
            cursor: pointer;
          }
        }
      }
    }
  }
}
</style>
