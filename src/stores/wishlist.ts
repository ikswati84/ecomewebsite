import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export interface WishlistItem {
  id: number
  name: string
  price: number
  image: string
  description: string
}

export const useWishlistStore = defineStore('wishlist', () => {
  const items = ref<WishlistItem[]>([])

  // Computed properties
  const totalItems = computed(() => items.value.length)

  const isEmpty = computed(() => items.value.length === 0)

  // Actions
  const addToWishlist = (product: { id: number; name: string; price: number; image: string; description: string }) => {
    const existingItem = items.value.find(item => item.id === product.id)
    
    if (!existingItem) {
      items.value.push(product)
    }
  }

  const removeFromWishlist = (productId: number) => {
    const index = items.value.findIndex(item => item.id === productId)
    if (index > -1) {
      items.value.splice(index, 1)
    }
  }

  const isInWishlist = (productId: number) => {
    return items.value.some(item => item.id === productId)
  }

  const clearWishlist = () => {
    items.value = []
  }

  return {
    items,
    totalItems,
    isEmpty,
    addToWishlist,
    removeFromWishlist,
    isInWishlist,
    clearWishlist
  }
}) 