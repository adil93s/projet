<template>
  <div class="flex flex-col gap-8 p-8">
    <RouterLink :to="{ name: 'conversation_list' }">
      <BaseButton variant="secondary" padding-x-y="px-2 py-1">
        <template #icon>
          <IconArrowReply :size="20" class="text-neutral-900" />
        </template>
        Retour
      </BaseButton>
    </RouterLink>
    <div v-if="isDataLoading" class="text-center flex flex-col">
      <div v-for="j in 4" class="py-4">
        <div class="animate-pulse bg-neutral-200 h-4 w-full rounded-lg"></div>
      </div>
    </div>
    <div v-else>
      <div class="flex flex-col gap-4">
        <h1 class="text-2xl font-bold text-neutral-900">{{ message.subject }}</h1>
        <div class="flex flex-col">
          <p class="text-neutral-700">Expéditeur: {{ message.from?.emailAddress?.name }}</p>
          <a
            :href="`mailto:${message.from?.emailAddress?.address}`"
            class="text-neutral-500 underline"
            >{{ message.from?.emailAddress?.address }}</a
          >
        </div>
        <p class="text-neutral-700">
          Date: {{ moment(message.receivedDateTime).format('DD/MM/YYYY HH:mm') }}
        </p>
        <div v-html="message.bodyPreview" class="text-neutral-700"></div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { Message } from '@/models/entities/Message'
import axiosInstance from '@/plugins/axios'
import { plainToInstance } from 'class-transformer'
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import moment from 'moment'
import BaseButton from '@/components/buttons/BaseButton.vue'
import IconArrowReply from '@/components/icons/IconArrowReply.vue'

const message = ref<Message>(new Message())
const route = useRoute()
const isDataLoading = ref(false)
const conversationId = ref(route.params.conversation_id as string)

onMounted(() => {
  loadMessage()
})

const loadMessage = async () => {
  isDataLoading.value = true
  const response = await axiosInstance.get(`/me/messages/${conversationId.value}`, {
    params: {
      $select: 'id,subject,bodyPreview,from,isRead,receivedDateTime'
    }
  })
  message.value = plainToInstance(Message, response.data as Message)
  isDataLoading.value = false
}
</script>
