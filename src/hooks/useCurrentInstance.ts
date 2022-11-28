import { ComponentPublicInstanceCostom, getCurrentInstance } from 'vue'

export default function useCurrentInstance() {
  const proxy = getCurrentInstance()?.proxy as ComponentPublicInstanceCostom

  return {
    proxy
  }
}
