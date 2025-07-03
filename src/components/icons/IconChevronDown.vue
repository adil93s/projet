<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    :width="width"
    :height="height"
    viewBox="0 0 24 24"
    fill="none"
    :stroke="stroke"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
  >
    <path d="m6 9 6 6 6-6"></path>
  </svg>
</template>

<script setup lang="ts">
import { computed } from 'vue'
const props = defineProps<{
  strokeColor?: string
  size?: number
  width?: number
  height?: number
}>()

const stroke = computed(() => props.strokeColor ?? 'currentColor')
const width = computed(() => props.width ?? props.size ?? 20)
const height = computed(() => props.height ?? props.size ?? 20)
</script>
