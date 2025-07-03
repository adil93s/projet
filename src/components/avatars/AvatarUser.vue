<template>
  <div
    v-if="user.photo_url"
    class="aspect-square justify-center items-center inline-flex overflow-hidden"
    :class="[width, height, rounded]"
  >
    <div class="aspect-square justify-center items-center inline-flex" :class="[width, height]">
      <img :src="user.photo_url" :alt="user.name ?? ''" class="w-full h-full object-cover" />
    </div>
  </div>
  <div
    v-else
    class="aspect-square justify-center items-center inline-flex bg-neutral-700 p-2"
    :class="[width, height, rounded]"
  >
    <div class="aspect-square justify-center items-center inline-flex" :class="[width, height]">
      <div class="font-inter text-white font-medium uppercase">
        {{ user?.initials }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { User } from '@/models/entities/User'

const props = withDefaults(
  defineProps<{
    user: User
    width?: string
    height?: string
    fontSize?: string
    rounded?: string
  }>(),
  {
    width: 'w-24',
    height: 'h-24',
    fontSize: 'text-base',
    rounded: 'rounded-xl'
  }
)
</script>
