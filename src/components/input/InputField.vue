<template>
  <div class="flex flex-col gap-1 relative" ref="dropdown">
    <label v-if="label" class="text-neutral-100 text-sm font-inter">{{ label }}</label>
    <div class="group">
      <div class="flex relative w-full">
        <textarea
          v-if="type === 'area'"
          :value="modelValue"
          v-bind="$attrs"
          @focus="showDropdown = true"
          @input="handleInput($event)"
          :placeholder="placeholder"
          class="!text-sm w-full px-3 py-2 border rounded-xl shadow-xs font-inter text-white placeholder:text-neutral-400 placeholder:font-mulish placeholder:text-sm focus:outline-none transition-all duration-200 ease-in-out leading-6"
          :class="[
            errors.length > 0 ? 'border-error focus:!ring-error' : 'border-neutral-600',
            leading ? pl : '',
            trailing ? pr : '',
            focus ? 'focus:ring-1 focus:ring-neutral-500 ' : 'focus:right-0 focus:bg-transparent'
          ]"
        />
        <input
          v-else
          :type="type"
          :value="modelValue"
          v-bind="$attrs"
          @focus="showDropdown = true"
          @input="handleInput($event)"
          :placeholder="placeholder"
          class="!text-sm w-full px-3 py-2 bg-neutral-700/60 border rounded-xl shadow-xs font-inter text-white placeholder:text-neutral-400 placeholder:font-mulish placeholder:text-sm focus:outline-none transition-all duration-200 ease-in-out leading-6"
          :class="[
            errors.length > 0 ? 'border-error focus:!ring-error' : 'border-neutral-500',
            leading ? pl : '',
            trailing ? pr : '',
            focus ? 'focus:ring-1 focus:ring-neutral-500' : 'focus:right-0 focus:bg-transparent'
          ]"
        />
        <slot name="leading"></slot>
        <slot name="trailing"></slot>
      </div>
    </div>
    <Transition
      enter-active-class="transition-all duration-200 ease-in-out"
      enter-from-class="opacity-0 transform -translate-y-1"
      enter-to-class="opacity-100 transform translate-y-0"
      leave-active-class="transition-all duration-200 ease-in-out"
      leave-from-class="opacity-100 transform translate-y-0"
      leave-to-class="opacity-0 transform -translate-y-1"
      mode="in-out"
    >
      <div v-if="errors.length > 0">
        <div
          v-for="(error, index) of errors"
          :key="index"
          class="px-2 font-inter text-xs text-error"
        >
          <div class="flex gap-x-1 items-center content-center">
            <span>{{ error }}</span>
          </div>
        </div>
      </div>
    </Transition>
    <Transition
      enter-active-class="transition ease-out duration-200"
      enter-from-class="transform opacity-0 scale-95"
      enter-to-class="transform opacity-100 scale-100"
      leave-active-class="transition ease-in duration-150"
      leave-from-class="transform opacity-100 scale-100"
      leave-to-class="transform opacity-0 scale-95"
    >
      <div v-if="showDropdown" class="absolute top-12 z-10 w-full">
        <slot name="content" />
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { onClickOutside } from '@vueuse/core'
import { computed, ref } from 'vue'

const props = defineProps<{
  modelValue?: any
  label?: string
  placeholder?: string
  type?: string
  errors?: string[]
  leading?: boolean
  paddingLeft?: string
  paddingRight?: string
  trailing?: boolean
  focus?: boolean
  dropdown?: boolean
}>()

const emit = defineEmits({
  'update:modelValue': (value: string) => true
})

const dropdown = ref<HTMLElement | null>(null)
const showDropdown = ref(false)
const errors = computed(() => props.errors || [])
const pl = computed(() => props.paddingLeft || 'pl-10')
const pr = computed(() => props.paddingRight || 'pr-10')
const label = computed(() => props.label)
const placeholder = computed(() => props.placeholder || 'Saisir une valeur')
const type = computed(() => props.type || 'text')
const focus = computed(() => props.focus || true)

const handleInput = (event: Event) => {
  const value = (event.target as HTMLInputElement).value
  emit('update:modelValue', value)
}

onClickOutside(dropdown, () => {
  showDropdown.value = false
})
</script>
