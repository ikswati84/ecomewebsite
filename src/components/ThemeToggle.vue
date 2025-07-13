<template>
  <button
    @click="handleClick"
    class="relative inline-flex items-center justify-center transition-all duration-500 focus:outline-none hover:scale-110 active:scale-95 transform-gpu"
    type="button"
    aria-label="Toggle theme"
  >
    
    <!-- Sun icon -->
    <i
      class="pi pi-sun h-6 w-6 transition-all duration-500"
      :class="themeStore.isDark ? 'opacity-0 scale-75 rotate-90 text-gray-700 dark:text-gray-200' : 'opacity-100 scale-100 rotate-0 text-gray-700 dark:text-gray-200'"
    ></i>
    
    <!-- Moon icon -->
    <i
      class="pi pi-moon absolute h-6 w-6 transition-all duration-500"
      :class="themeStore.isDark ? 'opacity-100 scale-100 rotate-0 text-gray-700 dark:text-gray-200' : 'opacity-0 scale-75 -rotate-90 text-gray-700 dark:text-gray-200'"
    ></i>
    
    <!-- Ripple effect on click -->
    <div 
      v-if="showRipple"
      class="absolute inset-0 bg-gray-300/20 dark:bg-gray-600/20 animate-ping rounded"
      @animationend="showRipple = false"
    ></div>
  </button>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useThemeStore } from '@/stores/theme'

const themeStore = useThemeStore()
const showRipple = ref(false)

const handleClick = () => {
  showRipple.value = true
  themeStore.toggleTheme()
}
</script>

<style scoped>
@keyframes ping {
  75%, 100% {
    transform: scale(2.5);
    opacity: 0;
  }
}

.animate-ping {
  animation: ping 0.8s cubic-bezier(0, 0, 0.2, 1);
}

.delay-100 {
  animation-delay: 100ms;
}

.delay-200 {
  animation-delay: 200ms;
}

/* Enhanced hover effects */
button:hover {
  filter: brightness(1.1);
}

button:active {
  filter: brightness(0.95);
}
</style> 