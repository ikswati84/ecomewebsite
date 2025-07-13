<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900 flex">
    <!-- Sidebar -->
    <aside :class="['fixed z-30 top-0 left-0 h-screen bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 shadow-lg flex flex-col transition-all duration-300', sidebarOpen ? 'translate-x-0 w-[270px]' : '-translate-x-full md:translate-x-0 md:w-[70px]']">
      <div class="flex items-center justify-between h-16 px-3 border-b border-gray-200 dark:border-gray-700">
        <span :class="['font-bold text-primary-600 tracking-wide transition-all duration-300', sidebarOpen ? 'text-xl px-0' : 'text-lg md:hidden md:px-0']">Admin</span>
        <button class="md:hidden p-2" @click="sidebarOpen = false">
          <i class="pi pi-times text-gray-700 dark:text-gray-200"></i>
        </button>
        <!-- Collapse/Expand Button for Desktop -->
        <button class="hidden md:block p-1.5 w-8 h-8 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-200 flex-shrink-0" @click="toggleSidebar">
          <i class="pi pi-bars text-gray-700 dark:text-gray-200"></i>
        </button>
      </div>
      <nav class="flex-1 py-6 px-3 space-y-1 overflow-x-hidden">
        <router-link v-for="item in sidebarLinks.filter(link => link.label !== 'Logout')" :key="item.label" :to="item.to" class="group relative flex items-center p-1 rounded-lg text-gray-700 dark:text-gray-200 hover:bg-primary-50 dark:hover:bg-primary-900 transition-all duration-200 font-medium">
          <span v-html="item.icon" :class="[item.color, 'flex-shrink-0 h-8 w-8 p-2 rounded-lg flex items-center justify-center shadow-sm mr-3']"></span>
          <span :class="['transition-all duration-300 whitespace-nowrap', sidebarOpen ? 'ml-3' : 'md:opacity-0 md:w-0 md:overflow-hidden']">{{ item.label }}</span>
          <!-- Tooltip for collapsed state -->
          <span v-if="!sidebarOpen" class="absolute left-[70px] top-1/2 -translate-y-1/2 bg-gray-900 text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap z-40 transition-opacity duration-200 md:block shadow-lg">{{ item.label }}</span>
        </router-link>
        
        <!-- Logout Button -->
        <button @click="handleSidebarLogout" class="group relative flex items-center w-full p-1 rounded-lg text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all duration-200 font-medium mt-4">
          <span class="bg-gradient-to-br from-red-100 to-red-200 dark:from-red-900 dark:to-red-800 text-red-600 dark:text-red-400 flex-shrink-0 h-8 w-8 p-2 rounded-lg flex items-center justify-center shadow-sm mr-3">
            <i class="pi pi-sign-out"></i>
          </span>
          <span :class="['transition-all duration-300 whitespace-nowrap', sidebarOpen ? 'ml-3' : 'md:opacity-0 md:w-0 md:overflow-hidden']">Logout</span>
          <!-- Tooltip for collapsed state -->
          <span v-if="!sidebarOpen" class="absolute left-[70px] top-1/2 -translate-y-1/2 bg-gray-900 text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap z-40 transition-opacity duration-200 md:block shadow-lg">Logout</span>
        </button>
      </nav>
    </aside>

    <!-- Overlay for mobile sidebar -->
    <div v-if="sidebarOpen" class="fixed inset-0 bg-black bg-opacity-30 z-20 md:hidden" @click="sidebarOpen = false"></div>

    <!-- Main Content Area -->
    <div :class="['flex-1 flex flex-col min-h-screen max-w-[100vw] transition-all duration-300', sidebarOpen ? 'md:pl-[270px]' : 'md:pl-[70px]']">
      <!-- Header Bar -->
      <header class="sticky top-0 z-20 flex items-center justify-between h-16 px-4 md:px-6 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 shadow-sm">
        <div class="flex items-center space-x-4">
          <button class="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700" @click="sidebarOpen = true">
            <i class="pi pi-bars text-gray-700 dark:text-gray-200"></i>
          </button>
          <span class="text-xl font-bold text-primary-600 tracking-wide hidden md:block">Dashboard</span>
        </div>
        <div class="flex items-center space-x-2 md:space-x-4">
          <ThemeToggle />
          <!-- Notification Dropdown -->
          <div class="relative">
            <button @click="toggleDropdown('notification')" class="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 relative">
              <i class="pi pi-bell h-6 w-6 text-gray-700 dark:text-gray-200"></i>
              <span v-if="notifications.length > 0" class="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            <div v-if="dropdownOpen === 'notification'" class="absolute right-0 mt-2 w-80 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-50">
              <div class="p-4 border-b border-gray-200 dark:border-gray-700">
                <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Notifications</h3>
                <p class="text-sm text-gray-500 dark:text-gray-400">{{ notifications.length }} new notifications</p>
              </div>
              <div class="max-h-64 overflow-y-auto">
                <div v-if="notifications.length === 0" class="p-4 text-center text-gray-500 dark:text-gray-400">
                  <i class="pi pi-bell text-2xl mb-2"></i>
                  <p>No new notifications</p>
                </div>
                <div v-for="notification in notifications" :key="notification.id" class="p-4 border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                  <div class="flex items-start space-x-3">
                    <div :class="['w-2 h-2 rounded-full mt-2', notification.type === 'order' ? 'bg-blue-500' : notification.type === 'alert' ? 'bg-red-500' : 'bg-green-500']"></div>
                    <div class="flex-1">
                      <p class="text-sm font-medium text-gray-900 dark:text-white">{{ notification.title }}</p>
                      <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">{{ notification.message }}</p>
                      <p class="text-xs text-gray-400 dark:text-gray-500 mt-2">{{ formatTime(notification.time) }}</p>
                    </div>
                  </div>
                </div>
              </div>
              <div class="p-3 border-t border-gray-200 dark:border-gray-700">
                <button class="w-full text-sm text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-medium">
                  View all notifications
                </button>
              </div>
            </div>
          </div>
          <!-- Chat Dropdown -->
          <div class="relative">
            <button @click="toggleDropdown('chat')" class="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 relative">
              <i class="pi pi-comments h-6 w-6 text-gray-700 dark:text-gray-200"></i>
              <span v-if="chatMessages.length > 0" class="absolute top-1 right-1 w-2 h-2 bg-green-500 rounded-full"></span>
            </button>
            <div v-if="dropdownOpen === 'chat'" class="absolute right-0 mt-2 w-80 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-50">
              <div class="p-4 border-b border-gray-200 dark:border-gray-700">
                <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Messages</h3>
                <p class="text-sm text-gray-500 dark:text-gray-400">{{ chatMessages.length }} new messages</p>
              </div>
              <div class="max-h-64 overflow-y-auto">
                <div v-if="chatMessages.length === 0" class="p-4 text-center text-gray-500 dark:text-gray-400">
                  <i class="pi pi-comments text-2xl mb-2"></i>
                  <p>No new messages</p>
                </div>
                <div v-for="message in chatMessages" :key="message.id" class="p-4 border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                  <div class="flex items-start space-x-3">
                    <img :src="message.avatar" :alt="message.sender" class="w-8 h-8 rounded-full">
                    <div class="flex-1">
                      <div class="flex items-center justify-between">
                        <p class="text-sm font-medium text-gray-900 dark:text-white">{{ message.sender }}</p>
                        <span class="text-xs text-gray-400 dark:text-gray-500">{{ formatTime(message.time) }}</span>
                      </div>
                      <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">{{ message.message }}</p>
                      <div class="flex items-center mt-2 space-x-2">
                        <span class="text-xs text-gray-400 dark:text-gray-500">{{ message.type }}</span>
                        <span v-if="message.unread" class="w-2 h-2 bg-blue-500 rounded-full"></span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="p-3 border-t border-gray-200 dark:border-gray-700">
                <button class="w-full text-sm text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-medium">
                  View all messages
                </button>
              </div>
            </div>
          </div>
          <!-- Profile Dropdown -->
          <div class="relative">
            <button @click="toggleDropdown('profile')" class="flex items-center space-x-2 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700">
              <img :src="user?.avatar || 'https://randomuser.me/api/portraits/men/32.jpg'" class="w-8 h-8 rounded-full border-2 border-primary-600" :alt="user?.name || 'Admin'" />
              <span class="hidden md:block text-gray-900 dark:text-white font-medium">{{ user?.name || 'Admin' }}</span>
              <i class="pi pi-chevron-down h-4 w-4 text-gray-500 dark:text-gray-300"></i>
            </button>
            <div v-if="dropdownOpen === 'profile'" class="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-50">
              <router-link to="/" class="flex items-center px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">
                <i class="pi pi-globe mr-3 text-gray-500 dark:text-gray-400"></i>
                Website
              </router-link>
              <router-link to="/admin/settings" class="flex items-center px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">
                <i class="pi pi-cog mr-3 text-gray-500 dark:text-gray-400"></i>
                Settings
              </router-link>
              <div class="border-t border-gray-200 dark:border-gray-700"></div>
              <button @click="handleLogout" class="flex items-center w-full px-4 py-2 text-red-600 hover:bg-gray-100 dark:hover:bg-gray-700">
                <i class="pi pi-sign-out mr-3 text-red-500"></i>
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>
      <!-- Main Content Slot -->
      <main class="flex-1 p-4 md:p-6 lg:p-8">
        <slot />
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import ThemeToggle from '@/components/ThemeToggle.vue'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const authStore = useAuthStore()
const user = computed(() => authStore.user)

const sidebarOpen = ref(true)
const dropdownOpen = ref(null)

// Dynamic notifications data
const notifications = ref([
  {
    id: 1,
    title: 'New Order Received',
    message: 'Order #12345 has been placed by John Doe',
    type: 'order',
    time: new Date(Date.now() - 5 * 60 * 1000) // 5 minutes ago
  },
  {
    id: 2,
    title: 'Payment Successful',
    message: 'Payment of $299.99 received for Order #12344',
    type: 'success',
    time: new Date(Date.now() - 15 * 60 * 1000) // 15 minutes ago
  },
  {
    id: 3,
    title: 'Low Stock Alert',
    message: 'Product "Wireless Headphones" is running low on stock',
    type: 'alert',
    time: new Date(Date.now() - 30 * 60 * 1000) // 30 minutes ago
  },
  {
    id: 4,
    title: 'Customer Review',
    message: 'Sarah Wilson left a 5-star review for "Smart Watch"',
    type: 'success',
    time: new Date(Date.now() - 45 * 60 * 1000) // 45 minutes ago
  }
])

// Dynamic chat messages data
const chatMessages = ref([
  {
    id: 1,
    sender: 'Sarah Wilson',
    message: 'Hi! I have a question about my recent order...',
    type: 'Customer Support',
    avatar: 'https://randomuser.me/api/portraits/women/32.jpg',
    time: new Date(Date.now() - 2 * 60 * 1000), // 2 minutes ago
    unread: true
  },
  {
    id: 2,
    sender: 'Mike Johnson',
    message: 'The delivery was perfect, thank you!',
    type: 'Customer',
    avatar: 'https://randomuser.me/api/portraits/men/45.jpg',
    time: new Date(Date.now() - 10 * 60 * 1000), // 10 minutes ago
    unread: false
  },
  {
    id: 3,
    sender: 'Emily Davis',
    message: 'Can you help me with a return request?',
    type: 'Customer Support',
    avatar: 'https://randomuser.me/api/portraits/women/28.jpg',
    time: new Date(Date.now() - 25 * 60 * 1000), // 25 minutes ago
    unread: true
  }
])

function toggleSidebar() {
  sidebarOpen.value = !sidebarOpen.value
}

function toggleDropdown(type) {
  dropdownOpen.value = dropdownOpen.value === type ? null : type
}

function formatTime(date) {
  const now = new Date()
  const diff = now - date
  const minutes = Math.floor(diff / (1000 * 60))
  const hours = Math.floor(diff / (1000 * 60 * 60))
  const days = Math.floor(diff / (1000 * 60 * 60 * 24))
  
  if (minutes < 1) return 'Just now'
  if (minutes < 60) return `${minutes}m ago`
  if (hours < 24) return `${hours}h ago`
  if (days < 7) return `${days}d ago`
  return date.toLocaleDateString()
}

function handleLogout() {
  authStore.logout()
  dropdownOpen.value = null
}

function handleSidebarLogout() {
  authStore.logout()
}

const sidebarLinks = [
  { label: 'Dashboard', to: '/admin/dashboard', icon: '<i class="pi pi-home"></i>', color: 'bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-900 dark:to-blue-800 text-blue-600 dark:text-blue-400' },
  { label: 'Orders', to: '/admin/orders', icon: '<i class="pi pi-shopping-cart"></i>', color: 'bg-gradient-to-br from-green-100 to-green-200 dark:from-green-900 dark:to-green-800 text-green-600 dark:text-green-400' },
  { label: 'Products', to: '/admin/products', icon: '<i class="pi pi-box"></i>', color: 'bg-gradient-to-br from-orange-100 to-orange-200 dark:from-orange-900 dark:to-orange-800 text-orange-600 dark:text-orange-400' },
  { label: 'Categories', to: '/admin/categories', icon: '<i class="pi pi-tags"></i>', color: 'bg-gradient-to-br from-purple-100 to-purple-200 dark:from-purple-900 dark:to-purple-800 text-purple-600 dark:text-purple-400' },
  { label: 'Customers', to: '/admin/customers', icon: '<i class="pi pi-users"></i>', color: 'bg-gradient-to-br from-indigo-100 to-indigo-200 dark:from-indigo-900 dark:to-indigo-800 text-indigo-600 dark:text-indigo-400' },
  { label: 'Reviews', to: '/admin/reviews', icon: '<i class="pi pi-star"></i>', color: 'bg-gradient-to-br from-yellow-100 to-yellow-200 dark:from-yellow-900 dark:to-yellow-800 text-yellow-600 dark:text-yellow-400' },
  { label: 'Analytics', to: '/admin/analytics', icon: '<i class="pi pi-chart-bar"></i>', color: 'bg-gradient-to-br from-green-100 to-green-200 dark:from-green-900 dark:to-green-800 text-green-600 dark:text-green-400' },
  { label: 'Settings', to: '/admin/settings', icon: '<i class="pi pi-cog"></i>', color: 'bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-900 dark:to-gray-800 text-gray-600 dark:text-gray-400' },
]
</script> 