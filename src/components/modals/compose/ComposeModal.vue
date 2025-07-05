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
      <!-- Affichage des fichiers joints -->
      <div v-if="attachedFiles.length > 0" class="flex flex-col gap-2">
        <h4 class="text-sm font-medium text-white">Fichiers joints :</h4>
        <div class="flex flex-wrap gap-2">
          <div
            v-for="(file, index) in attachedFiles"
            :key="index"
            class="flex items-center gap-2 bg-neutral-700 rounded-lg px-3 py-2"
          >
            <span class="text-sm text-white">{{ file.name }}</span>
            <button
              @click="removeFile(index)"
              class="text-error-600 hover:text-error-500 transition-colors cursor-pointer"
            >
              <IconClose :size="14" />
            </button>
          </div>
        </div>
      </div>

      <div class="flex justify-end gap-2">
        <Button
          v-tooltip="'Brouillon'"
          variant="secondary"
          gap="gap-0"
          @click="saveDraft"
          :disabled="isLoading"
        >
          <template #icon>
            <IconDraft :size="16" class="text-neutral-900" />
          </template>
        </Button>
        <Button v-tooltip="'Joindre'" variant="secondary" gap="gap-0" @click="triggerFileInput">
          <template #icon>
            <IconLink :size="16" class="text-neutral-900" />
          </template>
        </Button>
        <Button variant="primary" @click="sendEmail" :disabled="isLoading || !canSend">
          <template #icon>
            <IconSent :size="16" class="text-white" />
          </template>
          {{ isLoading ? 'Envoi...' : 'Envoyer' }}
        </Button>
      </div>

      <!-- Input file caché -->
      <input
        ref="fileInput"
        type="file"
        multiple
        @change="onFileSelect"
        class="hidden"
        accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.jpg,.jpeg,.png,.gif,.txt"
      />
    </div>
  </BaseModal>
</template>

<script lang="ts" setup>
import { ref, computed, watch, type PropType } from 'vue'
import BaseModal from '@/components/modals/base/BaseModal.vue'
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css'
import InputField from '@/components/input/InputField.vue'
import Button from '@/components/buttons/Button.vue'
import IconSent from '@/components/icons/IconSent.vue'
import IconDraft from '@/components/icons/IconDraft.vue'
import IconLink from '@/components/icons/IconLink.vue'
import IconClose from '@/components/icons/IconClose.vue'
import axiosInstance from '@/plugins/axios'
import { Message } from '@/models/entities/Message'

const emit = defineEmits(['close'])

const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false
  },
  message: {
    type: Object as PropType<Message>
  }
})

const email = ref('')
const subject = ref('')
const content = ref('')
const attachedFiles = ref<File[]>([])
const isLoading = ref(false)
const fileInput = ref<HTMLInputElement>()

const canSend = computed(() => {
  return email.value.trim() !== '' && content.value.trim() !== ''
})

const close = () => {
  resetForm()
  emit('close')
}

const triggerFileInput = () => {
  fileInput.value?.click()
}

const onFileSelect = (event: Event) => {
  const target = event.target as HTMLInputElement
  if (target.files) {
    attachedFiles.value = [...attachedFiles.value, ...Array.from(target.files)]
    target.value = '' // Reset input
  }
}

const removeFile = (index: number) => {
  attachedFiles.value.splice(index, 1)
}

const saveDraft = async () => {
  if (!canSend.value) return

  isLoading.value = true
  try {
    const draftData = {
      subject: subject.value,
      body: {
        contentType: 'HTML',
        content: content.value
      },
      toRecipients: [
        {
          emailAddress: {
            address: email.value
          }
        }
      ]
    }

    await axiosInstance.post('/me/messages', draftData)

    // Réinitialiser le formulaire
    resetForm()
    close()
  } catch (error) {
    console.error('Erreur lors de la sauvegarde du brouillon:', error)
  } finally {
    isLoading.value = false
  }
}

const sendEmail = async () => {
  if (!canSend.value) return

  isLoading.value = true
  try {
    // Créer le message
    const messageData = {
      subject: subject.value,
      body: {
        contentType: 'HTML',
        content: content.value
      },
      toRecipients: [
        {
          emailAddress: {
            address: email.value
          }
        }
      ]
    }

    // Créer le brouillon d'abord
    const draftResponse = await axiosInstance.post('/me/messages', messageData)
    const messageId = draftResponse.data.id

    // Ajouter les pièces jointes si il y en a
    if (attachedFiles.value.length > 0) {
      for (const file of attachedFiles.value) {
        const fileData = await convertFileToBase64(file)
        const attachment = {
          '@odata.type': '#microsoft.graph.fileAttachment',
          name: file.name,
          contentType: file.type,
          contentBytes: fileData
        }

        await axiosInstance.post(`/me/messages/${messageId}/attachments`, attachment)
      }
    }

    // Envoyer le message
    await axiosInstance.post(`/me/messages/${messageId}/send`)

    // Réinitialiser le formulaire
    close()
  } catch (error) {
    console.error("Erreur lors de l'envoi:", error)
  } finally {
    isLoading.value = false
  }
}

const convertFileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => {
      const base64 = reader.result as string
      // Retirer le préfixe "data:...;base64," pour garder seulement les données
      const cleanBase64 = base64.split(',')[1]
      resolve(cleanBase64)
    }
    reader.onerror = reject
    reader.readAsDataURL(file)
  })
}

const resetForm = () => {
  email.value = ''
  subject.value = ''
  content.value = ''
  attachedFiles.value = []
}

const prefillFields = () => {
  if (props.message) {
    // Pré-remplir pour une réponse
    email.value = props.message.from?.emailAddress?.address || ''
    subject.value = props.message.subject ? `Re: ${props.message.subject}` : ''
    content.value = `<br><br>--- Message original ---<br>${props.message.bodyPreview || ''}`
  }
}

// Watcher pour quand la modal s'ouvre
watch(
  () => props.isOpen,
  (newIsOpen) => {
    if (newIsOpen) {
      prefillFields()
    }
  }
)

// Watcher pour quand le message change
watch(
  () => props.message,
  () => {
    if (props.isOpen) {
      prefillFields()
    }
  }
)
</script>
