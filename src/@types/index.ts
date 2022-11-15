/* global
  IRequestData
 */
  // import { filterResponseTypes } from '@/store/utils/mixin'
  import { ComponentPublicInstance } from 'vue'
  
  // declare module 'vue' {
  //   export type ComponentPublicInstanceCostom = ComponentPublicInstance<WidgetsPlugins>
  
  //   export interface VNode {
  //     destroy?: any
  //   }
  // }
  
  declare module 'axios' {
    export interface AxiosRequestConfig {
      redirect?: string
    }
  
    export interface AxiosResponse<T extends IRequestData> {
      data: T
      error: number
    }
  
  }
  
  // declare module 'pinia' {
  //   export interface PiniaCustomProperties {
  //     filterResponse: filterResponseTypes
  //   }
  // }
  
  declare global {
    type CustomizeRouter = {
      icon?: string
      title?: string
    }
  
    interface IRequestData {
      error?: number
      data: any
      msg?: string
    }
  
    type ICallBack = (res: IRequestData) => void
  }
