<template>
  <svg :height="height" :width="width" viewBox="0 0 23 23" :fill="fill" aria-hidden="true">
    <rect width="10" height="10" x="0.5" y="0.5" />
    <rect width="10" height="10" x="12.5" y="0.5" />
    <rect width="10" height="10" x="0.5" y="12.5" />
    <rect width="10" height="10" x="12.5" y="12.5" />
  </svg>
</template>

<script setup lang="ts">
import { computed } from 'vue'
const props = defineProps<{
  fillColor?: string
  size?: number
  width?: number
  height?: number
}>()

const fill = computed(() => props.fillColor ?? 'currentColor')
const width = computed(() => props.width ?? props.size ?? 20)
const height = computed(() => props.height ?? props.size ?? 20)
</script>
