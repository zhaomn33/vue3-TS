<template>
  <div>echarts</div>
</template>

<script lang="ts">
import {
  defineComponent,
  getCurrentInstance
} from 'vue'
export default defineComponent({
  name: 'Echarts'
})
</script>

<script setup lang="ts">
const proxy = getCurrentInstance()?.proxy
</script>

<style scoped lang="scss">

</style>
