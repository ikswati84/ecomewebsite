<template>
  <div class="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900 px-4">
    <div class="text-center">
      <h1 class="text-7xl font-extrabold text-primary-600 dark:text-primary-400 mb-4">404</h1>
      <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-2">Page Not Found</h2>
      <p class="text-gray-600 dark:text-gray-400 mb-6">
        Sorry, the page you are looking for does not exist or has been moved.
      </p>
      <router-link
        to="/"
        class="inline-block px-6 py-2 bg-primary-600 text-white rounded-md shadow hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-primary-500 dark:hover:bg-primary-400 dark:focus:ring-primary-400 transition"
      >
        Go to Home
      </router-link>
    </div>
  </div>
</template>

<script setup lang="ts">
// No script needed for static 404 page
</script> 