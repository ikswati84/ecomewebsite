<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
    <!-- Header -->
    <div class="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center py-6">
          <div>
            <h1 class="text-3xl font-bold text-gray-900 dark:text-white">Reviews Management</h1>
            <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">Manage customer reviews and ratings</p>
          </div>
          <div class="flex items-center space-x-3">
            <button @click="showAddModal = true" class="px-4 py-2 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white rounded-lg transition-all duration-200 flex items-center space-x-2 shadow-lg hover:shadow-xl">
              <i class="pi pi-plus text-sm"></i>
              <span>Add Review</span>
            </button>
          </div>
        </div>
      </div>
    </div>

    <div class="max-w-7xl mx-auto py-8">
      <!-- Stats Cards -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div class="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <div class="w-8 h-8 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                <i class="pi pi-star text-white text-sm"></i>
              </div>
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-500 dark:text-gray-400">Total Reviews</p>
              <p class="text-2xl font-bold text-gray-900 dark:text-white">{{ stats.total }}</p>
            </div>
          </div>
        </div>

        <div class="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <div class="w-8 h-8 bg-gradient-to-r from-green-500 to-green-600 rounded-lg flex items-center justify-center">
                <i class="pi pi-thumbs-up text-white text-sm"></i>
              </div>
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-500 dark:text-gray-400">Average Rating</p>
              <p class="text-2xl font-bold text-gray-900 dark:text-white">{{ stats.averageRating }}/5</p>
            </div>
          </div>
        </div>

        <div class="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <div class="w-8 h-8 bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-lg flex items-center justify-center">
                <i class="pi pi-clock text-white text-sm"></i>
              </div>
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-500 dark:text-gray-400">Pending</p>
              <p class="text-2xl font-bold text-gray-900 dark:text-white">{{ stats.pending }}</p>
            </div>
          </div>
        </div>

        <div class="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <div class="w-8 h-8 bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg flex items-center justify-center">
                <i class="pi pi-check-circle text-white text-sm"></i>
              </div>
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-500 dark:text-gray-400">Approved</p>
              <p class="text-2xl font-bold text-gray-900 dark:text-white">{{ stats.approved }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Filters -->
      <div class="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 mb-6">
        <div class="flex items-center justify-between mb-6">
          <div class="flex items-center space-x-3">
            <div class="w-10 h-10 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg flex items-center justify-center">
              <i class="pi pi-filter text-white text-lg"></i>
            </div>
            <div>
              <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Filter Reviews</h3>
              <p class="text-sm text-gray-500 dark:text-gray-400">Find exactly what you're looking for</p>
            </div>
          </div>
          <div class="flex items-center space-x-2">
            <button
              @click="applyFilters"
              class="px-4 py-2 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white rounded-lg transition-all duration-200 flex items-center space-x-2 shadow-lg hover:shadow-xl"
            >
              <i class="pi pi-check text-sm"></i>
              <span>Apply Filters</span>
            </button>
            <button
              @click="clearFilters"
              class="px-4 py-2 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-lg transition-colors duration-200 flex items-center space-x-2"
            >
              <i class="pi pi-refresh text-sm"></i>
              <span>Clear All</span>
            </button>
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <!-- Search -->
          <div class="space-y-2">
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center">
              <i class="pi pi-search mr-2 text-purple-500"></i>
              Search Reviews
            </label>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <i class="pi pi-search text-gray-400"></i>
              </div>
              <input
                v-model="filters.search"
                type="text"
                placeholder="Search by customer, product, or comment..."
                class="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-colors duration-200 bg-gradient-to-r from-gray-50 to-white dark:from-gray-800 dark:to-gray-700"
              >
            </div>
          </div>

          <!-- Rating Filter -->
          <div class="space-y-2">
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center">
              <i class="pi pi-star mr-2 text-yellow-500"></i>
              Rating Filter
            </label>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <i class="pi pi-star text-gray-400"></i>
              </div>
              <select
                v-model="filters.rating"
                class="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-colors duration-200 bg-gradient-to-r from-gray-50 to-white dark:from-gray-800 dark:to-gray-700 appearance-none"
              >
                <option value="">All Ratings</option>
                <option value="5">⭐⭐⭐⭐⭐ 5 Stars</option>
                <option value="4">⭐⭐⭐⭐ 4 Stars</option>
                <option value="3">⭐⭐⭐ 3 Stars</option>
                <option value="2">⭐⭐ 2 Stars</option>
                <option value="1">⭐ 1 Star</option>
              </select>
              <div class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <i class="pi pi-chevron-down text-gray-400"></i>
              </div>
            </div>
          </div>

          <!-- Status Filter -->
          <div class="space-y-2">
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center">
              <i class="pi pi-check-circle mr-2 text-green-500"></i>
              Status Filter
            </label>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <i class="pi pi-check-circle text-gray-400"></i>
              </div>
              <select
                v-model="filters.status"
                class="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-colors duration-200 bg-gradient-to-r from-gray-50 to-white dark:from-gray-800 dark:to-gray-700 appearance-none"
              >
                <option value="">All Status</option>
                <option value="approved">✅ Approved</option>
                <option value="pending">⏳ Pending</option>
                <option value="rejected">❌ Rejected</option>
              </select>
              <div class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <i class="pi pi-chevron-down text-gray-400"></i>
              </div>
            </div>
          </div>

          <!-- Sort By -->
          <div class="space-y-2">
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center">
              <i class="pi pi-sort mr-2 text-blue-500"></i>
              Sort By
            </label>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <i class="pi pi-sort text-gray-400"></i>
              </div>
              <select
                v-model="filters.sortBy"
                class="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-colors duration-200 bg-gradient-to-r from-gray-50 to-white dark:from-gray-800 dark:to-gray-700 appearance-none"
              >
                <option value="date">📅 Date (Newest)</option>
                <option value="rating">⭐ Rating (Highest)</option>
                <option value="customer">👤 Customer Name</option>
                <option value="product">📦 Product Name</option>
              </select>
              <div class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <i class="pi pi-chevron-down text-gray-400"></i>
              </div>
            </div>
          </div>
        </div>

        <div class="flex justify-between items-center mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
          <div class="flex items-center space-x-4">
            <div class="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
              <i class="pi pi-info-circle text-purple-500"></i>
              <span>Showing {{ startIndex + 1 }}-{{ endIndex }} of {{ filteredReviews.length }} reviews</span>
            </div>
            <div class="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
              <i class="pi pi-clock text-yellow-500"></i>
              <span>Last updated: {{ new Date().toLocaleTimeString() }}</span>
            </div>
          </div>
          <div class="flex items-center space-x-2">
            <div class="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span class="text-sm text-green-600 dark:text-green-400 font-medium">Live Data</span>
          </div>
        </div>
      </div>

      <!-- Reviews Table -->
      <div class="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead class="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Customer</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Product</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Rating</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Review</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Status</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Date</th>
                <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody class="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              <tr v-for="review in paginatedReviews" :key="review.id" class="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200">
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="flex items-center">
                    <img :src="review.customer.avatar" :alt="review.customer.name" class="w-8 h-8 rounded-full">
                    <div class="ml-3">
                      <div class="text-sm font-medium text-gray-900 dark:text-white">{{ review.customer.name }}</div>
                      <div class="text-sm text-gray-500 dark:text-gray-400">{{ review.customer.email }}</div>
                    </div>
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="flex items-center">
                    <img :src="review.product.image" :alt="review.product.name" class="w-8 h-8 rounded-lg object-cover">
                    <div class="ml-3">
                      <div class="text-sm font-medium text-gray-900 dark:text-white">{{ review.product.name }}</div>
                      <div class="text-sm text-gray-500 dark:text-gray-400">{{ review.product.category }}</div>
                    </div>
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="flex items-center">
                    <div class="flex items-center">
                      <i v-for="star in 5" :key="star" 
                         :class="star <= review.rating ? 'pi pi-star-fill text-yellow-400' : 'pi pi-star text-gray-300'"
                         class="text-sm"></i>
                    </div>
                    <span class="ml-2 text-sm text-gray-500 dark:text-gray-400">{{ review.rating }}/5</span>
                  </div>
                </td>
                <td class="px-6 py-4">
                  <div class="text-sm text-gray-900 dark:text-white max-w-xs truncate">{{ review.comment }}</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span :class="getStatusClass(review.status)" class="px-2 py-1 text-xs font-medium rounded-full">
                    {{ review.status }}
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                  {{ formatDate(review.date) }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div class="flex items-center justify-end space-x-2">
                    <button @click="viewReview(review)" class="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300">
                      <i class="pi pi-eye"></i>
                    </button>
                    <button @click="editReview(review)" class="text-green-600 hover:text-green-900 dark:text-green-400 dark:hover:text-green-300">
                      <i class="pi pi-pencil"></i>
                    </button>
                    <button @click="deleteReview(review)" class="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300">
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
                @click="previousPage"
                :disabled="currentPage === 1"
                class="relative inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 text-sm font-medium rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Previous
              </button>
              <button
                @click="nextPage"
                :disabled="currentPage === totalPages"
                class="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 text-sm font-medium rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
              </button>
            </div>
            <div class="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
              <div>
                <p class="text-sm text-gray-700 dark:text-gray-300">
                  Showing <span class="font-medium">{{ startIndex + 1 }}</span> to <span class="font-medium">{{ endIndex }}</span> of <span class="font-medium">{{ filteredReviews.length }}</span> results
                </p>
              </div>
              <div>
                <nav class="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                  <button
                    @click="previousPage"
                    :disabled="currentPage === 1"
                    class="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-sm font-medium text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <i class="pi pi-chevron-left"></i>
                  </button>
                  <button
                    v-for="page in visiblePages"
                    :key="page"
                    @click="goToPage(page)"
                    :class="[
                      'relative inline-flex items-center px-4 py-2 border text-sm font-medium',
                      page === currentPage
                        ? 'z-10 bg-purple-50 dark:bg-purple-900 border-purple-500 text-purple-600 dark:text-purple-400'
                        : 'bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-600'
                    ]"
                  >
                    {{ page }}
                  </button>
                  <button
                    @click="nextPage"
                    :disabled="currentPage === totalPages"
                    class="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-sm font-medium text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <i class="pi pi-chevron-right"></i>
                  </button>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Add/Edit Review Modal -->
    <div v-if="showAddModal || showEditModal" class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div class="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white dark:bg-gray-800">
        <div class="mt-3">
          <div class="flex items-center justify-between mb-4">
            <h3 class="text-lg font-medium text-gray-900 dark:text-white">
              {{ showEditModal ? 'Edit Review' : 'Add Review' }}
            </h3>
            <button @click="closeModal" class="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
              <i class="pi pi-times text-xl"></i>
            </button>
          </div>
          
          <form @submit.prevent="saveReview" class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Customer</label>
              <select v-model="reviewForm.customerId" class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-gray-700 dark:text-white">
                <option value="">Select Customer</option>
                <option v-for="customer in customers" :key="customer.id" :value="customer.id">{{ customer.name }}</option>
              </select>
            </div>
            
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Product</label>
              <select v-model="reviewForm.productId" class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-gray-700 dark:text-white">
                <option value="">Select Product</option>
                <option v-for="product in products" :key="product.id" :value="product.id">{{ product.name }}</option>
              </select>
            </div>
            
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Rating</label>
              <div class="flex items-center space-x-2">
                <i v-for="star in 5" :key="star" 
                   @click="reviewForm.rating = star"
                   :class="star <= reviewForm.rating ? 'pi pi-star-fill text-yellow-400 cursor-pointer' : 'pi pi-star text-gray-300 cursor-pointer'"
                   class="text-xl"></i>
                <span class="ml-2 text-sm text-gray-500 dark:text-gray-400">{{ reviewForm.rating }}/5</span>
              </div>
            </div>
            
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Comment</label>
              <textarea v-model="reviewForm.comment" rows="3" class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-gray-700 dark:text-white resize-none"></textarea>
            </div>
            
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Status</label>
              <select v-model="reviewForm.status" class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-gray-700 dark:text-white">
                <option value="pending">Pending</option>
                <option value="approved">Approved</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>
            
            <div class="flex justify-end space-x-3 pt-4">
              <button type="button" @click="closeModal" class="px-4 py-2 text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
                Cancel
              </button>
              <button type="submit" class="px-4 py-2 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white rounded-lg transition-all duration-200">
                {{ showEditModal ? 'Update' : 'Add' }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>

    <!-- View Review Modal -->
    <div v-if="showViewModal" class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div class="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white dark:bg-gray-800">
        <div class="mt-3">
          <div class="flex items-center justify-between mb-4">
            <h3 class="text-lg font-medium text-gray-900 dark:text-white">Review Details</h3>
            <button @click="closeViewModal" class="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
              <i class="pi pi-times text-xl"></i>
            </button>
          </div>
          
          <div v-if="viewingReview" class="space-y-4">
            <div class="flex items-center space-x-4">
              <img :src="viewingReview.customer.avatar" :alt="viewingReview.customer.name" class="w-12 h-12 rounded-full">
              <div>
                <h4 class="text-lg font-medium text-gray-900 dark:text-white">{{ viewingReview.customer.name }}</h4>
                <p class="text-sm text-gray-500 dark:text-gray-400">{{ viewingReview.customer.email }}</p>
              </div>
            </div>
            
            <div class="flex items-center space-x-4">
              <img :src="viewingReview.product.image" :alt="viewingReview.product.name" class="w-12 h-12 rounded-lg object-cover">
              <div>
                <h4 class="text-lg font-medium text-gray-900 dark:text-white">{{ viewingReview.product.name }}</h4>
                <p class="text-sm text-gray-500 dark:text-gray-400">{{ viewingReview.product.category }}</p>
              </div>
            </div>
            
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Rating</label>
              <div class="flex items-center">
                <div class="flex items-center">
                  <i v-for="star in 5" :key="star" 
                     :class="star <= viewingReview.rating ? 'pi pi-star-fill text-yellow-400' : 'pi pi-star text-gray-300'"
                     class="text-xl"></i>
                </div>
                <span class="ml-2 text-sm text-gray-500 dark:text-gray-400">{{ viewingReview.rating }}/5</span>
              </div>
            </div>
            
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Comment</label>
              <p class="text-gray-900 dark:text-white bg-gray-50 dark:bg-gray-700 p-3 rounded-lg">{{ viewingReview.comment }}</p>
            </div>
            
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Status</label>
              <span :class="getStatusClass(viewingReview.status)" class="px-2 py-1 text-xs font-medium rounded-full">
                {{ viewingReview.status }}
              </span>
            </div>
            
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Date</label>
              <p class="text-gray-900 dark:text-white">{{ formatDate(viewingReview.date) }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Delete Confirmation Modal -->
    <div v-if="showDeleteModal" class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div class="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white dark:bg-gray-800">
        <div class="mt-3 text-center">
          <div class="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 dark:bg-red-900">
            <i class="pi pi-exclamation-triangle text-red-600 dark:text-red-400 text-xl"></i>
          </div>
          <h3 class="text-lg font-medium text-gray-900 dark:text-white mt-4">Delete Review</h3>
          <div class="mt-2 px-7 pt-1">
            <p class="text-sm text-gray-500 dark:text-gray-400">
              Are you sure you want to delete this review? This action cannot be undone.
            </p>
          </div>
          <div class="flex justify-center space-x-3 mt-6">
            <button @click="closeDeleteModal" class="px-4 py-2 text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
              Cancel
            </button>
            <button @click="confirmDelete" class="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors">
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Toast Notification -->
    <transition name="toast-fade">
      <div v-if="showToast" class="fixed bottom-6 right-6 z-50 flex items-center px-6 py-4 rounded-lg shadow-lg bg-white dark:bg-gray-900 border border-purple-200 dark:border-purple-700 animate-pop-in">
        <span class="flex items-center justify-center w-8 h-8 rounded-full bg-purple-100 dark:bg-purple-800 mr-4">
          <i class="pi pi-check text-purple-600 dark:text-purple-300 text-xl"></i>
        </span>
        <span class="text-purple-800 dark:text-purple-200 font-medium text-base">{{ toastMessage }}</span>
        <button @click="closeToast" class="ml-4 text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 focus:outline-none">
          <i class="pi pi-times text-lg"></i>
        </button>
      </div>
    </transition>
  </div>
</template> 

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()
const currentUser = computed(() => authStore.user)

// Reactive data
const reviews = ref([])
const customers = ref([])
const products = ref([])
const currentPage = ref(1)
const itemsPerPage = 10

// Modal states
const showAddModal = ref(false)
const showEditModal = ref(false)
const showViewModal = ref(false)
const showDeleteModal = ref(false)
const showToast = ref(false)
const toastMessage = ref('')
let toastTimeout = null

// Form data
const editingReview = ref(null)
const viewingReview = ref(null)
const deletingReview = ref(null)
const reviewForm = ref({
  customerId: '',
  productId: '',
  rating: 5,
  comment: '',
  status: 'pending'
})

// Filters
const filters = ref({
  search: '',
  rating: '',
  status: '',
  sortBy: 'date'
})

// Generate sample data
const generateSampleData = () => {
  const sampleCustomers = [
    { id: 1, name: 'John Smith', email: 'john@example.com', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face' },
    { id: 2, name: 'Sarah Johnson', email: 'sarah@example.com', avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face' },
    { id: 3, name: 'Mike Davis', email: 'mike@example.com', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face' },
    { id: 4, name: 'Emily Wilson', email: 'emily@example.com', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face' },
    { id: 5, name: 'David Brown', email: 'david@example.com', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face' }
  ]

  const sampleProducts = [
    { id: 1, name: 'Wireless Headphones', category: 'Electronics', image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=100&h=100&fit=crop' },
    { id: 2, name: 'Smart Watch', category: 'Electronics', image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=100&h=100&fit=crop' },
    { id: 3, name: 'Running Shoes', category: 'Sports', image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=100&h=100&fit=crop' },
    { id: 4, name: 'Coffee Maker', category: 'Home', image: 'https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=100&h=100&fit=crop' },
    { id: 5, name: 'Yoga Mat', category: 'Sports', image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=100&h=100&fit=crop' }
  ]

  const sampleReviews = [
    {
      id: 1,
      customer: sampleCustomers[0],
      product: sampleProducts[0],
      rating: 5,
      comment: 'Excellent sound quality and very comfortable to wear for long periods.',
      status: 'approved',
      date: new Date('2024-01-15')
    },
    {
      id: 2,
      customer: sampleCustomers[1],
      product: sampleProducts[1],
      rating: 4,
      comment: 'Great features and battery life, but the band could be more comfortable.',
      status: 'approved',
      date: new Date('2024-01-14')
    },
    {
      id: 3,
      customer: sampleCustomers[2],
      product: sampleProducts[2],
      rating: 5,
      comment: 'Perfect for my daily runs. Very durable and comfortable.',
      status: 'pending',
      date: new Date('2024-01-13')
    },
    {
      id: 4,
      customer: sampleCustomers[3],
      product: sampleProducts[3],
      rating: 3,
      comment: 'Good coffee but takes a bit long to brew.',
      status: 'approved',
      date: new Date('2024-01-12')
    },
    {
      id: 5,
      customer: sampleCustomers[4],
      product: sampleProducts[4],
      rating: 5,
      comment: 'High quality mat, perfect thickness and grip.',
      status: 'approved',
      date: new Date('2024-01-11')
    },
    {
      id: 6,
      customer: sampleCustomers[0],
      product: sampleProducts[1],
      rating: 2,
      comment: 'Disappointed with the battery life and connectivity issues.',
      status: 'rejected',
      date: new Date('2024-01-10')
    },
    {
      id: 7,
      customer: sampleCustomers[1],
      product: sampleProducts[2],
      rating: 4,
      comment: 'Good running shoes, but they run a bit small.',
      status: 'approved',
      date: new Date('2024-01-09')
    },
    {
      id: 8,
      customer: sampleCustomers[2],
      product: sampleProducts[3],
      rating: 5,
      comment: 'Amazing coffee maker! Brews perfect coffee every time.',
      status: 'pending',
      date: new Date('2024-01-08')
    }
  ]

  // Filter reviews based on current user
  if (currentUser.value?.role === 'seller') {
    reviews.value = sampleReviews.filter(review => review.product.id <= 3)
  } else if (currentUser.value?.role === 'manager') {
    reviews.value = sampleReviews.filter(review => review.product.id <= 4)
  } else {
    reviews.value = sampleReviews
  }

  customers.value = sampleCustomers
  products.value = sampleProducts
}

// Computed properties
const filteredReviews = computed(() => {
  let filtered = [...reviews.value]

  // Search filter
  if (filters.value.search) {
    const search = filters.value.search.toLowerCase()
    filtered = filtered.filter(review => 
      review.customer.name.toLowerCase().includes(search) ||
      review.product.name.toLowerCase().includes(search) ||
      review.comment.toLowerCase().includes(search)
    )
  }

  // Rating filter
  if (filters.value.rating) {
    filtered = filtered.filter(review => review.rating === parseInt(filters.value.rating))
  }

  // Status filter
  if (filters.value.status) {
    filtered = filtered.filter(review => review.status === filters.value.status)
  }

  // Sort
  filtered.sort((a, b) => {
    switch (filters.value.sortBy) {
      case 'rating':
        return b.rating - a.rating
      case 'customer':
        return a.customer.name.localeCompare(b.customer.name)
      case 'product':
        return a.product.name.localeCompare(b.product.name)
      default:
        return new Date(b.date).getTime() - new Date(a.date).getTime()
    }
  })

  return filtered
})

const paginatedReviews = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage
  const end = start + itemsPerPage
  return filteredReviews.value.slice(start, end)
})

const totalPages = computed(() => Math.ceil(filteredReviews.value.length / itemsPerPage))

const startIndex = computed(() => (currentPage.value - 1) * itemsPerPage)
const endIndex = computed(() => Math.min(startIndex.value + itemsPerPage, filteredReviews.value.length))

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
  const total = reviews.value.length
  const averageRating = total > 0 ? (reviews.value.reduce((sum, r) => sum + r.rating, 0) / total).toFixed(1) : '0.0'
  const pending = reviews.value.filter(r => r.status === 'pending').length
  const approved = reviews.value.filter(r => r.status === 'approved').length
  
  return { total, averageRating, pending, approved }
})

// Methods
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

const applyFilters = () => {
  currentPage.value = 1
}

const clearFilters = () => {
  filters.value = {
    search: '',
    rating: '',
    status: '',
    sortBy: 'date'
  }
  currentPage.value = 1
}

const getStatusClass = (status) => {
  const classes = {
    approved: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
    pending: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
    rejected: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
  }
  return classes[status] || classes.pending
}

const formatDate = (date) => {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  }).format(date)
}

const viewReview = (review) => {
  viewingReview.value = review
  showViewModal.value = true
}

const editReview = (review) => {
  editingReview.value = review
  reviewForm.value = {
    customerId: review.customer.id,
    productId: review.product.id,
    rating: review.rating,
    comment: review.comment,
    status: review.status
  }
  showEditModal.value = true
}

const deleteReview = (review) => {
  deletingReview.value = review
  showDeleteModal.value = true
}

const saveReview = () => {
  if (!reviewForm.value.customerId || !reviewForm.value.productId || !reviewForm.value.comment) {
    alert('Please fill all required fields!')
    return
  }
  
  try {
    const customer = customers.value.find(c => c.id === parseInt(reviewForm.value.customerId))
    const product = products.value.find(p => p.id === parseInt(reviewForm.value.productId))
    
    if (showEditModal.value && editingReview.value) {
      // Update existing review
      const index = reviews.value.findIndex(r => r.id === editingReview.value.id)
      if (index !== -1) {
        reviews.value[index] = {
          ...reviews.value[index],
          customer,
          product,
          rating: reviewForm.value.rating,
          comment: reviewForm.value.comment,
          status: reviewForm.value.status
        }
        showToastMessage('Review updated successfully!')
      }
    } else {
      // Add new review
      const newReview = {
        id: Math.max(...reviews.value.map(r => r.id), 0) + 1,
        customer,
        product,
        rating: reviewForm.value.rating,
        comment: reviewForm.value.comment,
        status: reviewForm.value.status,
        date: new Date()
      }
      reviews.value.unshift(newReview)
      showToastMessage('Review added successfully!')
    }
    
    closeModal()
  } catch (error) {
    alert('An error occurred while saving the review. Please try again.')
  }
}

const confirmDelete = () => {
  if (deletingReview.value) {
    const index = reviews.value.findIndex(r => r.id === deletingReview.value.id)
    if (index > -1) {
      reviews.value.splice(index, 1)
      showToastMessage('Review deleted successfully!')
    }
    closeDeleteModal()
  }
}

const closeModal = () => {
  showAddModal.value = false
  showEditModal.value = false
  editingReview.value = null
  reviewForm.value = {
    customerId: '',
    productId: '',
    rating: 5,
    comment: '',
    status: 'pending'
  }
}

const closeViewModal = () => {
  showViewModal.value = false
  viewingReview.value = null
}

const closeDeleteModal = () => {
  showDeleteModal.value = false
  deletingReview.value = null
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

const goToPage = (page) => {
  currentPage.value = page
}

onMounted(() => {
  generateSampleData()
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