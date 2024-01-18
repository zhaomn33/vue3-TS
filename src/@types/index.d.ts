/* global
  IRequestData
 */
import { filterResponseTypes } from '@/store/utils/mixin'
import { WidgetsPlugins } from '@/widgets/types'
import { ComponentPublicInstance } from 'vue'

declare module 'vue' {
  export type ComponentPublicInstanceCostom = ComponentPublicInstance<WidgetsPlugins>

  export interface VNode {
    destroy?: any
  }
}

declare module 'axios' {
  export interface AxiosRequestConfig {
    redirect?: string
  }

  export interface AxiosResponse<T extends IRequestData> {
    data: T
    error: number
  }

}

declare module 'pinia' {
  export interface PiniaCustomProperties {
    filterResponse: filterResponseTypes
  }
}

declare global {
  /**
   * Costom Axios Function Types.
   */
  interface IRequestSuite {
    get(uri: string, params?: ObjectValueSuite, config?: AxiosRequestConfig): Promise<IRequestData>
    post(uri: string, data?: any, config?: AxiosRequestConfig): Promise<IRequestData>
    put(uri: string, data?: any, config?: AxiosRequestConfig): Promise<IRequestData>
    patch(uri: string, data?: any, config?: AxiosRequestConfig): Promise<IRequestData>
    delete(uri: string, config?: AxiosRequestConfig): Promise<IRequestData>
  }

  type IModulesApiSuite = ObjectValueSuite<(...args: any) => Promise<IRequestData>>

  /**
   * `error`: Response Status Code.
   *
   * `data`: Response Body.
   *
   * `msg`: Response Message.
   */
  interface IRequestData {
    error: number
    data: any
    msg: string
  }

  /**
   * General Object Types.
   */
  type ObjectValueSuite<T = any> = { [key in any]: T }

  /**
   * Store FilterResponse Callback Type.
   */
  type IStoreFilterCallBack = (res: IRequestData) => Promise<IRequestData>

}

// declare global {
//     type CustomizeRouter = {
//       icon?: string
//       title?: string
//     }

//     interface IRequestData {
//       error?: number
//       data: any
//       msg?: string
//     }

//     type ICallBack = (res: IRequestData) => void
// }
