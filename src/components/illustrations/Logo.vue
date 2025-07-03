<template>
  <svg fill="none" :height="height" viewBox="0 0 32 32" :width="width">
    <path
      d="M17.6482 10.1305L15.8785 7.02583L7.02979 22.5499H10.5278L17.6482 10.1305ZM19.8798 14.0457L18.11 17.1983L19.394 19.4511H16.8453L15.1056 22.5499H24.7272L19.8798 14.0457Z"
      :fill="fill"
    />
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
