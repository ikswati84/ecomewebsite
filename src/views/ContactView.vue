<script setup lang="ts">
import { ref } from 'vue'
import { 
  EnvelopeIcon, 
  PhoneIcon, 
  MapPinIcon,
  ClockIcon,
  ChatBubbleLeftRightIcon,
  CheckCircleIcon
} from '@heroicons/vue/24/outline'

const form = ref({
  name: '',
  email: '',
  subject: '',
  message: ''
})

const isSubmitting = ref(false)
const isSubmitted = ref(false)

const contactInfo = ref([
  {
    icon: EnvelopeIcon,
    title: 'Email Us',
    details: ['support@ecomestore.com', 'sales@ecomestore.com'],
    description: 'Get in touch via email for any inquiries'
  },
  {
    icon: PhoneIcon,
    title: 'Call Us',
    details: ['+1 (555) 123-4567', '+1 (555) 987-6543'],
    description: 'Speak directly with our customer service team'
  },
  {
    icon: MapPinIcon,
    title: 'Visit Us',
    details: ['123 Commerce Street', 'New York, NY 10001'],
    description: 'Drop by our headquarters for a personal visit'
  },
  {
    icon: ClockIcon,
    title: 'Business Hours',
    details: ['Mon-Fri: 9AM-6PM EST', 'Sat: 10AM-4PM EST'],
    description: 'We\'re here to help during business hours'
  }
])

const faqs = ref([
  {
    question: 'How can I track my order?',
    answer: 'You can track your order by logging into your account and visiting the "My Orders" section, or by using the tracking number provided in your shipping confirmation email.'
  },
  {
    question: 'What is your return policy?',
    answer: 'We offer a 30-day money-back guarantee on all products. Items must be returned in their original condition with all packaging intact.'
  },
  {
    question: 'Do you ship internationally?',
    answer: 'Yes, we ship to over 150 countries worldwide. Shipping costs and delivery times vary by location.'
  },
  {
    question: 'How can I change or cancel my order?',
    answer: 'Orders can be modified or cancelled within 1 hour of placement. Please contact our customer service team immediately for assistance.'
  }
])

const submitForm = async () => {
  isSubmitting.value = true
  
  // Simulate form submission
  await new Promise(resolve => setTimeout(resolve, 2000))
  
  isSubmitting.value = false
  isSubmitted.value = true
  
  // Reset form
  form.value = {
    name: '',
    email: '',
    subject: '',
    message: ''
  }
  
  // Hide success message after 5 seconds
  setTimeout(() => {
    isSubmitted.value = false
  }, 5000)
}
</script>

<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
    <!-- Hero Section -->
    <section class="relative py-20 bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 overflow-hidden">
      <!-- Background Pattern -->
      <div class="absolute inset-0 opacity-10">
        <div class="absolute inset-0" style="background-image: radial-gradient(circle at 1px 1px, rgba(255,255,255,0.1) 1px, transparent 0); background-size: 20px 20px;"></div>
      </div>
      
      <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center">
          <h1 class="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
            Get in Touch
          </h1>
          <p class="text-xl text-primary-100 max-w-3xl mx-auto leading-relaxed">
            We'd love to hear from you. Send us a message and we'll respond as soon as possible.
          </p>
        </div>
      </div>
    </section>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-16">
        <!-- Contact Form -->
        <div>
          <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
            <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Send us a Message
            </h2>
            
            <!-- Success Message -->
            <div v-if="isSubmitted" class="mb-6 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
              <div class="flex items-center">
                <CheckCircleIcon class="h-5 w-5 text-green-500 mr-2" />
                <span class="text-green-800 dark:text-green-200">Thank you! Your message has been sent successfully.</span>
              </div>
            </div>
            
            <form @submit.prevent="submitForm" class="space-y-6">
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label for="name" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Full Name *
                  </label>
                  <input
                    id="name"
                    v-model="form.name"
                    type="text"
                    required
                    class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                    placeholder="Enter your full name"
                  />
                </div>
                
                <div>
                  <label for="email" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Email Address *
                  </label>
                  <input
                    id="email"
                    v-model="form.email"
                    type="email"
                    required
                    class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                    placeholder="Enter your email"
                  />
                </div>
              </div>
              
              <div>
                <label for="subject" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Subject *
                </label>
                <input
                  id="subject"
                  v-model="form.subject"
                  type="text"
                  required
                  class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  placeholder="What is this about?"
                />
              </div>
              
              <div>
                <label for="message" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Message *
                </label>
                <textarea
                  id="message"
                  v-model="form.message"
                  rows="6"
                  required
                  class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white resize-none"
                  placeholder="Tell us more about your inquiry..."
                ></textarea>
              </div>
              
              <button
                type="submit"
                :disabled="isSubmitting"
                class="w-full bg-primary-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-primary-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <div v-if="isSubmitting" class="flex items-center justify-center">
                  <div class="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  Sending...
                </div>
                <span v-else>Send Message</span>
              </button>
            </form>
          </div>
        </div>

        <!-- Contact Information -->
        <div class="space-y-8">
          <!-- Contact Methods -->
          <div>
            <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Contact Information
            </h2>
            <div class="space-y-6">
              <div v-for="info in contactInfo" :key="info.title" class="flex items-start space-x-4">
                <div class="w-12 h-12 bg-primary-100 dark:bg-primary-900 rounded-lg flex items-center justify-center flex-shrink-0">
                  <component :is="info.icon" class="h-6 w-6 text-primary-600" />
                </div>
                <div>
                  <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-1">{{ info.title }}</h3>
                  <div class="space-y-1">
                    <div v-for="detail in info.details" :key="detail" class="text-gray-600 dark:text-gray-400">
                      {{ detail }}
                    </div>
                  </div>
                  <p class="text-sm text-gray-500 dark:text-gray-500 mt-2">{{ info.description }}</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Live Chat -->
          <div class="bg-gradient-to-r from-green-500 to-purple-600 rounded-2xl p-6 text-white">
            <div class="flex items-center space-x-4 mb-4">
              <div class="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                <ChatBubbleLeftRightIcon class="h-6 w-6" />
              </div>
              <div>
                <h3 class="text-lg font-semibold">Live Chat</h3>
                <p class="text-green-100">Available 24/7</p>
              </div>
            </div>
            <p class="text-green-100 mb-4">
              Get instant help from our customer service team. No waiting, no queues.
            </p>
            <button class="bg-white text-green-600 px-6 py-2 rounded-lg font-semibold hover:bg-green-50 transition-colors">
              Start Chat
            </button>
          </div>
        </div>
      </div>

      <!-- FAQ Section -->
      <section class="mt-20">
        <div class="text-center mb-12">
          <h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Frequently Asked Questions
          </h2>
          <p class="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Find quick answers to common questions about our services and policies.
          </p>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div v-for="faq in faqs" :key="faq.question" class="bg-white dark:bg-gray-800 rounded-lg p-6">
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-3">{{ faq.question }}</h3>
            <p class="text-gray-600 dark:text-gray-400">{{ faq.answer }}</p>
          </div>
        </div>
      </section>

      <!-- Map Section -->
      <section class="mt-20">
        <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden">
          <div class="p-8">
            <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Visit Our Office
            </h2>
            <p class="text-gray-600 dark:text-gray-400 mb-6">
              Come visit us at our headquarters in New York City. We'd love to meet you in person!
            </p>
            <div class="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
              <MapPinIcon class="h-5 w-5" />
              <span>123 Commerce Street, New York, NY 10001</span>
            </div>
          </div>
          <div class="h-64 bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
            <div class="text-center text-gray-500 dark:text-gray-400">
              <MapPinIcon class="h-12 w-12 mx-auto mb-2" />
              <p>Interactive Map</p>
              <p class="text-sm">Map integration would go here</p>
            </div>
          </div>
        </div>
      </section>

      <!-- Additional Contact Options -->
      <section class="mt-20">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div class="bg-white dark:bg-gray-800 rounded-lg p-6 text-center">
            <div class="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center mx-auto mb-4">
              <EnvelopeIcon class="h-6 w-6 text-green-600" />
            </div>
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">Email Support</h3>
            <p class="text-gray-600 dark:text-gray-400 mb-4">Get help via email within 24 hours</p>
            <a href="mailto:support@ecomestore.com" class="text-primary-600 hover:text-primary-700 font-medium">
              support@ecomestore.com
            </a>
          </div>
          
          <div class="bg-white dark:bg-gray-800 rounded-lg p-6 text-center">
            <div class="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center mx-auto mb-4">
              <PhoneIcon class="h-6 w-6 text-green-600" />
            </div>
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">Phone Support</h3>
            <p class="text-gray-600 dark:text-gray-400 mb-4">Speak with our team directly</p>
            <a href="tel:+15551234567" class="text-primary-600 hover:text-primary-700 font-medium">
              +1 (555) 123-4567
            </a>
          </div>
          
          <div class="bg-white dark:bg-gray-800 rounded-lg p-6 text-center">
            <div class="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center mx-auto mb-4">
              <ChatBubbleLeftRightIcon class="h-6 w-6 text-purple-600" />
            </div>
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">Live Chat</h3>
            <p class="text-gray-600 dark:text-gray-400 mb-4">Instant help available 24/7</p>
            <button class="text-primary-600 hover:text-primary-700 font-medium">
              Start Chat Now
            </button>
          </div>
        </div>
      </section>
    </div>
  </div>
</template> 