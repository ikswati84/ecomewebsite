<script setup lang="ts">
import { ref, computed } from 'vue'
import ProductCard from '@/components/ProductCard.vue'
import {
  FunnelIcon,
  Squares2X2Icon,
  Bars3Icon,
  MagnifyingGlassIcon,
  AdjustmentsHorizontalIcon,
  StarIcon,
  SparklesIcon,
  FireIcon,
  HeartIcon,
  ShoppingCartIcon
} from '@heroicons/vue/24/outline'
import { useCartStore } from '@/stores/cart'
import { useWishlistStore } from '@/stores/wishlist'
import { useRecentProductsStore } from '@/stores/recentProducts'

// Product interface
interface Product {
  id: number
  name: string
  description: string
  price: number
  originalPrice?: number
  image: string
  rating: number
  reviews: number
  category: string
  tags: string[]
  inStock: boolean
  isNew: boolean
  isHot: boolean
}

// Store instances
const cartStore = useCartStore()
const wishlistStore = useWishlistStore()
const recentProductsStore = useRecentProductsStore()

// Loading states for individual products
const loadingStates = ref<{ [key: number]: boolean }>({})

// Helper functions for list view
const isInWishlist = (productId: number) => wishlistStore.isInWishlist(productId)
const isInCart = (productId: number) => cartStore.isInCart(productId)
const isLoading = (productId: number) => loadingStates.value[productId] || false

const addToCart = async (product: Product) => {
  loadingStates.value[product.id] = true
  await new Promise(resolve => setTimeout(resolve, 500))

  cartStore.addToCart({
    id: product.id,
    name: product.name,
    price: product.price,
    image: product.image
  })

  loadingStates.value[product.id] = false
}

const toggleWishlist = (product: Product) => {
  if (isInWishlist(product.id)) {
    wishlistStore.removeFromWishlist(product.id)
  } else {
    wishlistStore.addToWishlist({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      description: product.description
    })
  }
}

// Sample products data with more variety
const products = ref<Product[]>([
  {
    id: 1,
    name: "Premium Wireless Headphones",
    description: "High-quality wireless headphones with noise cancellation and premium sound quality.",
    price: 299.99,
    originalPrice: 399.99,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop",
    rating: 4.8,
    reviews: 128,
    category: "Electronics",
    tags: ["Wireless", "Noise Cancellation", "Premium"],
    inStock: true,
    isNew: true,
    isHot: false
  },
  {
    id: 2,
    name: "Smart Fitness Watch",
    description: "Advanced fitness tracking with heart rate monitoring and GPS capabilities.",
    price: 199.99,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop",
    rating: 4.5,
    reviews: 89,
    category: "Electronics",
    tags: ["Fitness", "GPS", "Heart Rate"],
    inStock: true,
    isNew: false,
    isHot: true
  },
  {
    id: 3,
    name: "Designer Leather Bag",
    description: "Handcrafted leather bag with premium materials and elegant design.",
    price: 159.99,
    originalPrice: 199.99,
    image: "https://images.unsplash.com/photo-1548036328-cdaf765ed2fd?w=400&h=400&fit=crop",
    rating: 4.7,
    reviews: 67,
    category: "Fashion",
    tags: ["Leather", "Premium", "Designer"],
    inStock: true,
    isNew: false,
    isHot: false
  },
  {
    id: 4,
    name: "Wireless Bluetooth Speaker",
    description: "Portable speaker with 360-degree sound and 20-hour battery life.",
    price: 89.99,
    image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&h=400&fit=crop",
    rating: 4.3,
    reviews: 156,
    category: "Electronics",
    tags: ["Bluetooth", "Portable", "360° Sound"],
    inStock: true,
    isNew: false,
    isHot: true
  },
  {
    id: 5,
    name: "Organic Cotton T-Shirt",
    description: "Comfortable and sustainable cotton t-shirt with modern fit.",
    price: 29.99,
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop",
    rating: 4.2,
    reviews: 234,
    category: "Fashion",
    tags: ["Organic", "Sustainable", "Comfortable"],
    inStock: true,
    isNew: true,
    isHot: false
  },
  {
    id: 6,
    name: "Stainless Steel Water Bottle",
    description: "Insulated water bottle that keeps drinks cold for 24 hours.",
    price: 24.99,
    image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=400&h=400&fit=crop",
    rating: 4.9,
    reviews: 189,
    category: "Home",
    tags: ["Insulated", "Stainless Steel", "24h Cold"],
    inStock: true,
    isNew: false,
    isHot: true
  },
  {
    id: 7,
    name: "Wireless Charging Pad",
    description: "Fast wireless charging pad compatible with all Qi-enabled devices.",
    price: 49.99,
    image: "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400&h=400&fit=crop",
    rating: 4.1,
    reviews: 76,
    category: "Electronics",
    tags: ["Wireless", "Fast Charging", "Qi Compatible"],
    inStock: false,
    isNew: false,
    isHot: false
  },
  {
    id: 8,
    name: "Ceramic Coffee Mug Set",
    description: "Set of 4 beautiful ceramic coffee mugs with modern design.",
    price: 34.99,
    image: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=400&h=400&fit=crop",
    rating: 4.6,
    reviews: 142,
    category: "Home",
    tags: ["Ceramic", "Set of 4", "Modern Design"],
    inStock: true,
    isNew: false,
    isHot: false
  },
  {
    id: 9,
    name: "Smart Home Security Camera",
    description: "1080p HD security camera with night vision and motion detection.",
    price: 129.99,
    originalPrice: 159.99,
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop",
    rating: 4.4,
    reviews: 98,
    category: "Electronics",
    tags: ["Security", "HD", "Night Vision"],
    inStock: true,
    isNew: true,
    isHot: false
  },
  {
    id: 10,
    name: "Premium Yoga Mat",
    description: "Non-slip yoga mat with alignment lines for perfect poses.",
    price: 79.99,
    image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&h=400&fit=crop",
    rating: 4.8,
    reviews: 203,
    category: "Fashion",
    tags: ["Yoga", "Non-slip", "Alignment Lines"],
    inStock: true,
    isNew: false,
    isHot: true
  },
  {
    id: 11,
    name: "Smart LED Light Bulb",
    description: "WiFi-enabled smart bulb with 16 million colors and voice control.",
    price: 19.99,
    image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=400&h=400&fit=crop",
    rating: 4.0,
    reviews: 167,
    category: "Home",
    tags: ["Smart", "WiFi", "Voice Control"],
    inStock: true,
    isNew: false,
    isHot: false
  },
  {
    id: 12,
    name: "Wireless Gaming Mouse",
    description: "High-precision gaming mouse with customizable RGB lighting.",
    price: 89.99,
    originalPrice: 119.99,
    image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400&h=400&fit=crop",
    rating: 4.7,
    reviews: 134,
    category: "Electronics",
    tags: ["Gaming", "Wireless", "RGB"],
    inStock: true,
    isNew: false,
    isHot: true
  }
])

// Filter states
const selectedCategory = ref<string>('All')
const sortBy = ref<string>('featured')
const viewMode = ref<'grid' | 'list'>('grid')
const searchQuery = ref<string>('')
const priceRange = ref<[number, number]>([0, 500])
const selectedTags = ref<string[]>([])
const showFilters = ref<boolean>(false)

// Available filters
const categories: string[] = ['All', 'Electronics', 'Fashion', 'Home']
const tags: string[] = ['Wireless', 'Premium', 'Gaming', 'Smart', 'Organic', 'Sustainable', 'Portable', 'Security', 'Yoga', 'RGB']

const filteredAndSortedProducts = computed(() => {
  let filtered = products.value

  // Filter by search query
  if (searchQuery.value) {
    filtered = filtered.filter(product =>
      product.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      product.tags.some(tag => tag.toLowerCase().includes(searchQuery.value.toLowerCase()))
    )
  }

  // Filter by category
  if (selectedCategory.value !== 'All') {
    filtered = filtered.filter(product => product.category === selectedCategory.value)
  }

  // Filter by price range
  filtered = filtered.filter(product =>
    product.price >= priceRange.value[0] && product.price <= priceRange.value[1]
  )

  // Filter by tags
  if (selectedTags.value.length > 0) {
    filtered = filtered.filter(product =>
      product.tags.some(tag => selectedTags.value.includes(tag))
    )
  }

  // Sort products
  switch (sortBy.value) {
    case 'price-low':
      return filtered.sort((a, b) => a.price - b.price)
    case 'price-high':
      return filtered.sort((a, b) => b.price - a.price)
    case 'rating':
      return filtered.sort((a, b) => b.rating - a.rating)
    case 'reviews':
      return filtered.sort((a, b) => b.reviews - a.reviews)
    case 'newest':
      return filtered.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0))
    default:
      return filtered
  }
})

const productCount = computed(() => filteredAndSortedProducts.value.length)
</script>

<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
    <!-- Hero Section -->
    <section class="bg-gradient-to-r from-primary-600 via-primary-700 to-primary-800 py-16">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center">
          <h1 class="text-4xl sm:text-5xl font-bold text-white mb-4">
            Discover Amazing Products
          </h1>
          <p class="text-xl text-primary-100 max-w-2xl mx-auto">
            Explore our curated collection of premium products designed to enhance your lifestyle
          </p>
        </div>
      </div>
    </section>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Search and Filters Bar -->
      <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 mb-8">
        <div class="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
          <!-- Search Bar -->
          <div class="flex-1 max-w-md">
            <div class="relative">
              <MagnifyingGlassIcon class="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input v-model="searchQuery" type="text" placeholder="Search products..."
                class="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white" />
            </div>
          </div>

          <!-- Filter Toggle -->
          <div class="flex items-center space-x-4">
            <button @click="showFilters = !showFilters"
              class="flex items-center space-x-2 px-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
              <AdjustmentsHorizontalIcon class="h-5 w-5" />
              <span class="text-sm font-medium">Filters</span>
            </button>

            <!-- View Mode Toggle -->
            <div class="flex items-center bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
              <button @click="viewMode = 'grid'" class="p-2 rounded-md transition-colors duration-200"
                :class="viewMode === 'grid' ? 'bg-white dark:bg-gray-600 shadow-sm' : 'text-gray-600 dark:text-gray-400'">
                <Squares2X2Icon class="h-4 w-4" />
              </button>
              <button @click="viewMode = 'list'" class="p-2 rounded-md transition-colors duration-200"
                :class="viewMode === 'list' ? 'bg-white dark:bg-gray-600 shadow-sm' : 'text-gray-600 dark:text-gray-400'">
                <Bars3Icon class="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        <!-- Advanced Filters -->
        <div v-if="showFilters" class="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <!-- Category Filter -->
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Category</label>
              <select v-model="selectedCategory"
                class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white">
                <option v-for="category in categories" :key="category" :value="category">
                  {{ category }}
                </option>
              </select>
            </div>

            <!-- Sort Filter -->
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Sort By</label>
              <select v-model="sortBy"
                class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white">
                <option value="featured">Featured</option>
                <option value="newest">Newest</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
                <option value="reviews">Most Reviewed</option>
              </select>
            </div>

            <!-- Price Range -->
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Price Range: ${{ priceRange[0] }} - ${{ priceRange[1] }}
              </label>
              <input type="range" v-model="priceRange[1]" min="0" max="500" step="10"
                class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider" />
            </div>

            <!-- Tags Filter -->
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Tags</label>
              <div class="flex flex-wrap gap-2">
                <button v-for="tag in tags" :key="tag"
                  @click="selectedTags.includes(tag) ? selectedTags = selectedTags.filter(t => t !== tag) : selectedTags.push(tag)"
                  :class="[
                    'px-3 py-1 text-xs rounded-full transition-colors',
                    selectedTags.includes(tag)
                      ? 'bg-primary-600 text-white'
                      : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                  ]">
                  {{ tag }}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Results Header -->
      <div class="flex items-center justify-between mb-6">
        <div class="flex items-center space-x-4">
          <h2 class="text-2xl font-bold text-gray-900 dark:text-white">
            Products
          </h2>
          <span class="text-gray-500 dark:text-gray-400">
            {{ productCount }} {{ productCount === 1 ? 'item' : 'items' }}
          </span>
        </div>

        <!-- Quick Stats -->
        <div class="hidden md:flex items-center space-x-6 text-sm text-gray-500 dark:text-gray-400">
          <div class="flex items-center space-x-1">
            <SparklesIcon class="h-4 w-4" />
            <span>{{products.filter(p => p.isNew).length}} New</span>
          </div>
          <div class="flex items-center space-x-1">
            <FireIcon class="h-4 w-4" />
            <span>{{products.filter(p => p.isHot).length}} Hot</span>
          </div>
          <div class="flex items-center space-x-1">
            <StarIcon class="h-4 w-4" />
            <span>{{products.filter(p => p.rating >= 4.5).length}} Top Rated</span>
          </div>
        </div>
      </div>

      <!-- Products Grid -->
      <div class="grid gap-6"
        :class="viewMode === 'grid' ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' : 'grid-cols-1'">
        <!-- Grid View -->
        <template v-if="viewMode === 'grid'">
          <ProductCard v-for="product in filteredAndSortedProducts" :key="product.id" :product="product" />
        </template>

        <!-- List View -->
        <template v-else>
          <div v-for="product in filteredAndSortedProducts" :key="product.id"
            class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden group hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <div class="flex flex-col lg:flex-row">
              <!-- Product Image -->
              <div class="relative lg:w-80 h-64 lg:h-auto overflow-hidden bg-gray-200 dark:bg-gray-700">
                <img :src="product.image" :alt="product.name"
                  class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                <div
                  class="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300">
                </div>

                <!-- Badges -->
                <div class="absolute top-3 left-3 flex flex-col space-y-2">
                  <span v-if="product.isNew" class="bg-green-500 text-white text-xs px-2 py-1 rounded-full font-medium">
                    NEW
                  </span>
                  <span v-if="product.isHot" class="bg-red-500 text-white text-xs px-2 py-1 rounded-full font-medium">
                    HOT
                  </span>
                  <span v-if="product.originalPrice"
                    class="bg-primary-600 text-white text-xs px-2 py-1 rounded-full font-medium">
                    -{{ Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) }}%
                  </span>
                </div>

                <!-- Stock Status -->
                <div class="absolute top-3 right-3">
                  <span v-if="!product.inStock"
                    class="bg-gray-500 text-white text-xs px-2 py-1 rounded-full font-medium">
                    OUT OF STOCK
                  </span>
                </div>
              </div>

              <!-- Product Info -->
              <div class="flex-1 p-6 flex flex-col">
                <div class="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-4">
                  <div class="flex-1">
                    <router-link :to="`/product/${product.id}`" class="block">
                      <h3
                        class="text-xl font-bold text-gray-900 dark:text-white mb-2 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                        {{ product.name }}
                      </h3>
                    </router-link>

                    <!-- Tags -->
                    <div v-if="product.tags && product.tags.length > 0" class="flex flex-wrap gap-2 mb-3">
                      <span v-for="tag in product.tags" :key="tag"
                        class="text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 px-3 py-1 rounded-full">
                        {{ tag }}
                      </span>
                    </div>

                    <p class="text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">
                      {{ product.description }}
                    </p>
                  </div>

                  <!-- Price and Rating -->
                  <div class="lg:ml-6 lg:text-right">
                    <div class="flex lg:flex-col items-center lg:items-end space-x-4 lg:space-x-0 lg:space-y-2 mb-4">
                      <div class="flex items-center space-x-2">
                        <span class="text-2xl font-bold text-primary-600">${{ product.price }}</span>
                        <span v-if="product.originalPrice" class="text-lg text-gray-500 line-through">
                          ${{ product.originalPrice }}
                        </span>
                      </div>

                      <div class="flex items-center space-x-1">
                        <div class="flex text-yellow-400">
                          <StarIcon v-for="i in 5" :key="i" class="h-4 w-4"
                            :class="i <= product.rating ? 'text-yellow-400' : 'text-gray-300'" />
                        </div>
                        <span class="text-sm text-gray-500 ml-1">({{ product.reviews }})</span>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Action Buttons -->
                <div class="flex items-center justify-between mt-auto">
                  <div class="flex items-center space-x-3">
                    <router-link :to="`/product/${product.id}`"
                      class="flex items-center space-x-2 px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
                      <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                      <span>View Details</span>
                    </router-link>

                    <button @click="toggleWishlist(product)"
                      class="flex items-center space-x-2 px-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                      :class="isInWishlist(product.id) ? 'text-red-500' : 'text-gray-700 dark:text-gray-300'">
                      <HeartIcon class="h-4 w-4" :class="isInWishlist(product.id) ? 'fill-current' : ''" />
                      <span>{{ isInWishlist(product.id) ? 'Remove' : 'Wishlist' }}</span>
                    </button>
                  </div>

                  <div class="flex items-center space-x-3">
                    <button v-if="!isInCart(product.id) && product.inStock" @click="addToCart(product)"
                      class="flex items-center space-x-2 px-6 py-3 bg-primary-600 text-white rounded-lg font-semibold hover:bg-primary-700 transition-colors"
                      :disabled="isLoading(product.id)">
                      <ShoppingCartIcon v-if="!isLoading(product.id)" class="h-4 w-4" />
                      <div v-else class="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin">
                      </div>
                      <span>{{ isLoading(product.id) ? 'Adding...' : 'Add to Cart' }}</span>
                    </button>

                    <router-link v-else-if="isInCart(product.id)" to="/checkout"
                      class="flex items-center space-x-2 px-6 py-3 bg-primary-600 text-white rounded-lg font-semibold hover:bg-primary-700 transition-colors">
                      <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                      <span>View Cart</span>
                    </router-link>

                    <button v-else disabled
                      class="flex items-center space-x-2 px-6 py-3 bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400 rounded-lg font-semibold cursor-not-allowed">
                      <span>Out of Stock</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </template>
      </div>

      <!-- Empty State -->
      <div v-if="filteredAndSortedProducts.length === 0" class="text-center py-16">
        <FunnelIcon class="mx-auto h-16 w-16 text-gray-400 mb-4" />
        <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-2">No products found</h3>
        <p class="text-gray-500 dark:text-gray-400 mb-6 max-w-md mx-auto">
          Try adjusting your search criteria or filters to find what you're looking for.
        </p>
        <button @click="searchQuery = ''; selectedCategory = 'All'; selectedTags = []; priceRange = [0, 500]"
          class="bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700 transition-colors">
          Clear All Filters
        </button>
      </div>

      <!-- Load More Button -->
      <div v-if="filteredAndSortedProducts.length > 0" class="text-center mt-12">
        <button
          class="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 px-8 py-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
          Load More Products
        </button>
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
  background: #3b82f6;
  cursor: pointer;
}

.slider::-moz-range-thumb {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: #3b82f6;
  cursor: pointer;
  border: none;
}

.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>