<template>
  <div class="w-full h-full">
    <canvas ref="chartCanvas"></canvas>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch, computed } from 'vue'
import { Chart, registerables } from 'chart.js'

Chart.register(...registerables)

const props = defineProps({
  chartData: {
    type: Object,
    default: () => ({
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
  },
  chartType: {
    type: String,
    default: 'line'
  },
  chartOptions: {
    type: Object,
    default: () => ({})
  }
})

const emit = defineEmits(['chartClick', 'chartHover'])

const chartCanvas = ref(null)
let chart = null

// Default chart options
const defaultOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: true,
      position: 'top',
      labels: {
        color: '#6B7280',
        usePointStyle: true,
        padding: 20
      }
    },
    tooltip: {
      mode: 'index',
      intersect: false,
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
      titleColor: '#fff',
      bodyColor: '#fff',
      borderColor: '#3B82F6',
      borderWidth: 1
    }
  },
  scales: {
    x: {
      grid: {
        color: '#E5E7EB',
        drawBorder: false
      },
      ticks: {
        color: '#6B7280'
      }
    },
    y: {
      grid: {
        color: '#E5E7EB',
        drawBorder: false
      },
      ticks: {
        color: '#6B7280',
        callback: function(value) {
          return '$' + value.toLocaleString()
        }
      }
    }
  },
  elements: {
    point: {
      radius: 4,
      hoverRadius: 6
    }
  },
  interaction: {
    mode: 'nearest',
    axis: 'x',
    intersect: false
  },
  onClick: (event, elements) => {
    if (elements.length > 0) {
      const element = elements[0]
      emit('chartClick', {
        datasetIndex: element.datasetIndex,
        index: element.index,
        value: element.raw
      })
    }
  },
  onHover: (event, elements) => {
    emit('chartHover', { event, elements })
  }
}

// Merge default options with custom options
const mergedOptions = computed(() => {
  return {
    ...defaultOptions,
    ...props.chartOptions
  }
})

// Watch for changes in chart data and update the chart
watch(() => props.chartData, (newData) => {
  if (chart) {
    chart.data = newData
    chart.update('active')
  }
}, { deep: true })

// Watch for changes in chart type
watch(() => props.chartType, (newType) => {
  if (chart) {
    chart.destroy()
    createChart()
  }
})

// Watch for changes in chart options
watch(() => props.chartOptions, (newOptions) => {
  if (chart) {
    chart.options = { ...chart.options, ...newOptions }
    chart.update()
  }
}, { deep: true })

const createChart = () => {
  const ctx = chartCanvas.value.getContext('2d')
  chart = new Chart(ctx, {
    type: props.chartType,
    data: props.chartData,
    options: mergedOptions.value
  })
}

onMounted(() => {
  createChart()
})

onUnmounted(() => {
  if (chart) {
    chart.destroy()
  }
})

// Expose chart instance for external access
defineExpose({
  chart: () => chart,
  updateChart: (newData) => {
    if (chart) {
      chart.data = newData
      chart.update('active')
    }
  },
  addDataset: (dataset) => {
    if (chart) {
      chart.data.datasets.push(dataset)
      chart.update('active')
    }
  },
  removeDataset: (index) => {
    if (chart && chart.data.datasets[index]) {
      chart.data.datasets.splice(index, 1)
      chart.update('active')
    }
  }
})
</script> 