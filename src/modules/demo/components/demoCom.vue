<template>
  <div>
    <span>{{ textDemo }}</span><br>
    <el-button
      type="primary"
      @click="handleClick"
    >
      {{ btnText }}
    </el-button>
  </div>
</template>

<script lang="ts">
import {
  ref,
  defineComponent,
  getCurrentInstance
} from 'vue'
export default defineComponent({
  name: 'DemoCom'
})
</script>

<script setup lang="ts">
const proxy = getCurrentInstance()?.proxy

const props = defineProps({
  btnText: {
    type: String,
    default: '-'
  }
})

const textDemo = ref(0)

const handleClick = () => {
  if (props.btnText === '点击+1') {
    textDemo.value ++
  } else {
    textDemo.value = textDemo.value + 2
  }
  console.log(props.btnText, textDemo.value)
}
</script>

<style scoped lang="scss">

</style>
