<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h1 class="text-2xl font-bold text-gray-900 dark:text-white">Categories Management</h1>
        <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">Manage product categories and organization</p>
      </div>
      <div class="mt-4 sm:mt-0">
        <button @click="showAddModal = true" class="inline-flex items-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500">
          <i class="pi pi-plus mr-2"></i>
          Add Category
        </button>
      </div>
    </div>

    <!-- Filters -->
    <div class="bg-gradient-to-r from-purple-50 to-indigo-50 dark:from-gray-800 dark:to-gray-700 rounded-xl shadow-lg border border-purple-100 dark:border-gray-600 p-6">
      <div class="flex flex-col lg:flex-row items-end gap-4">
        <!-- Search -->
        <div class="flex-1 min-w-0">
          <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
            <i class="pi pi-search mr-1 text-purple-600"></i>Search Categories
          </label>
          <div class="relative">
            <input 
              v-model="filters.search" 
              type="text" 
              placeholder="Search by name, description..."
              class="w-full pl-10 pr-4 py-3 border-2 border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 dark:bg-gray-700 dark:text-white transition-all duration-200 hover:border-gray-300 dark:hover:border-gray-500"
            />
            <i class="pi pi-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
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
              class="w-full pl-10 pr-4 py-3 border-2 border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 dark:bg-gray-700 dark:text-white transition-all duration-200 hover:border-gray-300 dark:hover:border-gray-500 appearance-none"
            >
              <option value="">All Status</option>
              <option value="active">🟢 Active</option>
              <option value="inactive">⚫ Inactive</option>
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
              <option value="name">📝 Name</option>
              <option value="products">📦 Products Count</option>
              <option value="date">📅 Date Created</option>
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
          <div class="p-3 rounded-full bg-purple-100 dark:bg-purple-900">
            <i class="pi pi-tags text-purple-600 dark:text-purple-400 text-xl"></i>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-500 dark:text-gray-400">Total Categories</p>
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
          <div class="p-3 rounded-full bg-blue-100 dark:bg-blue-900">
            <i class="pi pi-box text-blue-600 dark:text-blue-400 text-xl"></i>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-500 dark:text-gray-400">Total Products</p>
            <p class="text-2xl font-bold text-gray-900 dark:text-white">{{ stats.totalProducts }}</p>
          </div>
        </div>
      </div>

      <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <div class="flex items-center">
          <div class="p-3 rounded-full bg-orange-100 dark:bg-orange-900">
            <i class="pi pi-star text-orange-600 dark:text-orange-400 text-xl"></i>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-500 dark:text-gray-400">Avg Products</p>
            <p class="text-2xl font-bold text-gray-900 dark:text-white">{{ stats.avgProducts }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Categories Table -->
    <div class="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead class="bg-gray-50 dark:bg-gray-700">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Category</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Description</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Subcategories</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Products</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Status</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Created</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody class="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
            <tr v-for="category in paginatedCategories" :key="category.id" class="hover:bg-gray-50 dark:hover:bg-gray-700">
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center">
                  <div :class="['w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold text-lg', category.color]">
                    {{ category.icon }}
                  </div>
                  <div class="ml-4">
                    <div class="text-sm font-medium text-gray-900 dark:text-white">{{ category.name }}</div>
                    <div class="text-sm text-gray-500 dark:text-gray-400">{{ category.slug }}</div>
                  </div>
                </div>
              </td>
              <td class="px-6 py-4">
                <div class="text-sm text-gray-900 dark:text-white max-w-xs truncate">
                  {{ category.description }}
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                <div class="flex items-center justify-between">
                  <div class="flex items-center">
                    <span class="font-medium">{{ category.subcategories?.length || 0 }}</span>
                    <span class="text-gray-500 dark:text-gray-400 ml-1">subcategories</span>
                  </div>
                  <button @click="manageSubcategories(category)" class="text-purple-600 hover:text-purple-900 dark:text-purple-400 dark:hover:text-purple-300 p-1 rounded hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-colors">
                    <i class="pi pi-plus-circle"></i>
                  </button>
                </div>
                <div v-if="category.subcategories && category.subcategories.length > 0" class="mt-2">
                  <div class="flex flex-wrap gap-1">
                    <span v-for="sub in category.subcategories.slice(0, 3)" :key="sub.id" class="px-2 py-1 text-xs bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300 rounded-full">
                      {{ sub.name }}
                    </span>
                    <span v-if="category.subcategories.length > 3" class="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded-full">
                      +{{ category.subcategories.length - 3 }} more
                    </span>
                  </div>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                <div class="flex items-center">
                  <span class="font-medium">{{ category.productsCount }}</span>
                  <span class="text-gray-500 dark:text-gray-400 ml-1">products</span>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span :class="getStatusClass(category.status)" class="px-2 py-1 text-xs font-medium rounded-full">
                  {{ category.status }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                {{ formatDate(category.createdAt) }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <div class="flex space-x-2">
                  <button @click="viewCategory(category)" class="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300 p-1 rounded hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors">
                    <i class="pi pi-eye"></i>
                  </button>
                  <button @click="editCategory(category)" class="text-green-600 hover:text-green-900 dark:text-green-400 dark:hover:text-green-300 p-1 rounded hover:bg-green-50 dark:hover:bg-green-900/20 transition-colors">
                    <i class="pi pi-pencil"></i>
                  </button>
                  <button @click="deleteCategory(category)" class="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300 p-1 rounded hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors">
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
            <button @click="nextPage" :disabled="currentPage >= totalPages" class="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed">
              Next
            </button>
          </div>
          <div class="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
            <div>
              <p class="text-sm text-gray-700 dark:text-gray-300">
                Showing <span class="font-medium">{{ startIndex + 1 }}</span> to <span class="font-medium">{{ endIndex }}</span> of <span class="font-medium">{{ filteredCategories.length }}</span> results
              </p>
            </div>
            <div>
              <nav class="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                <button @click="previousPage" :disabled="currentPage === 1" class="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed">
                  <i class="pi pi-chevron-left"></i>
                </button>
                <button v-for="page in visiblePages" :key="page" @click="goToPage(page)" :class="['relative inline-flex items-center px-4 py-2 border text-sm font-medium', page === currentPage ? 'z-10 bg-primary-50 border-primary-500 text-primary-600' : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50']">
                  {{ page }}
                </button>
                <button @click="nextPage" :disabled="currentPage >= totalPages" class="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed">
                  <i class="pi pi-chevron-right"></i>
                </button>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Add/Edit Category Modal -->
    <div v-if="showAddModal || showEditModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-2 sm:p-4">
      <div class="bg-white dark:bg-gray-800 rounded-xl shadow-2xl w-full max-w-md sm:max-w-lg lg:max-w-xl max-h-[95vh] sm:max-h-[90vh] overflow-y-auto">
        <div class="p-6">
          <div class="flex items-center justify-between mb-6">
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
              {{ showEditModal ? 'Edit Category' : 'Add New Category' }}
            </h3>
            <button @click="closeModal" class="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200">
              <i class="pi pi-times text-xl"></i>
            </button>
          </div>

          <form @submit.prevent="saveCategory" class="space-y-4">
            <!-- Category Name -->
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                <i class="pi pi-tag mr-1 text-purple-600"></i>Category Name *
              </label>
              <input 
                v-model="categoryForm.name" 
                type="text" 
                required
                placeholder="Enter category name"
                class="w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 dark:bg-gray-700 dark:text-white transition-all duration-200"
              />
            </div>

            <!-- Category Icon and Color in Grid -->
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <!-- Category Icon -->
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  <i class="pi pi-image mr-1 text-purple-600"></i>Category Icon
                </label>
                <div class="grid grid-cols-4 sm:grid-cols-6 gap-2 max-h-32 overflow-y-auto">
                  <button 
                    v-for="icon in availableIcons" 
                    :key="icon"
                    type="button"
                    @click="categoryForm.icon = icon"
                    :class="['w-10 h-10 rounded-lg flex items-center justify-center text-lg transition-all duration-200', categoryForm.icon === icon ? 'bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-400 border-2 border-purple-500' : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600']"
                  >
                    {{ icon }}
                  </button>
                </div>
              </div>

              <!-- Category Color -->
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  <i class="pi pi-palette mr-1 text-purple-600"></i>Category Color
                </label>
                <div class="grid grid-cols-4 sm:grid-cols-6 gap-2">
                  <button 
                    v-for="color in availableColors" 
                    :key="color.name"
                    type="button"
                    @click="categoryForm.color = color.class"
                    :class="['w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold transition-all duration-200', color.class, categoryForm.color === color.class ? 'ring-2 ring-offset-2 ring-purple-500' : 'hover:opacity-80']"
                  >
                    ✓
                  </button>
                </div>
              </div>
            </div>

            <!-- Description -->
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                <i class="pi pi-align-left mr-1 text-purple-600"></i>Description
              </label>
              <textarea 
                v-model="categoryForm.description" 
                rows="3"
                placeholder="Enter category description"
                class="w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 dark:bg-gray-700 dark:text-white transition-all duration-200 resize-none"
              ></textarea>
            </div>

            <!-- Status -->
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                <i class="pi pi-check-circle mr-1 text-purple-600"></i>Status
              </label>
              <select 
                v-model="categoryForm.status" 
                class="w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 dark:bg-gray-700 dark:text-white transition-all duration-200"
              >
                <option value="active">🟢 Active</option>
                <option value="inactive">⚫ Inactive</option>
              </select>
            </div>

            <!-- Subcategories Section -->
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                <i class="pi pi-tags mr-1 text-purple-600"></i>Subcategories
              </label>
              <div class="bg-gradient-to-r from-purple-50 to-indigo-50 dark:from-gray-700 dark:to-gray-600 rounded-xl p-4 border-2 border-purple-100 dark:border-purple-800">
                <!-- Add New Subcategory -->
                <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 mb-4">
                  <input 
                    v-model="newSubcategoryForm.name" 
                    type="text" 
                    placeholder="Subcategory name"
                    class="w-full px-3 py-2 border-2 border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 dark:bg-gray-700 dark:text-white transition-all duration-200"
                  />
                  <input 
                    v-model="newSubcategoryForm.description" 
                    type="text" 
                    placeholder="Description (optional)"
                    class="w-full px-3 py-2 border-2 border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 dark:bg-gray-700 dark:text-white transition-all duration-200"
                  />
                  <button 
                    @click="addSubcategoryToForm"
                    type="button"
                    class="w-full sm:w-auto px-4 py-2 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-lg hover:from-purple-700 hover:to-purple-800 focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-all duration-200 flex items-center justify-center"
                  >
                    <i class="pi pi-plus mr-1"></i>
                    Add Subcategory
                  </button>
                </div>

                <!-- Subcategories List -->
                <div v-if="categoryForm.subcategories && categoryForm.subcategories.length > 0" class="space-y-2">
                  <h5 class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Current Subcategories:</h5>
                  <div v-for="(subcategory, index) in categoryForm.subcategories" :key="subcategory.id" class="flex flex-col sm:flex-row sm:items-center justify-between p-3 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-600 gap-3">
                    <div class="flex-1 min-w-0">
                      <div class="flex items-center space-x-3">
                        <div class="w-6 h-6 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center flex-shrink-0">
                          <i class="pi pi-tag text-purple-600 dark:text-purple-400 text-xs"></i>
                        </div>
                        <div class="min-w-0 flex-1">
                          <p class="text-sm font-medium text-gray-900 dark:text-white truncate">{{ subcategory.name }}</p>
                          <p v-if="subcategory.description" class="text-xs text-gray-500 dark:text-gray-400 truncate">{{ subcategory.description }}</p>
                        </div>
                      </div>
                    </div>
                    <div class="flex items-center space-x-2 flex-shrink-0">
                      <button 
                        @click="removeSubcategoryFromForm(index)"
                        type="button"
                        class="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300 p-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors flex items-center"
                      >
                        <i class="pi pi-trash mr-1"></i>
                        <span class="text-xs sm:hidden">Remove</span>
                      </button>
                    </div>
                  </div>
                </div>
                <div v-else class="text-center py-4 text-gray-500 dark:text-gray-400">
                  <i class="pi pi-tags text-lg mb-2"></i>
                  <p class="text-sm">No subcategories added yet</p>
                </div>
              </div>
            </div>

            <!-- Form Actions -->
            <div class="flex flex-col sm:flex-row gap-3 pt-4">
              <button 
                type="submit" 
                class="flex-1 bg-gradient-to-r from-purple-600 to-purple-700 text-white py-3 px-4 rounded-xl hover:from-purple-700 hover:to-purple-800 focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center justify-center"
              >
                <i class="pi pi-check mr-2"></i>
                {{ showEditModal ? 'Update Category' : 'Create Category' }}
              </button>
              <button 
                type="button" 
                @click="closeModal"
                class="w-full sm:w-auto px-6 py-3 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-200"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>

    <!-- View Category Modal -->
    <div v-if="showViewModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div class="bg-white dark:bg-gray-800 rounded-xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
        <div class="p-6">
          <div class="flex items-center justify-between mb-6">
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Category Details</h3>
            <button @click="showViewModal = false" class="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200">
              <i class="pi pi-times text-xl"></i>
            </button>
          </div>

          <div v-if="selectedCategory" class="space-y-6">
            <!-- Category Header -->
            <div class="flex items-center space-x-4">
              <div :class="['w-16 h-16 rounded-xl flex items-center justify-center text-white font-bold text-2xl', selectedCategory.color]">
                {{ selectedCategory.icon }}
              </div>
              <div>
                <h4 class="text-xl font-bold text-gray-900 dark:text-white">{{ selectedCategory.name }}</h4>
                <p class="text-sm text-gray-500 dark:text-gray-400">{{ selectedCategory.slug }}</p>
              </div>
            </div>

            <!-- Category Info -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                <div class="flex items-center mb-2">
                  <i class="pi pi-box text-blue-600 mr-2"></i>
                  <span class="font-medium text-gray-900 dark:text-white">Products Count</span>
                </div>
                <p class="text-2xl font-bold text-blue-600 dark:text-blue-400">{{ selectedCategory.productsCount }}</p>
              </div>

              <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                <div class="flex items-center mb-2">
                  <i class="pi pi-calendar text-green-600 mr-2"></i>
                  <span class="font-medium text-gray-900 dark:text-white">Created Date</span>
                </div>
                <p class="text-sm text-gray-600 dark:text-gray-400">{{ formatDate(selectedCategory.createdAt) }}</p>
              </div>

              <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                <div class="flex items-center mb-2">
                  <i class="pi pi-check-circle text-orange-600 mr-2"></i>
                  <span class="font-medium text-gray-900 dark:text-white">Status</span>
                </div>
                <span :class="getStatusClass(selectedCategory.status)" class="px-3 py-1 text-sm font-medium rounded-full">
                  {{ selectedCategory.status }}
                </span>
              </div>

              <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                <div class="flex items-center mb-2">
                  <i class="pi pi-palette text-purple-600 mr-2"></i>
                  <span class="font-medium text-gray-900 dark:text-white">Color Theme</span>
                </div>
                <div class="flex items-center space-x-2">
                  <div :class="['w-6 h-6 rounded-full', selectedCategory.color]"></div>
                  <span class="text-sm text-gray-600 dark:text-gray-400">Custom Theme</span>
                </div>
              </div>
            </div>

            <!-- Description -->
            <div>
              <h5 class="font-medium text-gray-900 dark:text-white mb-2">Description</h5>
              <p class="text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                {{ selectedCategory.description || 'No description provided.' }}
              </p>
            </div>

            <!-- Action Buttons -->
            <div class="flex gap-3 pt-4">
              <button 
                @click="editCategory(selectedCategory)"
                class="flex-1 bg-gradient-to-r from-green-600 to-green-700 text-white py-3 px-4 rounded-xl hover:from-green-700 hover:to-green-800 focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center justify-center"
              >
                <i class="pi pi-pencil mr-2"></i>
                Edit Category
              </button>
              <button 
                @click="deleteCategory(selectedCategory)"
                class="flex-1 bg-gradient-to-r from-red-600 to-red-700 text-white py-3 px-4 rounded-xl hover:from-red-700 hover:to-red-800 focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center justify-center"
              >
                <i class="pi pi-trash mr-2"></i>
                Delete Category
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Delete Confirmation Modal -->
    <div v-if="showDeleteModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div class="bg-white dark:bg-gray-800 rounded-xl shadow-2xl max-w-md w-full">
        <div class="p-6">
          <div class="flex items-center mb-4">
            <div class="w-12 h-12 bg-red-100 dark:bg-red-900 rounded-full flex items-center justify-center mr-4">
              <i class="pi pi-exclamation-triangle text-red-600 dark:text-red-400 text-xl"></i>
            </div>
            <div>
              <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Delete Category</h3>
              <p class="text-sm text-gray-500 dark:text-gray-400">This action cannot be undone</p>
            </div>
          </div>

          <div v-if="categoryToDelete" class="mb-6">
            <p class="text-gray-700 dark:text-gray-300 mb-4">
              Are you sure you want to delete the category <strong>"{{ categoryToDelete.name }}"</strong>?
            </p>
            <div class="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
              <div class="flex items-center">
                <i class="pi pi-exclamation-circle text-red-600 dark:text-red-400 mr-2"></i>
                <span class="text-sm text-red-700 dark:text-red-300">
                  This will also affect {{ categoryToDelete.productsCount }} products in this category.
                </span>
              </div>
            </div>
          </div>

          <div class="flex gap-3">
            <button 
              @click="confirmDelete"
              class="flex-1 bg-gradient-to-r from-red-600 to-red-700 text-white py-3 px-4 rounded-xl hover:from-red-700 hover:to-red-800 focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center justify-center"
            >
              <i class="pi pi-trash mr-2"></i>
              Delete Category
            </button>
            <button 
              @click="showDeleteModal = false"
              class="px-6 py-3 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-200"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Subcategories Management Modal -->
    <div v-if="showSubcategoriesModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div class="bg-white dark:bg-gray-800 rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div class="p-6">
          <div class="flex items-center justify-between mb-6">
            <div>
              <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
                Manage Subcategories - {{ selectedCategoryForSub?.name }}
              </h3>
              <p class="text-sm text-gray-500 dark:text-gray-400">
                Add, edit, or remove subcategories for this category
              </p>
            </div>
            <button @click="showSubcategoriesModal = false" class="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200">
              <i class="pi pi-times text-xl"></i>
            </button>
          </div>

          <!-- Add New Subcategory Form -->
          <div class="bg-gradient-to-r from-purple-50 to-indigo-50 dark:from-gray-700 dark:to-gray-600 rounded-xl p-4 mb-6">
            <h4 class="font-medium text-gray-900 dark:text-white mb-3">Add New Subcategory</h4>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-3">
              <input 
                v-model="newSubcategory.name" 
                type="text" 
                placeholder="Subcategory name"
                class="px-4 py-2 border-2 border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 dark:bg-gray-700 dark:text-white transition-all duration-200"
              />
              <input 
                v-model="newSubcategory.description" 
                type="text" 
                placeholder="Description (optional)"
                class="px-4 py-2 border-2 border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 dark:bg-gray-700 dark:text-white transition-all duration-200"
              />
              <button 
                @click="addSubcategory"
                class="bg-gradient-to-r from-purple-600 to-purple-700 text-white py-2 px-4 rounded-lg hover:from-purple-700 hover:to-purple-800 focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-all duration-200 flex items-center justify-center"
              >
                <i class="pi pi-plus mr-2"></i>
                Add Subcategory
              </button>
            </div>
          </div>

          <!-- Subcategories List -->
          <div class="space-y-3">
            <h4 class="font-medium text-gray-900 dark:text-white">Current Subcategories</h4>
            <div v-if="selectedCategoryForSub?.subcategories?.length === 0" class="text-center py-8 text-gray-500 dark:text-gray-400">
              <i class="pi pi-tags text-3xl mb-2"></i>
              <p>No subcategories yet. Add your first subcategory above.</p>
            </div>
            <div v-else class="space-y-2">
              <div v-for="subcategory in selectedCategoryForSub?.subcategories" :key="subcategory.id" class="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div class="flex-1">
                  <div class="flex items-center space-x-3">
                    <div class="w-8 h-8 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center">
                      <i class="pi pi-tag text-purple-600 dark:text-purple-400"></i>
                    </div>
                    <div>
                      <h5 class="font-medium text-gray-900 dark:text-white">{{ subcategory.name }}</h5>
                      <p v-if="subcategory.description" class="text-sm text-gray-500 dark:text-gray-400">{{ subcategory.description }}</p>
                    </div>
                  </div>
                </div>
                <div class="flex items-center space-x-2">
                  <button @click="editSubcategory(subcategory)" class="text-green-600 hover:text-green-900 dark:text-green-400 dark:hover:text-green-300 p-1 rounded hover:bg-green-50 dark:hover:bg-green-900/20 transition-colors">
                    <i class="pi pi-pencil"></i>
                  </button>
                  <button @click="deleteSubcategory(subcategory)" class="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300 p-1 rounded hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors">
                    <i class="pi pi-trash"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Edit Subcategory Modal -->
    <div v-if="showEditSubcategoryModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div class="bg-white dark:bg-gray-800 rounded-xl shadow-2xl max-w-md w-full">
        <div class="p-6">
          <div class="flex items-center justify-between mb-6">
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Edit Subcategory</h3>
            <button @click="showEditSubcategoryModal = false" class="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200">
              <i class="pi pi-times text-xl"></i>
            </button>
          </div>

          <form @submit.prevent="saveSubcategoryEdit" class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                <i class="pi pi-tag mr-1 text-purple-600"></i>Subcategory Name *
              </label>
              <input 
                v-model="editingSubcategory.name" 
                type="text" 
                required
                placeholder="Enter subcategory name"
                class="w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 dark:bg-gray-700 dark:text-white transition-all duration-200"
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                <i class="pi pi-align-left mr-1 text-purple-600"></i>Description
              </label>
              <textarea 
                v-model="editingSubcategory.description" 
                rows="3"
                placeholder="Enter subcategory description"
                class="w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 dark:bg-gray-700 dark:text-white transition-all duration-200 resize-none"
              ></textarea>
            </div>

            <div class="flex gap-3 pt-4">
              <button 
                type="submit" 
                class="flex-1 bg-gradient-to-r from-purple-600 to-purple-700 text-white py-3 px-4 rounded-xl hover:from-purple-700 hover:to-purple-800 focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center justify-center"
              >
                <i class="pi pi-check mr-2"></i>
                Update Subcategory
              </button>
              <button 
                type="button" 
                @click="showEditSubcategoryModal = false"
                class="px-6 py-3 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-200"
              >
                Cancel
              </button>
            </div>
          </form>
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
const user = computed(() => authStore.user)
const userData = computed(() => authStore.getUserSpecificData())

// Transform user-specific categories data
const categories = computed(() => {
  if (!userData.value?.categories) return []
  
  return userData.value.categories.map(category => ({
    id: category.id,
    name: category.name,
    slug: category.name.toLowerCase().replace(/\s+/g, '-'),
    description: category.description,
    icon: ['🔌', '👕', '📚', '🏠', '⚽', '💄', '📱', '💻', '🎮', '🎵', '🎨', '🛠️', '🚗', '🍔', '☕', '🌱', '🎪', '📷', '🎬', '📺', '🏃', '🧘', '🎯', '🎲', '📦', '🎁', '💎', '👜', '👟', '🧢', '👓'][category.id % 30],
    color: [
      'bg-gradient-to-br from-blue-500 to-blue-600',
      'bg-gradient-to-br from-green-500 to-green-600',
      'bg-gradient-to-br from-purple-500 to-purple-600',
      'bg-gradient-to-br from-orange-500 to-orange-600',
      'bg-gradient-to-br from-red-500 to-red-600',
      'bg-gradient-to-br from-pink-500 to-pink-600',
      'bg-gradient-to-br from-indigo-500 to-indigo-600',
      'bg-gradient-to-br from-teal-500 to-teal-600',
      'bg-gradient-to-br from-yellow-500 to-yellow-600',
      'bg-gradient-to-br from-gray-500 to-gray-600'
    ][category.id % 10],
    productsCount: Math.floor(Math.random() * 50) + 10,
    status: category.status,
    createdAt: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000),
    subcategories: Array.from({ length: category.subcategories }, (_, i) => ({
      id: i + 1,
      name: `Subcategory ${i + 1}`,
      description: `Description for subcategory ${i + 1}`
    }))
  }))
})

const filters = ref({
  search: '',
  status: '',
  sortBy: 'name'
})

const showAddModal = ref(false)
const showEditModal = ref(false)
const showViewModal = ref(false)
const showDeleteModal = ref(false)
const showToast = ref(false)
const toastMessage = ref('')
let toastTimeout = null
const selectedCategory = ref(null)
const categoryToDelete = ref(null)
const currentPage = ref(1)
const itemsPerPage = 10

// Subcategory management
const showSubcategoriesModal = ref(false)
const showEditSubcategoryModal = ref(false)
const selectedCategoryForSub = ref(null)
const editingSubcategory = ref({})
const newSubcategory = ref({
  name: '',
  description: ''
})

// Form subcategory management
const newSubcategoryForm = ref({
  name: '',
  description: ''
})

const categoryForm = ref({
  name: '',
  description: '',
  icon: '📦',
  color: 'bg-gradient-to-br from-blue-500 to-blue-600',
  status: 'active',
  subcategories: []
})

// Available icons and colors for the form
const availableIcons = ['🔌', '👕', '📚', '🏠', '⚽', '💄', '📱', '💻', '🎮', '🎵', '🎨', '🛠️', '🚗', '🍔', '☕', '🌱', '🎪', '📷', '🎬', '📺', '🏃', '🧘', '🎯', '🎲', '📦', '🎁', '💎', '👜', '👟', '🧢', '👓']
const availableColors = [
  { name: 'Blue', class: 'bg-gradient-to-br from-blue-500 to-blue-600' },
  { name: 'Green', class: 'bg-gradient-to-br from-green-500 to-green-600' },
  { name: 'Purple', class: 'bg-gradient-to-br from-purple-500 to-purple-600' },
  { name: 'Orange', class: 'bg-gradient-to-br from-orange-500 to-orange-600' },
  { name: 'Red', class: 'bg-gradient-to-br from-red-500 to-red-600' },
  { name: 'Pink', class: 'bg-gradient-to-br from-pink-500 to-pink-600' },
  { name: 'Indigo', class: 'bg-gradient-to-br from-indigo-500 to-indigo-600' },
  { name: 'Teal', class: 'bg-gradient-to-br from-teal-500 to-teal-600' },
  { name: 'Yellow', class: 'bg-gradient-to-br from-yellow-500 to-yellow-600' },
  { name: 'Gray', class: 'bg-gradient-to-br from-gray-500 to-gray-600' },
  { name: 'Emerald', class: 'bg-gradient-to-br from-emerald-500 to-emerald-600' },
  { name: 'Rose', class: 'bg-gradient-to-br from-rose-500 to-rose-600' }
]

// Computed properties
const filteredCategories = computed(() => {
  let filtered = categories.value

  if (filters.value.search) {
    const search = filters.value.search.toLowerCase()
    filtered = filtered.filter(category => 
      category.name.toLowerCase().includes(search) ||
      category.description.toLowerCase().includes(search) ||
      category.slug.toLowerCase().includes(search)
    )
  }

  if (filters.value.status) {
    filtered = filtered.filter(category => category.status === filters.value.status)
  }

  // Sort
  filtered.sort((a, b) => {
    switch (filters.value.sortBy) {
      case 'name':
        return a.name.localeCompare(b.name)
      case 'products':
        return b.productsCount - a.productsCount
      case 'date':
        return new Date(b.createdAt) - new Date(a.createdAt)
      default:
        return 0
    }
  })

  return filtered
})

const paginatedCategories = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage
  const end = start + itemsPerPage
  return filteredCategories.value.slice(start, end)
})

const totalPages = computed(() => Math.ceil(filteredCategories.value.length / itemsPerPage))
const startIndex = computed(() => (currentPage.value - 1) * itemsPerPage)
const endIndex = computed(() => Math.min(startIndex.value + itemsPerPage, filteredCategories.value.length))

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
  const total = categories.value.length
  const active = categories.value.filter(c => c.status === 'active').length
  const totalProducts = categories.value.reduce((sum, c) => sum + c.productsCount, 0)
  const avgProducts = total > 0 ? Math.round(totalProducts / total) : 0

  return { total, active, totalProducts, avgProducts }
})

// Methods
function applyFilters() {
  currentPage.value = 1
}

function clearFilters() {
  filters.value = {
    search: '',
    status: '',
    sortBy: 'name'
  }
  currentPage.value = 1
}

function getStatusClass(status) {
  return status === 'active' 
    ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' 
    : 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
}

function formatDate(date) {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}

function viewCategory(category) {
  selectedCategory.value = category
  showViewModal.value = true
}

function editCategory(category) {
  categoryForm.value = {
    name: category.name,
    description: category.description,
    icon: category.icon,
    color: category.color,
    status: category.status,
    subcategories: category.subcategories ? [...category.subcategories] : []
  }
  selectedCategory.value = category
  showEditModal.value = true
  showViewModal.value = false
}

function deleteCategory(category) {
  categoryToDelete.value = category
  showDeleteModal.value = true
  showViewModal.value = false
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

function saveCategory() {
  if (!categoryForm.value.name || !categoryForm.value.description) {
    alert('Please fill all required fields!')
    return
  }
  
  try {
    if (showEditModal.value) {
      // Update existing category
      const index = categories.value.findIndex(c => c.id === selectedCategory.value.id)
      if (index !== -1) {
        categories.value[index] = {
          ...categories.value[index],
          ...categoryForm.value,
          slug: categoryForm.value.name.toLowerCase().replace(/\s+/g, '-')
        }
        showToastMessage('Category updated successfully!')
      }
    } else {
      // Add new category
      const newCategory = {
        id: Date.now(),
        ...categoryForm.value,
        slug: categoryForm.value.name.toLowerCase().replace(/\s+/g, '-'),
        productsCount: 0,
        createdAt: new Date()
      }
      categories.value.unshift(newCategory)
      showToastMessage('Category added successfully!')
    }
    
    closeModal()
  } catch (error) {
    alert('An error occurred while saving the category. Please try again.')
  }
}

function confirmDelete() {
  if (categoryToDelete.value) {
    const index = categories.value.findIndex(c => c.id === categoryToDelete.value.id)
    if (index !== -1) {
      categories.value.splice(index, 1)
      showToastMessage('Category deleted successfully!')
    }
  }
  showDeleteModal.value = false
  categoryToDelete.value = null
}

function closeModal() {
  showAddModal.value = false
  showEditModal.value = false
  showViewModal.value = false
  selectedCategory.value = null
  categoryForm.value = {
    name: '',
    description: '',
    icon: '📦',
    color: 'bg-gradient-to-br from-blue-500 to-blue-600',
    status: 'active',
    subcategories: []
  }
  newSubcategoryForm.value = {
    name: '',
    description: ''
  }
}

function previousPage() {
  if (currentPage.value > 1) {
    currentPage.value--
  }
}

function nextPage() {
  if (currentPage.value < totalPages.value) {
    currentPage.value++
  }
}

function goToPage(page) {
  currentPage.value = page
}

// Subcategory management methods
function manageSubcategories(category) {
  selectedCategoryForSub.value = category
  showSubcategoriesModal.value = true
}

function addSubcategory() {
  if (!newSubcategory.value.name.trim()) return
  
  const subcategory = {
    id: Date.now(),
    name: newSubcategory.value.name.trim(),
    description: newSubcategory.value.description.trim()
  }
  
  if (!selectedCategoryForSub.value.subcategories) {
    selectedCategoryForSub.value.subcategories = []
  }
  
  selectedCategoryForSub.value.subcategories.push(subcategory)
  
  // Reset form
  newSubcategory.value = {
    name: '',
    description: ''
  }
}

function editSubcategory(subcategory) {
  editingSubcategory.value = { ...subcategory }
  showEditSubcategoryModal.value = true
}

function saveSubcategoryEdit() {
  if (!editingSubcategory.value.name.trim()) return
  
  const category = selectedCategoryForSub.value
  const subcategoryIndex = category.subcategories.findIndex(sub => sub.id === editingSubcategory.value.id)
  
  if (subcategoryIndex !== -1) {
    category.subcategories[subcategoryIndex] = {
      ...category.subcategories[subcategoryIndex],
      name: editingSubcategory.value.name.trim(),
      description: editingSubcategory.value.description.trim()
    }
  }
  
  showEditSubcategoryModal.value = false
  editingSubcategory.value = {}
}

function deleteSubcategory(subcategory) {
  const category = selectedCategoryForSub.value
  const subcategoryIndex = category.subcategories.findIndex(sub => sub.id === subcategory.id)
  
  if (subcategoryIndex !== -1) {
    category.subcategories.splice(subcategoryIndex, 1)
  }
}

// Form subcategory methods
function addSubcategoryToForm() {
  if (!newSubcategoryForm.value.name.trim()) return
  
  const subcategory = {
    id: Date.now(),
    name: newSubcategoryForm.value.name.trim(),
    description: newSubcategoryForm.value.description.trim()
  }
  
  if (!categoryForm.value.subcategories) {
    categoryForm.value.subcategories = []
  }
  
  categoryForm.value.subcategories.push(subcategory)
  
  // Reset form
  newSubcategoryForm.value = {
    name: '',
    description: ''
  }
}

function removeSubcategoryFromForm(index) {
  categoryForm.value.subcategories.splice(index, 1)
}

onMounted(() => {
  // Initialize any data if needed
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