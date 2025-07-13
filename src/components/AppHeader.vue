<template>
  <header class="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700 relative">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-16">
        <!-- Logo -->
        <div class="flex items-center">
          <router-link to="/" class="flex items-center space-x-2">
            <div class="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
              <span class="text-white font-bold text-lg">B</span>
            </div>
            <span class="text-xl font-bold text-gray-900 dark:text-white">BrandShop</span>
          </router-link>
        </div>

        <!-- Navigation -->
        <nav class="hidden md:flex space-x-8">
          <router-link
            to="/"
            class="text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 px-3 py-2 text-sm font-medium transition-colors duration-200"
            active-class="text-primary-600 dark:text-primary-400"
          >
            Home
          </router-link>
          
          <!-- Categories Dropdown -->
          <div class="relative group">
            <button class="text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 px-3 py-2 text-sm font-medium transition-colors duration-200 flex items-center space-x-1">
              <span>Categories</span>
              <ChevronDownIcon class="h-4 w-4 transition-transform duration-200 group-hover:rotate-180" />
            </button>
            <div class="fixed top-16 left-0 right-0 mt-2 bg-white dark:bg-gray-800 shadow-2xl border border-gray-200 dark:border-gray-700 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50 transform scale-95 group-hover:scale-100 w-screen max-w-none">
              <div class="p-4 sm:p-6 lg:p-8">
                <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-3 sm:gap-4 lg:gap-6">
                  <router-link
                    v-for="category in categories"
                    :key="category.id"
                    :to="`/category/${category.slug}`"
                    class="group/category flex items-center space-x-3 sm:space-x-4 p-3 sm:p-4 hover:bg-gradient-to-r hover:from-primary-50 hover:to-primary-100 dark:hover:from-gray-700 dark:hover:to-gray-600 transition-all duration-300 hover:shadow-lg hover:scale-105 border border-transparent hover:border-primary-200 dark:hover:border-gray-600 cursor-pointer"
                    @click="closeDropdown"
                  >
                    <div class="relative flex-shrink-0">
                      <img :src="category.image" :alt="category.name" class="w-10 h-10 sm:w-12 sm:h-12 object-cover shadow-md group-hover/category:shadow-lg transition-shadow duration-300" />
                                              <div class="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover/category:opacity-100 transition-opacity duration-300"></div>
                    </div>
                    <div class="flex-1 min-w-0">
                      <h3 class="text-sm font-semibold text-gray-900 dark:text-white group-hover/category:text-primary-600 dark:group-hover/category:text-primary-400 transition-colors duration-300 truncate">
                        {{ category.name }}
                      </h3>
                      <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">{{ category.productCount }} products</p>
                      <div class="mt-2 flex items-center space-x-1">
                        <div class="w-2 h-2 bg-primary-500"></div>
                        <span class="text-xs text-primary-600 dark:text-primary-400 font-medium">Shop Now</span>
                      </div>
                    </div>
                    <ChevronRightIcon class="h-4 w-4 text-gray-400 group-hover/category:text-primary-500 transition-colors duration-300 opacity-0 group-hover/category:opacity-100 transform translate-x-2 group-hover/category:translate-x-0 flex-shrink-0" />
                  </router-link>
                </div>
                
                <!-- Featured Categories Section -->
                <div class="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                  <h3 class="text-sm font-semibold text-gray-900 dark:text-white mb-4">Featured Categories</h3>
                  <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-3">
                    <router-link
                      v-for="category in categories.slice(0, 8)"
                      :key="`featured-${category.id}`"
                      :to="`/category/${category.slug}`"
                      class="flex flex-col items-center p-2 sm:p-3 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200 group/featured cursor-pointer"
                      @click="closeDropdown"
                    >
                      <div class="relative mb-2">
                        <img :src="category.image" :alt="category.name" class="w-6 h-6 sm:w-8 sm:h-8 object-cover" />
                        <div class="absolute inset-0 bg-primary-500/20 opacity-0 group-hover/featured:opacity-100 transition-opacity duration-200"></div>
                      </div>
                      <span class="text-xs font-medium text-gray-700 dark:text-gray-300 group-hover/featured:text-primary-600 dark:group-hover/featured:text-primary-400 transition-colors duration-200 text-center truncate w-full">
                        {{ category.name }}
                      </span>
                    </router-link>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <router-link
            to="/products"
            class="text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 px-3 py-2 text-sm font-medium transition-colors duration-200"
            active-class="text-primary-600 dark:text-primary-400"
          >
            Products
          </router-link>
          <router-link
            to="/about"
            class="text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 px-3 py-2 text-sm font-medium transition-colors duration-200"
            active-class="text-primary-600 dark:text-primary-400"
          >
            About
          </router-link>
          <router-link
            to="/contact"
            class="text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 px-3 py-2 text-sm font-medium transition-colors duration-200"
            active-class="text-primary-600 dark:text-primary-400"
          >
            Contact
          </router-link>
        </nav>

        <!-- Right side actions -->
        <div class="flex items-center space-x-4">
          <!-- Wishlist -->
          <router-link
            to="/wishlist"
            class="relative p-2 text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-200"
          >
            <HeartIcon class="h-6 w-6" />
            <span
              v-if="wishlistCount > 0"
              class="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center"
            >
              {{ wishlistCount }}
            </span>
          </router-link>
          
          <!-- Theme Toggle -->
          <ThemeToggle />
          
          <!-- Shopping Cart -->
          <ShoppingCart />

          <!-- Auth Buttons -->
          <div class="hidden md:flex items-center space-x-2">
            <router-link
              to="/login"
              class="text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 px-3 py-2 text-sm font-medium transition-colors duration-200"
            >
              Sign In
            </router-link>
            <router-link
              to="/register"
              class="bg-primary-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary-700 transition-colors duration-200"
            >
              Sign Up
            </router-link>
          </div>

          <!-- Mobile menu button -->
          <button
            @click="isMobileMenuOpen = !isMobileMenuOpen"
            class="md:hidden p-2 text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-200"
          >
            <Bars3Icon v-if="!isMobileMenuOpen" class="h-6 w-6" />
            <XMarkIcon v-else class="h-6 w-6" />
          </button>
        </div>
      </div>

      <!-- Mobile menu -->
      <div v-if="isMobileMenuOpen" class="md:hidden">
        <div class="px-2 pt-2 pb-3 space-y-1 sm:px-3 border-t border-gray-200 dark:border-gray-700">
          <router-link
            to="/"
            class="text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 block px-3 py-2 text-base font-medium transition-colors duration-200"
            active-class="text-primary-600 dark:text-primary-400"
            @click="isMobileMenuOpen = false"
          >
            Home
          </router-link>
          
          <!-- Mobile Categories -->
          <div class="border-t border-gray-200 dark:border-gray-700 pt-4 mt-4">
            <h3 class="text-sm font-semibold text-gray-900 dark:text-white mb-3 px-3">Categories</h3>
            <div class="space-y-2">
              <router-link
                v-for="category in categories"
                :key="`mobile-${category.id}`"
                :to="`/category/${category.slug}`"
                class="flex items-center space-x-3 px-3 py-2 text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
                @click="isMobileMenuOpen = false"
              >
                <img :src="category.image" :alt="category.name" class="w-8 h-8 rounded-lg object-cover" />
                <div>
                  <span class="text-sm font-medium">{{ category.name }}</span>
                  <p class="text-xs text-gray-500 dark:text-gray-400">{{ category.productCount }} products</p>
                </div>
              </router-link>
            </div>
          </div>
          <router-link
            to="/products"
            class="text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 block px-3 py-2 text-base font-medium transition-colors duration-200"
            active-class="text-primary-600 dark:text-primary-400"
            @click="isMobileMenuOpen = false"
          >
            Products
          </router-link>
          <router-link
            to="/about"
            class="text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 block px-3 py-2 text-base font-medium transition-colors duration-200"
            active-class="text-primary-600 dark:text-primary-400"
            @click="isMobileMenuOpen = false"
          >
            About
          </router-link>
          <router-link
            to="/contact"
            class="text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 block px-3 py-2 text-base font-medium transition-colors duration-200"
            active-class="text-primary-600 dark:text-primary-400"
            @click="isMobileMenuOpen = false"
          >
            Contact
          </router-link>
          <router-link
            to="/wishlist"
            class="text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 block px-3 py-2 text-base font-medium transition-colors duration-200"
            active-class="text-primary-600 dark:text-primary-400"
            @click="isMobileMenuOpen = false"
          >
            Wishlist ({{ wishlistCount }})
          </router-link>
          <router-link
            to="/login"
            class="text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 block px-3 py-2 text-base font-medium transition-colors duration-200"
            active-class="text-primary-600 dark:text-primary-400"
            @click="isMobileMenuOpen = false"
          >
            Sign In
          </router-link>
          <router-link
            to="/register"
            class="text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 block px-3 py-2 text-base font-medium transition-colors duration-200"
            active-class="text-primary-600 dark:text-primary-400"
            @click="isMobileMenuOpen = false"
          >
            Sign Up
          </router-link>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { Bars3Icon, XMarkIcon, HeartIcon, ChevronDownIcon, ChevronRightIcon } from '@heroicons/vue/24/outline'
import ThemeToggle from './ThemeToggle.vue'
import ShoppingCart from './ShoppingCart.vue'
import { useWishlistStore } from '@/stores/wishlist'
import { useCategoriesStore } from '@/stores/categories'

const isMobileMenuOpen = ref(false)
const wishlistStore = useWishlistStore()
const categoriesStore = useCategoriesStore()

const wishlistCount = computed(() => wishlistStore.items.length)
const categories = computed(() => categoriesStore.categories)

const closeDropdown = () => {
  // This function ensures the dropdown closes when a link is clicked
  // The dropdown is controlled by CSS hover, so this is mainly for mobile/touch devices
}
</script> 