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
    <polyline points="22 12 16 12 14 15 10 15 8 12 2 12"></polyline>
    <path
      d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"
    ></path>
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
