import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

export interface User {
  id: number
  name: string
  email: string
  role: string
  avatar?: string
  settings?: UserSettings
}

export interface UserSettings {
  theme: 'light' | 'dark' | 'auto'
  notifications: boolean
  emailNotifications: boolean
  language: string
  timezone: string
}

export const useAuthStore = defineStore('auth', () => {
  const isAuthenticated = ref(false)
  const user = ref<User | null>(null)
  const router = useRouter()

  // Check if user is logged in on app start
  const checkAuth = () => {
    const token = localStorage.getItem('authToken')
    const userData = localStorage.getItem('userData')
    
    if (token && userData) {
      isAuthenticated.value = true
      user.value = JSON.parse(userData)
    }
  }

  // Login function with different user types
  const login = (email: string, password: string) => {
    // Simulate API call - replace with actual API
    if (email === 'admin@example.com' && password === 'password') {
      const userData: User = {
        id: 1,
        name: 'Admin User',
        email: 'admin@example.com',
        role: 'admin',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
        settings: {
          theme: 'auto',
          notifications: true,
          emailNotifications: true,
          language: 'en',
          timezone: 'UTC'
        }
      }
      
      // Store auth data
      localStorage.setItem('authToken', 'dummy-token-123')
      localStorage.setItem('userData', JSON.stringify(userData))
      
      // Update store
      isAuthenticated.value = true
      user.value = userData
      
      // Redirect to dashboard
      router.push('/admin/dashboard')
      
      return { success: true, message: 'Login successful' }
    } else if (email === 'seller@example.com' && password === 'password') {
      const userData: User = {
        id: 2,
        name: 'Seller User',
        email: 'seller@example.com',
        role: 'seller',
        avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
        settings: {
          theme: 'light',
          notifications: true,
          emailNotifications: false,
          language: 'en',
          timezone: 'UTC'
        }
      }
      
      // Store auth data
      localStorage.setItem('authToken', 'dummy-token-456')
      localStorage.setItem('userData', JSON.stringify(userData))
      
      // Update store
      isAuthenticated.value = true
      user.value = userData
      
      // Redirect to dashboard
      router.push('/admin/dashboard')
      
      return { success: true, message: 'Login successful' }
    } else if (email === 'manager@example.com' && password === 'password') {
      const userData: User = {
        id: 3,
        name: 'Manager User',
        email: 'manager@example.com',
        role: 'manager',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
        settings: {
          theme: 'dark',
          notifications: false,
          emailNotifications: true,
          language: 'en',
          timezone: 'UTC'
        }
      }
      
      // Store auth data
      localStorage.setItem('authToken', 'dummy-token-789')
      localStorage.setItem('userData', JSON.stringify(userData))
      
      // Update store
      isAuthenticated.value = true
      user.value = userData
      
      // Redirect to dashboard
      router.push('/admin/dashboard')
      
      return { success: true, message: 'Login successful' }
    } else {
      return { success: false, message: 'Invalid credentials' }
    }
  }

  // Logout function
  const logout = () => {
    // Clear auth data
    localStorage.removeItem('authToken')
    localStorage.removeItem('userData')
    
    // Update store
    isAuthenticated.value = false
    user.value = null
    
    // Redirect to login page
    router.push('/login')
  }

  // Check if user can access admin routes
  const canAccessAdmin = () => {
    return isAuthenticated.value && ['admin', 'seller', 'manager'].includes(user.value?.role || '')
  }

  // Update user settings
  const updateUserSettings = (settings: Partial<UserSettings>) => {
    if (user.value && user.value.settings) {
      user.value.settings = { 
        ...user.value.settings, 
        ...settings 
      } as UserSettings
      localStorage.setItem('userData', JSON.stringify(user.value))
    }
  }

  // Get user-specific data
  const getUserSpecificData = () => {
    if (!user.value) return null
    
    // Return different data based on user role
    switch (user.value.role) {
      case 'admin':
        return {
          orders: generateUserOrders(1, 50),
          products: generateUserProducts(1, 30),
          categories: generateUserCategories(1, 15)
        }
      case 'seller':
        return {
          orders: generateUserOrders(2, 25),
          products: generateUserProducts(2, 15),
          categories: generateUserCategories(2, 8)
        }
      case 'manager':
        return {
          orders: generateUserOrders(3, 35),
          products: generateUserProducts(3, 20),
          categories: generateUserCategories(3, 12)
        }
      default:
        return null
    }
  }

  // Generate user-specific orders
  const generateUserOrders = (userId: number, count: number) => {
    const orders = []
    for (let i = 1; i <= count; i++) {
      orders.push({
        id: i,
        orderNumber: `ORD-${userId}${String(i).padStart(3, '0')}`,
        customerName: `Customer ${i}`,
        customerEmail: `customer${i}@example.com`,
        total: Math.floor(Math.random() * 1000) + 50,
        status: ['pending', 'processing', 'shipped', 'delivered', 'cancelled'][Math.floor(Math.random() * 5)],
        date: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
        userId: userId
      })
    }
    return orders
  }

  // Generate user-specific products
  const generateUserProducts = (userId: number, count: number) => {
    const products = []
    const productNames = ['Wireless Headphones', 'Smart Watch', 'Laptop', 'Phone', 'Tablet', 'Camera', 'Speaker', 'Keyboard', 'Mouse', 'Monitor']
    for (let i = 1; i <= count; i++) {
      products.push({
        id: i,
        name: `${productNames[i % productNames.length]} ${i}`,
        price: Math.floor(Math.random() * 500) + 50,
        category: ['Electronics', 'Clothing', 'Home', 'Sports'][Math.floor(Math.random() * 4)],
        status: ['active', 'inactive'][Math.floor(Math.random() * 2)],
        stock: Math.floor(Math.random() * 100),
        userId: userId
      })
    }
    return products
  }

  // Generate user-specific categories
  const generateUserCategories = (userId: number, count: number) => {
    const categories = []
    const categoryNames = ['Electronics', 'Clothing', 'Home & Garden', 'Sports', 'Books', 'Toys', 'Beauty', 'Automotive']
    for (let i = 1; i <= count; i++) {
      categories.push({
        id: i,
        name: `${categoryNames[i % categoryNames.length]} ${i}`,
        description: `Description for ${categoryNames[i % categoryNames.length]} ${i}`,
        status: ['active', 'inactive'][Math.floor(Math.random() * 2)],
        subcategories: Math.floor(Math.random() * 5),
        userId: userId
      })
    }
    return categories
  }

  // Register function
  const register = (userData: { firstName: string; lastName: string; email: string; password: string }) => {
    // Simulate API call - replace with actual API
    const newUser: User = {
      id: Math.floor(Math.random() * 10000) + 10, // Generate random ID
      name: `${userData.firstName} ${userData.lastName}`,
      email: userData.email,
      role: 'seller', // Default role for new registrations
      avatar: `https://images.unsplash.com/photo-${Math.floor(Math.random() * 1000000)}?w=150&h=150&fit=crop&crop=face`,
      settings: {
        theme: 'auto',
        notifications: true,
        emailNotifications: true,
        language: 'en',
        timezone: 'UTC'
      }
    }
    
    // Store user data in localStorage for demo purposes
    const existingUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]')
    existingUsers.push(newUser)
    localStorage.setItem('registeredUsers', JSON.stringify(existingUsers))
    
    return { success: true, message: 'Registration successful', user: newUser }
  }

  return {
    isAuthenticated,
    user,
    checkAuth,
    login,
    logout,
    register,
    canAccessAdmin,
    updateUserSettings,
    getUserSpecificData
  }
}) 