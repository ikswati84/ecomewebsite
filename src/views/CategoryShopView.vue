<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useCategoriesStore } from '@/stores/categories'
import ProductCard from '@/components/ProductCard.vue'
import { ChevronDownIcon, FunnelIcon, Squares2X2Icon, ListBulletIcon } from '@heroicons/vue/24/outline'

const route = useRoute()
const categoriesStore = useCategoriesStore()

const category = ref<any>(null)
const products = ref<any[]>([])
const isLoading = ref(true)

// Filter and sort options
const sortBy = ref('featured')
const viewMode = ref<'grid' | 'list'>('grid')
const priceRange = ref([0, 1000])
const selectedBrands = ref<string[]>([])
const selectedRatings = ref<number[]>([])

const brands = computed(() => {
  const brandSet = new Set<string>()
  products.value.forEach(product => {
    // Extract brand from product name (in real app, this would be a separate field)
    const brand = product.name.split(' ')[0]
    brandSet.add(brand)
  })
  return Array.from(brandSet)
})

const filteredProducts = computed(() => {
  let filtered = [...products.value]

  // Filter by price range
  filtered = filtered.filter(product => 
    product.price >= priceRange.value[0] && product.price <= priceRange.value[1]
  )

  // Filter by brands
  if (selectedBrands.value.length > 0) {
    filtered = filtered.filter(product => {
      const brand = product.name.split(' ')[0]
      return selectedBrands.value.includes(brand)
    })
  }

  // Filter by ratings
  if (selectedRatings.value.length > 0) {
    filtered = filtered.filter(product => 
      selectedRatings.value.includes(Math.floor(product.rating))
    )
  }

  // Sort products
  switch (sortBy.value) {
    case 'price-low':
      filtered.sort((a, b) => a.price - b.price)
      break
    case 'price-high':
      filtered.sort((a, b) => b.price - a.price)
      break
    case 'rating':
      filtered.sort((a, b) => b.rating - a.rating)
      break
    case 'reviews':
      filtered.sort((a, b) => b.reviews - a.reviews)
      break
    default:
      // Keep original order for 'featured'
      break
  }

  return filtered
})

onMounted(async () => {
  const categorySlug = route.params.slug as string
  category.value = categoriesStore.getCategoryBySlug(categorySlug)
  
  if (category.value) {
    products.value = categoriesStore.getProductsByCategory(category.value.id)
  }
  
  isLoading.value = false
})

const toggleBrand = (brand: string) => {
  const index = selectedBrands.value.indexOf(brand)
  if (index > -1) {
    selectedBrands.value.splice(index, 1)
  } else {
    selectedBrands.value.push(brand)
  }
}

const toggleRating = (rating: number) => {
  const index = selectedRatings.value.indexOf(rating)
  if (index > -1) {
    selectedRatings.value.splice(index, 1)
  } else {
    selectedRatings.value.push(rating)
  }
}

const clearFilters = () => {
  priceRange.value = [0, 1000]
  selectedBrands.value = []
  selectedRatings.value = []
  sortBy.value = 'featured'
}
</script>

<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
    <!-- Hero Header -->
    <section v-if="category" class="relative py-20 bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 overflow-hidden">
      <!-- Background Pattern -->
      <div class="absolute inset-0 opacity-10">
        <div class="absolute inset-0" style="background-image: radial-gradient(circle at 1px 1px, rgba(255,255,255,0.1) 1px, transparent 0); background-size: 20px 20px;"></div>
      </div>
      
      <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex flex-col lg:flex-row items-center gap-8">
          <!-- Category Image -->
          <div class="lg:w-1/3">
            <div class="relative">
              <img 
                :src="category.image" 
                :alt="category.name"
                class="w-full h-64 lg:h-80 object-cover rounded-2xl shadow-2xl"
              />
              <div class="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl"></div>
            </div>
          </div>
          
          <!-- Category Info -->
          <div class="lg:w-2/3 text-center lg:text-left">
            <nav class="flex justify-center lg:justify-start mb-6" aria-label="Breadcrumb">
              <ol class="flex items-center space-x-2 text-primary-100">
                <li>
                  <router-link to="/" class="hover:text-white transition-colors">
                    Home
                  </router-link>
                </li>
                <li>
                  <span class="text-primary-200">/</span>
                </li>
                <li>
                  <span class="text-white font-medium">{{ category.name }}</span>
                </li>
              </ol>
            </nav>
            
            <h1 class="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
              {{ category.name }}
            </h1>
            <p class="text-xl text-primary-100 mb-8 max-w-2xl mx-auto lg:mx-0">
              {{ category.description }}
            </p>
            
            <div class="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-6">
              <div class="bg-white/10 backdrop-blur-sm rounded-xl px-6 py-3 border border-white/20">
                <div class="text-2xl font-bold text-white">{{ products.length }}</div>
                <div class="text-sm text-primary-100">Products Available</div>
              </div>
              <div class="bg-white/10 backdrop-blur-sm rounded-xl px-6 py-3 border border-white/20">
                <div class="text-2xl font-bold text-white">{{ category.productCount }}</div>
                <div class="text-sm text-primary-100">Total Collection</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Filters and Sort -->
      <div class="flex flex-col lg:flex-row gap-8">
        <!-- Sidebar Filters -->
        <div class="lg:w-80 space-y-6">
          <!-- Sort Options -->
          <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
              <FunnelIcon class="h-5 w-5 mr-2" />
              Sort & Filter
            </h3>
            <select
              v-model="sortBy"
              class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
            >
              <option value="featured">Featured</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
              <option value="reviews">Most Reviewed</option>
            </select>
          </div>

          <!-- Price Range -->
          <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Price Range</h3>
            <div class="space-y-4">
              <div class="flex justify-between text-sm text-gray-600 dark:text-gray-400">
                <span>${{ priceRange[0] }}</span>
                <span>${{ priceRange[1] }}</span>
              </div>
              <input
                type="range"
                v-model="priceRange[1]"
                min="0"
                max="1000"
                class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
              />
            </div>
          </div>

          <!-- Brands -->
          <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Brands</h3>
            <div class="space-y-3">
              <label
                v-for="brand in brands"
                :key="brand"
                class="flex items-center space-x-3 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 p-2 rounded-lg transition-colors"
              >
                <input
                  type="checkbox"
                  :value="brand"
                  v-model="selectedBrands"
                  class="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                />
                <span class="text-gray-700 dark:text-gray-300">{{ brand }}</span>
              </label>
            </div>
          </div>

          <!-- Ratings -->
          <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Rating</h3>
            <div class="space-y-3">
              <label
                v-for="rating in [5, 4, 3, 2, 1]"
                :key="rating"
                class="flex items-center space-x-3 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 p-2 rounded-lg transition-colors"
              >
                <input
                  type="checkbox"
                  :value="rating"
                  v-model="selectedRatings"
                  class="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                />
                <div class="flex items-center space-x-2">
                  <div class="flex text-yellow-400">
                    <svg v-for="i in 5" :key="i" class="h-4 w-4" :class="i <= rating ? 'text-yellow-400' : 'text-gray-300'" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  </div>
                  <span class="text-gray-700 dark:text-gray-300">& up</span>
                </div>
              </label>
            </div>
          </div>

          <!-- Clear Filters -->
          <button
            @click="clearFilters"
            class="w-full bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 py-3 px-4 rounded-lg font-medium hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
          >
            Clear All Filters
          </button>
        </div>

        <!-- Products Section -->
        <div class="flex-1">
          <!-- Results Header -->
          <div class="flex items-center justify-between mb-8">
            <div>
              <h2 class="text-2xl font-bold text-gray-900 dark:text-white">
                {{ filteredProducts.length }} Products
              </h2>
              <p class="text-gray-600 dark:text-gray-400">
                Showing results for {{ category?.name }}
              </p>
            </div>
            
            <!-- View Mode Toggle -->
            <div class="flex items-center bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
              <button
                @click="viewMode = 'grid'"
                class="p-2 rounded-md transition-colors duration-200"
                :class="viewMode === 'grid' ? 'bg-white dark:bg-gray-600 shadow-sm' : 'text-gray-600 dark:text-gray-400'"
              >
                <Squares2X2Icon class="h-4 w-4" />
              </button>
              <button
                @click="viewMode = 'list'"
                class="p-2 rounded-md transition-colors duration-200"
                :class="viewMode === 'list' ? 'bg-white dark:bg-gray-600 shadow-sm' : 'text-gray-600 dark:text-gray-400'"
              >
                <ListBulletIcon class="h-4 w-4" />
              </button>
            </div>
          </div>

          <!-- Products Grid -->
          <div
            class="grid gap-6"
            :class="viewMode === 'grid' ? 'grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'"
          >
            <ProductCard
              v-for="product in filteredProducts"
              :key="product.id"
              :product="product"
            />
          </div>

          <!-- Empty State -->
          <div v-if="filteredProducts.length === 0" class="text-center py-16">
            <FunnelIcon class="mx-auto h-16 w-16 text-gray-400 mb-4" />
            <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-2">No products found</h3>
            <p class="text-gray-500 dark:text-gray-400 mb-6">
              Try adjusting your filters to find what you're looking for.
            </p>
            <button
              @click="clearFilters"
              class="bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700 transition-colors"
            >
              Clear All Filters
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.slider {
  -webkit-appearance: none;
  appearance: none;
}

.slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: #22c55e;
  cursor: pointer;
}

.slider::-moz-range-thumb {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: #22c55e;
  cursor: pointer;
  border: none;
}
</style> 