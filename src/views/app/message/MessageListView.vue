<template>
  <section class="flex flex-col gap-8 grow p-8">
    <h1 class="text-xl font-bold text-white">Boîte de réception</h1>

    <div class="flex-1 flex flex-col border border-neutral-700 rounded-xl">
      <div
        v-if="messages.length > 0 || isDataLoading"
        class="flex flex-col justify-between grow w-full"
      >
        <table class="w-full messages">
          <thead>
            <tr>
              <th>Objet</th>
              <th>Expéditeur</th>
              <th>Message</th>
              <th>Date</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="isDataLoading" v-for="i in 15" :key="i">
              <td v-for="j in 4" class="py-4" :class="{ 'pl-8': j === 1, 'pr-8': j === 6 }">
                <div class="flex flex-col gap-2">
                  <div class="animate-pulse bg-neutral-700 h-4 w-full rounded-lg"></div>
                </div>
              </td>
            </tr>
            <tr
              v-else
              v-for="message in messages"
              :key="message.id"
              class="border-b border-neutral-700 relative hover:bg-neutral-700/50"
            >
              <TableData
                :to="{
                  name: Routes.APP_MESSAGE_DETAIL,
                  params: { message_id: message.id }
                }"
                class="text-white text-md"
              >
                <span class="line-clamp-2 font-bold">{{ message.subject }}</span>
              </TableData>
              <TableData
                :to="{
                  name: Routes.APP_MESSAGE_DETAIL,
                  params: { message_id: message.id }
                }"
                class="text-white text-md"
              >
                <span class="inline-block underline text-neutral-300 truncate max-w-64">
                  {{ message.from?.emailAddress?.address }}
                </span>
              </TableData>
              <TableData
                :to="{
                  name: Routes.APP_MESSAGE_DETAIL,
                  params: { message_id: message.id }
                }"
                class="text-white text-md"
              >
                <span class="line-clamp-3">{{ message.bodyPreview }}</span>
              </TableData>
              <TableData
                :to="{
                  name: Routes.APP_MESSAGE_DETAIL,
                  params: { message_id: message.id }
                }"
                class="text-white text-md"
              >
                <span class="whitespace-nowrap">{{
                  moment(message.receivedDateTime).format('DD/MM/YYYY HH:mm')
                }}</span>
              </TableData>
              <TableData
                :to="{
                  name: Routes.APP_MESSAGE_DETAIL,
                  params: { message_id: message.id }
                }"
                class="text-white text-md"
              >
                <div class="flex items-center gap-2 w-fit relative">
                  <button
                    class="cursor-pointer rounded-xl hover:bg-neutral-700/50 p-2"
                    @click.stop.prevent="openComposeModal(message)"
                  >
                    <IconArrowReply :size="20" />
                  </button>
                  <button
                    class="cursor-pointer rounded-xl hover:bg-neutral-700/50 p-2"
                    @click.stop.prevent="handleStar(message)"
                  >
                    <IconStar
                      :size="20"
                      :class="
                        message.flag?.flagStatus === 'flagged'
                          ? 'text-yellow-500'
                          : 'text-neutral-300 hover:text-white'
                      "
                    />
                  </button>
                  <button
                    class="cursor-pointer hover:text-white rounded-xl hover:bg-neutral-700/50 p-2 text-neutral-300"
                    @click.stop.prevent="handleTrash(message)"
                  >
                    <IconTrash :size="20" />
                  </button>
                </div>
              </TableData>
            </tr>
          </tbody>
        </table>
        <div
          v-if="messages.length > 0"
          class="flex justify-between items-center gap-4 p-4 border-t border-neutral-700"
        >
          <PageNumber route-name="app_message_list" :query="route.query" />
          <Pagination :pagination="pagination"></Pagination>
        </div>
      </div>
      <div v-else class="grow flex flex-col justify-center items-center gap-2 py-32 text-center">
        <EmptyMessage :size="150" />
        <h2 class="text-xl font-semibold text-white">Aucun message pour le moment</h2>
        <p class="font-inter text-neutral-300 text-sm">
          Vous n'avez pas encore de message. Vous pouvez en envoyer un à vous-même pour tester.
        </p>
      </div>
    </div>
  </section>
</template>
<script setup lang="ts">
import EmptyMessage from '@/components/illustrations/EmptyMessage.vue'
import { Message } from '@/models/entities/Message'
import axiosInstance from '@/plugins/axios'
import PageNumber from '@/components/pagination/PageNumber.vue'
import { plainToInstance } from 'class-transformer'
import { onMounted, ref, watch } from 'vue'
import moment from 'moment'
import { useRoute } from 'vue-router'
import TableData from '@/components/tables/TableData.vue'
import { Routes } from '@/router/routes'
import Pagination from '@/components/pagination/Pagination.vue'
import type { PaginationMeta } from '@/models/interfaces/PaginationMeta'
import IconStar from '@/components/icons/IconStar.vue'
import IconTrash from '@/components/icons/IconTrash.vue'
import IconArrowReply from '@/components/icons/IconArrowReply.vue'

const emit = defineEmits(['open-compose-modal'])

const messages = ref<Message[]>([])
const pagination = ref<Partial<PaginationMeta>>({ currentPage: 1, totalPages: 1 })
const route = useRoute()
const isDataLoading = ref(false)
const per_page = ref(route.query['per-page'] ? Number(route.query['per-page']) : 15)

onMounted(() => {
  loadMessages()
})

const handleStar = async (message: Message) => {
  try {
    const newFlagStatus = message.flag?.flagStatus === 'flagged' ? 'notflagged' : 'flagged'

    await axiosInstance.patch(`/me/messages/${message.id}`, {
      flag: {
        flagStatus: newFlagStatus
      }
    })
    loadMessages(false)
  } catch (error) {
    console.error('Erreur lors du marquage:', error)
  }
}

const handleTrash = async (message: Message) => {
  try {
    await axiosInstance.post(`/me/messages/${message.id}/move`, {
      destinationId: 'deleteditems'
    })
    loadMessages(false)
  } catch (error) {
    console.error('Erreur lors de la mise à la corbeille:', error)
  }
}

const openComposeModal = (message: Message) => {
  emit('open-compose-modal', message)
}

const loadMessages = async (showLoading = true) => {
  if (showLoading) {
    isDataLoading.value = true
  }

  const currentPage = route.query.page ? parseInt(route.query.page as string) : 1
  const skip = (currentPage - 1) * per_page.value

  const response = await axiosInstance.get('/me/mailFolders/inbox/messages', {
    params: {
      $top: per_page.value,
      $skip: skip,
      $count: true,
      $select: 'id,subject,bodyPreview,from,isRead,receivedDateTime,flag',
      $orderby: 'receivedDateTime DESC'
    },
    headers: {
      ConsistencyLevel: 'eventual'
    }
  })

  messages.value = response.data.value ? plainToInstance(Message, response.data.value) : []

  const totalItems = response.data['@odata.count'] ?? messages.value.length
  pagination.value = {
    currentPage,
    totalPages: Math.max(1, Math.ceil(totalItems / per_page.value)),
    perPage: per_page.value,
    totalItems
  }

  isDataLoading.value = false
}

watch(
  () => route.query['per-page'],
  (newPerPage) => {
    if (newPerPage) {
      per_page.value = Number(newPerPage)
      loadMessages()
    }
  },
  { immediate: true }
)

watch(
  () => route.query.page,
  () => {
    loadMessages()
  }
)
</script>
