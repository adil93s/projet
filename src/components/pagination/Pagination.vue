<template>
  <div v-if="p.totalPages > 1" class="flex items-center gap-1 text-sm">
    <router-link
      v-if="p.currentPage > 1"
      :to="{ query: { ...route.query, page: Math.max(1, p.currentPage - 1) } }"
      class="p-2"
      :class="{
        'text-neutral-500 cursor-not-allowed': p.currentPage === 1
      }"
      :aria-disabled="p.currentPage === 1"
    >
      <span class="sr-only">Précédent</span>
      <IconChevronLeft :size="16" />
    </router-link>

    <div class="flex items-center gap-1">
      <template v-for="page in pagesToDisplay" :key="page">
        <router-link
          v-if="page !== '…'"
          :to="{ query: { ...route.query, page } }"
          class="w-10 h-10 flex items-center justify-center backdrop-blur-md rounded-xl border border-neutral-700"
          :class="{
            'bg-neutral-700/30': page === p.currentPage,
            'bg-neutral-800/30 hover:bg-neutral-700/30': page !== p.currentPage
          }"
        >
          {{ page }}
        </router-link>
        <span v-else class="text-neutral-400 w-8 h-8 flex items-center justify-center">…</span>
      </template>
    </div>

    <router-link
      v-if="p.currentPage < p.totalPages"
      :to="{ query: { ...route.query, page: Math.min(p.totalPages, p.currentPage + 1) } }"
      class="p-2"
      :class="{
        'text-neutral-500 cursor-not-allowed': p.currentPage === p.totalPages
      }"
      :aria-disabled="p.currentPage === p.totalPages"
    >
      <span class="sr-only">Suivant</span>
      <IconChevronRight :size="16" />
    </router-link>
  </div>
</template>

<script setup lang="ts">
import type { PaginationMeta } from '@/models/interfaces/PaginationMeta'
import IconChevronLeft from '../icons/IconChevronLeft.vue'
import IconChevronRight from '../icons/IconChevronRight.vue'
import { useRoute } from 'vue-router'
import { computed, watch } from 'vue'

const props = defineProps<{
  pagination: Partial<PaginationMeta>
}>()

const p = computed(() => ({
  currentPage: props.pagination?.currentPage ?? 1,
  totalPages: props.pagination?.totalPages ?? 1
}))

const route = useRoute()

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

watch(
  () => route.query.page,
  () => scrollToTop()
)

const pagesToDisplay = computed(() => {
  const { currentPage, totalPages } = p.value

  const maxNumbers = 5

  if (totalPages <= maxNumbers) {
    return Array.from({ length: totalPages }, (_, i) => i + 1)
  }

  const pages: (number | string)[] = []

  pages.push(1)

  const showLeftDots = currentPage > 3
  if (showLeftDots) pages.push('…')

  const start = showLeftDots ? Math.max(2, currentPage - 1) : 2
  const end =
    currentPage < totalPages - 2 ? Math.min(totalPages - 1, currentPage + 1) : totalPages - 1

  for (let i = start; i <= end; i++) pages.push(i)

  const showRightDots = currentPage < totalPages - 2
  if (showRightDots) pages.push('…')

  pages.push(totalPages)

  return pages
})
</script>
