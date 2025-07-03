<template>
  <div
    class="px-2.5 py-2.5 flex items-center justify-between rounded-xl backdrop-blur-sm"
    :class="[
      active ? 'text-neutral-100' : 'text-neutral-300 hover:text-neutral-100',
      active && !isSidebarOpen
        ? 'bg-neutral-700/50'
        : active && isSidebarOpen
          ? 'bg-gradient-to-r from-neutral-700 to-neutral-800'
          : !active && isSidebarOpen
            ? 'hover:bg-neutral-800'
            : 'hover:bg-neutral-700/50'
    ]"
  >
    <div :class="isSidebarOpen ? 'flex items-center gap-2' : ''">
      <slot name="icon"></slot>
      <span v-if="isSidebarOpen" class="font-inter text-sm line-clamp-1">
        <slot name="text"></slot>
      </span>
    </div>
    <div v-if="isSidebarOpen" class="text-sm font-semibold text-gray-500">
      <slot name="badge"></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useLayout } from '@/stores/layout'
import { computed } from 'vue'

defineProps<{
  active?: boolean
}>()

const layoutStore = useLayout()
const isSidebarOpen = computed(() => layoutStore.isSidebarOpen)
</script>
