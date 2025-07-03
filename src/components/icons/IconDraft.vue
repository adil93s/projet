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
    <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"></path>
    <path d="M14 2v4a2 2 0 0 0 2 2h4"></path>
    <path d="M10 9H8"></path>
    <path d="M16 13H8"></path>
    <path d="M16 17H8"></path>
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
