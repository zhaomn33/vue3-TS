<script lang="ts">
import {
  defineComponent,
  h,
  VNode
} from 'vue'

/**
 * 获取插槽中的 PublicTableFixedColumn(s)组件 list，并依次渲染
 */
export default defineComponent({
  name: 'FixedColumnRender',
  props: {
    // PublicTableFixedColumn(s) list
    target: {
      type: Array<VNode>,
      default() {
        return []
      }
    }
  },
  render() {
    if (!this.target || !this.target.length) {
      console.log('111', h('div'))

      return h('div')
    }

    const vnodes = this.target.map((component: VNode) => {
      return h(component)
    })
    console.log(222, vnodes)

    return vnodes

  }
})
</script>
