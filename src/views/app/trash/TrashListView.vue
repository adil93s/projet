<template>
  <section class="flex flex-col gap-8 grow p-8">
    <h1 class="text-xl font-bold text-white">Corbeille</h1>

    <div class="flex-1 h-full flex flex-col border border-neutral-700 rounded-xl overflow-hidden">
      <div
        v-if="messages.length > 0 || isDataLoading"
        class="flex flex-col justify-between grow w-full h-full"
      >
        <table class="w-full messages">
          <thead>
            <tr>
              <th>Objet</th>
              <th>Expéditeur</th>
              <th>Message</th>
              <th>Date</th>
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
                  name: Routes.APP_TRASH_DETAIL,
                  params: { trash_id: message.id }
                }"
                class="text-white text-md"
              >
                <span class="line-clamp-2 font-bold">{{ message.subject }}</span>
              </TableData>
              <TableData
                :to="{
                  name: Routes.APP_TRASH_DETAIL,
                  params: { trash_id: message.id }
                }"
                class="text-white text-md"
              >
                <span class="inline-block underline text-neutral-300 truncate max-w-64">{{
                  message.from?.emailAddress?.address
                }}</span>
              </TableData>
              <TableData
                :to="{
                  name: Routes.APP_TRASH_DETAIL,
                  params: { trash_id: message.id }
                }"
                class="text-white text-md"
              >
                <span class="line-clamp-3">{{ message.bodyPreview }}</span>
              </TableData>
              <TableData
                :to="{
                  name: Routes.APP_TRASH_DETAIL,
                  params: { trash_id: message.id }
                }"
                class="text-white text-md"
              >
                <span class="whitespace-nowrap">{{
                  moment(message.receivedDateTime).format('DD/MM/YYYY HH:mm')
                }}</span>
              </TableData>
            </tr>
          </tbody>
        </table>
        <div
          v-if="messages.length > 0"
          class="flex justify-end items-center gap-4 p-4 border-t border-neutral-700"
        >
          <PageNumber route-name="app_trash_list" :query="route.query" />
        </div>
      </div>
      <div v-else class="grow flex flex-col justify-center items-center gap-2 py-32 text-center">
        <EmptyMessage :size="150" />
        <h2 class="text-xl font-semibold text-white">
          Aucun message dans la corbeille pour le moment
        </h2>
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

const messages = ref<Message[]>([])
const route = useRoute()
const isDataLoading = ref(false)
const per_page = ref(route.query['per-page'] ? Number(route.query['per-page']) : 15)

onMounted(() => {
  loadMessages()
})

const loadMessages = async () => {
  isDataLoading.value = true
  const response = await axiosInstance.get('/me/mailFolders/deleteditems/messages', {
    params: {
      $top: per_page.value,
      $select: 'id,subject,bodyPreview,from,isRead,receivedDateTime',
      $orderby: 'receivedDateTime DESC'
    }
  })
  messages.value = response.data.value ? plainToInstance(Message, response.data.value) : []
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
</script>
