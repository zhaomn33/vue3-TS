<template>
  <el-dialog
    v-model="visible"
    :title="title"
    :show-close="showClose"
    :width="dialogWidth"
    :class="getDialogClassName"
    top="30vh"
    v-bind="getOriginAttrs()"
    @closed="handleRealClosed"
  >
    <template #header>
      <IconFont
        v-if="headerIcon"
        :icon="headerIcon"
        class="modal-header__icon"
        :class="{ 'waring-icon': headerIconWarn }"
      />
      <span class="modal-header__title">{{ title }}</span>
    </template>
    <div
      v-loading="fullLoading"
      class="modal-container__body"
    >
      <div
        class="modal-box__inner"
        :style="{
          maxHeight: `${
            isNumberical(maxHeight) ? maxHeight + 'px' : maxHeight
          }`,
          height: `${isNumberical(height) ? height + 'px' : height}`,
        }"
      >
        <div
          v-if="renderHTML"
          class="modal-container__html"
          v-html="renderHTML"
        >
        </div>
        <div
          ref="refComponent"
          class="dialog-describe-text"
        >
          确定要删除{{ componantData }}的相关数据吗？
          <!-- <span class="important-content-text"></span> -->
        </div>
      </div>
      <div
        class="modal-container__footer"
      >
        <el-button
          plain
          @click="handleCancel()"
        >
          取消
        </el-button>
        <el-button
          :type="deleteType ? 'danger' : 'primary'"
          @click="handleConfirm()"
        >
          {{ confirmText || '确定' }}
        </el-button>
      </div>
    </div>
  </el-dialog>
</template>

<script lang="ts">
import { isNumberical } from '@/utils/type'
import {
  defineComponent,
  getCurrentInstance,
  ref,
  computed,
  reactive
} from 'vue'

export default defineComponent({
  name: 'DeleteDialog',
  inheritAttrs: false,
  props: {
    title: {
      type: String,
      default: '删除确认'
    },
    headerIcon: {
      type: String,
      default: 'icon-warning'
    },
    confirmText: {
      type: String,
      default: '删除'
    },
    height: {
      type: [Number, String],
      default: 'auto'
    },
    maxHeight: {
      type: [Number, String],
      default: 'auto'
    },
    dialogWidth: {
      type: String,
      default: '500px'
    },
    renderHTML: {
      type: String,
      default: ''
    },
    componantData: {
      type: String,
      default: ''
    },
    headerIconWarn: {
      type: Boolean,
      default: true
    },
    deleteType: {
      type: Boolean,
      default: true
    },
    showClose: {
      type: Boolean,
      default: true
    }
  },
  setup(props, { attrs }: { attrs: any; }) {
    const { proxy } = getCurrentInstance() as any
    const visible = ref(false)

    const getDialogClassName = computed(() => {
      const classNames = 'modal-wrapper-containers-dialog'
      return classNames
    })

    const getComponent = computed(() => {
      const keys = Object.keys(attrs.components)
      const name = keys[0]
      return name
    })

    const refComponent = ref(null)
    const handleCancel = () => {
      visible.value = false
    }
    const handleConfirm = async() => {
      const instance = refComponent.value
      try {
        await attrs.onConfirm(instance, proxy)
        visible.value = false
      } catch (error) {
        if (process.env.NODE_ENV === 'development') {
          console.dir(error)
        }
      }
    }

    const handleRealClosed = () => {
      proxy.$.vnode.destroy()
    }

    const fullLoading = ref(false)

    const getOriginAttrs = () => {
      const filterList = [
        'onConfirm',
        'onCancel',
        'renderComponent',
        'renderHTML',
        'components'
      ]
      const resultAttrs = reactive({} as any)
      Object.keys(attrs)
        .filter((attrKey) => !filterList.includes(attrKey))
        .forEach((attrKey) => {
          resultAttrs[attrKey] = attrs[attrKey]
        })
      return resultAttrs
    }

    return {
      visible,
      getDialogClassName,
      getComponent,
      fullLoading,
      refComponent,

      isNumberical,
      handleCancel,
      handleConfirm,
      getOriginAttrs,

      handleRealClosed
    }
  }
})
</script>

<style lang="scss" scoped>
:deep() {

  .modal-container__html {
    padding: 24px;
  }

  .dialog-describe-text {
    padding: 24px;

    .important-content-text {
      // color: #fa5555;
    }
  }

  .modal-container__footer {
    height: 54px;
    line-height: 54px;
    text-align: right;
    padding-right: 24px;
  }

  .modal-box__inner {
    overflow-y: auto;

    &.show-border-radius {
      border-radius: 8px;
    }
  }
}
</style>
<style lang="scss">
.modal-wrapper-containers-dialog {
  border-radius: 8px;

  .el-dialog__header {
    width: 100%;
    display: flex;
    align-items: center;
    height: 54px;
    border-bottom: 1px solid #dcdfe6ff;

    .modal-header__icon {
      width: 20px;
      height: 20px;
    }

    .waring-icon {
      color: #fa5555;
    }

    .modal-header__title {
      margin-left: 8px;
      font-size: 18px;
      font-weight: 500;
      color: #303133;
    }

    .header-desc {
      display: flex;
      align-items: center;

      svg {
        height: 17px;
      }
    }
  }

  .el-dialog__body {
    padding: 0;
  }
}
</style>
