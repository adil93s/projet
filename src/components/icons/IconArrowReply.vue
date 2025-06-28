<template>
  <svg
    :width="width"
    :height="height"
    viewBox="0 0 21 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M7.51029 3.64645C7.70555 3.84171 7.70555 4.15829 7.51029 4.35355L3.86384 8H10.6567C14.7989 8 18.1567 11.3579 18.1567 15.5C18.1567 15.7761 17.9329 16 17.6567 16C17.3806 16 17.1567 15.7761 17.1567 15.5C17.1567 11.9101 14.2466 9 10.6567 9H3.86384L7.51029 12.6464C7.70555 12.8417 7.70555 13.1583 7.51029 13.3536C7.31503 13.5488 6.99845 13.5488 6.80318 13.3536L2.30318 8.85355C2.10792 8.65829 2.10792 8.34171 2.30318 8.14645L6.80318 3.64645C6.99845 3.45118 7.31503 3.45118 7.51029 3.64645Z"
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
