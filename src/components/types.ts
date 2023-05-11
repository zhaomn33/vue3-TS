/* eslint-disable no-unused-vars */
import { PropType } from 'vue'

export interface IBreadCrumbItem {
  name?: string
  path?: string | boolean
}

interface HeaderRender {
  /**
   * 渲染组件
   * @example component: 'link'
   */
  component: string
  /**
   * 渲染组件需要绑定的 props 数据
   */
  attrs?: any
}

export interface ITableHeader {
  name: string
  prop?: string
  child?: Array<ITableHeader>
  attrs?: {
    [key: string]: any
    render?: HeaderRender
  }
}

export interface RenderList {
  el: string
  styles?: (...args: any) => any
  render?: (...args: any) => any
  onEvent?: () => any
}

/**
 * 表格单元格组件 Props
 */
type PublicTableElementOnEvent = (value?: string | number, column?: string, row?: any) => any
export interface PublicTableElementProps {
  row: any
  prop: string
  modelValue: string | number
  render: () => any
  onEvent: PublicTableElementOnEvent
}

export const PublicTableElementComponentProps = {
  row: {
    type: Object as PropType<any>,
    default() {
      return {}
    }
  },
  modelValue: {
    type: [String, Number] as PropType<string | number>,
    default() {
      return ''
    }
  },
  prop: {
    type: String as PropType<string>,
    default: ''
  },
  render: {
    type: Function as PropType<() => any>,
    default: null
  },
  onEvent: {
    type: Function as PropType<PublicTableElementOnEvent>,
    default() {
      return () => {}
    }
  }
}

export interface HeaderTabDatas {
  name: string
  path: string
}
