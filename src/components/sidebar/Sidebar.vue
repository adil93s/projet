<template>
  <div
    class="flex flex-col justify-between w-64 bg-neutral-900 shadow-medium h-screen z-10 font-inter text-white"
  >
    <vue-particles id="tsparticles" :options="options" class="-z-10" />

    <div class="relative z-10 p-6 border-b border-neutral-600/30">
      <span
        class="px-3 py-1 bg-neutral-700/80 rounded-full text-xs text-neutral-300 mb-3 inline-block uppercase"
        >Dev web</span
      >
      <h2 class="heading-font text-2xl text-white">Project</h2>
      <div class="h-1 w-12 bg-neutral-500 mt-2 rounded-full"></div>
    </div>

    <nav class="pt-6 flex flex-col justify-between flex-1 px-4 overflow-y-auto">
      <div class="flex flex-col gap-4">
        <div class="flex flex-col gap-0.5">
          <router-link :to="{ name: Routes.APP_DASHBOARD }">
            <SidebarItem :active="[Routes.APP_DASHBOARD].includes(String(route.name))">
              <template #icon>
                <IconHome
                  :class="
                    [Routes.APP_DASHBOARD].includes(String(route.name))
                      ? 'text-white'
                      : 'text-neutral-200'
                  "
                />
              </template>
              <template #text>Accueil</template>
            </SidebarItem>
          </router-link>
          <router-link :to="{ name: Routes.APP_CONVERSATION_LIST }">
            <SidebarItem
              :active="
                [Routes.APP_CONVERSATION_LIST, Routes.APP_CONVERSATION_DETAIL].includes(
                  String(route.name)
                )
              "
            >
              <template #icon>
                <IconChat
                  :class="
                    [Routes.APP_CONVERSATION_LIST, Routes.APP_CONVERSATION_DETAIL].includes(
                      String(route.name)
                    )
                      ? 'text-white'
                      : 'text-neutral-200'
                  "
                />
              </template>
              <template #text>Conversations</template>
            </SidebarItem>
          </router-link>
        </div>
      </div>
    </nav>
    <div class="flex flex-col gap-4 py-4">
      <Dropdown custom-class="bottom-0 left-64" widthFull ref="profileDropdownRef">
        <template #button>
          <div
            class="flex gap-4 mx-4 p-3 justify-between cursor-pointer items-center bg-neutral-800/30 hover:bg-white/10 backdrop-blur-md rounded-xl px-4 py-3 z-10 border border-neutral-700"
          >
            <div class="flex gap-2 items-center overflow-hidden">
              <AvatarUser :user="user" width="w-8" height="h-8" class="shrink-0" />
              <div class="flex flex-col overflow-hidden">
                <p class="text-white text-sm font-medium font-inter truncate">
                  {{ user?.name }}
                </p>
                <p class="text-neutral-300 text-xs font-inter truncate">
                  {{ user?.email }}
                </p>
              </div>
            </div>
          </div>
        </template>
        <template #content>
          <div
            class="flex flex-col bg-neutral-900/60 backdrop-blur-md shadow-lg border border-neutral-700 rounded-lg"
          >
            <div class="flex flex-col px-3.5 py-2.5 text-white text-sm font-inter font-medium">
              <span>{{ user?.name }}</span>
              <span class="text-neutral-300"> {{ user?.email }} </span>
            </div>
            <hr class="border-t border-neutral-700" />
            <span
              class="flex items-center gap-2 px-2 py-2 text-white text-sm font-inter cursor-pointer hover:bg-neutral-800 font-medium"
              @click="handleLogout"
            >
              <IconLogout class="text-white" :size="24" />
              <span>Se déconnecter</span>
            </span>
            <hr class="border-t border-neutral-700" />
            <span
              class="flex items-center gap-2 rounded-b-lg px-2 py-2 text-white text-sm font-inter cursor-pointer hover:bg-neutral-800 font-medium"
              @click="handleHelp"
            >
              <IconHelp class="text-white" :size="24" />
              <span>Aide</span>
            </span>
          </div>
        </template>
      </Dropdown>
    </div>
  </div>
</template>

<script setup lang="ts">
import AvatarUser from '@/components/avatars/AvatarUser.vue'
import Dropdown from '@/components/dropdown/Dropdown.vue'
import IconChat from '@/components/icons/IconChat.vue'
import IconHelp from '@/components/icons/IconHelp.vue'
import IconHome from '@/components/icons/IconHome.vue'
import IconLogout from '@/components/icons/IconLogout.vue'
import IconChevronUpDown from '../icons/IconChevronUpDown.vue'
import SidebarItem from '@/components/sidebar/SidebarItem.vue'
import { User } from '@/models/entities/User'
import { useUser } from '@/stores/user'
import { computed, onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { Routes } from '@/router/routes'
import { plainToInstance } from 'class-transformer'
import type { ISourceOptions } from '@tsparticles/engine'

const route = useRoute()

const props = defineProps<{
  user: User | null | undefined
}>()

const userStore = useUser()
const user = computed(() => plainToInstance(User, props.user))

const emit = defineEmits(['logout', 'openAddCreditModal'])

const profileDropdownRef = ref<InstanceType<typeof Dropdown> | null>(null)

const handleHelp = async () => {
  closeProfileDropdown()
}

const closeProfileDropdown = () => {
  profileDropdownRef.value?.closeDropdown()
}

const handleLogout = () => {
  emit('logout')
}

const options: ISourceOptions = {
  particles: {
    number: { value: 120, density: { enable: true, area: 800 } },
    color: { value: '#d4d4d8' },
    shape: { type: 'circle' },
    opacity: { value: 0.3 },

    size: { value: 2 },
    links: {
      enable: true,
      distance: 120,
      color: '#a1a1aa',
      opacity: 0.2,
      width: 1
    },
    move: {
      enable: true,
      speed: 1,
      direction: 'none',
      random: false,
      straight: false,
      outModes: 'out'
    }
  },
  style: {
    position: 'absolute',
    width: '100%',
    height: '100%'
  },
  interactivity: {
    detect_on: 'canvas',
    events: {
      onHover: { enable: true, mode: 'repulse' },
      resize: { enable: true }
    },
    modes: {
      repulse: { distance: 80, duration: 0.4 }
    }
  },
  detectRetina: true
}
</script>
