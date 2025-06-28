<template>
  <div
    class="relative"
    ref="dropdown"
    :class="{ 'h-full': props.heightFull }"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
  >
    <div
      @click="toggleDropdown"
      :class="[
        { 'h-full': props.heightFull },
        props.disabled && 'opacity-50 cursor-not-allowed pointer-events-none'
      ]"
    >
      <slot name="button" />
    </div>

    <transition
      enter-active-class="transition ease-out duration-200"
      enter-from-class="transform opacity-0 scale-95"
      enter-to-class="transform opacity-100 scale-100"
      leave-active-class="transition ease-in duration-150"
      leave-from-class="transform opacity-100 scale-100"
      leave-to-class="transform opacity-0 scale-95"
    >
      <div
        v-if="isOpen"
        class="absolute mt-2 z-10"
        :class="[positionClass, props.customClass, { 'w-full': props.widthFull }]"
      >
        <slot name="content" />
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { onClickOutside } from '@vueuse/core'

const props = withDefaults(
  defineProps<{
    position?: 'left' | 'right' | 'top' | 'bottom'
    heightFull?: boolean
    widthFull?: boolean
    customClass?: string
    hover?: boolean
    disabled?: boolean
  }>(),
  {
    position: 'left',
    heightFull: false,
    widthFull: false,
    customClass: '',
    hover: false,
    disabled: false
  }
)

const positionClass = computed(() => {
  if (!props.position) return ''
  if (['left', 'right'].includes(props.position)) {
    return props.position === 'right' ? 'right-0' : 'left-0'
  }
  return props.position === 'top' ? 'bottom-14' : ''
})

const dropdown = ref<HTMLElement | null>(null)
const isOpen = ref(false)

const openDropdown = () => {
  if (props.disabled) return
  isOpen.value = true
}
const closeDropdown = () => {
  isOpen.value = false
}
const toggleDropdown = () => {
  if (props.disabled) return
  isOpen.value && !props.hover ? closeDropdown() : openDropdown()
}

const handleMouseEnter = () => {
  if (props.hover && !props.disabled) openDropdown()
}
const handleMouseLeave = () => {
  if (props.hover && !props.disabled) closeDropdown()
}

onClickOutside(dropdown, closeDropdown)

defineExpose({ closeDropdown })
</script>
