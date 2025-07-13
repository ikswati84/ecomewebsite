import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export interface User {
  id: number
  name: string
  email: string
  role: 'admin' | 'manager' | 'seller'
  status: 'active' | 'inactive'
  createdAt: string
  lastLogin: string
  avatar?: string
}

export const useUsersStore = defineStore('users', () => {
  const users = ref<User[]>([
    {
      id: 1,
      name: 'Admin User',
      email: 'admin@example.com',
      role: 'admin',
      status: 'active',
      createdAt: '2024-01-15T10:00:00Z',
      lastLogin: '2024-01-20T14:30:00Z'
    },
    {
      id: 2,
      name: 'Manager User',
      email: 'manager@example.com',
      role: 'manager',
      status: 'active',
      createdAt: '2024-01-16T11:00:00Z',
      lastLogin: '2024-01-20T12:15:00Z'
    },
    {
      id: 3,
      name: 'Seller User',
      email: 'seller@example.com',
      role: 'seller',
      status: 'active',
      createdAt: '2024-01-17T09:00:00Z',
      lastLogin: '2024-01-20T10:45:00Z'
    },
    {
      id: 4,
      name: 'John Doe',
      email: 'john@example.com',
      role: 'seller',
      status: 'inactive',
      createdAt: '2024-01-18T08:00:00Z',
      lastLogin: '2024-01-19T16:20:00Z'
    },
    {
      id: 5,
      name: 'Jane Smith',
      email: 'jane@example.com',
      role: 'manager',
      status: 'active',
      createdAt: '2024-01-19T13:00:00Z',
      lastLogin: '2024-01-20T09:30:00Z'
    }
  ])

  // Load registered users from localStorage
  const loadRegisteredUsers = () => {
    try {
      const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]')
      
      // Convert registered users to the format expected by the users store
      const convertedUsers = registeredUsers.map((user: any) => ({
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role || 'seller',
        status: 'active',
        createdAt: new Date().toISOString(),
        lastLogin: new Date().toISOString(),
        avatar: user.avatar
      }))
      
      // Add converted users to the users list (avoid duplicates)
      convertedUsers.forEach(newUser => {
        const existingUser = users.value.find(u => u.email === newUser.email)
        if (!existingUser) {
          users.value.push(newUser)
        }
      })
    } catch (error) {
      console.error('Error loading registered users:', error)
    }
  }

  // Add new user
  const addUser = (user: User) => {
    users.value.push(user)
  }

  // Update user
  const updateUser = (id: number, updates: Partial<User>) => {
    const index = users.value.findIndex(u => u.id === id)
    if (index !== -1) {
      users.value[index] = { ...users.value[index], ...updates }
    }
  }

  // Delete user
  const deleteUser = (id: number) => {
    const index = users.value.findIndex(u => u.id === id)
    if (index !== -1) {
      users.value.splice(index, 1)
    }
  }

  // Get user by ID
  const getUserById = (id: number) => {
    return users.value.find(u => u.id === id)
  }

  // Get user by email
  const getUserByEmail = (email: string) => {
    return users.value.find(u => u.email === email)
  }

  // Filter users
  const filterUsers = (filters: { search?: string; role?: string; status?: string }) => {
    return users.value.filter(user => {
      const matchesSearch = !filters.search || 
        user.name.toLowerCase().includes(filters.search.toLowerCase()) ||
        user.email.toLowerCase().includes(filters.search.toLowerCase())
      
      const matchesRole = !filters.role || user.role === filters.role
      const matchesStatus = !filters.status || user.status === filters.status
      
      return matchesSearch && matchesRole && matchesStatus
    })
  }

  // Computed properties
  const totalUsers = computed(() => users.value.length)
  const activeUsers = computed(() => users.value.filter(u => u.status === 'active').length)
  const adminUsers = computed(() => users.value.filter(u => u.role === 'admin').length)
  const staffUsers = computed(() => users.value.filter(u => u.role === 'manager' || u.role === 'seller').length)

  // Initialize by loading registered users
  loadRegisteredUsers()

  return {
    users,
    totalUsers,
    activeUsers,
    adminUsers,
    staffUsers,
    loadRegisteredUsers,
    addUser,
    updateUser,
    deleteUser,
    getUserById,
    getUserByEmail,
    filterUsers
  }
}) 