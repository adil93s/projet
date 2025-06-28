<template>
  <div class="flex flex-col gap-2 p-8">
    Here comes the content of the home page
    <BaseButton
      :loading="isLoading"
      :disabled="isDisabled"
      @click="handleClick"
      variant="secondary"
    >
      Disabled and animated for 2 seconds if clicked
    </BaseButton>
  </div>
</template>
<script setup lang="ts">
import BaseButton from '@/components/buttons/BaseButton.vue'
import { ref } from 'vue'

const isLoading = ref(false)
const isDisabled = ref(false)

const handleClick = () => {
  isLoading.value = true
  isDisabled.value = true
  setTimeout(() => {
    isLoading.value = false
    isDisabled.value = false
  }, 2000)
}
</script>
