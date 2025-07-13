<script setup lang="ts">
import { computed } from 'vue'
import { useCartStore } from '@/stores/cart'
import { useWishlistStore } from '@/stores/wishlist'
import { HeartIcon, EyeIcon } from '@heroicons/vue/24/outline'
import { HeartIcon as HeartSolidIcon } from '@heroicons/vue/24/solid'

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
}

const props = defineProps<{
  product: Product
}>()

const cartStore = useCartStore()
const wishlistStore = useWishlistStore()

const isInCart = computed(() => cartStore.isInCart(props.product.id))
const isInWishlist = computed(() => wishlistStore.isInWishlist(props.product.id))

const addToCart = () => {
  cartStore.addToCart(props.product)
}

const toggleWishlist = () => {
  if (isInWishlist.value) {
    wishlistStore.removeFromWishlist(props.product.id)
  } else {
    wishlistStore.addToWishlist(props.product)
  }
}

const discountPercentage = computed(() => {
  if (props.product.originalPrice) {
    return Math.round(((props.product.originalPrice - props.product.price) / props.product.originalPrice) * 100)
  }
  return 0
})
</script>

<template>
  <div class="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow duration-200">
    <div class="flex p-3">
      <!-- Product Image -->
      <div class="relative flex-shrink-0">
        <img 
          :src="product.image" 
          :alt="product.name"
          class="w-16 h-16 object-cover rounded-lg"
        />
        <!-- Discount Badge -->
        <div 
          v-if="discountPercentage > 0"
          class="absolute -top-1 -right-1 bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full font-medium"
        >
          -{{ discountPercentage }}%
        </div>
      </div>
      
      <!-- Product Info -->
      <div class="flex-1 ml-3 min-w-0">
        <h3 class="text-sm font-medium text-gray-900 dark:text-white truncate">
          {{ product.name }}
        </h3>
        <p class="text-xs text-gray-500 dark:text-gray-400 mt-1 line-clamp-2">
          {{ product.description }}
        </p>
        
        <!-- Price -->
        <div class="flex items-center mt-2">
          <span class="text-sm font-semibold text-gray-900 dark:text-white">
            ${{ product.price.toFixed(2) }}
          </span>
          <span 
            v-if="product.originalPrice" 
            class="text-xs text-gray-500 dark:text-gray-400 line-through ml-2"
          >
            ${{ product.originalPrice.toFixed(2) }}
          </span>
        </div>
        
        <!-- Rating -->
        <div class="flex items-center mt-1">
          <div class="flex text-yellow-400">
            <svg 
              v-for="i in 5" 
              :key="i" 
              class="h-3 w-3" 
              :class="i <= product.rating ? 'text-yellow-400' : 'text-gray-300 dark:text-gray-600'"
              fill="currentColor" 
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          </div>
          <span class="text-xs text-gray-500 dark:text-gray-400 ml-1">
            ({{ product.reviews }})
          </span>
        </div>
      </div>
      
      <!-- Actions -->
      <div class="flex flex-col items-end justify-between ml-2">
        <!-- Wishlist Button -->
        <button
          @click="toggleWishlist"
          :class="[
            'p-1.5 rounded-full transition-colors duration-200',
            isInWishlist.value
              ? 'text-red-500 hover:text-red-600'
              : 'text-gray-400 hover:text-red-500'
          ]"
        >
          <HeartSolidIcon v-if="isInWishlist.value" class="h-4 w-4" />
          <HeartIcon v-else class="h-4 w-4" />
        </button>
        
        <!-- View/Cart Button -->
        <router-link
          :to="`/product/${product.id}`"
          class="p-1.5 text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-200"
        >
          <EyeIcon class="h-4 w-4" />
        </router-link>
      </div>
    </div>
  </div>
</template> 