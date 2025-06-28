import { useUser } from '@/stores/user'
import { EventType, type AuthenticationResult } from '@azure/msal-browser'
import * as msal from '@azure/msal-browser'

export const msalInstance = new msal.PublicClientApplication({
  auth: {
    clientId: import.meta.env.VITE_AZURE_CLIENT_ID as string,
    redirectUri: import.meta.env.VITE_AZURE_AD_REDIRECT_URI as string
  },
  cache: {
    cacheLocation: 'sessionStorage'
  }
})

msalInstance.addEventCallback((event) => {
  if (event.eventType !== EventType.LOGIN_SUCCESS || !event.payload) return

  const result = event.payload as AuthenticationResult
  msalInstance.setActiveAccount(result.account)

  const userStore = useUser()

  userStore.setUser({
    id: result.account?.localAccountId ?? '',
    email: result.account?.username ?? '',
    name: result.account?.name ?? '',
    token: result.idToken,
    token_graph: result.accessToken
  } as any)
})
