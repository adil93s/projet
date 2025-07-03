<template>
  <BaseModal :isOpen="isOpen" @close="close" maxWidth="max-w-3xl">
    <div class="flex flex-col gap-4 p-5 pt-10">
      <InputField v-model="email" type="text" placeholder="Email" label="À" />
      <InputField v-model="subject" type="text" placeholder="Objet" label="Objet" />
      <div class="flex flex-col gap-1">
        <div class="flex flex-col pt-4">
          <QuillEditor
            v-model:content="content"
            :toolbar="[
              ['bold', 'italic', 'underline'],
              [{ list: 'ordered' }, { list: 'bullet' }]
            ]"
            contentType="html"
            placeholder=""
          />
        </div>
      </div>
      <div class="flex justify-end">
        <Button variant="primary">
          <template #icon>
            <IconSent :size="16" class="text-white" />
          </template>
          Envoyer
        </Button>
      </div>
    </div>
  </BaseModal>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import BaseModal from '@/components/modals/base/BaseModal.vue'
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css'
import InputField from '@/components/input/InputField.vue'
import Button from '@/components/buttons/Button.vue'
import IconSent from '@/components/icons/IconSent.vue'

const emit = defineEmits(['close'])

const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false
  }
})

const email = ref('')
const subject = ref('')
const content = ref('')

const close = () => {
  emit('close')
}
</script>
