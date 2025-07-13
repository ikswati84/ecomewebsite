<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { EyeIcon, EyeSlashIcon } from '@heroicons/vue/24/outline'

const router = useRouter()

const form = ref({
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  confirmPassword: '',
  agreeToTerms: false
})

const showPassword = ref(false)
const showConfirmPassword = ref(false)
const isLoading = ref(false)
const errors = ref<Record<string, string>>({})

const validateForm = () => {
  errors.value = {}
  
  if (!form.value.firstName) {
    errors.value.firstName = 'First name is required'
  }
  
  if (!form.value.lastName) {
    errors.value.lastName = 'Last name is required'
  }
  
  if (!form.value.email) {
    errors.value.email = 'Email is required'
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.value.email)) {
    errors.value.email = 'Please enter a valid email'
  }
  
  if (!form.value.password) {
    errors.value.password = 'Password is required'
  } else if (form.value.password.length < 8) {
    errors.value.password = 'Password must be at least 8 characters'
  } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(form.value.password)) {
    errors.value.password = 'Password must contain at least one uppercase letter, one lowercase letter, and one number'
  }
  
  if (!form.value.confirmPassword) {
    errors.value.confirmPassword = 'Please confirm your password'
  } else if (form.value.password !== form.value.confirmPassword) {
    errors.value.confirmPassword = 'Passwords do not match'
  }
  
  if (!form.value.agreeToTerms) {
    errors.value.agreeToTerms = 'You must agree to the terms and conditions'
  }
  
  return Object.keys(errors.value).length === 0
}

const handleSubmit = async () => {
  if (!validateForm()) return
  
  isLoading.value = true
  
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 1000))
  
  // In a real app, you would make an API call here
  console.log('Register attempt:', form.value)
  
  isLoading.value = false
  
  // Redirect to home page after successful registration
  router.push('/')
}
</script>

<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-md">
      <div class="flex justify-center">
        <div class="w-12 h-12 bg-primary-600 rounded-lg flex items-center justify-center">
          <span class="text-white font-bold text-xl">S</span>
        </div>
      </div>
      <h2 class="mt-6 text-center text-3xl font-bold text-gray-900 dark:text-white">
        Create your account
      </h2>
      <p class="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
        Or
        <router-link
          to="/login"
          class="font-medium text-primary-600 hover:text-primary-500 dark:text-primary-400"
        >
          sign in to your existing account
        </router-link>
      </p>
    </div>

    <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div class="bg-white dark:bg-gray-800 py-8 px-4 shadow sm:rounded-lg sm:px-10">
        <form class="space-y-6" @submit.prevent="handleSubmit">
          <!-- Name Fields -->
          <div class="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <label for="firstName" class="block text-sm font-medium text-gray-700 dark:text-gray-300">
                First name
              </label>
              <div class="mt-1">
                <input
                  id="firstName"
                  v-model="form.firstName"
                  name="firstName"
                  type="text"
                  autocomplete="given-name"
                  required
                  :class="[
                    'appearance-none block w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm',
                    errors.firstName
                      ? 'border-red-300 dark:border-red-600 dark:bg-gray-700 dark:text-white'
                      : 'border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white'
                  ]"
                  placeholder="Enter your first name"
                />
              </div>
              <p v-if="errors.firstName" class="mt-1 text-sm text-red-600 dark:text-red-400">
                {{ errors.firstName }}
              </p>
            </div>

            <div>
              <label for="lastName" class="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Last name
              </label>
              <div class="mt-1">
                <input
                  id="lastName"
                  v-model="form.lastName"
                  name="lastName"
                  type="text"
                  autocomplete="family-name"
                  required
                  :class="[
                    'appearance-none block w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm',
                    errors.lastName
                      ? 'border-red-300 dark:border-red-600 dark:bg-gray-700 dark:text-white'
                      : 'border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white'
                  ]"
                  placeholder="Enter your last name"
                />
              </div>
              <p v-if="errors.lastName" class="mt-1 text-sm text-red-600 dark:text-red-400">
                {{ errors.lastName }}
              </p>
            </div>
          </div>

          <!-- Email Field -->
          <div>
            <label for="email" class="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Email address
            </label>
            <div class="mt-1">
              <input
                id="email"
                v-model="form.email"
                name="email"
                type="email"
                autocomplete="email"
                required
                :class="[
                  'appearance-none block w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm',
                  errors.email
                    ? 'border-red-300 dark:border-red-600 dark:bg-gray-700 dark:text-white'
                    : 'border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white'
                ]"
                placeholder="Enter your email"
              />
            </div>
            <p v-if="errors.email" class="mt-1 text-sm text-red-600 dark:text-red-400">
              {{ errors.email }}
            </p>
          </div>

          <!-- Password Field -->
          <div>
            <label for="password" class="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Password
            </label>
            <div class="mt-1 relative">
              <input
                id="password"
                v-model="form.password"
                name="password"
                :type="showPassword ? 'text' : 'password'"
                autocomplete="new-password"
                required
                :class="[
                  'appearance-none block w-full px-3 py-2 pr-10 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm',
                  errors.password
                    ? 'border-red-300 dark:border-red-600 dark:bg-gray-700 dark:text-white'
                    : 'border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white'
                ]"
                placeholder="Create a password"
              />
              <button
                type="button"
                @click="showPassword = !showPassword"
                class="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              >
                <EyeIcon v-if="!showPassword" class="h-5 w-5" />
                <EyeSlashIcon v-else class="h-5 w-5" />
              </button>
            </div>
            <p v-if="errors.password" class="mt-1 text-sm text-red-600 dark:text-red-400">
              {{ errors.password }}
            </p>
          </div>

          <!-- Confirm Password Field -->
          <div>
            <label for="confirmPassword" class="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Confirm password
            </label>
            <div class="mt-1 relative">
              <input
                id="confirmPassword"
                v-model="form.confirmPassword"
                name="confirmPassword"
                :type="showConfirmPassword ? 'text' : 'password'"
                autocomplete="new-password"
                required
                :class="[
                  'appearance-none block w-full px-3 py-2 pr-10 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm',
                  errors.confirmPassword
                    ? 'border-red-300 dark:border-red-600 dark:bg-gray-700 dark:text-white'
                    : 'border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white'
                ]"
                placeholder="Confirm your password"
              />
              <button
                type="button"
                @click="showConfirmPassword = !showConfirmPassword"
                class="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              >
                <EyeIcon v-if="!showConfirmPassword" class="h-5 w-5" />
                <EyeSlashIcon v-else class="h-5 w-5" />
              </button>
            </div>
            <p v-if="errors.confirmPassword" class="mt-1 text-sm text-red-600 dark:text-red-400">
              {{ errors.confirmPassword }}
            </p>
          </div>

          <!-- Terms and Conditions -->
          <div class="flex items-center">
            <input
              id="agreeToTerms"
              v-model="form.agreeToTerms"
              name="agreeToTerms"
              type="checkbox"
              class="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
            />
            <label for="agreeToTerms" class="ml-2 block text-sm text-gray-900 dark:text-gray-300">
              I agree to the
              <a href="#" class="text-primary-600 hover:text-primary-500 dark:text-primary-400">Terms and Conditions</a>
              and
              <a href="#" class="text-primary-600 hover:text-primary-500 dark:text-primary-400">Privacy Policy</a>
            </label>
          </div>
          <p v-if="errors.agreeToTerms" class="text-sm text-red-600 dark:text-red-400">
            {{ errors.agreeToTerms }}
          </p>

          <!-- Submit Button -->
          <div>
            <button
              type="submit"
              :disabled="isLoading"
              class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <div v-if="isLoading" class="absolute left-0 inset-y-0 flex items-center pl-3">
                <div class="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              </div>
              {{ isLoading ? 'Creating account...' : 'Create account' }}
            </button>
          </div>

          <!-- Social Registration -->
          <div class="mt-6">
            <div class="relative">
              <div class="absolute inset-0 flex items-center">
                <div class="w-full border-t border-gray-300 dark:border-gray-600" />
              </div>
              <div class="relative flex justify-center text-sm">
                <span class="px-2 bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400">
                  Or continue with
                </span>
              </div>
            </div>

            <div class="mt-6 grid grid-cols-2 gap-3">
              <button
                type="button"
                class="w-full inline-flex justify-center py-2 px-4 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm bg-white dark:bg-gray-700 text-sm font-medium text-gray-500 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600"
              >
                <svg class="h-5 w-5" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                <span class="ml-2">Google</span>
              </button>

              <button
                type="button"
                class="w-full inline-flex justify-center py-2 px-4 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm bg-white dark:bg-gray-700 text-sm font-medium text-gray-500 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600"
              >
                <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                </svg>
                <span class="ml-2">Twitter</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template> 