import type { NavigationGuardNext, RouteLocationNormalized } from 'vue-router'
import { useUser } from '@/stores/user'
import { Routes } from './routes'

export function authGuard(
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext
) {
  const userStore = useUser()

  if (userStore.isAuthenticated) {
    next()
  } else {
    next({ name: Routes.AUTH_LOGIN })
  }
}

export function adminGuard(
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext
) {
  const userRole = localStorage.getItem('user-role') // Récupère le rôle de l'utilisateur
  if (userRole === 'admin') {
    next() // L'utilisateur est un admin, autorise la navigation
  } else {
    next('/not-authorized') // Redirige vers une page d'accès refusé
  }
}
