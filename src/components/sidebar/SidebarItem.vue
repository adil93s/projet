<template>
  <div
    class="px-3 py-2.5 flex items-center justify-between rounded-xl backdrop-blur-sm"
    :class="active ? 'bg-neutral-800/30 outline outline-white/10' : 'hover:bg-neutral-700/60'"
  >
    <div class="flex items-center gap-2">
      <slot name="icon"></slot>
      <span class="font-inter text-white">
        <slot name="text"></slot>
      </span>
    </div>
    <div class="text-sm font-semibold text-gray-500">
      <slot name="badge"></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  active?: boolean
}>()
</script>
