<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
    <!-- Header -->
    <div class="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center py-6">
          <div>
            <h1 class="text-3xl font-bold text-gray-900 dark:text-white">Analytics Dashboard</h1>
            <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">Track your business performance and insights</p>
          </div>
          <div class="flex items-center space-x-3">
            <select v-model="selectedPeriod" class="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent dark:bg-gray-700 dark:text-white">
              <option value="7">Last 7 days</option>
              <option value="30">Last 30 days</option>
              <option value="90">Last 3 months</option>
              <option value="365">Last year</option>
            </select>
            <button class="px-4 py-2 bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 text-white rounded-lg transition-all duration-200 flex items-center space-x-2 shadow-lg hover:shadow-xl">
              <i class="pi pi-download text-sm"></i>
              <span>Export Report</span>
            </button>
          </div>
        </div>
      </div>
    </div>

    <div class="max-w-7xl mx-auto py-8">
      <!-- Key Metrics -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div class="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <div class="w-8 h-8 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                <i class="pi pi-dollar text-white text-sm"></i>
              </div>
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-500 dark:text-gray-400">Total Revenue</p>
              <p class="text-2xl font-bold text-gray-900 dark:text-white">${{ formatNumber(metrics.totalRevenue) }}</p>
              <p class="text-sm text-green-600 dark:text-green-400 flex items-center">
                <i class="pi pi-arrow-up text-xs mr-1"></i>
                +{{ metrics.revenueGrowth }}%
              </p>
            </div>
          </div>
        </div>

        <div class="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <div class="w-8 h-8 bg-gradient-to-r from-green-500 to-green-600 rounded-lg flex items-center justify-center">
                <i class="pi pi-shopping-cart text-white text-sm"></i>
              </div>
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-500 dark:text-gray-400">Total Orders</p>
              <p class="text-2xl font-bold text-gray-900 dark:text-white">{{ formatNumber(metrics.totalOrders) }}</p>
              <p class="text-sm text-green-600 dark:text-green-400 flex items-center">
                <i class="pi pi-arrow-up text-xs mr-1"></i>
                +{{ metrics.orderGrowth }}%
              </p>
            </div>
          </div>
        </div>

        <div class="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <div class="w-8 h-8 bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg flex items-center justify-center">
                <i class="pi pi-users text-white text-sm"></i>
              </div>
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-500 dark:text-gray-400">Total Customers</p>
              <p class="text-2xl font-bold text-gray-900 dark:text-white">{{ formatNumber(metrics.totalCustomers) }}</p>
              <p class="text-sm text-green-600 dark:text-green-400 flex items-center">
                <i class="pi pi-arrow-up text-xs mr-1"></i>
                +{{ metrics.customerGrowth }}%
              </p>
            </div>
          </div>
        </div>

        <div class="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <div class="w-8 h-8 bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg flex items-center justify-center">
                <i class="pi pi-star text-white text-sm"></i>
              </div>
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-500 dark:text-gray-400">Average Rating</p>
              <p class="text-2xl font-bold text-gray-900 dark:text-white">{{ metrics.averageRating }}/5</p>
              <p class="text-sm text-green-600 dark:text-green-400 flex items-center">
                <i class="pi pi-arrow-up text-xs mr-1"></i>
                +{{ metrics.ratingGrowth }}%
              </p>
            </div>
          </div>
        </div>
      </div>

      <div class="mb-4">
        <div class="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div class="flex items-center justify-between mb-6">
            <div class="flex items-center space-x-3">
              <div class="w-10 h-10 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-lg flex items-center justify-center">
                <i class="pi pi-chart-line text-white text-lg"></i>
              </div>
              <div>
                <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Revenue Trend</h3>
                <p class="text-sm text-gray-500 dark:text-gray-400">Track your revenue performance</p>
              </div>
            </div>
            <div class="flex items-center space-x-2">
              <div class="flex space-x-1 bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
                <button 
                  v-for="period in periodOptions" 
                  :key="period.value"
                  :class="[
                    'px-4 py-2 text-xs font-medium rounded-md transition-all duration-200 flex items-center space-x-1',
                    selectedChartPeriod === period.value 
                      ? 'bg-gradient-to-r from-indigo-500 to-indigo-600 text-white shadow-lg transform scale-105' 
                      : 'bg-transparent text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600 hover:text-gray-800 dark:hover:text-gray-200'
                  ]"
                  @click="selectedChartPeriod = period.value"
                >
                  <i :class="period.icon" class="text-xs"></i>
                  <span>{{ period.label }}</span>
                  <span v-if="period.badge" class="ml-1 px-1.5 py-0.5 text-xs bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 rounded-full">
                    {{ period.badge }}
                  </span>
                </button>
              </div>
            </div>
          </div>
          
          <!-- Chart Container -->
          <div class="relative">
            <!-- Chart Header Stats -->
            <div class="grid grid-cols-3 gap-4 mb-6">
              <div class="text-center p-3 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-lg">
                <p class="text-xs text-blue-600 dark:text-blue-400 font-medium">Total Revenue</p>
                <p class="text-lg font-bold text-blue-700 dark:text-blue-300">${{ formatNumber(revenueData.total) }}</p>
                <p class="text-xs text-green-600 dark:text-green-400 flex items-center justify-center">
                  <i class="pi pi-arrow-up text-xs mr-1"></i>
                  +{{ revenueData.growth }}%
                </p>
              </div>
              <div class="text-center p-3 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 rounded-lg">
                <p class="text-xs text-green-600 dark:text-green-400 font-medium">Avg. Daily</p>
                <p class="text-lg font-bold text-green-700 dark:text-green-300">${{ formatNumber(revenueData.average) }}</p>
                <p class="text-xs text-green-600 dark:text-green-400 flex items-center justify-center">
                  <i class="pi pi-arrow-up text-xs mr-1"></i>
                  +{{ revenueData.avgGrowth }}%
                </p>
              </div>
              <div class="text-center p-3 bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 rounded-lg">
                <p class="text-xs text-purple-600 dark:text-purple-400 font-medium">Peak Day</p>
                <p class="text-lg font-bold text-purple-700 dark:text-purple-300">${{ formatNumber(revenueData.peak) }}</p>
                <p class="text-xs text-purple-600 dark:text-purple-400">{{ revenueData.peakDay }}</p>
              </div>
            </div>

            <!-- Interactive Chart -->
            <div class="relative h-64 bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-700 rounded-lg p-4 border border-gray-200 dark:border-gray-600">
              <!-- Chart Grid Lines -->
              <div class="absolute inset-0 p-4">
                <div class="h-full flex flex-col justify-between">
                  <div v-for="i in 5" :key="i" class="border-b border-gray-200 dark:border-gray-600"></div>
                </div>
              </div>
              
              <!-- Chart Bars -->
              <div class="relative h-full flex items-end justify-between px-4 pb-4">
                <div 
                  v-for="(data, index) in chartData" 
                  :key="index"
                  class="relative flex flex-col items-center group cursor-pointer"
                >
                  <!-- Bar -->
                  <div 
                    class="w-8 rounded-t-lg transition-all duration-300 hover:w-10"
                    :style="{ 
                      height: `${(data.value / maxValue) * 100}%`,
                      background: `linear-gradient(to top, ${chartColors}, ${chartColors}dd)`
                    }"
                  ></div>
                  
                  <!-- Hover Tooltip -->
                  <div class="absolute bottom-full mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-10">
                    <div class="bg-gray-900 text-white text-xs rounded-lg px-2 py-1 whitespace-nowrap">
                      <div class="font-medium">${{ formatNumber(data.value) }}</div>
                      <div class="text-gray-300">{{ data.label }}</div>
                    </div>
                    <div class="w-2 h-2 bg-gray-900 transform rotate-45 absolute top-full left-1/2 -translate-x-1/2 -mt-1"></div>
                  </div>
                  
                  <!-- X-axis Labels -->
                  <div class="absolute -bottom-6 text-xs text-gray-500 dark:text-gray-400 font-medium">
                    {{ data.label }}
                  </div>
                </div>
              </div>
              
              <!-- Y-axis Labels -->
              <div class="absolute left-0 top-0 h-full flex flex-col justify-between text-xs text-gray-500 dark:text-gray-400 px-2">
                <div v-for="i in 5" :key="i" class="font-medium">
                  ${{ formatNumber(maxValue * (6 - i) / 5) }}
                </div>
              </div>
              
              <!-- Chart Overlay Info -->
              <div class="absolute top-4 right-4">
                <div class="flex items-center space-x-2 text-xs text-gray-500 dark:text-gray-400">
                  <div class="w-3 h-3 rounded-full" :style="{ backgroundColor: chartColors }"></div>
                  <span>Revenue</span>
                </div>
              </div>
            </div>
            
            <!-- Chart Legend -->
            <div class="flex items-center justify-between mt-4 pt-4 border-t border-gray-200 dark:border-gray-600">
              <div class="flex items-center space-x-4 text-xs">
                <div class="flex items-center space-x-2">
                  <div class="w-3 h-3 rounded-full" :style="{ backgroundColor: chartColors }"></div>
                  <span class="text-gray-600 dark:text-gray-400">Revenue</span>
                </div>
                <div class="flex items-center space-x-2">
                  <div class="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span class="text-gray-600 dark:text-gray-400">Growth</span>
                </div>
              </div>
              <div class="text-xs text-gray-500 dark:text-gray-400">
                Last updated: {{ new Date().toLocaleTimeString() }}
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Charts Section -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        <!-- Orders Chart -->
        <div class="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div class="flex items-center justify-between mb-6">
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Orders by Status</h3>
            <div class="flex items-center space-x-2">
              <span class="text-sm text-gray-500 dark:text-gray-400">Total: {{ metrics.totalOrders }}</span>
            </div>
          </div>
          <div class="space-y-4">
            <div v-for="status in orderStatuses" :key="status.name" class="flex items-center justify-between">
              <div class="flex items-center">
                <div :class="`w-3 h-3 rounded-full ${status.color}`"></div>
                <span class="ml-3 text-sm text-gray-700 dark:text-gray-300">{{ status.name }}</span>
              </div>
              <div class="flex items-center space-x-2">
                <div class="w-32 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div :class="`h-2 rounded-full ${status.color}`" :style="{ width: status.percentage + '%' }"></div>
                </div>
                <span class="text-sm font-medium text-gray-900 dark:text-white">{{ status.count }}</span>
              </div>
            </div>
          </div>
        </div>
        <!-- Customer Demographics -->
        <div class="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Customer Demographics</h3>
          <div class="space-y-4">
            <div v-for="demo in demographics" :key="demo.category" class="flex items-center justify-between">
              <div class="flex items-center">
                <div :class="`w-3 h-3 rounded-full ${demo.color}`"></div>
                <span class="ml-3 text-sm text-gray-700 dark:text-gray-300">{{ demo.category }}</span>
              </div>
              <div class="flex items-center space-x-2">
                <div class="w-24 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div :class="`h-2 rounded-full ${demo.color}`" :style="{ width: demo.percentage + '%' }"></div>
                </div>
                <span class="text-sm font-medium text-gray-900 dark:text-white">{{ demo.percentage }}%</span>
              </div>
            </div>
          </div>
        </div>
        <div class="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-6">Conversion Rates</h3>
          <div class="space-y-6">
            <div v-for="metric in conversionMetrics" :key="metric.name" class="flex items-center justify-between">
              <div>
                <p class="text-sm font-medium text-gray-700 dark:text-gray-300">{{ metric.name }}</p>
                <p class="text-xs text-gray-500 dark:text-gray-400">{{ metric.description }}</p>
              </div>
              <div class="text-right">
                <p class="text-lg font-bold text-gray-900 dark:text-white">{{ metric.rate }}%</p>
                <p :class="`text-xs ${metric.trend > 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`">
                  {{ metric.trend > 0 ? '+' : '' }}{{ metric.trend }}%
                </p>
              </div>
            </div>
          </div>
        </div>

      </div>

      <!-- Detailed Analytics -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        <!-- Top Products -->
        <div class="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Top Products</h3>
          <div class="space-y-4">
            <div v-for="product in topProducts" :key="product.id" class="flex items-center space-x-3">
              <img :src="product.image" :alt="product.name" class="w-10 h-10 rounded-lg object-cover">
              <div class="flex-1 min-w-0">
                <p class="text-sm font-medium text-gray-900 dark:text-white truncate">{{ product.name }}</p>
                <p class="text-xs text-gray-500 dark:text-gray-400">{{ product.category }}</p>
              </div>
              <div class="text-right">
                <p class="text-sm font-medium text-gray-900 dark:text-white">${{ product.revenue }}</p>
                <p class="text-xs text-green-600 dark:text-green-400">+{{ product.growth }}%</p>
              </div>
            </div>
          </div>
        </div>

        

        <!-- Recent Activity -->
        <div class="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Recent Activity</h3>
          <div class="space-y-4">
            <div v-for="activity in recentActivity" :key="activity.id" class="flex items-start space-x-3">
              <div :class="`w-8 h-8 rounded-full flex items-center justify-center ${activity.iconBg}`">
                <i :class="`${activity.icon} text-white text-sm`"></i>
              </div>
              <div class="flex-1 min-w-0">
                <p class="text-sm text-gray-900 dark:text-white">{{ activity.message }}</p>
                <p class="text-xs text-gray-500 dark:text-gray-400">{{ formatTimeAgo(activity.time) }}</p>
              </div>
            </div>
          </div>
        </div>
        <!-- Geographic Performance -->
        <div class="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-6">Top Regions</h3>
          <div class="space-y-4">
            <div v-for="region in topRegions" :key="region.name" class="flex items-center justify-between">
              <div class="flex items-center space-x-3">
                <div :class="`w-8 h-8 rounded-lg flex items-center justify-center ${region.color}`">
                  <i class="pi pi-map-marker text-white text-sm"></i>
                </div>
                <div>
                  <p class="text-sm font-medium text-gray-900 dark:text-white">{{ region.name }}</p>
                  <p class="text-xs text-gray-500 dark:text-gray-400">{{ region.orders }} orders</p>
                </div>
              </div>
              <div class="text-right">
                <p class="text-sm font-medium text-gray-900 dark:text-white">${{ region.revenue }}</p>
                <p class="text-xs text-green-600 dark:text-green-400">+{{ region.growth }}%</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template> 

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()
const currentUser = computed(() => authStore.user)

// Reactive data
const selectedPeriod = ref('30')
const selectedChartPeriod = ref('30D')

// Chart data for different periods
const chartData7D = ref([
  { label: 'Mon', value: 12500 },
  { label: 'Tue', value: 15800 },
  { label: 'Wed', value: 14200 },
  { label: 'Thu', value: 18900 },
  { label: 'Fri', value: 22100 },
  { label: 'Sat', value: 25600 },
  { label: 'Sun', value: 23400 }
])

const chartData30D = ref([
  { label: 'Week 1', value: 89000 },
  { label: 'Week 2', value: 102500 },
  { label: 'Week 3', value: 115800 },
  { label: 'Week 4', value: 132500 }
])

const chartData90D = ref([
  { label: 'Jan', value: 285000 },
  { label: 'Feb', value: 312000 },
  { label: 'Mar', value: 298000 }
])

const revenueData7D = ref({
  total: 132500,
  growth: 12.5,
  average: 18928,
  avgGrowth: 8.3,
  peak: 25600,
  peakDay: 'Saturday'
})

const revenueData30D = ref({
  total: 440800,
  growth: 18.7,
  average: 14700,
  avgGrowth: 12.4,
  peak: 132500,
  peakDay: 'Week 4'
})

const revenueData90D = ref({
  total: 895000,
  growth: 25.3,
  average: 9955,
  avgGrowth: 15.8,
  peak: 312000,
  peakDay: 'February'
})

// Computed properties for dynamic data
const chartData = computed(() => {
  switch (selectedChartPeriod.value) {
    case '7D':
      return chartData7D.value
    case '30D':
      return chartData30D.value
    case '90D':
      return chartData90D.value
    default:
      return chartData7D.value
  }
})

const revenueData = computed(() => {
  switch (selectedChartPeriod.value) {
    case '7D':
      return revenueData7D.value
    case '30D':
      return revenueData30D.value
    case '90D':
      return revenueData90D.value
    default:
      return revenueData7D.value
  }
})

const maxValue = computed(() => Math.max(...chartData.value.map(d => d.value)))

// Period options with enhanced data
const periodOptions = ref([
  {
    value: '7D',
    label: '7 Days',
    icon: 'pi pi-calendar',
    badge: 'Live',
    description: 'Last 7 days performance'
  },
  {
    value: '30D',
    label: '30 Days',
    icon: 'pi pi-calendar-plus',
    badge: 'Trend',
    description: 'Monthly overview'
  },
  {
    value: '90D',
    label: '90 Days',
    icon: 'pi pi-calendar-times',
    badge: 'Growth',
    description: 'Quarterly analysis'
  }
])

// Dynamic chart colors based on period
const chartColors = computed(() => {
  switch (selectedChartPeriod.value) {
    case '7D':
      return '#6366f1' // Indigo
    case '30D':
      return '#10b981' // Green
    case '90D':
      return '#8b5cf6' // Purple
    default:
      return '#6366f1'
  }
})

// Metrics data
const metrics = ref({
  totalRevenue: 125000,
  revenueGrowth: 12.5,
  totalOrders: 2847,
  orderGrowth: 8.3,
  totalCustomers: 1243,
  customerGrowth: 15.2,
  averageRating: 4.6,
  ratingGrowth: 2.1
})

// Order statuses
const orderStatuses = ref([
  { name: 'Delivered', count: 2156, percentage: 75.7, color: 'bg-green-500' },
  { name: 'Processing', count: 423, percentage: 14.9, color: 'bg-blue-500' },
  { name: 'Shipped', count: 168, percentage: 5.9, color: 'bg-purple-500' },
  { name: 'Pending', count: 100, percentage: 3.5, color: 'bg-yellow-500' }
])

// Top products
const topProducts = ref([
  {
    id: 1,
    name: 'Wireless Headphones',
    category: 'Electronics',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=100&h=100&fit=crop',
    revenue: '28,450',
    growth: 12.5
  },
  {
    id: 2,
    name: 'Smart Watch',
    category: 'Electronics',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=100&h=100&fit=crop',
    revenue: '22,180',
    growth: 8.7
  },
  {
    id: 3,
    name: 'Running Shoes',
    category: 'Sports',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=100&h=100&fit=crop',
    revenue: '18,920',
    growth: 15.3
  },
  {
    id: 4,
    name: 'Coffee Maker',
    category: 'Home',
    image: 'https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=100&h=100&fit=crop',
    revenue: '15,640',
    growth: 6.2
  },
  {
    id: 5,
    name: 'Yoga Mat',
    category: 'Sports',
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=100&h=100&fit=crop',
    revenue: '12,890',
    growth: 9.8
  }
])

// Customer demographics
const demographics = ref([
  { category: 'Age 18-25', percentage: 28, color: 'bg-blue-500' },
  { category: 'Age 26-35', percentage: 35, color: 'bg-green-500' },
  { category: 'Age 36-45', percentage: 22, color: 'bg-purple-500' },
  { category: 'Age 46+', percentage: 15, color: 'bg-orange-500' }
])

// Recent activity
const recentActivity = ref([
  {
    id: 1,
    message: 'New order #2847 received from John Smith',
    time: new Date(Date.now() - 5 * 60 * 1000), // 5 minutes ago
    icon: 'pi pi-shopping-cart',
    iconBg: 'bg-green-500'
  },
  {
    id: 2,
    message: 'Product "Wireless Headphones" stock updated',
    time: new Date(Date.now() - 15 * 60 * 1000), // 15 minutes ago
    icon: 'pi pi-box',
    iconBg: 'bg-blue-500'
  },
  {
    id: 3,
    message: 'Customer review submitted for Smart Watch',
    time: new Date(Date.now() - 30 * 60 * 1000), // 30 minutes ago
    icon: 'pi pi-star',
    iconBg: 'bg-yellow-500'
  },
  {
    id: 4,
    message: 'Payment processed for order #2846',
    time: new Date(Date.now() - 45 * 60 * 1000), // 45 minutes ago
    icon: 'pi pi-credit-card',
    iconBg: 'bg-purple-500'
  },
  {
    id: 5,
    message: 'New customer registration: Sarah Johnson',
    time: new Date(Date.now() - 60 * 60 * 1000), // 1 hour ago
    icon: 'pi pi-user-plus',
    iconBg: 'bg-indigo-500'
  }
])

// Conversion metrics
const conversionMetrics = ref([
  {
    name: 'Cart to Purchase',
    description: 'Percentage of cart additions that result in purchase',
    rate: 68.5,
    trend: 2.3
  },
  {
    name: 'Browse to Cart',
    description: 'Percentage of visitors who add items to cart',
    rate: 12.8,
    trend: -0.5
  },
  {
    name: 'Email Conversion',
    description: 'Conversion rate from email campaigns',
    rate: 24.2,
    trend: 5.1
  },
  {
    name: 'Mobile Conversion',
    description: 'Purchase rate on mobile devices',
    rate: 45.7,
    trend: 8.9
  }
])

// Top regions
const topRegions = ref([
  {
    name: 'California',
    orders: 456,
    revenue: '32,450',
    growth: 12.5,
    color: 'bg-blue-500'
  },
  {
    name: 'New York',
    orders: 389,
    revenue: '28,920',
    growth: 8.7,
    color: 'bg-green-500'
  },
  {
    name: 'Texas',
    orders: 312,
    revenue: '22,180',
    growth: 15.3,
    color: 'bg-purple-500'
  },
  {
    name: 'Florida',
    orders: 245,
    revenue: '18,640',
    growth: 6.2,
    color: 'bg-orange-500'
  },
  {
    name: 'Illinois',
    orders: 198,
    revenue: '15,890',
    growth: 9.8,
    color: 'bg-indigo-500'
  }
])

// Methods
const formatNumber = (num) => {
  return new Intl.NumberFormat('en-US').format(num)
}

const formatTimeAgo = (date) => {
  const now = new Date()
  const diffInMinutes = Math.floor((now - date) / (1000 * 60))
  
  if (diffInMinutes < 1) return 'Just now'
  if (diffInMinutes < 60) return `${diffInMinutes} minutes ago`
  
  const diffInHours = Math.floor(diffInMinutes / 60)
  if (diffInHours < 24) return `${diffInHours} hours ago`
  
  const diffInDays = Math.floor(diffInHours / 24)
  if (diffInDays < 7) return `${diffInDays} days ago`
  
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric'
  })
}

// Filter data based on user role
const filterDataByRole = () => {
  if (currentUser.value?.role === 'seller') {
    // Limit data for sellers
    topProducts.value = topProducts.value.slice(0, 3)
    topRegions.value = topRegions.value.slice(0, 3)
  } else if (currentUser.value?.role === 'manager') {
    // Limit data for managers
    topProducts.value = topProducts.value.slice(0, 4)
    topRegions.value = topRegions.value.slice(0, 4)
  }
}

onMounted(() => {
  filterDataByRole()
})
</script>

<style scoped>
/* Add any additional styles here */
</style> 