import { defineStore } from 'pinia'
import { ref } from 'vue'

export interface RecentProduct {
  id: number
  name: string
  description: string
  price: number
  originalPrice?: number
  image: string
  rating?: number
  reviews?: number
  viewedAt: Date
}

export const useRecentProductsStore = defineStore('recentProducts', () => {
  const recentProducts = ref<RecentProduct[]>([])

  const addRecentProduct = (product: Omit<RecentProduct, 'viewedAt'>) => {
    // Remove if already exists
    recentProducts.value = recentProducts.value.filter(p => p.id !== product.id)
    
    // Add to beginning
    recentProducts.value.unshift({
      ...product,
      viewedAt: new Date()
    })
    
    // Keep only last 8 products
    if (recentProducts.value.length > 8) {
      recentProducts.value = recentProducts.value.slice(0, 8)
    }
    
    // Save to localStorage
    localStorage.setItem('recentProducts', JSON.stringify(recentProducts.value))
  }

  const getRecentProducts = () => {
    return recentProducts.value
  }

  const clearRecentProducts = () => {
    recentProducts.value = []
    localStorage.removeItem('recentProducts')
  }

  // Load from localStorage on init
  const loadRecentProducts = () => {
    const stored = localStorage.getItem('recentProducts')
    if (stored) {
      try {
        const parsed = JSON.parse(stored)
        recentProducts.value = parsed.map((p: any) => ({
          ...p,
          viewedAt: new Date(p.viewedAt)
        }))
      } catch (error) {
        console.error('Error loading recent products:', error)
        recentProducts.value = []
      }
    }
  }

  // Initialize
  loadRecentProducts()

  return {
    recentProducts,
    addRecentProduct,
    getRecentProducts,
    clearRecentProducts,
    loadRecentProducts
  }
}) 