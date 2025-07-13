<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
    <!-- User Welcome Section -->
    <div class="mb-6 bg-white dark:bg-gray-800 rounded-xl shadow p-6">
      <div class="flex items-center justify-between">
        <div class="flex items-center space-x-4">
          <img
            :src="user?.avatar || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'"
            :alt="user?.name"
            class="w-12 h-12 rounded-full object-cover border-2 border-primary-200 dark:border-primary-700"
          />
          <div>
            <h2 class="text-xl font-semibold text-gray-900 dark:text-white">Welcome back, {{ user?.name }}!</h2>
            <p class="text-gray-600 dark:text-gray-400 capitalize">{{ user?.role }} Dashboard</p>
          </div>
        </div>
        <div class="text-right">
          <p class="text-sm text-gray-500 dark:text-gray-400">Last login</p>
          <p class="text-sm font-medium text-gray-900 dark:text-white">{{ lastLoginTime }}</p>
        </div>
      </div>
    </div>

    <!-- Overview Cards Grid -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4 mb-8">
      <div v-for="card in userOverviewCards" :key="card.label" class="bg-white dark:bg-gray-800 p-6 rounded-xl shadow flex flex-col items-start">
        <div class="flex items-center gap-5 space-x-3 mb-3">
          <span v-html="card.icon" :class="card.color" class="h-14 w-14 p-3 rounded-xl flex items-center justify-center shadow-sm"></span>
          <div class=" flex flex-col" >
          <span class="text-gray-500 dark:text-gray-400 text-sm">{{ card.label }}</span>
          <span class="text-2xl font-bold text-primary-600 mt-2">{{ card.value }}</span>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Middle Section: 2 Columns -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
      <!-- Sales Chart -->
      <div class="bg-white dark:bg-gray-800 p-6 rounded-xl shadow flex flex-col h-80">
        <div class="flex items-center justify-between mb-4">
          <h2 class="text-xl font-semibold text-gray-900 dark:text-white">{{ user?.role === 'admin' ? 'Overall Sales' : 'Your Sales' }} Overview</h2>
          <div class="flex space-x-2">
            <button @click="toggleChartType" class="px-3 py-1 text-xs bg-primary-100 dark:bg-primary-900 text-primary-600 dark:text-primary-400 rounded-lg hover:bg-primary-200 dark:hover:bg-primary-800 transition-colors">
              {{ chartType === 'line' ? 'Bar' : 'Line' }}
            </button>
            <button @click="addRandomData" class="px-3 py-1 text-xs bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-400 rounded-lg hover:bg-green-200 dark:hover:bg-green-800 transition-colors">
              Add Data
            </button>
            <button @click="resetChart" class="px-3 py-1 text-xs bg-red-100 dark:bg-red-900 text-red-600 dark:text-red-400 rounded-lg hover:bg-red-200 dark:hover:bg-red-800 transition-colors">
              Reset
            </button>
          </div>
        </div>
        <div class="flex-1">
          <SalesChart 
            :chart-data="chartData" 
            :chart-type="chartType"
            :chart-options="chartOptions"
            @chart-click="handleChartClick"
            @chart-hover="handleChartHover"
            ref="salesChartRef"
          />
        </div>
      </div>
      <!-- Recent Activity -->
      <div class="bg-white dark:bg-gray-800 p-6 rounded-xl shadow flex flex-col h-80 overflow-y-auto">
        <h2 class="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Recent Activity</h2>
        <ul class="space-y-4">
          <li v-for="activity in userRecentActivity" :key="activity.id" class="flex items-center space-x-3">
            <span v-html="activity.icon" class="flex-shrink-0"></span>
            <div>
              <div class="text-gray-900 dark:text-white font-medium">{{ activity.text }}</div>
              <div class="text-xs text-gray-500 dark:text-gray-400">{{ activity.time }}</div>
            </div>
          </li>
        </ul>
      </div>
    </div>
    
    <!-- Bottom: Top Products Table -->
    <div class="bg-white dark:bg-gray-800 p-6 rounded-xl shadow overflow-x-auto">
      <h2 class="text-xl font-semibold mb-4 text-gray-900 dark:text-white">{{ user?.role === 'admin' ? 'Top Products' : 'Your Top Products' }}</h2>
      <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
        <thead>
          <tr>
            <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Product</th>
            <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Price</th>
            <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Rating</th>
            <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Sales</th>
          </tr>
        </thead>
        <tbody class="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
          <tr v-for="product in userTopProducts" :key="product.id">
            <td class="px-4 py-2 flex items-center space-x-3">
              <img :src="product.image" :alt="product.name" class="w-10 h-10 object-cover rounded-lg" />
              <span class="font-medium text-gray-900 dark:text-white">{{ product.name }}</span>
            </td>
            <td class="px-4 py-2 font-semibold">${{ product.price }}</td>
            <td class="px-4 py-2">
              <span class="flex items-center">
                <svg v-for="i in 5" :key="i" :class="i <= product.rating ? 'text-yellow-400' : 'text-gray-300 dark:text-gray-600'" class="h-4 w-4 inline" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.967a1 1 0 00.95.69h4.178c.969 0 1.371 1.24.588 1.81l-3.385 2.46a1 1 0 00-.364 1.118l1.287 3.966c.3.922-.755 1.688-1.54 1.118l-3.386-2.46a1 1 0 00-1.175 0l-3.386 2.46c-.784.57-1.838-.196-1.539-1.118l1.287-3.966a1 1 0 00-.364-1.118l-3.385-2.46c-.783-.57-.38-1.81.588-1.81h4.178a1 1 0 00.95-.69l1.286-3.967z"/></svg>
              </span>
            </td>
            <td class="px-4 py-2">{{ product.sales }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, onMounted } from 'vue'
import { useAuthStore } from '@/stores/auth'
import SalesChart from '@/components/SalesChart.vue'

const authStore = useAuthStore()
const user = computed(() => authStore.user)
const userData = computed(() => authStore.getUserSpecificData())

const salesChartRef = ref(null)
const chartType = ref('line')
const lastLoginTime = ref('')

// Reactive chart data
const chartData = reactive({
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  datasets: [
    {
      label: 'Sales',
      data: [12000, 19000, 15000, 25000, 22000, 30000, 28000, 35000, 32000, 40000, 38000, 45000],
      borderColor: '#3B82F6',
      backgroundColor: 'rgba(59, 130, 246, 0.1)',
      borderWidth: 2,
      fill: true,
      tension: 0.4
    },
    {
      label: 'Orders',
      data: [800, 1200, 1000, 1500, 1400, 1800, 1600, 2200, 2000, 2500, 2300, 2800],
      borderColor: '#10B981',
      backgroundColor: 'rgba(16, 185, 129, 0.1)',
      borderWidth: 2,
      fill: true,
      tension: 0.4
    }
  ]
})

// Chart options
const chartOptions = reactive({
  plugins: {
    legend: {
      display: true,
      position: 'top'
    }
  }
})

// User-specific overview cards
const userOverviewCards = computed(() => {
  if (!userData.value) return []
  
  const totalSales = userData.value.orders.reduce((sum, order) => sum + order.total, 0)
  const totalOrders = userData.value.orders.length
  const totalProducts = userData.value.products.length
  const totalCategories = userData.value.categories.length
  
  return [
    { 
      label: user.value?.role === 'admin' ? 'Total Sales' : 'Your Sales', 
      value: `$${totalSales.toLocaleString()}`, 
      icon: '<i class="pi pi-chart-line text-2xl"></i>', 
      color: 'bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-900 dark:to-blue-800 text-blue-600 dark:text-blue-400' 
    },
    { 
      label: user.value?.role === 'admin' ? 'Orders' : 'Your Orders', 
      value: totalOrders.toString(), 
      icon: '<i class="pi pi-shopping-cart text-2xl"></i>', 
      color: 'bg-gradient-to-br from-green-100 to-green-200 dark:from-green-900 dark:to-green-800 text-green-600 dark:text-green-400' 
    },
    { 
      label: user.value?.role === 'admin' ? 'Products' : 'Your Products', 
      value: totalProducts.toString(), 
      icon: '<i class="pi pi-box text-2xl"></i>', 
      color: 'bg-gradient-to-br from-orange-100 to-orange-200 dark:from-orange-900 dark:to-orange-800 text-orange-600 dark:text-orange-400' 
    },
    { 
      label: user.value?.role === 'admin' ? 'Categories' : 'Your Categories', 
      value: totalCategories.toString(), 
      icon: '<i class="pi pi-tags text-2xl"></i>', 
      color: 'bg-gradient-to-br from-purple-100 to-purple-200 dark:from-purple-900 dark:to-purple-800 text-purple-600 dark:text-purple-400' 
    },
    { 
      label: 'Pending Orders', 
      value: userData.value.orders.filter(o => o.status === 'pending').length.toString(), 
      icon: '<i class="pi pi-clock text-2xl"></i>', 
      color: 'bg-gradient-to-br from-yellow-100 to-yellow-200 dark:from-yellow-900 dark:to-yellow-800 text-yellow-600 dark:text-yellow-400' 
    },
    { 
      label: 'Active Products', 
      value: userData.value.products.filter(p => p.status === 'active').length.toString(), 
      icon: '<i class="pi pi-check-circle text-2xl"></i>', 
      color: 'bg-gradient-to-br from-emerald-100 to-emerald-200 dark:from-emerald-900 dark:to-emerald-800 text-emerald-600 dark:text-emerald-400' 
    }
  ]
})

// User-specific recent activity
const userRecentActivity = computed(() => {
  if (!userData.value) return []
  
  const recentOrders = userData.value.orders.slice(0, 3)
  const activities = recentOrders.map((order, index) => ({
    id: index + 1,
    text: `Order ${order.orderNumber} placed by ${order.customerName}`,
    time: `${Math.floor(Math.random() * 60)} min ago`,
    icon: '<i class="pi pi-shopping-cart text-primary-600"></i>'
  }))
  
  // Add some additional activities
  activities.push(
    {
      id: activities.length + 1,
      text: `Product "${userData.value.products[0]?.name || 'New Product'}" updated`,
      time: '2 hours ago',
      icon: '<i class="pi pi-box text-yellow-500"></i>'
    },
    {
      id: activities.length + 2,
      text: `Category "${userData.value.categories[0]?.name || 'New Category'}" created`,
      time: '1 day ago',
      icon: '<i class="pi pi-tags text-green-500"></i>'
    }
  )
  
  return activities
})

// User-specific top products
const userTopProducts = computed(() => {
  if (!userData.value) return []
  
  return userData.value.products.slice(0, 5).map((product, index) => ({
    id: product.id,
    name: product.name,
    price: product.price,
    rating: Math.floor(Math.random() * 3) + 3, // Random rating 3-5
    sales: Math.floor(Math.random() * 100) + 10,
    image: `https://images.unsplash.com/photo-${1500000000000 + index}?w=100&h=100&fit=crop`
  }))
})

// Chart control functions
const toggleChartType = () => {
  chartType.value = chartType.value === 'line' ? 'bar' : 'line'
}

const addRandomData = () => {
  const newMonth = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][chartData.labels.length % 12]
  chartData.labels.push(newMonth)
  
  // Add random data
  chartData.datasets[0].data.push(Math.floor(Math.random() * 50000) + 20000)
  chartData.datasets[1].data.push(Math.floor(Math.random() * 3000) + 1000)
}

const resetChart = () => {
  chartData.labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  chartData.datasets[0].data = [12000, 19000, 15000, 25000, 22000, 30000, 28000, 35000, 32000, 40000, 38000, 45000]
  chartData.datasets[1].data = [800, 1200, 1000, 1500, 1400, 1800, 1600, 2200, 2000, 2500, 2300, 2800]
}

const handleChartClick = (data) => {
  console.log('Chart clicked:', data)
  // You can add custom logic here
}

const handleChartHover = (data) => {
  // You can add custom hover logic here
}

onMounted(() => {
  // Set last login time
  lastLoginTime.value = new Date().toLocaleString()
})
</script>

<style scoped>
.hide-scrollbar::-webkit-scrollbar {
  display: none;
}
.hide-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style> 