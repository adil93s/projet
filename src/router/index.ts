import { createRouter, createWebHistory } from 'vue-router'
import { authGuard } from './guards'
import { Routes } from './routes'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'root',
      component: () => import('@/views/RootView.vue'),
      children: [
        {
          path: 'auth',
          component: () => import('@/layouts/AuthLayout.vue'),
          children: [
            {
              path: 'login',
              name: 'auth_login',
              component: () => import('@/views/auth/LoginView.vue')
            }
          ]
        },
        {
          path: 'app',
          name: 'app',
          component: () => import('@/layouts/AppLayout.vue'),
          beforeEnter: authGuard,
          children: [
            {
              path: 'dashboard',
              component: () => import('@/components/Proxy.vue'),
              children: [
                {
                  path: '',
                  name: Routes.APP_DASHBOARD,
                  component: () => import('@/views/app/dashboard/DashboardView.vue')
                }
              ]
            },
            {
              path: 'conversations',
              component: () => import('@/components/Proxy.vue'),
              children: [
                {
                  path: '',
                  name: Routes.APP_CONVERSATION_LIST,
                  component: () => import('@/views/app/conversation/ConversationListView.vue')
                },
                {
                  path: ':conversation_id',
                  name: Routes.APP_CONVERSATION_DETAIL,
                  component: () => import('@/views/app/conversation/ConversationDetailView.vue')
                }
              ]
            }
          ]
        }
      ]
    }
  ]
})

export default router
