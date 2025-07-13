<script setup lang="ts">
import { computed } from 'vue'
import CompactProductCard from '@/components/CompactProductCard.vue'
import { ArrowRightIcon } from '@heroicons/vue/24/outline'
import { useRecentProductsStore } from '@/stores/recentProducts'

const recentProductsStore = useRecentProductsStore()

const recentProducts = computed(() => {
  return recentProductsStore.getRecentProducts().slice(0, 6) // Show 6 recent products in compact format
})

const hasRecentProducts = computed(() => recentProducts.value.length > 0)
</script>

<template>
  <section v-if="hasRecentProducts" class="py-8 sm:py-12">
    <div class="max-w-7xl mx-auto px-4">
      <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 sm:mb-8">
        <h2 class="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-2 sm:mb-0">
          Recently Viewed
        </h2>
        <router-link
          to="/products"
          class="text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 font-medium flex items-center space-x-1"
        >
          <span>View All Products</span>
          <ArrowRightIcon class="h-4 w-4" />
        </router-link>
      </div>
      
      <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
        <CompactProductCard
          v-for="product in recentProducts"
          :key="product.id"
          :product="product"
        />
      </div>
    </div>
  </section>
</template> 