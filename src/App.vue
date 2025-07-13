<script setup lang="ts">
import { RouterView } from 'vue-router'
import { onMounted } from 'vue'
import { useThemeStore } from '@/stores/theme'
import { useAuthStore } from '@/stores/auth'
import AppHeader from '@/components/AppHeader.vue'
import AppFooter from '@/components/AppFooter.vue'
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import WebsiteLayout from './layouts/WebsiteLayout.vue'
import DashboardLayout from './layouts/DashboardLayout.vue'

const themeStore = useThemeStore()
const authStore = useAuthStore()

onMounted(() => {
  themeStore.initTheme()
  authStore.checkAuth()
})

const route = useRoute()
const layoutComponent = computed(() => {
  if (route.meta.layout === 'dashboard') return DashboardLayout
  return WebsiteLayout
})
</script>

<template>
  <component :is="layoutComponent">
    <router-view />
  </component>
</template>

<style>
#app {
  font-family: 'Inter', sans-serif;
}
</style>
