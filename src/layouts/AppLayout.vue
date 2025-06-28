<template>
  <div class="grid h-dvh w-full overflow-hidden bg-neutral-800">
    <Sidebar :user="userStore.user" @logout="handleLogout" class="fixed top-0 left-0" />
    <div class="ml-64 h-full flex flex-col overflow-y-auto bg-neutral-800 text-white">
      <router-view></router-view>
    </div>
  </div>
</template>

<script setup lang="ts">
import Sidebar from '@/components/sidebar/Sidebar.vue'
import { User } from '@/models/entities/User'
import { Routes } from '@/router/routes'
import { useUser } from '@/stores/user'
import { plainToInstance } from 'class-transformer'
import { computed, onMounted, watch } from 'vue'
import { useRoute, useRouter, type RouteLocationNormalized } from 'vue-router'

const userStore = useUser()
const user = computed(() => plainToInstance(User, userStore.user) as User)
const route = useRoute()
const router = useRouter()

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
      router.replace({ name: 'auth_login' })
      return
    }

    router.replace({ name: 'app_dashboard' })
  }
}
</script>
