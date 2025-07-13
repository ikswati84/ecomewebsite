<script setup lang="ts">
import { ref } from 'vue'
import { 
  UsersIcon, 
  GlobeAltIcon, 
  HeartIcon, 
  ShieldCheckIcon,
  StarIcon,
  TruckIcon,
  CreditCardIcon,
  ChatBubbleLeftRightIcon
} from '@heroicons/vue/24/outline'

const stats = ref([
  { number: '1M+', label: 'Happy Customers' },
  { number: '50K+', label: 'Products Available' },
  { number: '150+', label: 'Countries Served' },
  { number: '24/7', label: 'Customer Support' }
])

const values = ref([
  {
    icon: HeartIcon,
    title: 'Customer First',
    description: 'We put our customers at the heart of everything we do, ensuring exceptional service and satisfaction.'
  },
  {
    icon: ShieldCheckIcon,
    title: 'Quality Assured',
    description: 'Every product is carefully curated and tested to meet our high quality standards.'
  },
  {
    icon: GlobeAltIcon,
    title: 'Global Reach',
    description: 'Connecting people worldwide with the best products and innovative solutions.'
  },
  {
    icon: UsersIcon,
    title: 'Community Driven',
    description: 'Building a community of satisfied customers who trust and recommend our services.'
  }
])

const team = ref([
  {
    name: 'Sarah Johnson',
    role: 'CEO & Founder',
    image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=300&h=300&fit=crop&crop=face',
    bio: 'Passionate about creating exceptional shopping experiences and building lasting customer relationships.'
  },
  {
    name: 'Michael Chen',
    role: 'CTO',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face',
    bio: 'Leading our technology initiatives to deliver seamless and innovative e-commerce solutions.'
  },
  {
    name: 'Emily Rodriguez',
    role: 'Head of Operations',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop&crop=face',
    bio: 'Ensuring smooth operations and exceptional service delivery across all touchpoints.'
  },
  {
    name: 'David Thompson',
    role: 'Head of Marketing',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face',
    bio: 'Creating compelling brand experiences and connecting with our global customer base.'
  }
])

const milestones = ref([
  {
    year: '2018',
    title: 'Company Founded',
    description: 'Started with a vision to revolutionize online shopping experiences.'
  },
  {
    year: '2020',
    title: 'Global Expansion',
    description: 'Expanded to serve customers in over 50 countries worldwide.'
  },
  {
    year: '2022',
    title: '1M Customers',
    description: 'Reached the milestone of serving 1 million happy customers.'
  },
  {
    year: '2024',
    title: 'Innovation Hub',
    description: 'Launched our innovation hub to develop cutting-edge e-commerce solutions.'
  }
])
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
            About Our Company
          </h1>
          <p class="text-xl text-primary-100 max-w-3xl mx-auto leading-relaxed">
            We're passionate about connecting people with the best products and creating exceptional shopping experiences that inspire and delight.
          </p>
        </div>
      </div>
    </section>

    <!-- Stats Section -->
    <section class="py-16 bg-white dark:bg-gray-800">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div v-for="stat in stats" :key="stat.label" class="text-center">
            <div class="text-3xl md:text-4xl font-bold text-primary-600 mb-2">{{ stat.number }}</div>
            <div class="text-gray-600 dark:text-gray-400">{{ stat.label }}</div>
          </div>
        </div>
      </div>
    </section>

    <!-- Our Story Section -->
    <section class="py-16 bg-gray-50 dark:bg-gray-900">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-6">
              Our Story
            </h2>
            <div class="space-y-4 text-gray-600 dark:text-gray-400">
              <p>
                Founded in 2018, we started with a simple mission: to make online shopping more accessible, enjoyable, and trustworthy. What began as a small team with big dreams has grown into a global e-commerce platform serving millions of customers worldwide.
              </p>
              <p>
                We believe that great shopping experiences shouldn't be complicated. That's why we've built our platform with customer needs at the center, offering a seamless journey from discovery to delivery.
              </p>
              <p>
                Today, we're proud to serve customers in over 150 countries, offering a curated selection of premium products that enhance everyday life. Our commitment to quality, innovation, and customer satisfaction drives everything we do.
              </p>
            </div>
          </div>
          <div class="relative">
            <img 
              src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=400&fit=crop" 
              alt="Our Team"
              class="rounded-2xl shadow-2xl"
            />
            <div class="absolute -bottom-6 -left-6 bg-white dark:bg-gray-800 rounded-xl p-4 shadow-lg">
              <div class="flex items-center space-x-2">
                <div class="w-3 h-3 bg-green-500 rounded-full"></div>
                <span class="text-sm font-medium text-gray-900 dark:text-white">Trusted by 1M+ customers</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Values Section -->
    <section class="py-16 bg-white dark:bg-gray-800">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12">
          <h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Our Values
          </h2>
          <p class="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            These core values guide everything we do and shape the way we serve our customers.
          </p>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div v-for="value in values" :key="value.title" class="text-center">
            <div class="w-16 h-16 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center mx-auto mb-4">
              <component :is="value.icon" class="h-8 w-8 text-primary-600" />
            </div>
            <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-2">{{ value.title }}</h3>
            <p class="text-gray-600 dark:text-gray-400">{{ value.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Team Section -->
    <section class="py-16 bg-gray-50 dark:bg-gray-900">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12">
          <h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Meet Our Team
          </h2>
          <p class="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            The passionate individuals behind our mission to deliver exceptional shopping experiences.
          </p>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div v-for="member in team" :key="member.name" class="text-center">
            <div class="relative mb-4">
              <img 
                :src="member.image" 
                :alt="member.name"
                class="w-32 h-32 rounded-full mx-auto object-cover"
              />
              <div class="absolute -bottom-2 -right-2 w-8 h-8 bg-primary-600 rounded-full flex items-center justify-center">
                <StarIcon class="h-4 w-4 text-white" />
              </div>
            </div>
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-1">{{ member.name }}</h3>
            <p class="text-primary-600 font-medium mb-3">{{ member.role }}</p>
            <p class="text-sm text-gray-600 dark:text-gray-400">{{ member.bio }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Milestones Section -->
    <section class="py-16 bg-white dark:bg-gray-800">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12">
          <h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Our Journey
          </h2>
          <p class="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Key milestones that mark our growth and commitment to excellence.
          </p>
        </div>
        
        <div class="relative">
          <!-- Timeline Line -->
          <div class="absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-primary-200 dark:bg-primary-800"></div>
          
          <div class="space-y-12">
            <div v-for="(milestone, index) in milestones" :key="milestone.year" 
                 :class="['relative flex items-center', index % 2 === 0 ? 'flex-row' : 'flex-row-reverse']">
              <!-- Content -->
              <div :class="['w-1/2 p-6', index % 2 === 0 ? 'pr-8 text-right' : 'pl-8 text-left']">
                <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
                  <div class="text-2xl font-bold text-primary-600 mb-2">{{ milestone.year }}</div>
                  <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">{{ milestone.title }}</h3>
                  <p class="text-gray-600 dark:text-gray-400">{{ milestone.description }}</p>
                </div>
              </div>
              
              <!-- Timeline Dot -->
              <div class="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 bg-primary-600 rounded-full border-4 border-white dark:border-gray-800"></div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Why Choose Us Section -->
    <section class="py-16 bg-gray-50 dark:bg-gray-900">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12">
          <h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Why Choose Us
          </h2>
          <p class="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Discover what makes us different and why millions of customers trust us.
          </p>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div class="bg-white dark:bg-gray-800 rounded-lg p-6 text-center">
            <div class="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-4">
              <TruckIcon class="h-6 w-6 text-green-600" />
            </div>
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">Fast Delivery</h3>
            <p class="text-gray-600 dark:text-gray-400">Free shipping on orders over $50 with express delivery options.</p>
          </div>
          
          <div class="bg-white dark:bg-gray-800 rounded-lg p-6 text-center">
            <div class="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center mx-auto mb-4">
              <ShieldCheckIcon class="h-6 w-6 text-green-600" />
            </div>
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">Secure Shopping</h3>
            <p class="text-gray-600 dark:text-gray-400">100% secure payment processing with buyer protection.</p>
          </div>
          
          <div class="bg-white dark:bg-gray-800 rounded-lg p-6 text-center">
            <div class="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center mx-auto mb-4">
              <ChatBubbleLeftRightIcon class="h-6 w-6 text-purple-600" />
            </div>
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">24/7 Support</h3>
            <p class="text-gray-600 dark:text-gray-400">Round-the-clock customer support to help you anytime.</p>
          </div>
          
          <div class="bg-white dark:bg-gray-800 rounded-lg p-6 text-center">
            <div class="w-12 h-12 bg-yellow-100 dark:bg-yellow-900 rounded-full flex items-center justify-center mx-auto mb-4">
              <CreditCardIcon class="h-6 w-6 text-yellow-600" />
            </div>
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">Easy Returns</h3>
            <p class="text-gray-600 dark:text-gray-400">30-day money-back guarantee with hassle-free returns.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="py-16 bg-primary-600">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 class="text-3xl font-bold text-white mb-4">
          Ready to Experience the Difference?
        </h2>
        <p class="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
          Join millions of satisfied customers who trust us for their shopping needs.
        </p>
        <div class="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
          <router-link
            to="/products"
            class="bg-white text-primary-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
          >
            Start Shopping
          </router-link>
          <router-link
            to="/contact"
            class="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-primary-600 transition-colors"
          >
            Contact Us
          </router-link>
        </div>
      </div>
    </section>
  </div>
</template>
