<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h1 class="text-2xl font-bold text-gray-900 dark:text-white">Products Management</h1>
        <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">Manage all products, inventory, and pricing</p>
      </div>
      <div class="mt-4 sm:mt-0">
        <button @click="showAddModal = true" class="inline-flex items-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500">
          <i class="pi pi-plus mr-2"></i>
          Add Product
        </button>
      </div>
    </div>

    <!-- Filters -->
    <div class="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-gray-800 dark:to-gray-700 rounded-xl shadow-lg border border-green-100 dark:border-gray-600 p-6">
      <div class="flex flex-col lg:flex-row items-end gap-4">
        <!-- Search -->
        <div class="flex-1 min-w-0">
          <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
            <i class="pi pi-search mr-1 text-green-600"></i>Search Products
          </label>
          <div class="relative">
            <input 
              v-model="filters.search" 
              type="text" 
              placeholder="Search by name, SKU..."
              class="w-full pl-10 pr-4 py-3 border-2 border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:text-white transition-all duration-200 hover:border-gray-300 dark:hover:border-gray-500"
            />
            <i class="pi pi-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
          </div>
        </div>

        <!-- Category Filter -->
        <div class="flex-1 min-w-0">
          <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
            <i class="pi pi-tags mr-1 text-blue-600"></i>Category
          </label>
          <div class="relative">
            <select 
              v-model="filters.category" 
              class="w-full pl-10 pr-4 py-3 border-2 border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:text-white transition-all duration-200 hover:border-gray-300 dark:hover:border-gray-500 appearance-none"
            >
              <option value="">All Categories</option>
              <option value="electronics">🔌 Electronics</option>
              <option value="clothing">👕 Clothing</option>
              <option value="books">📚 Books</option>
              <option value="home">🏠 Home & Garden</option>
            </select>
            <i class="pi pi-chevron-down absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none"></i>
          </div>
        </div>

        <!-- Status Filter -->
        <div class="flex-1 min-w-0">
          <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
            <i class="pi pi-check-circle mr-1 text-orange-600"></i>Status
          </label>
          <div class="relative">
            <select 
              v-model="filters.status" 
              class="w-full pl-10 pr-4 py-3 border-2 border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:text-white transition-all duration-200 hover:border-gray-300 dark:hover:border-gray-500 appearance-none"
            >
              <option value="">All Status</option>
              <option value="active">🟢 Active</option>
              <option value="inactive">⚫ Inactive</option>
              <option value="out-of-stock">🔴 Out of Stock</option>
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
              class="w-full pl-10 pr-4 py-3 border-2 border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:text-white transition-all duration-200 hover:border-gray-300 dark:hover:border-gray-500 appearance-none"
            >
              <option value="name">📝 Name</option>
              <option value="price">💰 Price</option>
              <option value="stock">📦 Stock</option>
              <option value="date">📅 Date Added</option>
            </select>
            <i class="pi pi-sort absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
          </div>
        </div>

        <!-- Filter Actions -->
        <div class="flex gap-2">
          <button @click="applyFilters" class="px-6 py-3 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-xl hover:from-green-700 hover:to-green-800 focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center">
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
            <i class="pi pi-box text-blue-600 dark:text-blue-400 text-xl"></i>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-500 dark:text-gray-400">Total Products</p>
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
          <div class="p-3 rounded-full bg-red-100 dark:bg-red-900">
            <i class="pi pi-exclamation-triangle text-red-600 dark:text-red-400 text-xl"></i>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-500 dark:text-gray-400">Out of Stock</p>
            <p class="text-2xl font-bold text-gray-900 dark:text-white">{{ stats.outOfStock }}</p>
          </div>
        </div>
      </div>

      <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <div class="flex items-center">
          <div class="p-3 rounded-full bg-purple-100 dark:bg-purple-900">
            <i class="pi pi-dollar text-purple-600 dark:text-purple-400 text-xl"></i>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-500 dark:text-gray-400">Total Value</p>
            <p class="text-2xl font-bold text-gray-900 dark:text-white">${{ stats.totalValue.toFixed(2) }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Products Table -->
    <div class="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead class="bg-gray-50 dark:bg-gray-700">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Product</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Category</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Price</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Stock</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Status</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody class="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
            <tr v-for="product in paginatedProducts" :key="product.id" class="hover:bg-gray-50 dark:hover:bg-gray-700">
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center">
                  <img :src="product.image" :alt="product.name" class="w-10 h-10 rounded-lg object-cover">
                  <div class="ml-4">
                    <div class="text-sm font-medium text-gray-900 dark:text-white">{{ product.name }}</div>
                    <div class="text-sm text-gray-500 dark:text-gray-400">{{ product.sku }}</div>
                  </div>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                {{ product.category }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                ${{ product.price.toFixed(2) }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                {{ product.stock }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span :class="getStatusClass(product.status)" class="px-2 py-1 text-xs font-medium rounded-full">
                  {{ product.status }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <div class="flex space-x-2">
                  <button @click="viewProduct(product)" class="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300">
                    <i class="pi pi-eye"></i>
                  </button>
                  <button @click="editProduct(product)" class="text-green-600 hover:text-green-900 dark:text-green-400 dark:hover:text-green-300">
                    <i class="pi pi-pencil"></i>
                  </button>
                  <button @click="deleteProduct(product)" class="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300">
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
                Showing <span class="font-medium">{{ startIndex + 1 }}</span> to <span class="font-medium">{{ endIndex }}</span> of <span class="font-medium">{{ filteredProducts.length }}</span> results
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

    <!-- Add/Edit Product Modal -->
    <div v-if="showAddModal || showEditModal" class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div class="relative top-10 mx-auto p-5 border w-full max-w-2xl shadow-lg rounded-md bg-white dark:bg-gray-800">
        <div class="mt-3">
          <div class="flex items-center justify-between mb-4">
            <h3 class="text-lg font-medium text-gray-900 dark:text-white">
              {{ showEditModal ? 'Edit Product' : 'Add New Product' }}
            </h3>
            <button @click="closeModal" class="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
              <i class="pi pi-times text-xl"></i>
            </button>
          </div>
          <form @submit.prevent="saveProduct" class="space-y-6">
            <!-- Product Name and SKU Row -->
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  <i class="pi pi-tag mr-1 text-blue-600"></i>Product Name
                </label>
                <input v-model="productForm.name" type="text" placeholder="Enter product name" class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-white transition-all duration-200" />
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  <i class="pi pi-barcode mr-1 text-green-600"></i>SKU
                </label>
                <input v-model="productForm.sku" type="text" placeholder="Enter SKU code" class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-white transition-all duration-200" />
              </div>
            </div>

            <!-- Category and Status Row -->
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  <i class="pi pi-tags mr-1 text-purple-600"></i>Category
                </label>
                <select v-model="productForm.category" class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-white transition-all duration-200">
                  <option value="electronics">🔌 Electronics</option>
                  <option value="clothing">👕 Clothing</option>
                  <option value="books">📚 Books</option>
                  <option value="home">🏠 Home & Garden</option>
                </select>
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  <i class="pi pi-check-circle mr-1 text-orange-600"></i>Status
                </label>
                <select v-model="productForm.status" class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-white transition-all duration-200">
                  <option value="active">🟢 Active</option>
                  <option value="inactive">⚫ Inactive</option>
                  <option value="out-of-stock">🔴 Out of Stock</option>
                </select>
              </div>
            </div>

            <!-- Price and Stock Row -->
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  <i class="pi pi-dollar mr-1 text-green-600"></i>Price
                </label>
                <div class="relative">
                  <span class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
                  <input v-model="productForm.price" type="number" step="0.01" placeholder="0.00" class="w-full pl-8 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-white transition-all duration-200" />
                </div>
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  <i class="pi pi-box mr-1 text-blue-600"></i>Stock
                </label>
                <input v-model="productForm.stock" type="number" placeholder="Enter stock quantity" class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-white transition-all duration-200" />
              </div>
            </div>

            <!-- Product Image Upload -->
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                <i class="pi pi-image mr-2 text-blue-600"></i>Product Image
              </label>
              
              <!-- Image Upload Area -->
              <div class="relative">
                <!-- Upload Zone -->
                <div 
                  @click="triggerFileInput"
                  @dragover.prevent="handleDragOver"
                  @dragleave.prevent="handleDragLeave"
                  @drop.prevent="handleFileDrop"
                  :class="[
                    'border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-all duration-300 hover:shadow-lg',
                    isDragOver 
                      ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' 
                      : 'border-gray-300 dark:border-gray-600 hover:border-blue-400 dark:hover:border-blue-500'
                  ]"
                >
                  <!-- Upload Icon and Text -->
                  <div v-if="!productForm.imagePreview" class="space-y-3">
                    <div class="mx-auto w-16 h-16 bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-900 dark:to-blue-800 rounded-full flex items-center justify-center">
                      <i class="pi pi-cloud-upload text-2xl text-blue-600 dark:text-blue-400"></i>
                    </div>
                    <div>
                      <p class="text-lg font-semibold text-gray-700 dark:text-gray-300">Upload Product Image</p>
                      <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">
                        Drag and drop your image here, or 
                        <span class="text-blue-600 dark:text-blue-400 font-medium">click to browse</span>
                      </p>
                      <p class="text-xs text-gray-400 dark:text-gray-500 mt-2">
                        Supports: JPG, PNG, GIF (Max 5MB)
                      </p>
                    </div>
                  </div>

                  <!-- Image Preview -->
                  <div v-else class="relative">
                    <img 
                      :src="productForm.imagePreview" 
                      alt="Product preview" 
                      class="w-full h-48 object-cover rounded-lg shadow-lg"
                    />
                    <!-- Remove Image Button -->
                    <button 
                      @click.stop="removeImage"
                      class="absolute top-2 right-2 w-8 h-8 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-110"
                    >
                      <i class="pi pi-times text-sm"></i>
                    </button>
                    <!-- Upload Progress (if needed) -->
                    <div v-if="uploadProgress > 0 && uploadProgress < 100" class="absolute bottom-2 left-2 right-2">
                      <div class="bg-white dark:bg-gray-800 rounded-full h-2 overflow-hidden">
                        <div 
                          class="h-2 bg-gradient-to-r from-blue-500 to-blue-600 transition-all duration-300"
                          :style="{ width: uploadProgress + '%' }"
                        ></div>
                      </div>
                      <p class="text-xs text-gray-600 dark:text-gray-400 mt-1 text-center">{{ uploadProgress }}%</p>
                    </div>
                  </div>
                </div>

                <!-- Hidden File Input -->
                <input 
                  ref="fileInput"
                  type="file" 
                  accept="image/*"
                  @change="handleFileSelect"
                  class="hidden"
                />

                <!-- Upload Status Messages -->
                <div v-if="uploadStatus" class="mt-3 p-3 rounded-lg text-sm" :class="uploadStatus.type === 'success' ? 'bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-300' : 'bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-300'">
                  <div class="flex items-center">
                    <i :class="uploadStatus.type === 'success' ? 'pi pi-check-circle' : 'pi pi-exclamation-triangle'" class="mr-2"></i>
                    {{ uploadStatus.message }}
                  </div>
                </div>
              </div>
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

    <!-- View Product Modal -->
    <div v-if="showViewModal" class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div class="relative top-10 mx-auto p-5 border w-full max-w-2xl shadow-lg rounded-md bg-white dark:bg-gray-800">
        <div class="mt-3">
          <div class="flex items-center justify-between mb-6">
            <h3 class="text-xl font-semibold text-gray-900 dark:text-white">Product Details</h3>
            <button @click="closeViewModal" class="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
              <i class="pi pi-times text-xl"></i>
            </button>
          </div>
          
          <div v-if="viewingProduct" class="space-y-6">
            <!-- Product Header -->
            <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
              <div class="flex items-center justify-between">
                <div class="flex items-center">
                  <img :src="viewingProduct.image" :alt="viewingProduct.name" class="w-16 h-16 rounded-lg object-cover mr-4">
                  <div>
                    <h4 class="text-lg font-medium text-gray-900 dark:text-white">{{ viewingProduct.name }}</h4>
                    <p class="text-sm text-gray-500 dark:text-gray-400">SKU: {{ viewingProduct.sku }}</p>
                  </div>
                </div>
                <span :class="getStatusClass(viewingProduct.status)" class="px-3 py-1 text-sm font-medium rounded-full">
                  {{ viewingProduct.status }}
                </span>
              </div>
            </div>

            <!-- Product Information -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h5 class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Product Information</h5>
                <div class="bg-white dark:bg-gray-700 rounded-lg p-4 border border-gray-200 dark:border-gray-600">
                  <div class="space-y-3">
                    <div class="flex justify-between">
                      <span class="text-gray-600 dark:text-gray-400">Category:</span>
                      <span class="font-medium text-gray-900 dark:text-white capitalize">{{ viewingProduct.category }}</span>
                    </div>
                    <div class="flex justify-between">
                      <span class="text-gray-600 dark:text-gray-400">Price:</span>
                      <span class="font-medium text-gray-900 dark:text-white">${{ viewingProduct.price.toFixed(2) }}</span>
                    </div>
                    <div class="flex justify-between">
                      <span class="text-gray-600 dark:text-gray-400">Stock:</span>
                      <span class="font-medium text-gray-900 dark:text-white">{{ viewingProduct.stock }} units</span>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h5 class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Inventory Summary</h5>
                <div class="bg-white dark:bg-gray-700 rounded-lg p-4 border border-gray-200 dark:border-gray-600">
                  <div class="space-y-3">
                    <div class="flex justify-between">
                      <span class="text-gray-600 dark:text-gray-400">Total Value:</span>
                      <span class="font-medium text-gray-900 dark:text-white">${{ (viewingProduct.price * viewingProduct.stock).toFixed(2) }}</span>
                    </div>
                    <div class="flex justify-between">
                      <span class="text-gray-600 dark:text-gray-400">Status:</span>
                      <span :class="getStatusClass(viewingProduct.status)" class="px-2 py-1 text-xs font-medium rounded-full">
                        {{ viewingProduct.status }}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Product Image -->
            <div>
              <h5 class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Product Image</h5>
              <div class="bg-white dark:bg-gray-700 rounded-lg p-4 border border-gray-200 dark:border-gray-600">
                <img :src="viewingProduct.image" :alt="viewingProduct.name" class="w-full h-64 object-cover rounded-lg">
              </div>
            </div>

            <!-- Action Buttons -->
            <div class="flex justify-end space-x-3 pt-4 border-t border-gray-200 dark:border-gray-600">
              <button @click="closeViewModal" class="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400">
                Close
              </button>
              <button @click="editProduct(viewingProduct)" class="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700">
                Edit Product
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
            <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-2">Delete Product</h3>
            <p class="text-sm text-gray-500 dark:text-gray-400 mb-6">
              Are you sure you want to delete "{{ deletingProduct?.name }}"? This action cannot be undone.
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
      <div v-if="showToast" class="fixed bottom-6 right-6 z-50 flex items-center px-6 py-4 rounded-lg shadow-lg bg-white dark:bg-gray-900 border border-orange-200 dark:border-orange-700 animate-pop-in">
        <span class="flex items-center justify-center w-8 h-8 rounded-full bg-orange-100 dark:bg-orange-800 mr-4">
          <i class="pi pi-check text-orange-600 dark:text-orange-300 text-xl"></i>
        </span>
        <span class="text-orange-800 dark:text-orange-200 font-medium text-base">{{ toastMessage }}</span>
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

// Product interface
interface Product {
  id: number
  name: string
  sku: string
  category: string
  price: number
  stock: number
  status: string
  image: string
}

const authStore = useAuthStore()
const user = computed(() => authStore.user)
const userData = computed(() => authStore.getUserSpecificData())

// Transform user-specific products data
const products = computed(() => {
  if (!userData.value?.products) return []
  
  return userData.value.products.map(product => ({
    id: product.id,
    name: product.name,
    sku: `SKU-${product.id.toString().padStart(3, '0')}`,
    category: product.category.toLowerCase(),
    price: product.price,
    stock: product.stock,
    status: product.status,
    image: `https://images.unsplash.com/photo-${1500000000000 + product.id}?w=100&h=100&fit=crop`
  }))
})

const filters = ref({
  search: '',
  category: '',
  status: '',
  sortBy: 'name'
})

const currentPage = ref(1)
const itemsPerPage = ref(10)
const showAddModal = ref(false)
const showEditModal = ref(false)
const showViewModal = ref(false)
const showDeleteModal = ref(false)
const showToast = ref(false)
const toastMessage = ref('')
let toastTimeout: number | null = null
const editingProduct = ref<Product | null>(null)
const viewingProduct = ref<Product | null>(null)
const deletingProduct = ref<Product | null>(null)

const productForm = ref({
  name: '',
  sku: '',
  category: 'electronics',
  price: 0,
  stock: 0,
  status: 'active',
  imagePreview: ''
})

// Image upload related refs
const fileInput = ref<HTMLInputElement | null>(null)
const isDragOver = ref(false)
const uploadProgress = ref(0)
const uploadStatus = ref<{ type: string; message: string } | null>(null)

// Computed properties
const filteredProducts = computed(() => {
  let filtered = [...products.value]

  // Search filter
  if (filters.value.search) {
    const search = filters.value.search.toLowerCase()
    filtered = filtered.filter(product => 
      product.name.toLowerCase().includes(search) ||
      product.sku.toLowerCase().includes(search)
    )
  }

  // Category filter
  if (filters.value.category) {
    filtered = filtered.filter(product => product.category === filters.value.category)
  }

  // Status filter
  if (filters.value.status) {
    filtered = filtered.filter(product => product.status === filters.value.status)
  }

  // Sort
  filtered.sort((a, b) => {
    switch (filters.value.sortBy) {
      case 'price':
        return b.price - a.price
      case 'stock':
        return b.stock - a.stock
      case 'date':
        return b.id - a.id
      default:
        return a.name.localeCompare(b.name)
    }
  })

  return filtered
})

const paginatedProducts = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value
  const end = start + itemsPerPage.value
  return filteredProducts.value.slice(start, end)
})

const totalPages = computed(() => Math.ceil(filteredProducts.value.length / itemsPerPage.value))

const startIndex = computed(() => (currentPage.value - 1) * itemsPerPage.value)
const endIndex = computed(() => Math.min(startIndex.value + itemsPerPage.value, filteredProducts.value.length))

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
  const total = products.value.length
  const active = products.value.filter(p => p.status === 'active').length
  const outOfStock = products.value.filter(p => p.status === 'out-of-stock').length
  const totalValue = products.value.reduce((sum, p) => sum + (p.price * p.stock), 0)
  
  return { total, active, outOfStock, totalValue }
})

// Methods
const applyFilters = () => {
  currentPage.value = 1
}

const clearFilters = () => {
  filters.value = {
    search: '',
    category: '',
    status: '',
    sortBy: 'name'
  }
  currentPage.value = 1
}

const getStatusClass = (status: string) => {
  const classes: Record<string, string> = {
    active: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
    inactive: 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200',
    'out-of-stock': 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
  }
  return classes[status] || classes.inactive
}

const viewProduct = (product: Product) => {
  viewingProduct.value = product
  showViewModal.value = true
}

const editProduct = (product: Product) => {
  editingProduct.value = product
  productForm.value = {
    name: product.name,
    sku: product.sku,
    category: product.category,
    price: product.price,
    stock: product.stock,
    status: product.status,
    imagePreview: product.image
  }
  showEditModal.value = true
}

const deleteProduct = (product: Product) => {
  deletingProduct.value = product
  showDeleteModal.value = true
}

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

const confirmDelete = () => {
  if (deletingProduct.value) {
    const index = products.value.findIndex(p => p.id === deletingProduct.value!.id)
    if (index > -1) {
      products.value.splice(index, 1)
      showToastMessage('Product deleted successfully!')
    }
    closeDeleteModal()
  }
}

const saveProduct = () => {
  if (!productForm.value.name || !productForm.value.price) {
    alert('Please fill all required fields!')
    return
  }
  
  try {
    if (showEditModal.value && editingProduct.value) {
      // Update existing product
      const product = products.value.find(p => p.id === editingProduct.value!.id)
      if (product) {
        Object.assign(product, {
          ...productForm.value,
          image: productForm.value.imagePreview || product.image
        })
        showToastMessage('Product updated successfully!')
      }
    } else {
      // Add new product
      const newProduct: Product = {
        id: Math.max(...products.value.map(p => p.id)) + 1,
        ...productForm.value,
        image: productForm.value.imagePreview || 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=100&h=100&fit=crop'
      }
      products.value.unshift(newProduct)
      showToastMessage('Product added successfully!')
    }
    
    closeModal()
  } catch (error) {
    alert('An error occurred while saving the product. Please try again.')
  }
}

const closeModal = () => {
  showAddModal.value = false
  showEditModal.value = false
  editingProduct.value = null
  productForm.value = {
    name: '',
    sku: '',
    category: 'electronics',
    price: 0,
    stock: 0,
    status: 'active',
    imagePreview: ''
  }
  // Reset upload state
  isDragOver.value = false
  uploadProgress.value = 0
  uploadStatus.value = null
  if (fileInput.value) {
    fileInput.value.value = ''
  }
}

const closeViewModal = () => {
  showViewModal.value = false
  viewingProduct.value = null
}

const closeDeleteModal = () => {
  showDeleteModal.value = false
  deletingProduct.value = null
}

// Image Upload Methods
const triggerFileInput = () => {
  fileInput.value?.click()
}

const handleDragOver = (e: DragEvent) => {
  e.preventDefault()
  isDragOver.value = true
}

const handleDragLeave = (e: DragEvent) => {
  e.preventDefault()
  isDragOver.value = false
}

const handleFileDrop = (e: DragEvent) => {
  e.preventDefault()
  isDragOver.value = false
  const files = e.dataTransfer?.files
  if (files && files.length > 0) {
    handleFile(files[0])
  }
}

const handleFileSelect = (e: Event) => {
  const target = e.target as HTMLInputElement
  const file = target.files?.[0]
  if (file) {
    handleFile(file)
  }
}

const handleFile = (file: File) => {
  // Validate file type
  const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif']
  if (!validTypes.includes(file.type)) {
    uploadStatus.value = {
      type: 'error',
      message: 'Please select a valid image file (JPG, PNG, GIF)'
    }
    setTimeout(() => uploadStatus.value = null, 3000)
    return
  }

  // Validate file size (5MB)
  const maxSize = 5 * 1024 * 1024 // 5MB
  if (file.size > maxSize) {
    uploadStatus.value = {
      type: 'error',
      message: 'File size must be less than 5MB'
    }
    setTimeout(() => uploadStatus.value = null, 3000)
    return
  }

  // Simulate upload progress
  uploadProgress.value = 0
  uploadStatus.value = {
    type: 'success',
    message: 'Uploading image...'
  }

  const reader = new FileReader()
  reader.onload = (e: ProgressEvent<FileReader>) => {
    const result = e.target?.result
    if (typeof result === 'string') {
      productForm.value.imagePreview = result
      uploadProgress.value = 100
      
      setTimeout(() => {
        uploadStatus.value = {
          type: 'success',
          message: 'Image uploaded successfully!'
        }
        uploadProgress.value = 0
        setTimeout(() => uploadStatus.value = null, 2000)
      }, 500)
    }
  }
  reader.readAsDataURL(file)
}

const removeImage = () => {
  productForm.value.imagePreview = ''
  if (fileInput.value) {
    fileInput.value.value = ''
  }
  uploadStatus.value = null
  uploadProgress.value = 0
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