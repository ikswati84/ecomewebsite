<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/vue/24/outline'

const testimonials = ref([
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Verified Buyer",
    image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face",
    rating: 5,
    text: "Amazing selection of products and lightning-fast delivery. The quality exceeded my expectations!"
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "Verified Buyer",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face",
    rating: 5,
    text: "The customer service is outstanding. They helped me find exactly what I was looking for!"
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    role: "Verified Buyer",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face",
    rating: 5,
    text: "Best prices I've found online. The return process was smooth and hassle-free."
  },
  {
    id: 4,
    name: "David Thompson",
    role: "Verified Buyer",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face",
    rating: 5,
    text: "The product quality is exceptional and the shipping was incredibly fast. Highly recommended!"
  },
  {
    id: 5,
    name: "Lisa Wang",
    role: "Verified Buyer",
    image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=40&h=40&fit=crop&crop=face",
    rating: 5,
    text: "I love the variety of products available. The website is easy to navigate and checkout was seamless."
  },
  {
    id: 6,
    name: "James Wilson",
    role: "Verified Buyer",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=40&h=40&fit=crop&crop=face",
    rating: 5,
    text: "Great customer support team. They resolved my issue quickly and professionally."
  }
])

const currentIndex = ref(0)
const isAutoPlaying = ref(true)
const autoPlayInterval = ref<number | null>(null)

const nextSlide = () => {
  const maxIndex = Math.max(0, testimonials.value.length - 3)
  currentIndex.value = currentIndex.value >= maxIndex ? 0 : currentIndex.value + 1
}

const prevSlide = () => {
  const maxIndex = Math.max(0, testimonials.value.length - 3)
  currentIndex.value = currentIndex.value === 0 ? maxIndex : currentIndex.value - 1
}

const goToSlide = (index: number) => {
  const maxIndex = Math.max(0, testimonials.value.length - 3)
  currentIndex.value = Math.min(index, maxIndex)
}

const startAutoPlay = () => {
  if (autoPlayInterval.value) return
  autoPlayInterval.value = window.setInterval(() => {
    if (isAutoPlaying.value) {
      nextSlide()
    }
  }, 5000)
}

const stopAutoPlay = () => {
  if (autoPlayInterval.value) {
    clearInterval(autoPlayInterval.value)
    autoPlayInterval.value = null
  }
}

const handleMouseEnter = () => {
  isAutoPlaying.value = false
}

const handleMouseLeave = () => {
  isAutoPlaying.value = true
}

onMounted(() => {
  startAutoPlay()
})

onUnmounted(() => {
  stopAutoPlay()
})
</script>

<template>
  <section class="py-16 bg-white dark:bg-gray-800">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-12">
        <h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          What Our Customers Say
        </h2>
        <p class="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Don't just take our word for it. Here's what our satisfied customers have to say about their shopping experience.
        </p>
      </div>
      
      <!-- Slider Container -->
      <div 
        class="relative max-w-4xl mx-auto"
        @mouseenter="handleMouseEnter"
        @mouseleave="handleMouseLeave"
      >
        <!-- Navigation Buttons -->
        <button
          @click="prevSlide"
          class="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-12 z-10 bg-white dark:bg-gray-800 rounded-full p-3 shadow-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
        >
          <ChevronLeftIcon class="h-6 w-6 text-gray-600 dark:text-gray-400" />
        </button>
        
        <button
          @click="nextSlide"
          class="absolute right-0 top-1/2 -translate-y-1/2 translate-x-12 z-10 bg-white dark:bg-gray-800 rounded-full p-3 shadow-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
        >
          <ChevronRightIcon class="h-6 w-6 text-gray-600 dark:text-gray-400" />
        </button>

        <!-- Testimonials Container -->
        <div class="overflow-hidden">
          <div 
            class="flex transition-transform duration-500 ease-in-out"
            :style="{ transform: `translateX(-${currentIndex * 33.333}%)` }"
          >
            <div 
              v-for="testimonial in testimonials" 
              :key="testimonial.id"
              class="w-1/3 flex-shrink-0 px-4"
            >
              <div class="bg-gray-50 dark:bg-gray-700 rounded-xl p-6 text-center h-full">
                <!-- Rating Stars -->
                <div class="flex items-center justify-center mb-4">
                  <div class="flex text-yellow-400">
                    <svg 
                      v-for="i in testimonial.rating" 
                      :key="i" 
                      class="h-5 w-5" 
                      fill="currentColor" 
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  </div>
                </div>
                
                <!-- Testimonial Text -->
                <blockquote class="text-base text-gray-700 dark:text-gray-300 mb-6 italic">
                  "{{ testimonial.text }}"
                </blockquote>
                
                <!-- Customer Info -->
                <div class="flex items-center justify-center">
                  <img 
                    :src="testimonial.image" 
                    :alt="testimonial.name"
                    class="w-10 h-10 rounded-full mr-3"
                  />
                  <div class="text-left">
                    <h4 class="font-semibold text-gray-900 dark:text-white text-sm">{{ testimonial.name }}</h4>
                    <p class="text-xs text-gray-600 dark:text-gray-400">{{ testimonial.role }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Dots Indicator -->
        <div class="flex justify-center mt-8 space-x-2">
          <button
            v-for="index in Math.max(1, testimonials.length - 2)"
            :key="index"
            @click="goToSlide(index - 1)"
            :class="[
              'w-3 h-3 rounded-full transition-all duration-200',
              (index - 1) === currentIndex
                ? 'bg-primary-600'
                : 'bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500'
            ]"
          >
            <span class="sr-only">Go to slide {{ index }}</span>
          </button>
        </div>
      </div>
    </div>
  </section>
</template> 