<script setup lang="ts">
import { ref, computed } from 'vue'
import ProductCard from '@/components/ProductCard.vue'
import BrandSlider from '@/components/BrandSlider.vue'
import RecentProducts from '@/components/RecentProducts.vue'
import TestimonialsSlider from '@/components/TestimonialsSlider.vue'
import { ArrowRightIcon, StarIcon, TruckIcon, ShieldCheckIcon, CreditCardIcon } from '@heroicons/vue/24/outline'
import { useCategoriesStore } from '@/stores/categories'

// Sample featured products data
const featuredProducts = ref([
  {
    id: 1,
    name: "Premium Wireless Headphones",
    description: "High-quality wireless headphones with noise cancellation and premium sound quality.",
    price: 299.99,
    originalPrice: 399.99,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop",
    rating: 5,
    reviews: 128
  },
  {
    id: 2,
    name: "Smart Fitness Watch",
    description: "Advanced fitness tracking with heart rate monitoring and GPS capabilities.",
    price: 199.99,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop",
    rating: 4,
    reviews: 89
  },
  {
    id: 3,
    name: "Designer Leather Bag",
    description: "Handcrafted leather bag with premium materials and elegant design.",
    price: 159.99,
    originalPrice: 199.99,
    image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400&h=400&fit=crop",
    rating: 5,
    reviews: 67
  },
  {
    id: 4,
    name: "Wireless Bluetooth Speaker",
    description: "Portable speaker with 360-degree sound and 20-hour battery life.",
    price: 89.99,
    image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&h=400&fit=crop",
    rating: 4,
    reviews: 156
  }
])

const features = [
  {
    icon: TruckIcon,
    title: "Free Shipping",
    description: "Free shipping on orders over $50"
  },
  {
    icon: ShieldCheckIcon,
    title: "Secure Payment",
    description: "100% secure payment processing"
  },
  {
    icon: CreditCardIcon,
    title: "Easy Returns",
    description: "30-day money-back guarantee"
  },
  {
    icon: StarIcon,
    title: "Premium Quality",
    description: "Curated selection of premium products"
  }
]

const categoriesStore = useCategoriesStore()
const categories = computed(() => categoriesStore.categories)
</script>

<template>
  <div class="space-y-0">
    <!-- Hero Section -->
    <section
      class="relative min-h-[600px] lg:min-h-[700px] bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 overflow-hidden w-full">
      <!-- Background Pattern -->
      <div class="absolute inset-0 opacity-20">
        <div class="absolute inset-0"
          style="background-image: radial-gradient(circle at 1px 1px, rgba(156, 146, 172, 0.1) 1px, transparent 0); background-size: 20px 20px;">
        </div>
      </div>

      <!-- Floating Elements -->
      <div class="absolute top-20 left-10 w-24 h-24 bg-primary-500/20 rounded-full blur-xl"></div>
      <div class="absolute bottom-20 right-10 w-32 h-32 bg-green-500/20 rounded-full blur-xl"></div>
      <div class="absolute top-1/2 left-1/4 w-16 h-16 bg-primary-300/30 rounded-full blur-lg"></div>

      <div class="relative z-10 w-full py-16 lg:py-24">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <!-- Left Content -->
          <div class="text-center lg:text-left">
            <div
              class="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-white text-sm font-medium mb-6">
              <span class="w-2 h-2 bg-green-400 rounded-full mr-2"></span>
              Free Shipping on Orders Over $50
            </div>

            <h1 class="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
              Discover Amazing
              <span class="bg-gradient-to-r from-primary-400 to-green-400 bg-clip-text text-transparent">
                Products
              </span>
            </h1>

            <p class="text-lg sm:text-xl text-gray-300 mb-8 max-w-2xl">
              Discover cutting-edge technology, premium fashion, and lifestyle products from the world's most trusted
              brands.
              Fast shipping, secure payments, and exceptional customer service.
            </p>

            <div class="flex flex-col sm:flex-row items-center gap-4 mb-8">
              <router-link to="/products"
                class="group bg-white text-gray-900 px-8 py-4 rounded-xl font-semibold hover:bg-gray-100 transition-all duration-300 flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                <span>Start Shopping</span>
                <ArrowRightIcon class="h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
              </router-link>
              <button
                class="group text-white hover:text-primary-300 transition-colors duration-300 flex items-center space-x-2">
                <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
                <span>Watch Demo</span>
              </button>
            </div>

            <!-- Trust Indicators -->
            <div class="flex flex-wrap items-center justify-center lg:justify-start gap-6 text-sm text-gray-400">
              <div class="flex items-center space-x-2 text-sm text-gray-400">
                <svg class="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clip-rule="evenodd" />
                </svg>
                <span>Free Shipping</span>
              </div>
              <div class="flex items-center space-x-2">
                <svg class="w-5 h-5 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd"
                    d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                    clip-rule="evenodd" />
                </svg>
                <span>Secure Checkout</span>
              </div>
              <div class="flex items-center space-x-2">
                <svg class="w-5 h-5 text-purple-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>24/7 Support</span>
              </div>
            </div>
          </div>

          <!-- Right Content - Product Showcase -->
          <div class="relative">
            <div class="grid grid-cols-2 gap-4 lg:gap-6">
              <!-- Featured Product 1 -->
              <div class="group">
                <div
                  class="relative bg-white/10 backdrop-blur-sm rounded-2xl p-4 lg:p-6 hover:bg-white/20 transition-all duration-300 transform hover:-translate-y-2">
                  <img
                    src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=300&fit=crop&crop=center"
                    alt="Premium Headphones" class="w-full h-32 lg:h-40 object-cover rounded-xl mb-3" />
                  <h3 class="text-white font-semibold text-sm lg:text-base mb-1">Premium Headphones</h3>
                  <p class="text-primary-300 font-bold">$299</p>
                  <div class="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                    -25%
                  </div>
                </div>
              </div>

              <!-- Featured Product 2 -->
              <div class="group mt-8">
                <div
                  class="relative bg-white/10 backdrop-blur-sm rounded-2xl p-4 lg:p-6 hover:bg-white/20 transition-all duration-300 transform hover:-translate-y-2">
                  <img
                    src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&h=300&fit=crop&crop=center"
                    alt="Smart Watch" class="w-full h-32 lg:h-40 object-cover rounded-xl mb-3" />
                  <h3 class="text-white font-semibold text-sm lg:text-base mb-1">Smart Watch</h3>
                  <p class="text-primary-300 font-bold">$199</p>
                  <div class="absolute top-2 right-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                    NEW
                  </div>
                </div>
              </div>

              <!-- Featured Product 3 -->
              <div class="group mt-8">
                <div
                  class="relative bg-white/10 backdrop-blur-sm rounded-2xl p-4 lg:p-6 hover:bg-white/20 transition-all duration-300 transform hover:-translate-y-2">
                  <img src="https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=300&h=300&fit=crop&crop=center"
                    alt="Designer Bag" class="w-full h-32 lg:h-40 object-cover rounded-xl mb-3" />
                  <h3 class="text-white font-semibold text-sm lg:text-base mb-1">Designer Bag</h3>
                  <p class="text-primary-300 font-bold">$159</p>
                  <div class="absolute top-2 right-2 bg-blue-500 text-white text-xs px-2 py-1 rounded-full">
                    Hot
                  </div>
                </div>
              </div>

              <!-- Featured Product 4 -->
              <div class="group">
                <div
                  class="relative bg-white/10 backdrop-blur-sm rounded-2xl p-4 lg:p-6 hover:bg-white/20 transition-all duration-300 transform hover:-translate-y-2">
                  <img
                    src="https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=300&h=300&fit=crop&crop=center"
                    alt="Bluetooth Speaker" class="w-full h-32 lg:h-40 object-cover rounded-xl mb-3" />
                  <h3 class="text-white font-semibold text-sm lg:text-base mb-1">Bluetooth Speaker</h3>
                  <p class="text-primary-300 font-bold">$89</p>
                  <div class="absolute top-2 right-2 bg-yellow-500 text-white text-xs px-2 py-1 rounded-full">
                    Sale
                  </div>
                </div>
              </div>
            </div>

            <!-- Floating Stats -->
            <div class="absolute -bottom-4 -left-4 bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
              <div class="text-center">
                <div class="text-2xl font-bold text-white">50K+</div>
                <div class="text-xs text-gray-300">Happy Customers</div>
              </div>
            </div>

            <div class="absolute -top-4 -right-4 bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
              <div class="text-center">
                <div class="text-2xl font-bold text-white">24/7</div>
                <div class="text-xs text-gray-300">Support</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section class="py-8 sm:py-12 ">
      <div class="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 max-w-7xl mx-auto px-4">
        <div v-for="feature in features" :key="feature.title" class="text-center">
          <div
            class="mx-auto h-12 w-12 flex items-center justify-center rounded-lg bg-primary-100 dark:bg-primary-900 mb-4">
            <component :is="feature.icon" class="h-6 w-6 text-primary-600" />
          </div>
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            {{ feature.title }}
          </h3>
          <p class="text-sm text-gray-600 dark:text-gray-400">
            {{ feature.description }}
          </p>
        </div>
      </div>
    </section>

    <!-- Featured Products -->
    <section class=" max-w-7xl mx-auto px-4">
      <div
        class="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 sm:mb-8 max-w-7xl mx-auto px-4">
        <h2 class="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-2 sm:mb-0">
          Featured Products
        </h2>
        <router-link to="/products"
          class="text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 font-medium flex items-center space-x-1">
          <span>View All</span>
          <ArrowRightIcon class="h-4 w-4" />
        </router-link>
      </div>

      <div class="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
        <ProductCard v-for="product in featuredProducts" :key="product.id" :product="product" />
      </div>
    </section>

    <!-- Brand Slider -->
    <BrandSlider />

    <!-- Categories Section -->
    <section
      class="py-20 bg-gradient-to-br from-gray-50 via-white to-gray-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div class="w-full">
        <!-- Header -->
        <div class="text-center mb-16">
          <h2 class="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Shop by Category
          </h2>
          <p class="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
            Discover our curated collections organized by categories. Find exactly what you're looking for with our
            comprehensive product range.
          </p>
        </div>

        <!-- Categories Grid -->
        <div class="grid grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <router-link v-for="category in categories" :key="category.id" :to="`/category/${category.slug}`"
            class="group relative overflow-hidden bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-4">
            <!-- Background Pattern -->
            <div
              class="absolute inset-0 bg-gradient-to-br from-primary-50 to-transparent dark:from-primary-900/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
            </div>

            <!-- Image Container -->
            <div class="relative h-64 overflow-hidden">
              <img :src="category.image" :alt="category.name"
                class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
              <!-- Overlay -->
              <div
                class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              </div>

              <!-- Category Badge -->
              <div class="absolute top-4 left-4">
                <span
                  class="bg-white/90 dark:bg-gray-800/90 text-gray-900 dark:text-white text-[10px] lg:text-xs px-3 py-1 rounded-full font-medium backdrop-blur-sm">
                  {{ category.productCount }} Products
                </span>
              </div>

              <!-- Arrow Icon -->
              <div
                class="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
                <div
                  class="w-8 h-8 lg:w-10 lg:h-10 bg-white/90 dark:bg-gray-800/90 rounded-full flex items-center justify-center backdrop-blur-sm">
                  <ArrowRightIcon class="h-4 w-4 lg:h-5 lg:w-5 text-primary-600" />
                </div>
              </div>
            </div>

            <!-- Content -->
            <div class="p-6">
              <h3
                class="text-base lg:text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors duration-300">
                {{ category.name }}
              </h3>
              <p class="text-gray-600 dark:text-gray-400 text-[10px] lg:text-sm leading-relaxed mb-4">
                {{ category.description }}
              </p>

              <!-- Explore Button -->
              <div class="flex items-center justify-between">
                <span class="text-xs lg:text-sm text-gray-500 dark:text-gray-400">
                  Explore Collection
                </span>
                <div
                  class="w-6 h-6 lg:w-8 lg:h-8 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center group-hover:bg-primary-600 transition-colors duration-300">
                  <ArrowRightIcon
                    class="h-3 w-3 lg:h-4 lg:w-4 text-primary-600 group-hover:text-white transition-colors duration-300" />
                </div>
              </div>
            </div>

            <!-- Hover Effect Border -->
            <div
              class="absolute inset-0 border-2 border-transparent group-hover:border-primary-200 dark:group-hover:border-primary-700 rounded-2xl transition-colors duration-300">
            </div>
          </router-link>
        </div>

        <!-- Call to Action -->
        <div class="text-center mt-16">
          <router-link to="/products"
            class="inline-flex items-center space-x-2 bg-primary-600 text-white px-8 py-4 rounded-xl font-semibold hover:bg-primary-700 transition-colors duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
            <span>View All Categories</span>
            <ArrowRightIcon class="h-5 w-5" />
          </router-link>
        </div>
      </div>
    </section>

    <!-- Testimonials Slider -->
    <TestimonialsSlider />

    <!-- Newsletter Section -->
    <section class="py-16 bg-primary-600">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 class="text-3xl font-bold text-white mb-4">
          Stay Updated
        </h2>
        <p class="text-lg text-primary-100 mb-8 max-w-2xl mx-auto">
          Subscribe to our newsletter and be the first to know about new products, exclusive offers, and special
          discounts.
        </p>
        <div class="max-w-md mx-auto">
          <div class="flex">
            <input type="email" placeholder="Enter your email"
              class="flex-1 px-4 py-3 rounded-l-lg border-0 focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-primary-600" />
            <button
              class="bg-white text-primary-600 px-6 py-3 rounded-r-lg font-semibold hover:bg-gray-100 transition-colors">
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- Stats Section -->
    <section class="py-16 bg-gray-900">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <div class="text-3xl font-bold text-white mb-2">1M+</div>
            <div class="text-gray-400">Happy Customers</div>
          </div>
          <div>
            <div class="text-3xl font-bold text-white mb-2">50K+</div>
            <div class="text-gray-400">Products Available</div>
          </div>
          <div>
            <div class="text-3xl font-bold text-white mb-2">24/7</div>
            <div class="text-gray-400">Customer Support</div>
          </div>
          <div>
            <div class="text-3xl font-bold text-white mb-2">99%</div>
            <div class="text-gray-400">Satisfaction Rate</div>
          </div>
        </div>
      </div>
    </section>

    <!-- Recent Products -->
    <RecentProducts />
  </div>
</template>
