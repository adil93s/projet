<template>
  <div class="flex items-center gap-x-2">
    <span class="text-sm font-normal text-medium text-left">Montrer par page</span>
    <select
      class="pl-2 py-1 text-xs font-medium rounded-lg border-r-white border-r-8 shadow-medium font-inter text-neutral-900 bg-white outline outline-neutral-200"
      :value="currentPerPage"
      @change="onChange"
    >
      <option v-for="opt in perPageOptions" :key="opt" :value="opt">
        {{ opt }}
      </option>
    </select>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'

const props = defineProps<{
  routeName: string
  query?: any
}>()

const router = useRouter()

const perPageOptions = [15, 25, 50, 100]

const currentPerPage = computed(() => Number(props?.query?.['per-page'] ?? 15))

const queryWithoutPage = computed(() => {
  const q = { ...props.query }
  if (q !== undefined) {
    delete q['page']
  }
  return q
})

function onChange(event: Event) {
  const perPage = Number((event.target as HTMLSelectElement).value)
  router.push({
    name: props.routeName,
    query: { ...queryWithoutPage.value, 'per-page': perPage }
  })
}
</script>
