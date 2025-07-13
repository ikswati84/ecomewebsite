<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
    <div class="container mx-auto px-4">
      <div class="max-w-2xl mx-auto">
        <!-- Success Header -->
        <div class="text-center mb-8">
          <div class="mx-auto w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mb-4">
            <svg class="w-8 h-8 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-2">Order Confirmed!</h1>
          <p class="text-gray-600 dark:text-gray-400">Thank you for your purchase. Your order has been successfully placed.</p>
        </div>

        <!-- Order Details -->
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 mb-8">
          <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-4">Order Details</h2>
          
          <div class="space-y-4">
            <div class="flex justify-between">
              <span class="text-gray-600 dark:text-gray-400">Order Number</span>
              <span class="font-medium text-gray-900 dark:text-white">#{{ orderNumber }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-gray-600 dark:text-gray-400">Order Date</span>
              <span class="font-medium text-gray-900 dark:text-white">{{ orderDate }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-gray-600 dark:text-gray-400">Total Amount</span>
              <span class="font-medium text-gray-900 dark:text-white">${{ totalAmount }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-gray-600 dark:text-gray-400">Payment Method</span>
              <span class="font-medium text-gray-900 dark:text-white">Credit Card</span>
            </div>
          </div>
        </div>

        <!-- What's Next -->
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 mb-8">
          <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-4">What's Next?</h2>
          
          <div class="space-y-4">
            <div class="flex items-start space-x-3">
              <div class="w-6 h-6 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span class="text-xs font-medium text-primary-600 dark:text-primary-400">1</span>
              </div>
              <div>
                <h3 class="font-medium text-gray-900 dark:text-white">Order Confirmation Email</h3>
                <p class="text-sm text-gray-600 dark:text-gray-400">You'll receive a confirmation email with your order details within the next few minutes.</p>
              </div>
            </div>
            
            <div class="flex items-start space-x-3">
              <div class="w-6 h-6 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span class="text-xs font-medium text-primary-600 dark:text-primary-400">2</span>
              </div>
              <div>
                <h3 class="font-medium text-gray-900 dark:text-white">Order Processing</h3>
                <p class="text-sm text-gray-600 dark:text-gray-400">We'll start processing your order immediately and prepare it for shipping.</p>
              </div>
            </div>
            
            <div class="flex items-start space-x-3">
              <div class="w-6 h-6 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span class="text-xs font-medium text-primary-600 dark:text-primary-400">3</span>
              </div>
              <div>
                <h3 class="font-medium text-gray-900 dark:text-white">Shipping Updates</h3>
                <p class="text-sm text-gray-600 dark:text-gray-400">You'll receive tracking information once your order ships, typically within 1-2 business days.</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Action Buttons -->
        <div class="flex flex-col sm:flex-row gap-4">
          <router-link
            to="/"
            class="flex-1 bg-primary-600 hover:bg-primary-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 text-center"
          >
            Continue Shopping
          </router-link>
          <button
            @click="downloadInvoice"
            class="flex-1 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-900 dark:text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
          >
            Download Invoice
          </button>
        </div>

        <!-- Support Information -->
        <div class="mt-8 text-center">
          <p class="text-sm text-gray-600 dark:text-gray-400 mb-2">
            Need help? Contact our customer support
          </p>
          <div class="flex justify-center space-x-6 text-sm">
            <a href="mailto:support@example.com" class="text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300">
              support@example.com
            </a>
            <span class="text-gray-400">|</span>
            <a href="tel:+1-555-123-4567" class="text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300">
              +1 (555) 123-4567
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

// Generate random order number
const orderNumber = ref('ORD-' + Math.random().toString(36).substr(2, 9).toUpperCase())
const orderDate = ref(new Date().toLocaleDateString('en-US', {
  year: 'numeric',
  month: 'long',
  day: 'numeric'
}))
const totalAmount = ref('299.99') // This would come from the actual order

const downloadInvoice = () => {
  // Simulate invoice download
  console.log('Downloading invoice...')
  // In a real app, this would generate and download a PDF invoice
}
</script> 