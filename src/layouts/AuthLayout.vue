<template>
  <div class="bg-black h-dvh relative">
    <div class="fixed inset-0 z-0">
      <iframe
        src="https://my.spline.design/thresholddarkambientui-v0gkZCfi6zXm69kE0wccy70f/"
        frameborder="0"
        width="100%"
        height="100%"
        class="w-full h-full"
      ></iframe>
    </div>
    <div
      class="flex justify-center items-center h-dvh p-8 font-inter font-medium pointer-events-none"
    >
      <router-view class="pointer-events-auto animate-rmehe backdrop-blur-xs" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const pageTitle = ref(route.meta.pageTitle)

watch(
  () => route.meta,
  (newValue, oldValue) => {
    if (newValue.pageTitle !== oldValue.pageTitle) {
      pageTitle.value = route.meta.pageTitle
    }
  }
)
</script>
