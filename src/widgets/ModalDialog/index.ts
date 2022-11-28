import { App, createVNode, render, nextTick, AppContext, RendererElement, RendererNode, VNode, ComponentPublicInstanceCostom, VNodeProps, ComponentPublicInstance } from 'vue'
import Modal from '@/widgets/ModalDialog/modal.vue'
import DeleteDialogVue from '@/widgets/ModalDialog/DeleteDialog.vue'
import { ModalDialogOptions, renderComponent, DeleteDialogOptions } from '../types'

const extractData = (options: { renderComponent: renderComponent; }) => {
  const extractSlotComponents = (renderComponent: renderComponent) => {
    const component: any = {}
    let componantData = {}

    if (renderComponent) {
      const { data } = renderComponent
      componantData = data
      // 删除弹框不需要再引入组件
      if (renderComponent.component?.name) {
        component[renderComponent.component.name as string] = renderComponent.component
      }
    }

    return {
      component,
      componantData
    }
  }

  const { component, componantData } = extractSlotComponents(options.renderComponent)
  return {
    component,
    componantData
  }
}

export default {
  install(app: App<any>) {
    app.config.globalProperties.$ModalDialog = function(options: ModalDialogOptions) {
      const {
        component,
        componantData
      } = extractData(options)

      let vm: VNode | null = createVNode(
        Modal,
        {
          ...options,
          componantData,
          components: component
        }
      )
      for (const name in component) {
        app.component(name, component[name])
      }

      let container: HTMLDivElement | null = document.createElement('div')

      // https://stackoverflow.com/questions/65163775/how-to-destroy-unmount-vue-js-3-components
      vm.destroy = () => {
        if (container) render(null, container)
        container = null
        vm = null
        for (const name in component) {
          delete app._context.components[name]
        }
      }

      vm.appContext = app._context

      render(vm, container)
      if (container.firstElementChild) {
        document.body.appendChild(container.firstElementChild)
      }

      nextTick(() => {
        if (!vm) return

        if (vm.component && vm.component.proxy) {
          (
            vm.component.proxy as ComponentPublicInstance<{
              visible: boolean
            }>
          ).visible = true
        }
      })

      return vm
    }
  }
}

export const DeleteDialog = {
  install(app: App<any>) {
    // FIXME 这里的小部件可以再多套一层 这样类型好定义
    app.config.globalProperties.$DeleteDialog = function(options: DeleteDialogOptions) {
      const {
        component,
        componantData
      } = extractData(options)

      const vm: VNode = createVNode(
        DeleteDialogVue,
        {
          ...options,
          componantData,
          components: component
        }
      )
      for (const name in component) {
        app.component(name, component[name])
      }

      let container: any = document.createElement('div')
      // FIXME 组件销毁 有问题
      vm.destroy = () => {
        if (container) render(null, container)
        container = null
        // vm = null
        for (const name in component) {
          delete app._context.components[name]
        }
      }

      vm.appContext = app._context
      render(vm, container)
      document.body.appendChild(container.firstElementChild)

      nextTick(() => {
        const proxy = vm.component?.proxy as ComponentPublicInstanceCostom
        proxy.visible = true
      })

      return vm
    }
  }
}
