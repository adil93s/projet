<template>
  <svg
    :width="width"
    :height="height"
    viewBox="0 0 16 17"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M4.66602 10.1992L7.99935 13.5326L11.3327 10.1992"
      :stroke="stroke"
      stroke-width="0.886667"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M4.66602 6.19857L7.99935 2.86523L11.3327 6.19857"
      :stroke="stroke"
      stroke-width="0.886667"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
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
