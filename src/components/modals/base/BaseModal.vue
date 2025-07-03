<template>
  <Teleport to="body">
    <Transition
      enter-active-class="transition-opacity duration-300 ease-in-out"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition-opacity duration-300 ease-in-out"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
      appear
    >
      <div v-if="isOpen" class="fixed inset-0 z-50" :class="[backdrop]" />
    </Transition>

    <Transition
      :enter-active-class="modalTransitionClasses.enterActiveClass"
      :enter-from-class="modalTransitionClasses.enterFromClass"
      :enter-to-class="modalTransitionClasses.enterToClass"
      :leave-active-class="modalTransitionClasses.leaveActiveClass"
      :leave-from-class="modalTransitionClasses.leaveFromClass"
      :leave-to-class="modalTransitionClasses.leaveToClass"
      @after-leave="onAfterLeave"
      appear
    >
      <div v-if="isOpen" class="fixed inset-0 overflow-y-auto z-50 modal-content">
        <div class="fixed inset-0" @click="handleBackdropClick" />

        <div class="flex min-h-full" :class="[padding, position, fullScreen ? 'h-full' : '']">
          <div
            class="relative w-full bg-neutral-800/80 backdrop-blur-sm border border-white/20 text-left font-inter text-white shadow-high z-0"
            :class="[
              !fullScreen ? maxWidth : '',
              ['left', 'right'].includes(props.position) ? '' : rounded,
              overflow,
              ['left', 'right'].includes(props.position) ? 'h-full' : '',
              fullScreen ? 'h-full w-full' : ''
            ]"
          >
            <slot />

            <button
              v-if="!hideCloseButton"
              @click="close"
              class="absolute top-4 right-4 p-2 flex rounded-full glass hover:bg-white/10 transition-colors cursor-pointer ease-in-out items-center justify-center"
            >
              <IconClose :size="16" class="text-white" />
            </button>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script lang="ts" setup>
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import IconClose from '@/components/icons/IconClose.vue'

const emit = defineEmits(['close', 'onAfterLeave'])

const props = defineProps({
  /** Whether the modal / drawer is visible */
  isOpen: { type: Boolean, default: false },
  /** Hide the default close (×) button */
  hideCloseButton: { type: Boolean, default: false },
  /** Allow closing on backdrop click */
  isDismissable: { type: Boolean, default: true },
  /** Backdrop style — "opaque" | "transparent" */
  backdrop: { type: String, default: 'opaque' },
  /** Position — "center" | "top" | "bottom" | "left" | "right" */
  position: { type: String, default: 'center' },
  /** Padding utility classes for the flex container */
  padding: { type: String, default: 'p-4' },
  /** Maximum width utility classes for the modal content */
  maxWidth: { type: String, default: 'max-w-lg' },
  /** Make the modal take the entire viewport height and width */
  fullScreen: { type: Boolean, default: false },
  /** Overflow utility classes applied to the modal content */
  overflow: { type: String, default: 'overflow-hidden' },
  /** Border‑radius utility classes applied to the modal content */
  rounded: { type: String, default: 'rounded-2xl' },
  /** Animation — "fade" | "slideUp" | "slideLeft" | "slideRight" */
  animation: { type: String, default: 'fade' }
})

// Disable body scroll while the modal / drawer is open
onMounted(() => {
  if (props.isOpen) document.body.style.overflow = 'hidden'
})

watch(
  () => props.isOpen,
  (newVal) => {
    document.body.style.overflow = newVal ? 'hidden' : ''
  }
)

onBeforeUnmount(() => {
  document.body.style.overflow = ''
})

const handleBackdropClick = () => {
  if (props.isDismissable) close()
}

const close = () => emit('close')

const onAfterLeave = () => emit('onAfterLeave')

/** Backdrop classes */
const backdrop = computed(() => {
  switch (props.backdrop) {
    case 'opaque':
      return 'bg-black/40'
    case 'transparent':
      return 'bg-transparent'
    default:
      return ''
  }
})

/** Positioning classes for flex container */
const position = computed(() => {
  switch (props.position) {
    case 'center':
      return 'items-center justify-center text-center'
    case 'top':
      return 'items-start justify-center text-center'
    case 'bottom':
      return 'items-end justify-center text-center'
    case 'left':
      return 'items-start justify-start h-full'
    case 'right':
      return 'items-start justify-end h-full'
    default:
      return ''
  }
})

/** Animation classes for <Transition> */
const modalTransitionClasses = computed(() => {
  switch (props.animation) {
    case 'fade':
      return {
        enterActiveClass: 'transition-all duration-300 ease-in-out',
        enterFromClass: 'opacity-0 scale-95',
        enterToClass: 'opacity-100 scale-100',
        leaveActiveClass: 'transition-all duration-300 ease-in-out',
        leaveFromClass: 'opacity-100 scale-100',
        leaveToClass: 'opacity-0 scale-95'
      }

    case 'slideUp':
      return {
        enterActiveClass: 'ease-out duration-300',
        enterFromClass: 'translate-y-full',
        enterToClass: 'translate-y-0',
        leaveActiveClass: 'ease-in duration-200',
        leaveFromClass: 'translate-y-0',
        leaveToClass: 'translate-y-full'
      }

    case 'slideLeft':
      return {
        enterActiveClass: 'transition-all duration-300 ease-in-out',
        enterFromClass: '-translate-x-full',
        enterToClass: 'translate-x-0',
        leaveActiveClass: 'transition-all duration-200 ease-in-out',
        leaveFromClass: 'translate-x-0',
        leaveToClass: '-translate-x-full'
      }

    case 'slideRight':
      return {
        enterActiveClass: 'transition-all duration-300 ease-in-out',
        enterFromClass: 'translate-x-full',
        enterToClass: 'translate-x-0',
        leaveActiveClass: 'transition-all duration-200 ease-in-out',
        leaveFromClass: 'translate-x-0',
        leaveToClass: 'translate-x-full'
      }

    default:
      return {
        enterActiveClass: 'transition-all duration-300 ease-in-out',
        enterFromClass: 'opacity-0 scale-95',
        enterToClass: 'opacity-100 scale-100',
        leaveActiveClass: 'transition-all duration-300 ease-in-out',
        leaveFromClass: 'opacity-100 scale-100',
        leaveToClass: 'opacity-0 scale-95'
      }
  }
})
</script>
