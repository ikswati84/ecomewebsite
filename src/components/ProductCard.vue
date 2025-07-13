<template>
  <div
    class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden group h-full flex flex-col hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
    <!-- Product Image -->
    <div class="relative aspect-square overflow-hidden bg-gray-200 dark:bg-gray-700">
      <img :src="product.image" :alt="product.name"
        class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
      <div class="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300"></div>

      <!-- Badges -->
      <div class="absolute top-3 left-3 flex flex-col space-y-2">
        <span v-if="product.isNew"
          class="bg-green-500 text-white text-[10px] lg:text-xs px-2 py-1 rounded-full font-medium">
          NEW
        </span>
        <span v-if="product.isHot"
          class="bg-red-500 text-white text-[10px] lg:text-xs px-2 py-1 rounded-full font-medium">
          HOT
        </span>
        <span v-if="product.originalPrice"
          class="bg-primary-600 text-white text-[10px] lg:text-xs px-2 py-1 rounded-full font-medium">
          -{{ Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) }}%
        </span>
      </div>

      <!-- Stock Status -->
      <div class="absolute top-3 right-3">
        <span v-if="!product.inStock"
          class="bg-gray-500 text-white text-[10px] lg:text-xs px-2 py-1 rounded-full font-medium">
          OUT OF STOCK
        </span>
      </div>

      <!-- Quick Actions -->
      <div
        class="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex space-x-2">
        <router-link :to="`/product/${product.id}`" @click="addToRecentProducts"
          class="p-2 bg-white dark:bg-gray-800 rounded-full shadow-lg hover:shadow-xl transition-shadow duration-200 text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400"
          title="View Details">
          <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
          </svg>
        </router-link>
        <button @click="toggleWishlist"
          class="p-2 bg-white dark:bg-gray-800 rounded-full shadow-lg hover:shadow-xl transition-shadow duration-200"
          :class="isInWishlist ? 'text-red-500' : 'text-gray-600 dark:text-gray-400'" title="Add to Wishlist">
          <HeartIcon class="h-4 w-4" :class="isInWishlist ? 'fill-current' : ''" />
        </button>
      </div>
    </div>

    <!-- Product Info -->
    <div class="p-5 flex-1 flex flex-col">
      <router-link :to="`/product/${product.id}`" @click="addToRecentProducts" class="block">
        <h3
          class="text-sm lg:text-lg font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
          {{ product.name }}
        </h3>
      </router-link>

      <!-- Tags -->
      <div v-if="product.tags && product.tags.length > 0" class="flex flex-wrap gap-1 mb-3">
        <span v-for="tag in product.tags.slice(0, 2)" :key="tag"
          class="text-[10px] lg:text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 px-2 py-1 rounded-full">
          {{ tag }}
        </span>
        <span v-if="product.tags.length > 2" class="text-[10px] lg:text-xs text-gray-500 dark:text-gray-500">
          +{{ product.tags.length - 2 }} more
        </span>
      </div>

      <div class="flex items-center justify-between mb-3 flex-wrap gap-y-2">
        <div class="flex items-center space-x-2 flex-wrap gap-y-1">
          <span class="text-base lg:text-xl font-bold text-primary-600">${{ product.price }}</span>
          <span v-if="product.originalPrice" class="text-[10px] lg:text-sm text-gray-500 line-through">
            ${{ product.originalPrice }}
          </span>
        </div>

        <div class="flex items-center space-x-1 flex-wrap gap-y-1">
          <StarIcon v-for="i in 5" :key="i" class="h-3 w-3 lg:h-4 lg:w-4"
            :class="i <= product.rating ? 'text-yellow-400' : 'text-gray-300'" />
          <span class="text-[10px] lg:text-sm text-gray-500 ml-1">({{ product.reviews }})</span>
        </div>
      </div>

      <p class="text-[10px] lg:text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-2 flex-1">
        {{ product.description }}
      </p>

      <!-- Add to Cart Button -->
      <button v-if="!isInCart && product.inStock" @click="addToCart"
        class="w-full bg-primary-600 text-white text-[10px] lg:text-sm py-2 lg:py-3 px-2 lg:px-4 rounded-lg font-semibold hover:bg-primary-700 transition-colors flex items-center justify-center space-x-2 mt-auto disabled:opacity-50"
        :disabled="isLoading">
        <ShoppingCartIcon v-if="!isLoading" class="h-3 w-3 lg:h-4 lg:w-4" />
        <div v-else class="h-3 w-3 lg:h-4 lg:w-4 border-2 border-white border-t-transparent rounded-full animate-spin">
        </div>
        <span class="text-[10px] lg:text-sm">{{ isLoading ? 'Adding...' : 'Add to Cart' }}</span>
      </button>

      <!-- View Cart Button -->
      <router-link v-else-if="isInCart" to="/checkout"
        class="w-full bg-primary-600 text-white text-[10px] lg:text-sm py-2 lg:py-3 px-2 lg:px-4 rounded-lg font-semibold hover:bg-primary-700 transition-colors flex items-center justify-center space-x-2 mt-auto">
        <svg class="h-3 w-3 lg:h-4 lg:w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
        </svg>
        <span>View Cart</span>
      </router-link>

      <!-- Out of Stock Button -->
      <button v-else disabled
        class="w-full bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400 text-[10px] lg:text-sm py-2 lg:py-3 px-2 lg:px-4 rounded-lg font-semibold cursor-not-allowed mt-auto">
        Out of Stock
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { HeartIcon, StarIcon, ShoppingCartIcon } from '@heroicons/vue/24/outline'
import { useCartStore } from '@/stores/cart'
import { useWishlistStore } from '@/stores/wishlist'
import { useRecentProductsStore } from '@/stores/recentProducts'

interface Product {
  id: number
  name: string
  description: string
  price: number
  originalPrice?: number
  image: string
  rating: number
  reviews: number
  categoryId?: number
  category?: string
  tags?: string[]
  inStock?: boolean
  isNew?: boolean
  isHot?: boolean
}

interface Props {
  product: Product
}

const props = defineProps<Props>()
const isLoading = ref(false)

const cartStore = useCartStore()
const wishlistStore = useWishlistStore()
const recentProductsStore = useRecentProductsStore()

const isInWishlist = computed(() => wishlistStore.isInWishlist(props.product.id))
const isInCart = computed(() => cartStore.isInCart(props.product.id))

const addToCart = async () => {
  isLoading.value = true
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 500))

  cartStore.addToCart({
    id: props.product.id,
    name: props.product.name,
    price: props.product.price,
    image: props.product.image
  })

  isLoading.value = false
}

const toggleWishlist = () => {
  if (isInWishlist.value) {
    wishlistStore.removeFromWishlist(props.product.id)
  } else {
    wishlistStore.addToWishlist({
      id: props.product.id,
      name: props.product.name,
      price: props.product.price,
      image: props.product.image,
      description: props.product.description
    })
  }
}

const addToRecentProducts = () => {
  recentProductsStore.addRecentProduct({
    id: props.product.id,
    name: props.product.name,
    description: props.product.description,
    price: props.product.price,
    originalPrice: props.product.originalPrice,
    image: props.product.image,
    rating: props.product.rating,
    reviews: props.product.reviews
  })
}
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>