<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
    <div class="container mx-auto px-4">
      <!-- Header -->
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-2">Checkout</h1>
        <p class="text-gray-600 dark:text-gray-400">Complete your purchase</p>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Main Checkout Form -->
        <div class="lg:col-span-2 space-y-8">
          <!-- Shipping Information -->
          <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
              <svg class="w-5 h-5 mr-2 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              Shipping Information
            </h2>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">First Name</label>
                <input 
                  v-model="shippingInfo.firstName"
                  type="text" 
                  class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  placeholder="John"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Last Name</label>
                <input 
                  v-model="shippingInfo.lastName"
                  type="text" 
                  class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  placeholder="Doe"
                />
              </div>
              <div class="md:col-span-2">
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Email</label>
                <input 
                  v-model="shippingInfo.email"
                  type="email" 
                  class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  placeholder="john@example.com"
                />
              </div>
              <div class="md:col-span-2">
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Phone</label>
                <input 
                  v-model="shippingInfo.phone"
                  type="tel" 
                  class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  placeholder="+1 (555) 123-4567"
                />
              </div>
              <div class="md:col-span-2">
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Address</label>
                <input 
                  v-model="shippingInfo.address"
                  type="text" 
                  class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  placeholder="123 Main St"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">City</label>
                <input 
                  v-model="shippingInfo.city"
                  type="text" 
                  class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  placeholder="New York"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">State</label>
                <input 
                  v-model="shippingInfo.state"
                  type="text" 
                  class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  placeholder="NY"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">ZIP Code</label>
                <input 
                  v-model="shippingInfo.zipCode"
                  type="text" 
                  class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  placeholder="10001"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Country</label>
                <select 
                  v-model="shippingInfo.country"
                  class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                >
                  <option value="US">United States</option>
                  <option value="CA">Canada</option>
                  <option value="UK">United Kingdom</option>
                  <option value="AU">Australia</option>
                </select>
              </div>
            </div>
          </div>

          <!-- Payment Information -->
          <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
              <svg class="w-5 h-5 mr-2 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
              </svg>
              Payment Information
            </h2>
            
            <div class="space-y-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Card Number</label>
                <input 
                  v-model="paymentInfo.cardNumber"
                  type="text" 
                  class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  placeholder="1234 5678 9012 3456"
                />
              </div>
              <div class="grid grid-cols-2 gap-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Expiry Date</label>
                  <input 
                    v-model="paymentInfo.expiryDate"
                    type="text" 
                    class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                    placeholder="MM/YY"
                  />
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">CVV</label>
                  <input 
                    v-model="paymentInfo.cvv"
                    type="text" 
                    class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                    placeholder="123"
                  />
                </div>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Name on Card</label>
                <input 
                  v-model="paymentInfo.nameOnCard"
                  type="text" 
                  class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  placeholder="John Doe"
                />
              </div>
            </div>
          </div>

          <!-- Order Notes -->
          <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
              <svg class="w-5 h-5 mr-2 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
              Order Notes (Optional)
            </h2>
            <textarea 
              v-model="orderNotes"
              rows="3"
              class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
              placeholder="Add any special instructions or notes for your order..."
            ></textarea>
          </div>
        </div>

        <!-- Order Summary -->
        <div class="lg:col-span-1">
          <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 sticky top-8">
            <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-4">Order Summary</h2>
            
            <!-- Cart Items -->
            <div class="space-y-4 mb-6">
              <div 
                v-for="item in cartItems" 
                :key="item.id"
                class="flex items-center space-x-3"
              >
                <img :src="item.image" :alt="item.name" class="w-12 h-12 rounded-lg object-cover" />
                <div class="flex-1 min-w-0">
                  <h3 class="text-sm font-medium text-gray-900 dark:text-white truncate">{{ item.name }}</h3>
                  <p class="text-sm text-gray-500 dark:text-gray-400">Qty: {{ item.quantity }}</p>
                </div>
                <div class="text-sm font-medium text-gray-900 dark:text-white">
                  ${{ (item.price * item.quantity).toFixed(2) }}
                </div>
              </div>
            </div>

            <!-- Order Totals -->
            <div class="border-t border-gray-200 dark:border-gray-700 pt-4 space-y-2">
              <div class="flex justify-between text-sm">
                <span class="text-gray-600 dark:text-gray-400">Subtotal</span>
                <span class="text-gray-900 dark:text-white">${{ subtotal.toFixed(2) }}</span>
              </div>
              <div class="flex justify-between text-sm">
                <span class="text-gray-600 dark:text-gray-400">Shipping</span>
                <span class="text-gray-900 dark:text-white">${{ shipping.toFixed(2) }}</span>
              </div>
              <div class="flex justify-between text-sm">
                <span class="text-gray-600 dark:text-gray-400">Tax</span>
                <span class="text-gray-900 dark:text-white">${{ tax.toFixed(2) }}</span>
              </div>
              <div class="border-t border-gray-200 dark:border-gray-700 pt-2">
                <div class="flex justify-between text-lg font-semibold">
                  <span class="text-gray-900 dark:text-white">Total</span>
                  <span class="text-gray-900 dark:text-white">${{ total.toFixed(2) }}</span>
                </div>
              </div>
            </div>

            <!-- Place Order Button -->
            <button 
              @click="placeOrder"
              :disabled="isProcessing"
              class="w-full mt-6 bg-primary-600 hover:bg-primary-700 disabled:bg-gray-400 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center"
            >
              <svg v-if="isProcessing" class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              {{ isProcessing ? 'Processing...' : 'Place Order' }}
            </button>

            <!-- Security Notice -->
            <div class="mt-4 text-xs text-gray-500 dark:text-gray-400 text-center">
              <svg class="w-4 h-4 inline mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clip-rule="evenodd" />
              </svg>
              Secure checkout powered by Stripe
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useCartStore } from '@/stores/cart'
import { useRouter } from 'vue-router'

const router = useRouter()
const cartStore = useCartStore()

// Reactive data
const isProcessing = ref(false)
const orderNotes = ref('')

const shippingInfo = ref({
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  address: '',
  city: '',
  state: '',
  zipCode: '',
  country: 'US'
})

const paymentInfo = ref({
  cardNumber: '',
  expiryDate: '',
  cvv: '',
  nameOnCard: ''
})

// Computed properties
const cartItems = computed(() => cartStore.items)
const subtotal = computed(() => cartItems.value.reduce((sum, item) => sum + (item.price * item.quantity), 0))
const shipping = computed(() => subtotal.value > 50 ? 0 : 5.99)
const tax = computed(() => subtotal.value * 0.08)
const total = computed(() => subtotal.value + shipping.value + tax.value)

// Methods
const placeOrder = async () => {
  if (!validateForm()) {
    return
  }

  isProcessing.value = true

  try {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    // Clear cart
    cartStore.clearCart()
    
    // Redirect to success page or show success message
    router.push('/order-success')
  } catch (error) {
    console.error('Order placement failed:', error)
    // Handle error (show error message)
  } finally {
    isProcessing.value = false
  }
}

const validateForm = () => {
  // Basic validation
  const requiredFields = [
    shippingInfo.value.firstName,
    shippingInfo.value.lastName,
    shippingInfo.value.email,
    shippingInfo.value.address,
    shippingInfo.value.city,
    shippingInfo.value.state,
    shippingInfo.value.zipCode,
    paymentInfo.value.cardNumber,
    paymentInfo.value.expiryDate,
    paymentInfo.value.cvv,
    paymentInfo.value.nameOnCard
  ]

  return requiredFields.every(field => field.trim() !== '')
}
</script> 