<template>
  <button
    class="flex items-center gap-2 rounded-xl justify-between relative"
    :class="[
      fullWidth ? 'w-full' : 'w-fit',
      disabled || loading ? 'opacity-50' : '',
      !disabled && !loading ? 'cursor-pointer' : '',
      bgColor,
      border,
      padding,
      shadow,
      gap
    ]"
    :disabled="disabled || loading"
    @click="$emit('click', $event)"
  >
    <div
      class="flex items-center"
      :class="[
        gap,
        fullWidth ? 'w-full' : 'w-fit',
        align === 'left' ? 'justify-start' : align === 'right' ? 'justify-end' : 'justify-center'
      ]"
    >
      <slot name="icon"></slot>
      <span
        class="font-inter text-sm font-medium"
        :class="[textColor, { 'whitespace-nowrap': whitespaceNowrap }]"
      >
        <slot>{{ label }}</slot>
      </span>
      <svg
        v-if="loading"
        class="animate-spin h-4 w-4"
        :class="[textColor]"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          class="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          stroke-width="4"
        ></circle>
        <path
          class="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        ></path>
      </svg>
    </div>
    <slot name="leading"></slot>
  </button>
</template>

<script lang="ts" setup>
import { computed } from 'vue'

const props = defineProps({
  label: {
    type: String,
    default: ''
  },
  variant: {
    type: String,
    default: 'primary'
  },
  fullWidth: {
    type: Boolean,
    default: false
  },
  disabled: {
    type: Boolean,
    default: false
  },
  loading: {
    type: Boolean,
    default: false
  },
  whitespaceNowrap: {
    type: Boolean,
    default: false
  },
  gap: {
    type: String,
    default: 'gap-2'
  },
  align: {
    type: String,
    default: 'center'
  },
  status: {
    type: String,
    default: 'base'
  },
  paddingXY: {
    type: String,
    default: 'px-4 py-2.5'
  }
})

const emit = defineEmits<{
  (e: 'click', event: MouseEvent): void
}>()

const bgColor = computed(() => {
  switch (props.variant) {
    case 'primary':
      return 'bg-neutral-700'
    case 'secondary':
      return 'bg-white'
    case 'link':
      return ''
    default:
      return ''
  }
})

const border = computed(() => {
  switch (props.variant) {
    case 'primary':
      return ''
    case 'secondary':
      return 'border border-neutral-200'
    case 'link':
      return ''
    default:
      return ''
  }
})

const textColor = computed(() => {
  switch (props.variant) {
    case 'primary':
      return 'text-white'
    case 'secondary':
      return 'text-neutral-800'
    case 'link':
      if (props.status === 'danger') {
        return 'text-error'
      }

      return 'text-primary'
    default:
      return ''
  }
})

const padding = computed(() => {
  if (props.variant === 'link') {
    return ''
  }

  return props.paddingXY
})

const shadow = computed(() => {
  if (props.variant === 'link') {
    return ''
  }

  return 'shadow-light'
})
</script>
