<template>
  <div class="h-full w-full max-w-full">
    <router-view />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'App',
  components: {

  }
})
</script>

<style lang="scss">
@use "@/styles/index.scss";
</style>
