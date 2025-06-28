<template>
  <router-view />
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useUser } from '@/stores/user'
import { useRoute, useRouter } from 'vue-router'
import { msalInstance } from '@/plugins/msal'

const userStore = useUser()
const route = useRoute()
const router = useRouter()

const user = computed(() => userStore.user)

onMounted(async () => {
  await msalInstance.handleRedirectPromise()

  if (route.name === 'root') {
    if (user.value === undefined || user.value === null) {
      router.replace({ name: 'auth_login' })
      return
    }

    router.replace({ name: 'app' })
  }
})
</script>
