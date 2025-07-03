<template>
  <aside
    class="flex flex-col justify-between beautiful-shadow shadow-medium h-screen z-10 font-inter text-white outline-neutral-900"
    :class="{
      'bg-neutral-900 ': isSidebarOpen,
      'outline cursor-e-resize': !isSidebarOpen
    }"
    @click="!isSidebarOpen && handleSidebar()"
  >
    <div
      class="relative z-10 py-6 px-2 border-b"
      :class="isSidebarOpen ? 'border-neutral-800' : 'border-neutral-900'"
    >
      <div class="flex flex-col gap-2">
        <div class="flex items-center justify-between">
          <component
            :is="isSidebarOpen ? 'RouterLink' : 'button'"
            v-tooltip.right="isSidebarOpen ? '' : 'Ouvrir la barre latérale'"
            :to="isSidebarOpen ? { name: Routes.APP_MESSAGE_LIST } : undefined"
            @click="isSidebarOpen ? undefined : handleSidebar"
            class="relative flex items-center justify-center w-10 h-10 rounded-xl transition-colors hover:bg-neutral-700/50"
            :class="!isSidebarOpen ? 'cursor-e-resize w-full' : 'cursor-pointer'"
            @mouseenter="isLogoHovered = true"
            @mouseleave="isLogoHovered = false"
          >
            <Logo
              class="transition-opacity"
              :size="24"
              :class="{
                'opacity-0': !isSidebarOpen && isLogoHovered
              }"
            />

            <IconSidebar
              v-if="!isSidebarOpen"
              :size="20"
              class="absolute inset-0 m-auto text-neutral-300 transition-opacity duration-150"
              :class="{ 'opacity-0': !isLogoHovered, 'opacity-100': isLogoHovered }"
            />
          </component>

          <button
            v-if="isSidebarOpen"
            v-tooltip="'Fermer la barre latérale'"
            class="flex items-center justify-center w-10 h-10 rounded-xl hover:bg-neutral-700/50 cursor-w-resize"
            @click.stop="handleSidebar"
          >
            <IconSidebar :size="20" class="text-neutral-300" />
          </button>
        </div>
        <Dropdown @click.stop position="bottom" widthFull ref="profileDropdownRef">
          <template #button>
            <div
              v-tooltip.right="isSidebarOpen ? '' : 'Mon profil'"
              :class="isSidebarOpen ? 'px-2.5 gap-4 justify-between' : 'justify-center'"
              class="flex py-2.5 justify-between cursor-pointer items-center bg-neutral-800/30 hover:bg-neutral-700/30 backdrop-blur-md rounded-xl z-10 border border-neutral-700"
            >
              <div
                class="flex items-center overflow-hidden"
                :class="isSidebarOpen ? 'gap-2' : 'gap-0'"
              >
                <IconMail class="text-neutral-300 shrink-0" :size="16" />
                <div v-if="isSidebarOpen" class="flex flex-col overflow-hidden">
                  <p class="text-neutral-100 text-xs font-inter truncate">
                    {{ user?.email }}
                  </p>
                </div>
              </div>
              <IconChevronDown v-if="isSidebarOpen" class="text-neutral-300" :size="16" />
            </div>
          </template>
          <template #content>
            <div
              :class="isSidebarOpen ? '' : 'w-60'"
              class="flex flex-col bg-neutral-900/90 backdrop-blur-lg shadow-lg border border-neutral-700 rounded-xl select-none"
            >
              <div class="flex items-center gap-2 px-2 py-2.5">
                <div class="relative">
                  <AvatarUser
                    :user="user"
                    width="w-9"
                    height="h-9"
                    class="shrink-0"
                    rounded="rounded-lg"
                  />

                  <div
                    class="absolute -top-1 -right-1 w-4 h-4 bg-emerald-400 rounded-full border-2 border-neutral-900 animate-pulse"
                  ></div>
                </div>

                <div class="flex flex-col text-white text-sm font-inter font-medium">
                  <span>{{ user?.name }}</span>
                  <span class="text-neutral-300"> {{ user?.email }} </span>
                </div>
              </div>

              <hr class="border-t border-neutral-700" />
              <span
                class="flex items-center gap-2 px-2 py-2 text-error-500 text-sm font-inter cursor-pointer hover:bg-error-900/50 font-medium"
                @click="handleLogout"
              >
                <IconLogout :size="20" />
                <span>Se déconnecter</span>
              </span>
              <hr class="border-t border-neutral-700" />
              <span
                class="flex items-center gap-2 rounded-b-lg px-2 py-2 text-white text-sm font-inter cursor-pointer hover:bg-neutral-700/50 font-medium"
                @click="handleHelp"
              >
                <IconHelp :size="20" />
                <span>Aide</span>
              </span>
            </div>
          </template>
        </Dropdown>
      </div>
    </div>
    <div class="pt-6 px-2 flex-1 flex flex-col gap-4">
      <Button
        v-tooltip.right="isSidebarOpen ? '' : 'Rédiger un message'"
        variant="secondary"
        fullWidth
        :paddingXY="isSidebarOpen ? undefined : 'py-2.5 px-0'"
        :gap="isSidebarOpen ? undefined : 'gap-0'"
        class="border-none"
        @click.stop="handleCompose"
      >
        <template #icon>
          <IconEdit :size="20" class="shrink-0 text-neutral-900" />
        </template>
        <span v-if="isSidebarOpen"> Rédiger </span>
      </Button>
      <nav class="flex flex-col gap-0.5 overflow-y-auto scrollbar-hidden">
        <RouterLink @click.stop.prevent :to="{ name: Routes.APP_MESSAGE_LIST }">
          <SidebarItem
            v-tooltip.right="isSidebarOpen ? '' : 'Boîte de réception'"
            :active="
              [Routes.APP_MESSAGE_LIST, Routes.APP_MESSAGE_DETAIL].includes(String(route.name))
            "
          >
            <template #icon>
              <IconInbox :size="20" class="shrink-0" />
            </template>
            <template #text>Boîte de réception</template>
            <template #badge>
              <span
                class="bg-neutral-600 text-neutral-200 text-xs px-2 py-1 rounded-full font-medium"
              >
                {{ inboxCount }}
              </span>
            </template>
          </SidebarItem>
        </RouterLink>
        <RouterLink @click.stop.prevent :to="{ name: Routes.APP_STARRED_LIST }">
          <SidebarItem
            v-tooltip.right="isSidebarOpen ? '' : 'Favoris'"
            :active="
              [Routes.APP_STARRED_LIST, Routes.APP_STARRED_DETAIL].includes(String(route.name))
            "
          >
            <template #icon>
              <IconStar :size="20" class="shrink-0" />
            </template>
            <template #text>Favoris</template>
          </SidebarItem>
        </RouterLink>
        <RouterLink @click.stop.prevent :to="{ name: Routes.APP_SENT_LIST }">
          <SidebarItem
            v-tooltip.right="isSidebarOpen ? '' : 'Envoyés'"
            :active="[Routes.APP_SENT_LIST, Routes.APP_SENT_DETAIL].includes(String(route.name))"
          >
            <template #icon>
              <IconSent :size="20" class="shrink-0" />
            </template>
            <template #text>Envoyés</template>
          </SidebarItem>
        </RouterLink>
        <RouterLink @click.stop.prevent :to="{ name: Routes.APP_DRAFT_LIST }">
          <SidebarItem
            v-tooltip.right="isSidebarOpen ? '' : 'Brouillons'"
            :active="[Routes.APP_DRAFT_LIST, Routes.APP_DRAFT_DETAIL].includes(String(route.name))"
          >
            <template #icon>
              <IconDraft :size="20" class="shrink-0" />
            </template>
            <template #text>Brouillons</template>
          </SidebarItem>
        </RouterLink>
        <RouterLink @click.stop.prevent :to="{ name: Routes.APP_TRASH_LIST }">
          <SidebarItem
            v-tooltip.right="isSidebarOpen ? '' : 'Corbeille'"
            :active="[Routes.APP_TRASH_LIST, Routes.APP_TRASH_DETAIL].includes(String(route.name))"
          >
            <template #icon>
              <IconTrash :size="20" class="shrink-0" />
            </template>
            <template #text>Corbeille</template>
          </SidebarItem>
        </RouterLink>
      </nav>
    </div>
    <div v-if="isSidebarOpen" class="flex flex-col gap-3 p-4 scrollbar-hidden">
      <p class="text-neutral-500 uppercase text-xs tracking-wider font-medium line-clamp-1">
        Stockage
      </p>
      <div class="w-full card-container">
        <div class="bg-neutral-800/80 backdrop-blur-md rounded-xl p-4">
          <div class="flex items-center justify-between mb-2">
            <span class="text-neutral-300 text-sm line-clamp-1">Utilisé</span>
            <span class="text-neutral-300 text-sm line-clamp-1">
              {{ toGB(storage?.used) }} Go sur {{ toGB(storage?.total) }} Go
            </span>
          </div>
          <div class="w-full bg-neutral-700 rounded-full h-2">
            <div
              class="bg-gradient-to-r from-green-400 to-blue-400 h-2 rounded-full"
              :style="{
                width: `${(toGB(storage?.used) / (toGB(storage?.total) || 1)) * 100}%`
              }"
            ></div>
          </div>
          <button
            class="w-full mt-3 text-xs text-neutral-400 hover:text-neutral-300 transition-colors line-clamp-1"
          >
            Gérer le stockage
          </button>
        </div>
      </div>
      <div class="flex items-center justify-center mt-4 space-x-2">
        <span class="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
        <span class="text-neutral-400 text-xs line-clamp-1">État du Système : Opérationnel</span>
      </div>
    </div>
  </aside>
</template>

<script setup lang="ts">
import AvatarUser from '@/components/avatars/AvatarUser.vue'
import Dropdown from '@/components/dropdown/Dropdown.vue'
import IconHelp from '@/components/icons/IconHelp.vue'
import IconLogout from '@/components/icons/IconLogout.vue'
import Button from '@/components/buttons/Button.vue'
import SidebarItem from '@/components/sidebar/SidebarItem.vue'
import { User } from '@/models/entities/User'
import { computed, onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { Routes } from '@/router/routes'
import { plainToInstance } from 'class-transformer'
import IconStar from '../icons/IconStar.vue'
import IconSent from '../icons/IconSent.vue'
import IconInbox from '../icons/IconInbox.vue'
import IconDraft from '../icons/IconDraft.vue'
import IconTrash from '../icons/IconTrash.vue'
import IconMail from '../icons/IconMail.vue'
import IconChevronDown from '../icons/IconChevronDown.vue'
import axiosInstance from '@/plugins/axios'
import IconSidebar from '../icons/IconSidebar.vue'
import { useLayout } from '@/stores/layout'
import Logo from '../illustrations/Logo.vue'
import { Storage } from '@/models/entities/Storage'
import IconEdit from '../icons/IconEdit.vue'

const route = useRoute()
const layoutStore = useLayout()
const isSidebarOpen = computed(() => layoutStore.isSidebarOpen)
const isLogoHovered = ref(false)

const props = defineProps<{
  user: User | null | undefined
}>()

const user = computed(() => plainToInstance(User, props.user))
const inboxCount = ref(0)
const storage = ref<Storage>()

const emit = defineEmits(['logout', 'openComposeModal'])

const profileDropdownRef = ref<InstanceType<typeof Dropdown> | null>(null)

const BYTES_IN_GB = 1024 * 1024 * 1024

function toGB(bytes?: number) {
  if (!bytes) return 0
  return +(bytes / BYTES_IN_GB).toFixed(2)
}

const handleHelp = async () => {
  closeProfileDropdown()
}

const closeProfileDropdown = () => {
  profileDropdownRef.value?.closeDropdown()
}

const handleCompose = () => {
  emit('openComposeModal')
}

const handleLogout = () => {
  emit('logout')
}

const handleSidebar = () => {
  layoutStore.setIsSidebarOpen(!layoutStore.isSidebarOpen)
}

const loadData = async () => {
  const responseInbox = await axiosInstance.get('/me/mailFolders/inbox', {
    params: {
      $select: 'unreadItemCount,totalItemCount'
    }
  })

  const responseStorage = await axiosInstance.get('/me/drive', {
    params: {
      $select: 'quota'
    }
  })

  inboxCount.value = responseInbox.data.totalItemCount
  storage.value = plainToInstance(Storage, responseStorage.data.quota as Storage)
}

onMounted(() => {
  loadData()
})
</script>
