<template>
  <div>
    <!-- Cart Toggle Button -->
    <button
      @click="cartStore.toggleCart"
      class="relative p-2 text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-200"
    >
      <ShoppingBagIcon class="h-6 w-6" />
      <span v-if="cartStore.totalItems > 0" class="absolute -top-1 -right-1 bg-primary-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
        {{ cartStore.totalItems }}
      </span>
    </button>

    <!-- Cart Overlay -->
    <div
      v-if="cartStore.isCartOpen"
      class="fixed inset-0 bg-black bg-opacity-50 z-50"
      @click="cartStore.toggleCart"
    ></div>

    <!-- Cart Panel -->
    <div
      v-if="cartStore.isCartOpen"
      class="fixed right-0 top-0 h-full w-full sm:w-96 bg-white dark:bg-gray-800 shadow-xl z-50 transform transition-transform duration-300"
    >
      <div class="flex flex-col h-full">
        <!-- Header -->
        <div class="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
          <h2 class="text-lg font-semibold text-gray-900 dark:text-white">Shopping Cart</h2>
          <button
            @click="cartStore.toggleCart"
            class="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            <XMarkIcon class="h-6 w-6" />
          </button>
        </div>

        <!-- Cart Items -->
        <div class="flex-1 overflow-y-auto p-4">
          <div v-if="cartStore.isEmpty" class="text-center py-8">
            <ShoppingBagIcon class="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <p class="text-gray-500 dark:text-gray-400">Your cart is empty</p>
          </div>

          <div v-else class="space-y-4">
            <div
              v-for="item in cartStore.items"
              :key="item.id"
              class="flex items-center space-x-4 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"
            >
              <!-- Item Image -->
              <img
                :src="item.image"
                :alt="item.name"
                class="w-16 h-16 object-cover rounded-md"
              />

              <!-- Item Details -->
              <div class="flex-1 min-w-0">
                <h3 class="text-sm font-medium text-gray-900 dark:text-white truncate">
                  {{ item.name }}
                </h3>
                <p class="text-sm text-gray-500 dark:text-gray-400">
                  ${{ item.price }}
                </p>
              </div>

              <!-- Quantity Controls -->
              <div class="flex items-center space-x-2">
                <button
                  @click="cartStore.updateQuantity(item.id, item.quantity - 1)"
                  class="p-1 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                >
                  <MinusIcon class="h-4 w-4" />
                </button>
                <span class="text-sm font-medium text-gray-900 dark:text-white w-8 text-center">
                  {{ item.quantity }}
                </span>
                <button
                  @click="cartStore.updateQuantity(item.id, item.quantity + 1)"
                  class="p-1 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                >
                  <PlusIcon class="h-4 w-4" />
                </button>
              </div>

              <!-- Remove Button -->
              <button
                @click="cartStore.removeFromCart(item.id)"
                class="text-red-500 hover:text-red-700"
              >
                <TrashIcon class="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        <!-- Footer -->
        <div v-if="!cartStore.isEmpty" class="border-t border-gray-200 dark:border-gray-700 p-4">
          <div class="flex justify-between items-center mb-4">
            <span class="text-lg font-semibold text-gray-900 dark:text-white">Total:</span>
            <span class="text-lg font-bold text-primary-600">${{ cartStore.totalPrice.toFixed(2) }}</span>
          </div>
          
          <button
            @click="checkout"
            class="w-full btn-primary"
          >
            Checkout
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ShoppingBagIcon, XMarkIcon, MinusIcon, PlusIcon, TrashIcon } from '@heroicons/vue/24/outline'
import { useCartStore } from '@/stores/cart'
import { useRouter } from 'vue-router'

const cartStore = useCartStore()
const router = useRouter()

const checkout = () => {
  cartStore.toggleCart()
  router.push('/checkout')
}
</script> 