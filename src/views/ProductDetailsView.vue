<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useCartStore } from '@/stores/cart'
import { useWishlistStore } from '@/stores/wishlist'
import { useRecentProductsStore } from '@/stores/recentProducts'
import { HeartIcon, StarIcon, TruckIcon, ShieldCheckIcon, ArrowLeftIcon } from '@heroicons/vue/24/outline'
import { HeartIcon as HeartSolidIcon } from '@heroicons/vue/24/solid'
import ProductCard from '@/components/ProductCard.vue'

const route = useRoute()
const cartStore = useCartStore()
const wishlistStore = useWishlistStore()
const recentProductsStore = useRecentProductsStore()

const selectedImage = ref(0)
const selectedColor = ref('')
const selectedSize = ref('')
const quantity = ref(1)
const isLoading = ref(false)

// Sample product data
const product = ref({
  id: 1,
  name: "Premium Wireless Headphones",
  description: "Experience crystal-clear sound with our premium wireless headphones. Featuring active noise cancellation, 30-hour battery life, and premium comfort for extended listening sessions.",
  price: 299.99,
  originalPrice: 399.99,
  images: [
    "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&h=600&fit=crop",
    "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=600&h=600&fit=crop",
    "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=600&h=600&fit=crop",
    "https://images.unsplash.com/photo-1487215078519-e21cc028cb29?w=600&h=600&fit=crop"
  ],
  colors: ['Black', 'White', 'Blue'],
  sizes: ['One Size'],
  rating: 4.8,
  reviews: 128,
  inStock: true,
  sku: "HP-001",
  category: "Electronics",
  features: [
    "Active Noise Cancellation",
    "30-hour battery life",
    "Bluetooth 5.0",
    "Premium comfort design",
    "Built-in microphone",
    "Touch controls"
  ],
  specifications: {
    "Brand": "AudioTech",
    "Model": "AT-2000",
    "Connectivity": "Bluetooth 5.0",
    "Battery Life": "30 hours",
    "Weight": "250g",
    "Warranty": "2 years"
  }
})

const reviews = ref([
  {
    id: 1,
    name: "Sarah Johnson",
    rating: 5,
    date: "2024-01-15",
    verified: true,
    text: "Amazing sound quality! The noise cancellation is incredible and the battery life is exactly as advertised. Highly recommended!"
  },
  {
    id: 2,
    name: "Michael Chen",
    rating: 4,
    date: "2024-01-10",
    verified: true,
    text: "Great headphones for the price. Comfortable for long listening sessions. The only minor issue is the touch controls can be sensitive."
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    rating: 5,
    date: "2024-01-05",
    verified: true,
    text: "Perfect for my daily commute. The noise cancellation makes such a difference on the train. Love the sleek design!"
  }
])

const relatedProducts = ref([
  {
    id: 2,
    name: "Smart Fitness Watch",
    description: "Advanced fitness tracking with heart rate monitoring and GPS capabilities.",
    price: 199.99,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop",
    rating: 4.5,
    reviews: 89
  },
  {
    id: 3,
    name: "Wireless Bluetooth Speaker",
    description: "Portable speaker with 360-degree sound and 20-hour battery life.",
    price: 89.99,
    image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&h=400&fit=crop",
    rating: 4.3,
    reviews: 156
  },
  {
    id: 4,
    name: "Designer Leather Bag",
    description: "Handcrafted leather bag with premium materials and elegant design.",
    price: 159.99,
    originalPrice: 199.99,
    image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400&h=400&fit=crop",
    rating: 4.7,
    reviews: 67
  }
])

const isInWishlist = computed(() => wishlistStore.isInWishlist(product.value.id))
const isInCart = computed(() => cartStore.isInCart(product.value.id))
const discountPercentage = computed(() => {
  if (product.value.originalPrice) {
    return Math.round(((product.value.originalPrice - product.value.price) / product.value.originalPrice) * 100)
  }
  return 0
})

const addToCart = async () => {
  isLoading.value = true
  await new Promise(resolve => setTimeout(resolve, 1000))
  
  cartStore.addToCart({
    id: product.value.id,
    name: product.value.name,
    price: product.value.price,
    image: product.value.images[0]
  })
  
  isLoading.value = false
}

const toggleWishlist = () => {
  if (isInWishlist.value) {
    wishlistStore.removeFromWishlist(product.value.id)
  } else {
    wishlistStore.addToWishlist({
      id: product.value.id,
      name: product.value.name,
      price: product.value.price,
      image: product.value.images[0],
      description: product.value.description
    })
  }
}

const addToRecentProducts = () => {
  recentProductsStore.addRecentProduct({
    id: product.value.id,
    name: product.value.name,
    price: product.value.price,
    originalPrice: product.value.originalPrice,
    image: product.value.images[0],
    rating: product.value.rating,
    reviews: product.value.reviews
  })
}

onMounted(() => {
  addToRecentProducts()
})
</script>

<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
    <!-- Breadcrumb -->
    <div class="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <nav class="flex items-center space-x-2">
          <router-link to="/" class="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">
            Home
          </router-link>
          <span class="text-gray-400">/</span>
          <router-link to="/products" class="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">
            Products
          </router-link>
          <span class="text-gray-400">/</span>
          <span class="text-gray-900 dark:text-white font-medium">{{ product.name }}</span>
        </nav>
      </div>
    </div>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <!-- Product Images -->
        <div class="space-y-4">
          <!-- Main Image -->
          <div class="aspect-square bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg">
            <img 
              :src="product.images[selectedImage]" 
              :alt="product.name"
              class="w-full h-full object-cover"
            />
          </div>
          
          <!-- Thumbnail Images -->
          <div class="grid grid-cols-4 gap-4">
            <button
              v-for="(image, index) in product.images"
              :key="index"
              @click="selectedImage = index"
              :class="[
                'aspect-square rounded-lg overflow-hidden border-2 transition-all duration-200',
                selectedImage === index
                  ? 'border-primary-500 ring-2 ring-primary-200'
                  : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
              ]"
            >
              <img :src="image" :alt="product.name" class="w-full h-full object-cover" />
            </button>
          </div>
        </div>

        <!-- Product Info -->
        <div class="space-y-6">
          <!-- Header -->
          <div>
            <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              {{ product.name }}
            </h1>
            <div class="flex items-center space-x-4 mb-4">
              <div class="flex items-center">
                <div class="flex text-yellow-400">
                  <StarIcon v-for="i in 5" :key="i" class="h-5 w-5" :class="i <= product.rating ? 'text-yellow-400' : 'text-gray-300'" />
                </div>
                <span class="text-sm text-gray-600 dark:text-gray-400 ml-2">
                  {{ product.rating }} ({{ product.reviews }} reviews)
                </span>
              </div>
              <span class="text-sm text-gray-500 dark:text-gray-400">SKU: {{ product.sku }}</span>
            </div>
          </div>

          <!-- Price -->
          <div class="flex items-center space-x-4">
            <span class="text-3xl font-bold text-primary-600">${{ product.price }}</span>
            <span v-if="product.originalPrice" class="text-xl text-gray-500 line-through">
              ${{ product.originalPrice }}
            </span>
            <span v-if="discountPercentage > 0" class="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium">
              -{{ discountPercentage }}%
            </span>
          </div>

          <!-- Description -->
          <p class="text-gray-600 dark:text-gray-400 leading-relaxed">
            {{ product.description }}
          </p>

          <!-- Color Selection -->
          <div v-if="product.colors.length > 1">
            <h3 class="text-sm font-medium text-gray-900 dark:text-white mb-3">Color</h3>
            <div class="flex space-x-3">
              <button
                v-for="color in product.colors"
                :key="color"
                @click="selectedColor = color"
                :class="[
                  'px-4 py-2 rounded-lg border-2 transition-all duration-200',
                  selectedColor === color
                    ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                    : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                ]"
              >
                {{ color }}
              </button>
            </div>
          </div>

          <!-- Size Selection -->
          <div v-if="product.sizes.length > 1">
            <h3 class="text-sm font-medium text-gray-900 dark:text-white mb-3">Size</h3>
            <div class="flex space-x-3">
              <button
                v-for="size in product.sizes"
                :key="size"
                @click="selectedSize = size"
                :class="[
                  'px-4 py-2 rounded-lg border-2 transition-all duration-200',
                  selectedSize === size
                    ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                    : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                ]"
              >
                {{ size }}
              </button>
            </div>
          </div>

          <!-- Quantity -->
          <div>
            <h3 class="text-sm font-medium text-gray-900 dark:text-white mb-3">Quantity</h3>
            <div class="flex items-center space-x-3">
              <button
                @click="quantity > 1 && quantity--"
                class="w-10 h-10 rounded-lg border border-gray-300 dark:border-gray-600 flex items-center justify-center hover:bg-gray-50 dark:hover:bg-gray-700"
              >
                <span class="text-lg">-</span>
              </button>
              <span class="w-16 text-center font-medium">{{ quantity }}</span>
              <button
                @click="quantity++"
                class="w-10 h-10 rounded-lg border border-gray-300 dark:border-gray-600 flex items-center justify-center hover:bg-gray-50 dark:hover:bg-gray-700"
              >
                <span class="text-lg">+</span>
              </button>
            </div>
          </div>

          <!-- Action Buttons -->
          <div class="flex space-x-4">
            <button
              v-if="!isInCart"
              @click="addToCart"
              :disabled="isLoading"
              class="flex-1 bg-primary-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-primary-700 transition-colors disabled:opacity-50"
            >
              <div v-if="isLoading" class="flex items-center justify-center">
                <div class="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                Adding...
              </div>
              <span v-else>Add to Cart</span>
            </button>
            
            <router-link
              v-else
              to="/checkout"
              class="flex-1 bg-primary-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-primary-700 transition-colors text-center"
            >
              View Cart
            </router-link>
            
            <button
              @click="toggleWishlist"
              :class="[
                'p-3 rounded-lg border-2 transition-colors duration-200',
                isInWishlist
                  ? 'border-red-500 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20'
                  : 'border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-400 hover:border-red-500 hover:text-red-500'
              ]"
            >
              <HeartSolidIcon v-if="isInWishlist" class="h-6 w-6" />
              <HeartIcon v-else class="h-6 w-6" />
            </button>
          </div>

          <!-- Features -->
          <div class="bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Key Features</h3>
            <ul class="space-y-2">
              <li v-for="feature in product.features" :key="feature" class="flex items-center text-gray-600 dark:text-gray-400">
                <div class="w-2 h-2 bg-primary-500 rounded-full mr-3"></div>
                {{ feature }}
              </li>
            </ul>
          </div>

          <!-- Trust Indicators -->
          <div class="flex items-center space-x-6 text-sm text-gray-600 dark:text-gray-400">
            <div class="flex items-center">
              <TruckIcon class="h-5 w-5 mr-2" />
              <span>Free Shipping</span>
            </div>
            <div class="flex items-center">
              <ShieldCheckIcon class="h-5 w-5 mr-2" />
              <span>2 Year Warranty</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Specifications -->
      <div class="mt-16">
        <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">Specifications</h2>
        <div class="bg-white dark:bg-gray-800 rounded-lg p-6">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div v-for="(value, key) in product.specifications" :key="key" class="flex justify-between">
              <span class="text-gray-600 dark:text-gray-400">{{ key }}</span>
              <span class="font-medium text-gray-900 dark:text-white">{{ value }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Reviews -->
      <div class="mt-16">
        <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">Customer Reviews</h2>
        <div class="space-y-6">
          <div v-for="review in reviews" :key="review.id" class="bg-white dark:bg-gray-800 rounded-lg p-6">
            <div class="flex items-start justify-between mb-4">
              <div class="flex items-center space-x-3">
                <div class="w-10 h-10 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center">
                  <span class="text-primary-600 font-semibold">{{ review.name.charAt(0) }}</span>
                </div>
                <div>
                  <h4 class="font-semibold text-gray-900 dark:text-white">{{ review.name }}</h4>
                  <div class="flex items-center space-x-2">
                    <div class="flex text-yellow-400">
                      <StarIcon v-for="i in 5" :key="i" class="h-4 w-4" :class="i <= review.rating ? 'text-yellow-400' : 'text-gray-300'" />
                    </div>
                    <span v-if="review.verified" class="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                      Verified Purchase
                    </span>
                  </div>
                </div>
              </div>
              <span class="text-sm text-gray-500 dark:text-gray-400">{{ review.date }}</span>
            </div>
            <p class="text-gray-600 dark:text-gray-400">{{ review.text }}</p>
          </div>
        </div>
      </div>

      <!-- Related Products -->
      <div class="mt-16">
        <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">Related Products</h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <ProductCard
            v-for="relatedProduct in relatedProducts"
            :key="relatedProduct.id"
            :product="relatedProduct"
          />
        </div>
      </div>
    </div>
  </div>
</template> 