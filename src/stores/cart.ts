import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export interface CartItem {
  id: number
  name: string
  price: number
  image: string
  quantity: number
}

export const useCartStore = defineStore('cart', () => {
  const items = ref<CartItem[]>([])
  const isCartOpen = ref(false)

  // Computed properties
  const totalItems = computed(() => {
    return items.value.reduce((total, item) => total + item.quantity, 0)
  })

  const totalPrice = computed(() => {
    return items.value.reduce((total, item) => total + (item.price * item.quantity), 0)
  })

  const isEmpty = computed(() => items.value.length === 0)

  const isInCart = (productId: number) => {
    return items.value.some(item => item.id === productId)
  }

  // Actions
  const addToCart = (product: { id: number; name: string; price: number; image: string }) => {
    const existingItem = items.value.find(item => item.id === product.id)
    
    if (existingItem) {
      existingItem.quantity += 1
    } else {
      items.value.push({
        ...product,
        quantity: 1
      })
    }
  }

  const removeFromCart = (productId: number) => {
    const index = items.value.findIndex(item => item.id === productId)
    if (index > -1) {
      items.value.splice(index, 1)
    }
  }

  const updateQuantity = (productId: number, quantity: number) => {
    const item = items.value.find(item => item.id === productId)
    if (item) {
      if (quantity <= 0) {
        removeFromCart(productId)
      } else {
        item.quantity = quantity
      }
    }
  }

  const clearCart = () => {
    items.value = []
  }

  const toggleCart = () => {
    isCartOpen.value = !isCartOpen.value
  }

  return {
    items,
    isCartOpen,
    totalItems,
    totalPrice,
    isEmpty,
    isInCart,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    toggleCart
  }
}) 