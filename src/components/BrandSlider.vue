<template>
  <section class="py-8 sm:py-12 lg:py-16 bg-gray-50 dark:bg-gray-900">
    <div class="container mx-auto px-4">
      <div class="text-center mb-8 sm:mb-12">
        <h2 class="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-4">
          Trusted by Leading Brands
        </h2>
        <p class="text-sm sm:text-base text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Join thousands of satisfied customers who trust our platform for their shopping needs
        </p>
      </div>

      <div class="relative overflow-hidden">
        <div class="flex animate-scroll">
          <div v-for="repeat in 2" :key="'loop-' + repeat"
            class="flex items-center min-w-max pl-1 pr-1 sm:pl-2 sm:pr-2 lg:pl-3 lg:pr-3 space-x-2 sm:space-x-4 lg:space-x-6">

            <div v-for="brand in brands" :key="brand.name + repeat" class="flex items-center justify-center w-24 h-16 sm:w-32 sm:h-20 lg:w-40 lg:h-24
          bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
              <img :src="brand.src" :alt="brand.name"
                class="w-16 h-12 sm:w-20 sm:h-16 lg:w-24 lg:h-20 object-contain" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const brands = [
  { name: "Apple", src: "/images/brands/apple.png" },
  { name: "Samsung", src: "/images/brands/samsung.png" },
  { name: "Adidas", src: "/images/brands/adidas.png" },
  { name: "Nike", src: "/images/brands/nike.png" },
  { name: "Gucci", src: "/images/brands/gucci.png" },
  { name: "Louis Vuitton", src: "/images/brands/louis-vuitton.png" },
  { name: "Chanel", src: "/images/brands/chanel.png" },
  { name: "Dior", src: "/images/brands/dior.png" }
];
</script>

<style scoped>
@keyframes scroll {
  0% {
    transform: translateX(0%);
  }

  100% {
    transform: translateX(-50%);
  }
}

.animate-scroll {
  display: flex;
  width: max-content;
  animation: scroll 20s linear infinite;
}

.animate-scroll:hover {
  animation-play-state: paused;
}

@media (max-width: 768px) {
  .animate-scroll {
    animation-duration: 15s;
  }
}

@media (max-width: 640px) {
  .animate-scroll {
    animation-duration: 10s;
  }
}
</style>
