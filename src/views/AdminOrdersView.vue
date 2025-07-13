<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h1 class="text-2xl font-bold text-gray-900 dark:text-white">Orders Management</h1>
        <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">Manage all customer orders and their status</p>
      </div>
      <div class="mt-4 sm:mt-0">
        <button @click="showAddModal = true" class="inline-flex items-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500">
          <i class="pi pi-plus mr-2"></i>
          Add Order
        </button>
      </div>
    </div>

    <!-- Filters -->
    <div class="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-700 rounded-xl shadow-lg border border-blue-100 dark:border-gray-600 p-6">
      <div class="flex flex-col lg:flex-row items-end gap-4">
        <!-- Search -->
        <div class="flex-1 min-w-0">
          <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
            <i class="pi pi-search mr-1 text-primary-600"></i>Search Orders
          </label>
          <div class="relative">
            <input 
              v-model="filters.search" 
              type="text" 
              placeholder="Search by customer, order ID..."
              class="w-full pl-10 pr-4 py-3 border-2 border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-white transition-all duration-200 hover:border-gray-300 dark:hover:border-gray-500"
            />
            <i class="pi pi-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
          </div>
        </div>

        <!-- Status Filter -->
        <div class="flex-1 min-w-0">
          <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
            <i class="pi pi-tag mr-1 text-green-600"></i>Status
          </label>
          <div class="relative">
            <select 
              v-model="filters.status" 
              class="w-full pl-10 pr-4 py-3 border-2 border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-white transition-all duration-200 hover:border-gray-300 dark:hover:border-gray-500 appearance-none"
            >
              <option value="">All Status</option>
              <option value="pending">🟡 Pending</option>
              <option value="processing">🔵 Processing</option>
              <option value="shipped">🟣 Shipped</option>
              <option value="delivered">🟢 Delivered</option>
              <option value="cancelled">🔴 Cancelled</option>
            </select>
            <i class="pi pi-chevron-down absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none"></i>
          </div>
        </div>

        <!-- Date Range -->
        <div class="flex-1 min-w-0">
          <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
            <i class="pi pi-calendar mr-1 text-orange-600"></i>Date Range
          </label>
          <div class="relative">
            <select 
              v-model="filters.dateRange" 
              class="w-full pl-10 pr-4 py-3 border-2 border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-white transition-all duration-200 hover:border-gray-300 dark:hover:border-gray-500 appearance-none"
            >
              <option value="">All Time</option>
              <option value="today">📅 Today</option>
              <option value="week">📅 This Week</option>
              <option value="month">📅 This Month</option>
              <option value="year">📅 This Year</option>
            </select>
            <i class="pi pi-calendar absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
          </div>
        </div>

        <!-- Sort By -->
        <div class="flex-1 min-w-0">
          <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
            <i class="pi pi-sort mr-1 text-purple-600"></i>Sort By
          </label>
          <div class="relative">
            <select 
              v-model="filters.sortBy" 
              class="w-full pl-10 pr-4 py-3 border-2 border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-white transition-all duration-200 hover:border-gray-300 dark:hover:border-gray-500 appearance-none"
            >
              <option value="date">📅 Date</option>
              <option value="amount">💰 Amount</option>
              <option value="customer">👤 Customer</option>
              <option value="status">🏷️ Status</option>
            </select>
            <i class="pi pi-sort absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
          </div>
        </div>

        <!-- Filter Actions -->
        <div class="flex gap-2">
          <button @click="applyFilters" class="px-6 py-3 bg-gradient-to-r from-primary-600 to-primary-700 text-white rounded-xl hover:from-primary-700 hover:to-primary-800 focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center">
            <i class="pi pi-filter mr-2"></i>
            Apply
          </button>
          <button @click="clearFilters" class="px-6 py-3 bg-gradient-to-r from-gray-500 to-gray-600 text-white rounded-xl hover:from-gray-600 hover:to-gray-700 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center">
            <i class="pi pi-refresh mr-2"></i>
            Clear
          </button>
        </div>
      </div>
    </div>

    <!-- Stats Cards -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <div class="flex items-center">
          <div class="p-3 rounded-full bg-blue-100 dark:bg-blue-900">
            <i class="pi pi-shopping-cart text-blue-600 dark:text-blue-400 text-xl"></i>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-500 dark:text-gray-400">Total Orders</p>
            <p class="text-2xl font-bold text-gray-900 dark:text-white">{{ stats.total }}</p>
          </div>
        </div>
      </div>

      <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <div class="flex items-center">
          <div class="p-3 rounded-full bg-yellow-100 dark:bg-yellow-900">
            <i class="pi pi-clock text-yellow-600 dark:text-yellow-400 text-xl"></i>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-500 dark:text-gray-400">Pending</p>
            <p class="text-2xl font-bold text-gray-900 dark:text-white">{{ stats.pending }}</p>
          </div>
        </div>
      </div>

      <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <div class="flex items-center">
          <div class="p-3 rounded-full bg-green-100 dark:bg-green-900">
            <i class="pi pi-check-circle text-green-600 dark:text-green-400 text-xl"></i>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-500 dark:text-gray-400">Delivered</p>
            <p class="text-2xl font-bold text-gray-900 dark:text-white">{{ stats.delivered }}</p>
          </div>
        </div>
      </div>

      <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <div class="flex items-center">
          <div class="p-3 rounded-full bg-red-100 dark:bg-red-900">
            <i class="pi pi-times-circle text-red-600 dark:text-red-400 text-xl"></i>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-500 dark:text-gray-400">Cancelled</p>
            <p class="text-2xl font-bold text-gray-900 dark:text-white">{{ stats.cancelled }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Orders Table -->
    <div class="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead class="bg-gray-50 dark:bg-gray-700">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Order ID</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Customer</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Products</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Amount</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Status</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Date</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody class="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
            <tr v-for="order in paginatedOrders" :key="order.id" class="hover:bg-gray-50 dark:hover:bg-gray-700">
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                #{{ order.id }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center">
                  <img :src="order.customer.avatar" :alt="order.customer.name" class="w-8 h-8 rounded-full">
                  <div class="ml-3">
                    <div class="text-sm font-medium text-gray-900 dark:text-white">{{ order.customer.name }}</div>
                    <div class="text-sm text-gray-500 dark:text-gray-400">{{ order.customer.email }}</div>
                  </div>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                {{ order.items.length }} items
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                ${{ order.total.toFixed(2) }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span :class="getStatusClass(order.status)" class="px-2 py-1 text-xs font-medium rounded-full">
                  {{ order.status }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                {{ formatDate(order.date) }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <div class="flex space-x-2">
                  <button @click="viewOrder(order)" class="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300">
                    <i class="pi pi-eye"></i>
                  </button>
                  <button @click="editOrder(order)" class="text-green-600 hover:text-green-900 dark:text-green-400 dark:hover:text-green-300">
                    <i class="pi pi-pencil"></i>
                  </button>
                  <button @click="deleteOrder(order)" class="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300">
                    <i class="pi pi-trash"></i>
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Pagination -->
      <div class="bg-white dark:bg-gray-800 px-4 py-3 border-t border-gray-200 dark:border-gray-700 sm:px-6">
        <div class="flex items-center justify-between">
          <div class="flex-1 flex justify-between sm:hidden">
            <button 
              @click="currentPage--" 
              :disabled="currentPage === 1"
              class="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            <button 
              @click="currentPage++" 
              :disabled="currentPage === totalPages"
              class="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
          <div class="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
            <div>
              <p class="text-sm text-gray-700 dark:text-gray-300">
                Showing <span class="font-medium">{{ startIndex + 1 }}</span> to <span class="font-medium">{{ endIndex }}</span> of <span class="font-medium">{{ filteredOrders.length }}</span> results
              </p>
            </div>
            <div>
              <nav class="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                <button 
                  @click="currentPage--" 
                  :disabled="currentPage === 1"
                  class="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <i class="pi pi-chevron-left"></i>
                </button>
                <button 
                  v-for="page in visiblePages" 
                  :key="page"
                  @click="currentPage = page"
                  :class="[
                    'relative inline-flex items-center px-4 py-2 border text-sm font-medium',
                    page === currentPage 
                      ? 'z-10 bg-primary-50 border-primary-500 text-primary-600' 
                      : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                  ]"
                >
                  {{ page }}
                </button>
                <button 
                  @click="currentPage++" 
                  :disabled="currentPage === totalPages"
                  class="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <i class="pi pi-chevron-right"></i>
                </button>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Add/Edit Order Modal -->
    <div v-if="showAddModal || showEditModal" class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div class="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white dark:bg-gray-800">
        <div class="mt-3">
          <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-4">
            {{ showEditModal ? 'Edit Order' : 'Add New Order' }}
          </h3>
          <form @submit.prevent="saveOrder" class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Customer</label>
              <select v-model="orderForm.customerId" class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-white">
                <option value="">Select Customer</option>
                <option v-for="customer in customers" :key="customer.id" :value="customer.id">{{ customer.name }}</option>
              </select>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Status</label>
              <select v-model="orderForm.status" class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-white">
                <option value="pending">Pending</option>
                <option value="processing">Processing</option>
                <option value="shipped">Shipped</option>
                <option value="delivered">Delivered</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Total Amount</label>
              <input v-model="orderForm.total" type="number" step="0.01" class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-white" />
            </div>

            <div class="flex justify-end space-x-3 pt-4">
              <button type="button" @click="closeModal" class="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400">
                Cancel
              </button>
              <button type="submit" class="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700">
                {{ showEditModal ? 'Update' : 'Create' }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>

    <!-- View Order Modal -->
    <div v-if="showViewModal" class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div class="relative top-10 mx-auto p-5 border w-full max-w-2xl shadow-lg rounded-md bg-white dark:bg-gray-800">
        <div class="mt-3">
          <div class="flex items-center justify-between mb-6">
            <h3 class="text-xl font-semibold text-gray-900 dark:text-white">Order Details</h3>
            <button @click="closeViewModal" class="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
              <i class="pi pi-times text-xl"></i>
            </button>
          </div>
          
          <div v-if="viewingOrder" class="space-y-6">
            <!-- Order Header -->
            <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
              <div class="flex items-center justify-between">
                <div>
                  <h4 class="text-lg font-medium text-gray-900 dark:text-white">Order #{{ viewingOrder.id }}</h4>
                  <p class="text-sm text-gray-500 dark:text-gray-400">{{ formatDate(viewingOrder.date) }}</p>
                </div>
                <span :class="getStatusClass(viewingOrder.status)" class="px-3 py-1 text-sm font-medium rounded-full">
                  {{ viewingOrder.status }}
                </span>
              </div>
            </div>

            <!-- Customer Information -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h5 class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Customer Information</h5>
                <div class="bg-white dark:bg-gray-700 rounded-lg p-4 border border-gray-200 dark:border-gray-600">
                  <div class="flex items-center mb-3">
                    <img :src="viewingOrder.customer.avatar" :alt="viewingOrder.customer.name" class="w-12 h-12 rounded-full mr-3">
                    <div>
                      <p class="font-medium text-gray-900 dark:text-white">{{ viewingOrder.customer.name }}</p>
                      <p class="text-sm text-gray-500 dark:text-gray-400">{{ viewingOrder.customer.email }}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h5 class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Order Summary</h5>
                <div class="bg-white dark:bg-gray-700 rounded-lg p-4 border border-gray-200 dark:border-gray-600">
                  <div class="space-y-2">
                    <div class="flex justify-between">
                      <span class="text-gray-600 dark:text-gray-400">Items:</span>
                      <span class="font-medium text-gray-900 dark:text-white">{{ viewingOrder.items.length }} items</span>
                    </div>
                    <div class="flex justify-between">
                      <span class="text-gray-600 dark:text-gray-400">Total Amount:</span>
                      <span class="font-medium text-gray-900 dark:text-white">${{ viewingOrder.total.toFixed(2) }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Order Items -->
            <div>
              <h5 class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Order Items</h5>
              <div class="bg-white dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600 overflow-hidden">
                <div v-for="item in viewingOrder.items" :key="item.name" class="p-4 border-b border-gray-200 dark:border-gray-600 last:border-b-0">
                  <div class="flex items-center justify-between">
                    <div>
                      <p class="font-medium text-gray-900 dark:text-white">{{ item.name }}</p>
                      <p class="text-sm text-gray-500 dark:text-gray-400">Quantity: {{ item.quantity }}</p>
                    </div>
                    <div class="text-right">
                      <p class="font-medium text-gray-900 dark:text-white">${{ (item.price || 0).toFixed(2) }}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Action Buttons -->
            <div class="flex justify-end space-x-3 pt-4 border-t border-gray-200 dark:border-gray-600">
              <button @click="closeViewModal" class="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400">
                Close
              </button>
              <button @click="editOrder(viewingOrder)" class="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700">
                Edit Order
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Delete Confirmation Modal -->
    <div v-if="showDeleteModal" class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div class="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white dark:bg-gray-800">
        <div class="mt-3">
          <div class="flex items-center mb-4">
            <div class="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 dark:bg-red-900">
              <i class="pi pi-exclamation-triangle text-red-600 dark:text-red-400 text-xl"></i>
            </div>
          </div>
          <div class="text-center">
            <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-2">Delete Order</h3>
            <p class="text-sm text-gray-500 dark:text-gray-400 mb-6">
              Are you sure you want to delete order #{{ deletingOrder?.id }}? This action cannot be undone.
            </p>
            <div class="flex justify-center space-x-3">
              <button @click="closeDeleteModal" class="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400">
                Cancel
              </button>
              <button @click="confirmDelete" class="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700">
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Toast Notification -->
    <transition name="toast-fade">
      <div v-if="showToast" class="fixed bottom-6 right-6 z-50 flex items-center px-6 py-4 rounded-lg shadow-lg bg-white dark:bg-gray-900 border border-blue-200 dark:border-blue-700 animate-pop-in">
        <span class="flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-800 mr-4">
          <i class="pi pi-check text-blue-600 dark:text-blue-300 text-xl"></i>
        </span>
        <span class="text-blue-800 dark:text-blue-200 font-medium text-base">{{ toastMessage }}</span>
        <button @click="closeToast" class="ml-4 text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 focus:outline-none">
          <i class="pi pi-times text-lg"></i>
        </button>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()
const user = computed(() => authStore.user)
const userData = computed(() => authStore.getUserSpecificData())

// Transform user-specific orders data
const orders = computed(() => {
  if (!userData.value?.orders) return []
  
  return userData.value.orders.map(order => ({
    id: order.id,
    customer: {
      name: order.customerName,
      email: order.customerEmail,
      avatar: `https://images.unsplash.com/photo-${1500000000000 + order.id}?w=32&h=32&fit=crop&crop=face`
    },
    items: [
      { name: `Product ${order.id}`, quantity: Math.floor(Math.random() * 3) + 1, price: Math.floor(Math.random() * 100) + 50 },
      { name: `Product ${order.id + 1}`, quantity: Math.floor(Math.random() * 2) + 1, price: Math.floor(Math.random() * 200) + 100 }
    ],
    total: order.total,
    status: order.status,
    date: new Date(order.date)
  }))
})

const customers = ref([
  { id: 1, name: 'John Doe' },
  { id: 2, name: 'Jane Smith' },
  { id: 3, name: 'Mike Johnson' }
])

const filters = ref({
  search: '',
  status: '',
  dateRange: '',
  sortBy: 'date'
})

const currentPage = ref(1)
const itemsPerPage = ref(10)
const showAddModal = ref(false)
const showEditModal = ref(false)
const showViewModal = ref(false)
const showDeleteModal = ref(false)
const showToast = ref(false)
const toastMessage = ref('')
let toastTimeout = null
const editingOrder = ref(null)
const viewingOrder = ref(null)
const deletingOrder = ref(null)

const orderForm = ref({
  customerId: '',
  status: 'pending',
  total: 0
})

// Computed properties
const filteredOrders = computed(() => {
  let filtered = [...orders.value]

  // Search filter
  if (filters.value.search) {
    const search = filters.value.search.toLowerCase()
    filtered = filtered.filter(order => 
      order.customer.name.toLowerCase().includes(search) ||
      order.customer.email.toLowerCase().includes(search) ||
      order.id.toString().includes(search)
    )
  }

  // Status filter
  if (filters.value.status) {
    filtered = filtered.filter(order => order.status === filters.value.status)
  }

  // Date range filter
  if (filters.value.dateRange) {
    const now = new Date()
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
    
    switch (filters.value.dateRange) {
      case 'today':
        filtered = filtered.filter(order => order.date >= today)
        break
      case 'week':
        const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000)
        filtered = filtered.filter(order => order.date >= weekAgo)
        break
      case 'month':
        const monthAgo = new Date(today.getFullYear(), today.getMonth() - 1, today.getDate())
        filtered = filtered.filter(order => order.date >= monthAgo)
        break
      case 'year':
        const yearAgo = new Date(today.getFullYear() - 1, today.getMonth(), today.getDate())
        filtered = filtered.filter(order => order.date >= yearAgo)
        break
    }
  }

  // Sort
  filtered.sort((a, b) => {
    switch (filters.value.sortBy) {
      case 'amount':
        return b.total - a.total
      case 'customer':
        return a.customer.name.localeCompare(b.customer.name)
      case 'status':
        return a.status.localeCompare(b.status)
      default:
        return new Date(b.date).getTime() - new Date(a.date).getTime()
    }
  })

  return filtered
})

const paginatedOrders = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value
  const end = start + itemsPerPage.value
  return filteredOrders.value.slice(start, end)
})

const totalPages = computed(() => Math.ceil(filteredOrders.value.length / itemsPerPage.value))

const startIndex = computed(() => (currentPage.value - 1) * itemsPerPage.value)
const endIndex = computed(() => Math.min(startIndex.value + itemsPerPage.value, filteredOrders.value.length))

const visiblePages = computed(() => {
  const pages = []
  const maxVisible = 5
  let start = Math.max(1, currentPage.value - Math.floor(maxVisible / 2))
  let end = Math.min(totalPages.value, start + maxVisible - 1)
  
  if (end - start + 1 < maxVisible) {
    start = Math.max(1, end - maxVisible + 1)
  }
  
  for (let i = start; i <= end; i++) {
    pages.push(i)
  }
  return pages
})

const stats = computed(() => {
  const total = orders.value.length
  const pending = orders.value.filter(o => o.status === 'pending').length
  const delivered = orders.value.filter(o => o.status === 'delivered').length
  const cancelled = orders.value.filter(o => o.status === 'cancelled').length
  
  return { total, pending, delivered, cancelled }
})

// Methods
const applyFilters = () => {
  currentPage.value = 1
}

const clearFilters = () => {
  filters.value = {
    search: '',
    status: '',
    dateRange: '',
    sortBy: 'date'
  }
  currentPage.value = 1
}

const getStatusClass = (status: string) => {
  const classes = {
    pending: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
    processing: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
    shipped: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
    delivered: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
    cancelled: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
  }
  return classes[status] || classes.pending
}

const formatDate = (date: Date) => {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  }).format(date)
}

const viewOrder = (order: any) => {
  viewingOrder.value = order
  showViewModal.value = true
}

const editOrder = (order: any) => {
  editingOrder.value = order
  orderForm.value = {
    customerId: order.customer.id || '',
    status: order.status,
    total: order.total
  }
  showEditModal.value = true
}

const deleteOrder = (order: any) => {
  deletingOrder.value = order
  showDeleteModal.value = true
}

const showToastMessage = (message) => {
  toastMessage.value = message
  showToast.value = true
  if (toastTimeout) clearTimeout(toastTimeout)
  toastTimeout = setTimeout(() => {
    showToast.value = false
    toastMessage.value = ''
  }, 3000)
}

const closeToast = () => {
  showToast.value = false
  toastMessage.value = ''
  if (toastTimeout) clearTimeout(toastTimeout)
}

const confirmDelete = () => {
  if (deletingOrder.value) {
    const index = orders.value.findIndex(o => o.id === deletingOrder.value.id)
    if (index > -1) {
      orders.value.splice(index, 1)
      showToastMessage('Order deleted successfully!')
    }
    closeDeleteModal()
  }
}

const saveOrder = () => {
  if (!orderForm.value.customerId || !orderForm.value.total) {
    alert('Please fill all required fields!')
    return
  }
  
  try {
    if (showEditModal.value && editingOrder.value) {
      // Update existing order
      const order = orders.value.find(o => o.id === editingOrder.value.id)
      if (order) {
        order.status = orderForm.value.status
        order.total = parseFloat(orderForm.value.total)
        showToastMessage('Order updated successfully!')
      }
    } else {
      // Add new order
      const newOrder = {
        id: Math.max(...orders.value.map(o => o.id)) + 1,
        customer: customers.value.find(c => c.id === parseInt(orderForm.value.customerId)),
        items: [],
        total: parseFloat(orderForm.value.total),
        status: orderForm.value.status,
        date: new Date()
      }
      orders.value.unshift(newOrder)
      showToastMessage('Order added successfully!')
    }
    
    closeModal()
  } catch (error) {
    alert('An error occurred while saving the order. Please try again.')
  }
}

const closeModal = () => {
  showAddModal.value = false
  showEditModal.value = false
  editingOrder.value = null
  orderForm.value = {
    customerId: '',
    status: 'pending',
    total: 0
  }
}

const closeViewModal = () => {
  showViewModal.value = false
  viewingOrder.value = null
}

const closeDeleteModal = () => {
  showDeleteModal.value = false
  deletingOrder.value = null
}

onMounted(() => {
  // Initialize with sample data
})
</script>

<style scoped>
.toast-fade-enter-active, .toast-fade-leave-active {
  transition: opacity 0.3s, transform 0.3s;
}
.toast-fade-enter-from, .toast-fade-leave-to {
  opacity: 0;
  transform: translateY(20px) scale(0.95);
}
.toast-fade-enter-to, .toast-fade-leave-from {
  opacity: 1;
  transform: translateY(0) scale(1);
}
.animate-pop-in {
  animation: pop-in 0.25s cubic-bezier(.4,2,.6,1) both;
}
@keyframes pop-in {
  0% { opacity: 0; transform: scale(0.8) translateY(30px); }
  100% { opacity: 1; transform: scale(1) translateY(0); }
}
</style> 