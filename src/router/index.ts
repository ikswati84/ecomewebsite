import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: { layout: 'website' }
    },
    {
      path: '/products',
      name: 'products',
      component: () => import('../views/ProductsView.vue'),
      meta: { layout: 'website' }
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue'),
      meta: { layout: 'website' }
    },
    {
      path: '/contact',
      name: 'contact',
      component: () => import('../views/ContactView.vue'),
      meta: { layout: 'website' }
    },
    {
      path: '/checkout',
      name: 'checkout',
      component: () => import('../views/CheckoutView.vue'),
      meta: { layout: 'website' }
    },
    {
      path: '/order-success',
      name: 'order-success',
      component: () => import('../views/OrderSuccessView.vue'),
      meta: { layout: 'website' }
    },
    {
      path: '/product/:id',
      name: 'product-details',
      component: () => import('../views/ProductDetailsView.vue'),
      meta: { layout: 'website' }
    },
    {
      path: '/wishlist',
      name: 'wishlist',
      component: () => import('../views/WishlistView.vue'),
      meta: { layout: 'website' }
    },
    {
      path: '/category/:slug',
      name: 'category-shop',
      component: () => import('../views/CategoryShopView.vue'),
      meta: { layout: 'website' }
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue'),
      meta: { layout: 'website' }
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('../views/RegisterView.vue'),
      meta: { layout: 'website' }
    },
    {
      path: '/admin/dashboard',
      name: 'admin-dashboard',
      component: () => import('../views/AdminDashboardView.vue'),
      meta: { layout: 'dashboard' }
    },
    {
      path: '/admin/orders',
      name: 'admin-orders',
      component: () => import('../views/AdminOrdersView.vue'),
      meta: { layout: 'dashboard' }
    },
    {
      path: '/admin/products',
      name: 'admin-products',
      component: () => import('../views/AdminProductsView.vue'),
      meta: { layout: 'dashboard' }
    },
    {
      path: '/admin/categories',
      name: 'admin-categories',
      component: () => import('../views/AdminCategoriesView.vue'),
      meta: { layout: 'dashboard' }
    },
    {
      path: '/admin/customers',
      name: 'admin-customers',
      component: () => import('../views/AdminCustomersView.vue'),
      meta: { layout: 'dashboard' }
    },
    {
      path: '/admin/settings',
      name: 'admin-settings',
      component: () => import('../views/AdminSettingsView.vue'),
      meta: { layout: 'dashboard' }
    },
    {
      path: '/admin/reviews',
      name: 'admin-reviews',
      component: () => import('../views/AdminReviewsView.vue'),
      meta: { layout: 'dashboard' }
    },
    {
      path: '/admin/analytics',
      name: 'admin-analytics',
      component: () => import('../views/AdminAnalyticsView.vue'),
      meta: { layout: 'dashboard' }
    },
  ],
})

// Navigation guard for admin routes
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()
  
  // Check if route requires admin access
  if (to.path.startsWith('/admin')) {
    if (!authStore.canAccessAdmin()) {
      // Redirect to login if not authenticated or not admin
      next('/login')
      return
    }
  }
  
  // Check if user is already logged in and trying to access login page
  if (to.path === '/login' && authStore.isAuthenticated) {
    next('/admin/dashboard')
    return
  }
  
  next()
})

export default router
