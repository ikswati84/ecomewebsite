<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h1 class="text-2xl font-bold text-gray-900 dark:text-white">Customer Management</h1>
        <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">Manage all customer accounts and their information</p>
      </div>
      <div class="mt-4 sm:mt-0">
        <button @click="addNewCustomer" class="inline-flex items-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-colors">
          <i class="pi pi-plus mr-2"></i>
          Add Customer
        </button>
      </div>
    </div>

    <!-- Filters -->
    <div class="bg-gradient-to-r from-purple-50 to-indigo-50 dark:from-gray-800 dark:to-gray-700 rounded-xl shadow-lg border border-purple-100 dark:border-gray-600 p-6">
      <div class="flex flex-col lg:flex-row items-end gap-4">
        <!-- Search -->
        <div class="flex-1 min-w-0">
          <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
            <i class="pi pi-search mr-1 text-purple-600"></i>Search Customers
          </label>
          <div class="relative">
            <input 
              v-model="filters.search" 
              type="text" 
              placeholder="Search by name, email, phone..."
              class="w-full pl-10 pr-4 py-3 border-2 border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 dark:bg-gray-700 dark:text-white transition-all duration-200 hover:border-gray-300 dark:hover:border-gray-500"
            />
            <i class="pi pi-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
          </div>
        </div>

        <!-- Status Filter -->
        <div class="flex-1 min-w-0">
          <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
            <i class="pi pi-user mr-1 text-green-600"></i>Status
          </label>
          <div class="relative">
            <select 
              v-model="filters.status" 
              class="w-full pl-10 pr-4 py-3 border-2 border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 dark:bg-gray-700 dark:text-white transition-all duration-200 hover:border-gray-300 dark:hover:border-gray-500 appearance-none"
            >
              <option value="">All Status</option>
              <option value="active">🟢 Active</option>
              <option value="inactive">🔴 Inactive</option>
              <option value="pending">🟡 Pending</option>
              <option value="verified">✅ Verified</option>
            </select>
            <i class="pi pi-chevron-down absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none"></i>
          </div>
        </div>

        <!-- Membership Filter -->
        <div class="flex-1 min-w-0">
          <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
            <i class="pi pi-star mr-1 text-yellow-600"></i>Membership
          </label>
          <div class="relative">
            <select 
              v-model="filters.membership" 
              class="w-full pl-10 pr-4 py-3 border-2 border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 dark:bg-gray-700 dark:text-white transition-all duration-200 hover:border-gray-300 dark:hover:border-gray-500 appearance-none"
            >
              <option value="">All Memberships</option>
              <option value="basic">🥉 Basic</option>
              <option value="premium">🥈 Premium</option>
              <option value="vip">🥇 VIP</option>
              <option value="platinum">💎 Platinum</option>
            </select>
            <i class="pi pi-chevron-down absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none"></i>
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
              class="w-full pl-10 pr-4 py-3 border-2 border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 dark:bg-gray-700 dark:text-white transition-all duration-200 hover:border-gray-300 dark:hover:border-gray-500 appearance-none"
            >
              <option value="name">👤 Name</option>
              <option value="email">📧 Email</option>
              <option value="orders">🛒 Orders</option>
              <option value="spent">💰 Total Spent</option>
              <option value="date">📅 Join Date</option>
            </select>
            <i class="pi pi-sort absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
          </div>
        </div>

        <!-- Filter Actions -->
        <div class="flex gap-2">
          <button @click="applyFilters" class="px-6 py-3 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-xl hover:from-purple-700 hover:to-purple-800 focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center">
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
            <i class="pi pi-users text-blue-600 dark:text-blue-400 text-xl"></i>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-500 dark:text-gray-400">Total Customers</p>
            <p class="text-2xl font-bold text-gray-900 dark:text-white">{{ stats.total }}</p>
          </div>
        </div>
      </div>

      <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <div class="flex items-center">
          <div class="p-3 rounded-full bg-green-100 dark:bg-green-900">
            <i class="pi pi-check-circle text-green-600 dark:text-green-400 text-xl"></i>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-500 dark:text-gray-400">Active</p>
            <p class="text-2xl font-bold text-gray-900 dark:text-white">{{ stats.active }}</p>
          </div>
        </div>
      </div>

      <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <div class="flex items-center">
          <div class="p-3 rounded-full bg-yellow-100 dark:bg-yellow-900">
            <i class="pi pi-star text-yellow-600 dark:text-yellow-400 text-xl"></i>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-500 dark:text-gray-400">Premium</p>
            <p class="text-2xl font-bold text-gray-900 dark:text-white">{{ stats.premium }}</p>
          </div>
        </div>
      </div>

      <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <div class="flex items-center">
          <div class="p-3 rounded-full bg-purple-100 dark:bg-purple-900">
            <i class="pi pi-dollar text-purple-600 dark:text-purple-400 text-xl"></i>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-500 dark:text-gray-400">Avg. Spent</p>
            <p class="text-2xl font-bold text-gray-900 dark:text-white">${{ stats.avgSpent }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Customers Table -->
    <div class="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead class="bg-gray-50 dark:bg-gray-700">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Customer</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Contact</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Membership</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Orders</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Total Spent</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Status</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Join Date</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody class="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
            <tr v-for="customer in paginatedCustomers" :key="customer.id" class="hover:bg-gray-50 dark:hover:bg-gray-700">
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center">
                  <img :src="customer.avatar" :alt="customer.name" class="w-10 h-10 rounded-full">
                  <div class="ml-4">
                    <div class="text-sm font-medium text-gray-900 dark:text-white">{{ customer.name }}</div>
                    <div class="text-sm text-gray-500 dark:text-gray-400">ID: #{{ customer.id }}</div>
                  </div>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-900 dark:text-white">{{ customer.email }}</div>
                <div class="text-sm text-gray-500 dark:text-gray-400">{{ customer.phone }}</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span :class="getMembershipClass(customer.membership)" class="px-2 py-1 text-xs font-medium rounded-full">
                  {{ customer.membership }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                {{ customer.orders }} orders
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                ${{ customer.totalSpent.toFixed(2) }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span :class="getStatusClass(customer.status)" class="px-2 py-1 text-xs font-medium rounded-full">
                  {{ customer.status }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                {{ formatDate(customer.joinDate) }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <div class="flex space-x-2">
                  <button @click="viewCustomer(customer)" class="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300">
                    <i class="pi pi-eye"></i>
                  </button>
                  <button @click="editCustomer(customer)" class="text-green-600 hover:text-green-900 dark:text-green-400 dark:hover:text-green-300">
                    <i class="pi pi-pencil"></i>
                  </button>
                  <button @click="deleteCustomer(customer)" class="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300">
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
            <button @click="previousPage" :disabled="currentPage === 1" class="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed">
              Previous
            </button>
            <button @click="nextPage" :disabled="currentPage === totalPages" class="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed">
              Next
            </button>
          </div>
          <div class="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
            <div>
              <p class="text-sm text-gray-700 dark:text-gray-300">
                Showing <span class="font-medium">{{ startIndex + 1 }}</span> to <span class="font-medium">{{ endIndex }}</span> of <span class="font-medium">{{ filteredCustomers.length }}</span> results
              </p>
            </div>
            <div>
              <nav class="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                <button @click="previousPage" :disabled="currentPage === 1" class="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed">
                  <i class="pi pi-chevron-left"></i>
                </button>
                <button v-for="page in visiblePages" :key="page" @click="currentPage = page" :class="[page === currentPage ? 'z-10 bg-primary-50 border-primary-500 text-primary-600' : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50', 'relative inline-flex items-center px-4 py-2 border text-sm font-medium']">
                  {{ page }}
                </button>
                <button @click="nextPage" :disabled="currentPage === totalPages" class="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed">
                  <i class="pi pi-chevron-right"></i>
                </button>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Add/Edit Customer Modal -->
    <div v-if="showAddModal || showEditModal" class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div class="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white dark:bg-gray-800">
        <div class="mt-3">
          <div class="flex items-center justify-between mb-4">
            <h3 class="text-lg font-medium text-gray-900 dark:text-white">
              {{ showEditModal ? 'Edit Customer' : 'Add New Customer' }}
            </h3>
            <button @click="closeModal" class="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
              <i class="pi pi-times text-xl"></i>
            </button>
          </div>
          
          <form @submit.prevent="saveCustomer" class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Full Name</label>
              <input v-model="customerForm.name" type="text" required class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-gray-700 dark:text-white">
            </div>
            
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email</label>
              <input v-model="customerForm.email" type="email" required class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-gray-700 dark:text-white">
            </div>
            
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Phone</label>
              <input v-model="customerForm.phone" type="tel" class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-gray-700 dark:text-white">
            </div>
            
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Address</label>
              <textarea v-model="customerForm.address" rows="3" class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-gray-700 dark:text-white"></textarea>
            </div>
            
            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Membership</label>
                <select v-model="customerForm.membership" class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-gray-700 dark:text-white">
                  <option value="basic">Basic</option>
                  <option value="premium">Premium</option>
                  <option value="vip">VIP</option>
                  <option value="platinum">Platinum</option>
                </select>
              </div>
              
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Status</label>
                <select v-model="customerForm.status" class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-gray-700 dark:text-white">
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                  <option value="pending">Pending</option>
                  <option value="verified">Verified</option>
                </select>
              </div>
            </div>

            <div class="flex justify-end space-x-3 pt-4 border-t border-gray-200 dark:border-gray-600">
              <button type="button" @click="closeModal" class="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400">
                Cancel
              </button>
              <button type="submit" class="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700">
                {{ showEditModal ? 'Update' : 'Add' }} Customer
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>

    <!-- View Customer Modal -->
    <div v-if="showViewModal" class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div class="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white dark:bg-gray-800">
        <div class="mt-3">
          <div class="flex items-center justify-between mb-4">
            <h3 class="text-lg font-medium text-gray-900 dark:text-white">Customer Details</h3>
            <button @click="closeViewModal" class="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
              <i class="pi pi-times text-xl"></i>
            </button>
          </div>
          
          <div v-if="viewingCustomer" class="space-y-4">
            <div class="flex items-center space-x-4">
              <img :src="viewingCustomer.avatar" :alt="viewingCustomer.name" class="w-16 h-16 rounded-full">
              <div>
                <h4 class="text-lg font-semibold text-gray-900 dark:text-white">{{ viewingCustomer.name }}</h4>
                <p class="text-sm text-gray-500 dark:text-gray-400">Customer ID: #{{ viewingCustomer.id }}</p>
              </div>
            </div>
            
            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
                <p class="text-sm text-gray-900 dark:text-white">{{ viewingCustomer.email }}</p>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">Phone</label>
                <p class="text-sm text-gray-900 dark:text-white">{{ viewingCustomer.phone }}</p>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">Membership</label>
                <span :class="getMembershipClass(viewingCustomer.membership)" class="px-2 py-1 text-xs font-medium rounded-full">
                  {{ viewingCustomer.membership }}
                </span>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">Status</label>
                <span :class="getStatusClass(viewingCustomer.status)" class="px-2 py-1 text-xs font-medium rounded-full">
                  {{ viewingCustomer.status }}
                </span>
              </div>
            </div>
            
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">Address</label>
              <p class="text-sm text-gray-900 dark:text-white">{{ viewingCustomer.address || 'No address provided' }}</p>
            </div>
            
            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">Total Orders</label>
                <p class="text-sm text-gray-900 dark:text-white">{{ viewingCustomer.orders }}</p>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">Total Spent</label>
                <p class="text-sm text-gray-900 dark:text-white">${{ viewingCustomer.totalSpent.toFixed(2) }}</p>
              </div>
            </div>
            
            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">Join Date</label>
                <p class="text-sm text-gray-900 dark:text-white">{{ formatDate(viewingCustomer.joinDate) }}</p>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">Customer Since</label>
                <p class="text-sm text-gray-900 dark:text-white">{{ getCustomerSince(viewingCustomer.joinDate) }}</p>
              </div>
            </div>
            
            <div v-if="viewingCustomer.orders > 0">
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">Average Order Value</label>
              <p class="text-sm text-gray-900 dark:text-white">${{ (viewingCustomer.totalSpent / viewingCustomer.orders).toFixed(2) }}</p>
            </div>

            <div class="flex justify-end space-x-3 pt-4 border-t border-gray-200 dark:border-gray-600">
              <button @click="closeViewModal" class="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400">
                Close
              </button>
              <button @click="editCustomer(viewingCustomer)" class="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700">
                Edit Customer
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
            <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-2">Delete Customer</h3>
            <p class="text-sm text-gray-500 dark:text-gray-400 mb-6">
              Are you sure you want to delete "{{ deletingCustomer?.name }}"? This action cannot be undone.
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
      <div v-if="showToast" class="fixed bottom-6 right-6 z-50 flex items-center px-6 py-4 rounded-lg shadow-lg bg-white dark:bg-gray-900 border border-green-200 dark:border-green-700 animate-pop-in">
        <span class="flex items-center justify-center w-8 h-8 rounded-full bg-green-100 dark:bg-green-800 mr-4">
          <i class="pi pi-check text-green-600 dark:text-green-300 text-xl"></i>
        </span>
        <span class="text-green-800 dark:text-green-200 font-medium text-base">{{ toastMessage }}</span>
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

// Generate user-specific customers data
const customers = ref([])

// Initialize customers data
onMounted(() => {
  if (userData.value?.orders) {
    // Create unique customers from orders
    const customerMap = new Map()
    
    userData.value.orders.forEach(order => {
      if (!customerMap.has(order.customerEmail)) {
        customerMap.set(order.customerEmail, {
          id: customerMap.size + 1,
          name: order.customerName,
          email: order.customerEmail,
          phone: `+1 (555) ${String(Math.floor(Math.random() * 900) + 100)}-${String(Math.floor(Math.random() * 9000) + 1000)}`,
          avatar: `https://images.unsplash.com/photo-${1500000000000 + customerMap.size}?w=100&h=100&fit=crop&crop=face`,
          address: `${Math.floor(Math.random() * 9999) + 1} Main St, City ${Math.floor(Math.random() * 50) + 1}, ST ${Math.floor(Math.random() * 90000) + 10000}`,
          membership: ['basic', 'premium', 'vip', 'platinum'][Math.floor(Math.random() * 4)],
          status: ['active', 'inactive', 'pending', 'verified'][Math.floor(Math.random() * 4)],
          orders: 1,
          totalSpent: order.total,
          joinDate: new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000)
        })
      } else {
        const customer = customerMap.get(order.customerEmail)
        customer.orders += 1
        customer.totalSpent += order.total
      }
    })
    
    customers.value = Array.from(customerMap.values())
  }
})

const filters = ref({
  search: '',
  status: '',
  membership: '',
  sortBy: 'name'
})

const currentPage = ref(1)
const itemsPerPage = ref(10)
const showAddModal = ref(false)
const showEditModal = ref(false)
const showViewModal = ref(false)
const showDeleteModal = ref(false)
const showSuccessModal = ref(false) // This is no longer used for toast
const successMessage = ref('') // This is no longer used for toast
const editingCustomer = ref(null)
const viewingCustomer = ref(null)
const deletingCustomer = ref(null)

const customerForm = ref({
  name: '',
  email: '',
  phone: '',
  address: '',
  membership: 'basic',
  status: 'active'
})

// Computed properties
const filteredCustomers = computed(() => {
  let filtered = [...customers.value]

  // Search filter
  if (filters.value.search) {
    const search = filters.value.search.toLowerCase()
    filtered = filtered.filter(customer => 
      customer.name.toLowerCase().includes(search) ||
      customer.email.toLowerCase().includes(search) ||
      customer.phone.includes(search)
    )
  }

  // Status filter
  if (filters.value.status) {
    filtered = filtered.filter(customer => customer.status === filters.value.status)
  }

  // Membership filter
  if (filters.value.membership) {
    filtered = filtered.filter(customer => customer.membership === filters.value.membership)
  }

  // Sort
  filtered.sort((a, b) => {
    switch (filters.value.sortBy) {
      case 'email':
        return a.email.localeCompare(b.email)
      case 'orders':
        return b.orders - a.orders
      case 'spent':
        return b.totalSpent - a.totalSpent
      case 'date':
        return new Date(b.joinDate).getTime() - new Date(a.joinDate).getTime()
      default:
        return a.name.localeCompare(b.name)
    }
  })

  return filtered
})

const paginatedCustomers = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value
  const end = start + itemsPerPage.value
  return filteredCustomers.value.slice(start, end)
})

const totalPages = computed(() => Math.ceil(filteredCustomers.value.length / itemsPerPage.value))

const startIndex = computed(() => (currentPage.value - 1) * itemsPerPage.value)
const endIndex = computed(() => Math.min(startIndex.value + itemsPerPage.value, filteredCustomers.value.length))

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
  const total = customers.value.length
  const active = customers.value.filter(c => c.status === 'active').length
  const premium = customers.value.filter(c => ['premium', 'vip', 'platinum'].includes(c.membership)).length
  const avgSpent = total > 0 ? (customers.value.reduce((sum, c) => sum + c.totalSpent, 0) / total).toFixed(0) : '0'
  
  return { total, active, premium, avgSpent }
})

// Methods
const applyFilters = () => {
  currentPage.value = 1
}

const clearFilters = () => {
  filters.value = {
    search: '',
    status: '',
    membership: '',
    sortBy: 'name'
  }
  currentPage.value = 1
}

const getStatusClass = (status) => {
  switch (status) {
    case 'active':
      return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
    case 'inactive':
      return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
    case 'pending':
      return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
    case 'verified':
      return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
    default:
      return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
  }
}

const getMembershipClass = (membership) => {
  switch (membership) {
    case 'basic':
      return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
    case 'premium':
      return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
    case 'vip':
      return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200'
    case 'platinum':
      return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
    default:
      return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
  }
}

const formatDate = (date) => {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}

const getCustomerSince = (joinDate) => {
  const now = new Date()
  const join = new Date(joinDate)
  const diffTime = Math.abs(now - join)
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  
  if (diffDays < 30) {
    return `${diffDays} days`
  } else if (diffDays < 365) {
    const months = Math.floor(diffDays / 30)
    return `${months} month${months > 1 ? 's' : ''}`
  } else {
    const years = Math.floor(diffDays / 365)
    return `${years} year${years > 1 ? 's' : ''}`
  }
}

const addNewCustomer = () => {
  // Reset form for new customer
  customerForm.value = {
    name: '',
    email: '',
    phone: '',
    address: '',
    membership: 'basic',
    status: 'active'
  }
  showAddModal.value = true
}

const showSuccessMessage = (message) => {
  successMessage.value = message
  showSuccessModal.value = true
  closeModal()
}

const closeSuccessModal = () => {
  showSuccessModal.value = false
  successMessage.value = ''
}

const viewCustomer = (customer) => {
  viewingCustomer.value = customer
  showViewModal.value = true
}

const editCustomer = (customer) => {
  // Populate form with customer data
  customerForm.value = {
    name: customer.name,
    email: customer.email,
    phone: customer.phone || '',
    address: customer.address || '',
    membership: customer.membership,
    status: customer.status
  }
  editingCustomer.value = customer
  showEditModal.value = true
  showViewModal.value = false
}

const deleteCustomer = (customer) => {
  // Check if customer has orders
  if (customer.orders > 0) {
    alert(`Cannot delete customer "${customer.name}" because they have ${customer.orders} order(s). Please handle their orders first.`)
    return
  }
  
  deletingCustomer.value = customer
  showDeleteModal.value = true
  showViewModal.value = false
}

const saveCustomer = () => {
  // Validate form
  if (!customerForm.value.name || !customerForm.value.email) {
    alert('Name and email are required!')
    return
  }
  
  // Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(customerForm.value.email)) {
    alert('Please enter a valid email address!')
    return
  }
  
  // Check if email already exists (for new customers)
  if (showAddModal.value) {
    const existingCustomer = customers.value.find(c => c.email === customerForm.value.email)
    if (existingCustomer) {
      alert('A customer with this email already exists!')
      return
    }
  }
  
  try {
    if (showEditModal.value) {
      // Update existing customer
      const index = customers.value.findIndex(c => c.id === editingCustomer.value.id)
      if (index !== -1) {
        customers.value[index] = {
          ...customers.value[index],
          name: customerForm.value.name,
          email: customerForm.value.email,
          phone: customerForm.value.phone,
          address: customerForm.value.address,
          membership: customerForm.value.membership,
          status: customerForm.value.status
        }
        showToastMessage('Customer updated successfully!')
      }
    } else {
      // Add new customer
      const newCustomer = {
        id: Math.max(...customers.value.map(c => c.id), 0) + 1,
        name: customerForm.value.name,
        email: customerForm.value.email,
        phone: customerForm.value.phone,
        address: customerForm.value.address,
        membership: customerForm.value.membership,
        status: customerForm.value.status,
        avatar: `https://images.unsplash.com/photo-${1500000000000 + customers.value.length}?w=100&h=100&fit=crop&crop=face`,
        orders: 0,
        totalSpent: 0,
        joinDate: new Date()
      }
      customers.value.push(newCustomer)
      showToastMessage('Customer added successfully!')
    }
    
    closeModal()
  } catch (error) {
    alert('An error occurred while saving the customer. Please try again.')
  }
}

const closeModal = () => {
  showAddModal.value = false
  showEditModal.value = false
  editingCustomer.value = null
  
  // Reset form
  customerForm.value = {
    name: '',
    email: '',
    phone: '',
    address: '',
    membership: 'basic',
    status: 'active'
  }
  
  // Clear any validation errors
}

const closeViewModal = () => {
  showViewModal.value = false
  viewingCustomer.value = null
}

const closeDeleteModal = () => {
  showDeleteModal.value = false
  deletingCustomer.value = null
}

const confirmDelete = () => {
  if (!deletingCustomer.value) return
  
  // Check if customer has orders
  if (deletingCustomer.value.orders > 0) {
    alert('Cannot delete customer with existing orders!')
    closeDeleteModal()
    return
  }
  
  // Remove customer from array
  const index = customers.value.findIndex(c => c.id === deletingCustomer.value.id)
  if (index > -1) {
    customers.value.splice(index, 1)
    showToastMessage('Customer deleted successfully!')
  }
  
  closeDeleteModal()
}

const previousPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--
  }
}

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++
  }
}

// Toast notification state
const showToast = ref(false)
const toastMessage = ref('')
let toastTimeout: ReturnType<typeof setTimeout> | null = null

const showToastMessage = (message: string) => {
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