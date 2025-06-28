<template>
  <BaseButton @click="signIn" :loading="loading" variant="secondary">
    <template #icon>
      <IconMicrosoft :size="18" class="text-neutral-900" />
    </template>
    <span>Continuer avec Microsoft</span>
  </BaseButton>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import BaseButton from '@/components/buttons/BaseButton.vue'
import IconMicrosoft from '@/components/icons/IconMicrosoft.vue'
import * as msal from '@azure/msal-browser'
import { useUser } from '@/stores/user'
import { msalInstance } from '@/plugins/msal'

const requestedScopes: msal.PopupRequest = {
  scopes: ['openid', 'profile', 'offline_access', 'User.Read', 'Mail.Read'],
  redirectUri: import.meta.env.VITE_AZURE_AD_REDIRECT_URI as string
}
const userStore = useUser()
const loading = ref(false)

const emit = defineEmits<{
  (e: 'success', result: msal.AuthenticationResult): void
  (e: 'error', error: unknown): void
}>()

async function signIn() {
  loading.value = true
  try {
    const authResult = await msalInstance.loginPopup(requestedScopes)
    msalInstance.setActiveAccount(authResult.account)

    userStore.setUser({
      id: authResult.account?.localAccountId ?? '',
      email: authResult.account?.username ?? '',
      name: authResult.account?.name ?? '',
      token: authResult.idToken,
      token_graph: authResult.accessToken
    } as any)

    emit('success', authResult)
  } catch (err) {
    console.error('MSAL sign-in error', err)
    emit('error', err)
  } finally {
    loading.value = false
  }
}
</script>
