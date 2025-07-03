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
              path: 'messages',
              component: () => import('@/components/Proxy.vue'),
              children: [
                {
                  path: '',
                  name: Routes.APP_MESSAGE_LIST,
                  component: () => import('@/views/app/message/MessageListView.vue')
                },
                {
                  path: ':message_id',
                  name: Routes.APP_MESSAGE_DETAIL,
                  component: () => import('@/views/app/message/MessageDetailView.vue')
                }
              ]
            },
            {
              path: 'starred',
              component: () => import('@/components/Proxy.vue'),
              children: [
                {
                  path: '',
                  name: Routes.APP_STARRED_LIST,
                  component: () => import('@/views/app/starred/StarredListView.vue')
                },
                {
                  path: ':starred_id',
                  name: Routes.APP_STARRED_DETAIL,
                  component: () => import('@/views/app/starred/StarredDetailView.vue')
                }
              ]
            },
            {
              path: 'sents',
              component: () => import('@/components/Proxy.vue'),
              children: [
                {
                  path: '',
                  name: Routes.APP_SENT_LIST,
                  component: () => import('@/views/app/sent/SentListView.vue')
                },
                {
                  path: ':sent_id',
                  name: Routes.APP_SENT_DETAIL,
                  component: () => import('@/views/app/sent/SentDetailView.vue')
                }
              ]
            },
            {
              path: 'drafts',
              component: () => import('@/components/Proxy.vue'),
              children: [
                {
                  path: '',
                  name: Routes.APP_DRAFT_LIST,
                  component: () => import('@/views/app/draft/DraftListView.vue')
                },
                {
                  path: ':draft_id',
                  name: Routes.APP_DRAFT_DETAIL,
                  component: () => import('@/views/app/draft/DraftDetailView.vue')
                }
              ]
            },
            {
              path: 'trash',
              component: () => import('@/components/Proxy.vue'),
              children: [
                {
                  path: '',
                  name: Routes.APP_TRASH_LIST,
                  component: () => import('@/views/app/trash/TrashListView.vue')
                },
                {
                  path: ':trash_id',
                  name: Routes.APP_TRASH_DETAIL,
                  component: () => import('@/views/app/trash/TrashDetailView.vue')
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
