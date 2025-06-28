<template>
  <div class="max-w-md w-full card-container">
    <div class="card-content shadow-lg backdrop-blur-sm">
      <div class="h-36 relative">
        <div class="absolute top-4 left-4 z-10">
          <span
            class="px-2 py-1 bg-neutral-900/60 rounded-full text-xs text-neutral-300 mb-2 inline-block fond-bold"
            >ACCÈS SÉCURISÉ</span
          >
          <h2 class="text-2xl font-bold text-neutral-700">Portail de Connexion</h2>
          <div class="h-1 w-20 bg-neutral-500 mt-2 rounded-full"></div>
        </div>
      </div>

      <div class="p-6 flex flex-col bg-neutral-900/80 backdrop-blur-md">
        <div>
          <span
            class="px-2 py-1 bg-neutral-800 rounded-full text-xs text-neutral-400 mb-2 inline-block"
            >AUTHENTIFICATION</span
          >
          <h3 class="font-medium text-neutral-200 mb-4">
            Connectez-vous pour accéder à votre compte
          </h3>

          <div class="mt-20 flex justify-between text-sm">
            <SignInButton
              fullWidth
              v-if="!isAuthenticated"
              @success="handleSuccess"
              @error="handleError"
            />
          </div>
        </div>

        <div class="mt-6 pt-4 text-center">
          <div class="divider-gradient mb-4"></div>
          <div class="flex items-center justify-center mt-4 space-x-2">
            <span class="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
            <span class="text-neutral-400 text-xs">État du Système : Opérationnel</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useUser } from '@/stores/user'
import { computed, onMounted } from 'vue'
import * as msal from '@azure/msal-browser'
import SignInButton from '@/components/commons/SignInButton.vue'

const userStore = useUser()
const router = useRouter()

const isAuthenticated = computed(() => userStore.isAuthenticated)

onMounted(() => {
  if (userStore.isAuthenticated) {
    router.replace({ name: 'app' })
    return
  }
})

const handleSuccess = (result: msal.AuthenticationResult) => {
  router.replace({ name: 'app' })
}

const handleError = (error: unknown) => {
  console.error(error)
}
</script>
