<template>
  <div
    :class="[
      'dashboard',
      layoutStore.isSidebarOpen ? 'sidebar-open' : 'sidebar-close',
      layoutStore.isSidebarOpen ? 'bg-neutral-900' : 'bg-neutral-850'
    ]"
  >
    <Sidebar
      :user="userStore.user"
      @logout="handleLogout"
      class="[grid-area:sidebar]"
      @openComposeModal="openComposeModal"
    />
    <main
      class="[grid-area:main] flex flex-col text-white scrollbar-custom bg-neutral-850 transition-all duration-300 ease-in-out overflow-y-auto"
      :class="[{ 'rounded-xl mt-2 mr-2 mb-0': layoutStore.isSidebarOpen }]"
    >
      <router-view />
    </main>
  </div>
  <ComposeModal :isOpen="isComposeModalOpen" @close="closeComposeModal" />
</template>

<script setup lang="ts">
import Sidebar from '@/components/sidebar/Sidebar.vue'
import { User } from '@/models/entities/User'
import { Routes } from '@/router/routes'
import { useLayout } from '@/stores/layout'
import { useUser } from '@/stores/user'
import { plainToInstance } from 'class-transformer'
import { computed, onMounted, ref, watch } from 'vue'
import { useRoute, useRouter, type RouteLocationNormalized } from 'vue-router'
import ComposeModal from '@/components/modals/compose/ComposeModal.vue'

const userStore = useUser()
const user = computed(() => plainToInstance(User, userStore.user) as User)
const route = useRoute()
const router = useRouter()
const layoutStore = useLayout()
const isComposeModalOpen = ref(false)

onMounted(() => {
  handleAppRoute(route)
})

watch(route, (newRoute) => {
  handleAppRoute(newRoute)
})

const handleLogout = async () => {
  await router.push({ name: Routes.AUTH_LOGIN })

  userStore.$reset()
}

const handleAppRoute = (route: RouteLocationNormalized) => {
  if (route.name === 'app') {
    if (user.value === undefined || user.value === null) {
      router.replace({ name: Routes.AUTH_LOGIN })
      return
    }

    router.replace({ name: Routes.APP_MESSAGE_LIST })
  }
}

const openComposeModal = () => {
  isComposeModalOpen.value = true
}

const closeComposeModal = () => {
  isComposeModalOpen.value = false
}
</script>
