<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
    <!-- Header -->
    <div class="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center py-6">
          <div>
            <h1 class="text-3xl font-bold text-gray-900 dark:text-white">Settings</h1>
            <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">Manage your account preferences and security</p>
          </div>
          <div class="flex items-center space-x-3">
            <button class="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200 flex items-center space-x-2">
              <i class="pi pi-save text-sm"></i>
              <span>Save Changes</span>
            </button>
          </div>
        </div>
      </div>
    </div>

    <div class="max-w-7xl mx-auto py-8">
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Profile Section -->
        <div class="lg:col-span-2">
          <div class="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
            <div class="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
              <h2 class="text-xl font-semibold text-gray-900 dark:text-white flex items-center">
                <i class="pi pi-user mr-3 text-blue-600"></i>
                Profile Information
              </h2>
            </div>
            <div class="p-6 space-y-6">
              <!-- Avatar Section -->
              <div class="flex items-center space-x-6">
                <div class="relative">
                  <img 
                    :src="profile.avatar" 
                    alt="Profile" 
                    class="w-20 h-20 rounded-full object-cover border-4 border-white dark:border-gray-700 shadow-lg"
                  >
                  <button class="absolute -bottom-1 -right-1 w-8 h-8 bg-blue-600 hover:bg-blue-700 text-white rounded-full flex items-center justify-center transition-colors duration-200">
                    <i class="pi pi-camera text-sm"></i>
                  </button>
                </div>
                <div>
                  <h3 class="text-lg font-medium text-gray-900 dark:text-white">{{ profile.name }}</h3>
                  <p class="text-gray-500 dark:text-gray-400">{{ profile.email }}</p>
                  <p class="text-sm text-gray-400 dark:text-gray-500">{{ profile.role }}</p>
                </div>
              </div>

              <!-- Profile Form -->
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Full Name</label>
                  <input 
                    v-model="profile.name" 
                    type="text" 
                    class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-colors duration-200"
                  >
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Email</label>
                  <input 
                    v-model="profile.email" 
                    type="email" 
                    class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-colors duration-200"
                  >
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Phone</label>
                  <input 
                    v-model="profile.phone" 
                    type="tel" 
                    class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-colors duration-200"
                  >
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Location</label>
                  <input 
                    v-model="profile.location" 
                    type="text" 
                    class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-colors duration-200"
                  >
                </div>
                <div class="md:col-span-2">
                  <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Bio</label>
                  <textarea 
                    v-model="profile.bio" 
                    rows="3" 
                    class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-colors duration-200 resize-none"
                  ></textarea>
                </div>
              </div>
            </div>
          </div>

          <!-- Security Section -->
          <div class="mt-8 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
            <div class="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
              <h2 class="text-xl font-semibold text-gray-900 dark:text-white flex items-center">
                <i class="pi pi-shield mr-3 text-green-600"></i>
                Security Settings
              </h2>
            </div>
            <div class="p-6 space-y-6">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Current Password</label>
                  <input 
                    v-model="security.currentPassword" 
                    type="password" 
                    class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-colors duration-200"
                  >
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">New Password</label>
                  <input 
                    v-model="security.newPassword" 
                    type="password" 
                    class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-colors duration-200"
                  >
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Confirm New Password</label>
                  <input 
                    v-model="security.confirmPassword" 
                    type="password" 
                    class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-colors duration-200"
                  >
                </div>
                <div class="flex items-end">
                  <button class="w-full px-4 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2">
                    <i class="pi pi-lock text-sm"></i>
                    <span>Update Password</span>
                  </button>
                </div>
              </div>

              <!-- Two-Factor Authentication -->
              <div class="border-t border-gray-200 dark:border-gray-700 pt-6">
                <div class="flex items-center justify-between">
                  <div>
                    <h3 class="text-lg font-medium text-gray-900 dark:text-white">Two-Factor Authentication</h3>
                    <p class="text-sm text-gray-500 dark:text-gray-400">Add an extra layer of security to your account</p>
                  </div>
                  <button class="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200">
                    {{ security.twoFactorEnabled ? 'Disable' : 'Enable' }}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Preferences Section -->
        <div class="space-y-6">
          <!-- Notifications -->
          <div class="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
            <div class="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
              <h2 class="text-xl font-semibold text-gray-900 dark:text-white flex items-center">
                <i class="pi pi-bell mr-3 text-purple-600"></i>
                Notifications
              </h2>
            </div>
            <div class="p-6 space-y-4">
              <div v-for="notification in notifications" :key="notification.id" class="flex items-center justify-between">
                <div>
                  <h4 class="text-sm font-medium text-gray-900 dark:text-white">{{ notification.title }}</h4>
                  <p class="text-xs text-gray-500 dark:text-gray-400">{{ notification.description }}</p>
                </div>
                <label class="relative inline-flex items-center cursor-pointer">
                  <input 
                    v-model="notification.enabled" 
                    type="checkbox" 
                    class="sr-only peer"
                  >
                  <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                </label>
              </div>
            </div>
          </div>

          <!-- Appearance -->
          <div class="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
            <div class="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
              <h2 class="text-xl font-semibold text-gray-900 dark:text-white flex items-center">
                <i class="pi pi-palette mr-3 text-orange-600"></i>
                Appearance
              </h2>
            </div>
            <div class="p-6 space-y-4">
              <div class="flex items-center justify-between">
                <div>
                  <h4 class="text-sm font-medium text-gray-900 dark:text-white">Dark Mode</h4>
                  <p class="text-xs text-gray-500 dark:text-gray-400">Switch between light and dark themes</p>
                </div>
                <label class="relative inline-flex items-center cursor-pointer">
                  <input 
                    v-model="preferences.darkMode" 
                    type="checkbox" 
                    class="sr-only peer"
                  >
                  <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                </label>
              </div>
              
              <div class="flex items-center justify-between">
                <div>
                  <h4 class="text-sm font-medium text-gray-900 dark:text-white">Compact Mode</h4>
                  <p class="text-xs text-gray-500 dark:text-gray-400">Reduce spacing for more content</p>
                </div>
                <label class="relative inline-flex items-center cursor-pointer">
                  <input 
                    v-model="preferences.compactMode" 
                    type="checkbox" 
                    class="sr-only peer"
                  >
                  <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                </label>
              </div>
            </div>
          </div>

          <!-- Language & Region -->
          <div class="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
            <div class="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
              <h2 class="text-xl font-semibold text-gray-900 dark:text-white flex items-center">
                <i class="pi pi-globe mr-3 text-indigo-600"></i>
                Language & Region
              </h2>
            </div>
            <div class="p-6 space-y-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Language</label>
                <select 
                  v-model="preferences.language" 
                  class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-colors duration-200"
                >
                  <option value="en">English</option>
                  <option value="es">Spanish</option>
                  <option value="fr">French</option>
                  <option value="de">German</option>
                </select>
              </div>
              
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Time Zone</label>
                <select 
                  v-model="preferences.timezone" 
                  class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-colors duration-200"
                >
                  <option value="UTC">UTC</option>
                  <option value="EST">Eastern Time</option>
                  <option value="PST">Pacific Time</option>
                  <option value="GMT">GMT</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed } from 'vue'
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()
const user = computed(() => authStore.user)

// Profile data
const profile = ref({
  name: user.value?.name || 'John Doe',
  email: user.value?.email || 'john.doe@example.com',
  phone: '+1 (555) 123-4567',
  location: 'New York, NY',
  bio: 'Experienced e-commerce manager with 5+ years in digital retail.',
  avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
  role: user.value?.role || 'Manager'
})

// Security settings
const security = ref({
  currentPassword: '',
  newPassword: '',
  confirmPassword: '',
  twoFactorEnabled: false
})

// Preferences
const preferences = ref({
  darkMode: false,
  compactMode: false,
  language: 'en',
  timezone: 'UTC'
})

// Notifications
const notifications = ref([
  {
    id: 1,
    title: 'New Orders',
    description: 'Get notified when new orders are placed',
    enabled: true
  },
  {
    id: 2,
    title: 'Low Stock Alerts',
    description: 'Receive alerts when products are running low',
    enabled: true
  },
  {
    id: 3,
    title: 'Customer Reviews',
    description: 'Get notified of new customer reviews',
    enabled: false
  },
  {
    id: 4,
    title: 'System Updates',
    description: 'Receive notifications about system maintenance',
    enabled: true
  },
  {
    id: 5,
    title: 'Marketing Campaigns',
    description: 'Get updates about marketing campaigns',
    enabled: false
  }
])

const saveSettings = () => {
  // Save all settings
  console.log('Saving settings:', {
    profile: profile.value,
    security: security.value,
    preferences: preferences.value,
    notifications: notifications.value
  })
}
</script> 