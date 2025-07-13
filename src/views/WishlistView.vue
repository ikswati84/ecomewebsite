<script setup lang="ts">
import { computed } from 'vue'
import { useWishlistStore } from '@/stores/wishlist'
import { useCartStore } from '@/stores/cart'
import ProductCard from '@/components/ProductCard.vue'
import { HeartIcon, TrashIcon } from '@heroicons/vue/24/outline'

const wishlistStore = useWishlistStore()
const cartStore = useCartStore()

const wishlistItems = computed(() => wishlistStore.items)

const removeFromWishlist = (productId: number) => {
  wishlistStore.removeFromWishlist(productId)
}

const isInCart = (productId: number) => {
  return cartStore.isInCart(productId)
}

const addToCart = (item: any) => {
  cartStore.addToCart({
    id: item.id,
    name: item.name,
    price: item.price,
    image: item.image
  })
  // Optionally remove from wishlist after adding to cart
  // wishlistStore.removeFromWishlist(item.id)
}
</script>

<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Header -->
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-2">My Wishlist</h1>
        <p class="text-gray-600 dark:text-gray-400">
          {{ wishlistItems.length }} item{{ wishlistItems.length !== 1 ? 's' : '' }} in your wishlist
        </p>
      </div>

      <!-- Empty State -->
      <div v-if="wishlistItems.length === 0" class="text-center py-12">
        <div class="mx-auto w-24 h-24 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center mb-6">
          <HeartIcon class="w-12 h-12 text-gray-400" />
        </div>
        <h3 class="text-xl font-medium text-gray-900 dark:text-white mb-2">Your wishlist is empty</h3>
        <p class="text-gray-600 dark:text-gray-400 mb-6">
          Start adding items to your wishlist to save them for later.
        </p>
        <router-link
          to="/products"
          class="inline-flex items-center px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
        >
          Browse Products
        </router-link>
      </div>

      <!-- Wishlist Items -->
      <div v-else class="space-y-6">
        <!-- Grid Layout -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <div
            v-for="item in wishlistItems"
            :key="item.id"
            class="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-lg transition-shadow"
          >
            <!-- Product Image -->
            <div class="relative aspect-w-1 aspect-h-1">
              <img
                :src="item.image"
                :alt="item.name"
                class="w-full h-48 object-cover"
              />
              <!-- Remove Button -->
              <button
                @click="removeFromWishlist(item.id)"
                class="absolute top-2 right-2 w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors"
                title="Remove from wishlist"
              >
                <TrashIcon class="w-4 h-4" />
              </button>
            </div>

            <!-- Product Info -->
            <div class="p-4">
              <h3 class="font-medium text-gray-900 dark:text-white mb-2 line-clamp-2">
                {{ item.name }}
              </h3>
              <div class="flex items-center justify-between mb-4">
                <span class="text-lg font-bold text-gray-900 dark:text-white">
                  ${{ item.price }}
                </span>
                <div class="flex items-center">
                  <svg class="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <span class="ml-1 text-sm text-gray-600 dark:text-gray-400">4.8</span>
                </div>
              </div>

              <!-- Action Buttons -->
              <div class="flex space-x-2">
                <button
                  v-if="!isInCart(item.id)"
                  @click="addToCart(item)"
                  class="flex-1 bg-primary-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary-700 transition-colors"
                >
                  Add to Cart
                </button>
                <router-link
                  v-else
                  to="/checkout"
                  class="flex-1 bg-primary-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary-700 transition-colors text-center flex items-center justify-center space-x-2"
                >
                  <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                  <span>View Cart</span>
                </router-link>
                <button
                  @click="removeFromWishlist(item.id)"
                  class="px-3 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                  title="Remove from wishlist"
                >
                  <TrashIcon class="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Bulk Actions -->
        <div class="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
          <div class="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0">
            <div class="text-sm text-gray-600 dark:text-gray-400">
              {{ wishlistItems.length }} item{{ wishlistItems.length !== 1 ? 's' : '' }} in wishlist
            </div>
            <div class="flex space-x-4">
              <button
                @click="wishlistItems.forEach(item => !isInCart(item.id) && addToCart(item))"
                class="bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700 transition-colors"
              >
                Add Available to Cart
              </button>
              <button
                @click="wishlistItems.forEach(item => removeFromWishlist(item.id))"
                class="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition-colors"
              >
                Clear Wishlist
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template> 