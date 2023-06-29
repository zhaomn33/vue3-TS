<template>
  <div>{{ modelValue.data }}</div>
</template>

<script lang="ts">
import {
  defineComponent,
  getCurrentInstance
} from 'vue'
export default defineComponent({
  name: 'DialogDemo'
})
</script>

<script setup lang="ts">
const proxy = getCurrentInstance()?.proxy
const props = defineProps({
  modelValue: {
    type: Object,
    default: () => {}
  }
})
</script>

<style scoped lang="scss">

</style>
