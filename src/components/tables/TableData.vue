<template>
  <td v-bind="attrs" class="relative">
    <RouterLink v-if="props.to" :to="props.to" :class="[routerLinkClass]">
      <slot />
    </RouterLink>

    <template v-else>
      <slot />
    </template>
  </td>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { useAttrs } from 'vue'

const props = defineProps<{
  to?: string | Record<string, any>
}>()

const attrs = useAttrs()

const routerLinkClass = 'block w-full h-full' + "before:content-[''] before:absolute before:inset-0"
</script>
