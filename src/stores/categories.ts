import { defineStore } from 'pinia'
import { ref } from 'vue'

export interface Category {
  id: number
  name: string
  slug: string
  description: string
  image: string
  productCount: number
}

export interface CategoryProduct {
  id: number
  name: string
  description: string
  price: number
  originalPrice?: number
  image: string
  rating: number
  reviews: number
  categoryId: number
}

export const useCategoriesStore = defineStore('categories', () => {
  const categories = ref<Category[]>([
    {
      id: 1,
      name: "Electronics",
      slug: "electronics",
      description: "Latest gadgets and electronic devices",
      image: "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=400&h=400&fit=crop",
      productCount: 45
    },
    {
      id: 2,
      name: "Fashion",
      slug: "fashion",
      description: "Trendy clothing and accessories",
      image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=400&fit=crop",
      productCount: 78
    },
    {
      id: 3,
      name: "Home & Garden",
      slug: "home-garden",
      description: "Everything for your home and garden",
      image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=400&fit=crop",
      productCount: 32
    },
    {
      id: 4,
      name: "Sports & Outdoors",
      slug: "sports-outdoors",
      description: "Sports equipment and outdoor gear",
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=400&fit=crop",
      productCount: 56
    },
    {
      id: 5,
      name: "Books & Media",
      slug: "books-media",
      description: "Books, movies, and digital media",
      image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=400&fit=crop",
      productCount: 89
    },
    {
      id: 6,
      name: "Health & Beauty",
      slug: "health-beauty",
      description: "Health products and beauty essentials",
      image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&h=400&fit=crop",
      productCount: 67
    },
    {
      id: 7,
      name: "Toys & Games",
      slug: "toys-games",
      description: "Fun toys and entertaining games",
      image: "https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?w=400&h=400&fit=crop",
      productCount: 43
    },
    {
      id: 8,
      name: "Automotive",
      slug: "automotive",
      description: "Car parts and automotive accessories",
      image: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=400&h=400&fit=crop",
      productCount: 34
    }
  ])

  const categoryProducts = ref<CategoryProduct[]>([
    // Electronics
    {
      id: 1,
      name: "Premium Wireless Headphones",
      description: "High-quality wireless headphones with noise cancellation",
      price: 299.99,
      originalPrice: 399.99,
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop",
      rating: 4.8,
      reviews: 128,
      categoryId: 1
    },
    {
      id: 2,
      name: "Smart Fitness Watch",
      description: "Advanced fitness tracking with heart rate monitoring",
      price: 199.99,
      image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop",
      rating: 4.5,
      reviews: 89,
      categoryId: 1
    },
    {
      id: 3,
      name: "Wireless Bluetooth Speaker",
      description: "Portable speaker with 360-degree sound",
      price: 89.99,
      image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&h=400&fit=crop",
      rating: 4.3,
      reviews: 156,
      categoryId: 1
    },
    // Fashion
    {
      id: 4,
      name: "Designer Leather Bag",
      description: "Handcrafted leather bag with premium materials",
      price: 159.99,
      originalPrice: 199.99,
      image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400&h=400&fit=crop",
      rating: 4.7,
      reviews: 67,
      categoryId: 2
    },
    {
      id: 5,
      name: "Premium Cotton T-Shirt",
      description: "Comfortable and stylish cotton t-shirt",
      price: 29.99,
      image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop",
      rating: 4.2,
      reviews: 234,
      categoryId: 2
    },
    {
      id: 6,
      name: "Classic Denim Jeans",
      description: "Timeless denim jeans with perfect fit",
      price: 79.99,
      image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&h=400&fit=crop",
      rating: 4.6,
      reviews: 189,
      categoryId: 2
    },
    // Home & Garden
    {
      id: 7,
      name: "Modern Coffee Table",
      description: "Elegant coffee table for your living room",
      price: 299.99,
      image: "https://images.unsplash.com/photo-1532372320572-cda25653a5d4?w=400&h=400&fit=crop",
      rating: 4.4,
      reviews: 45,
      categoryId: 3
    },
    {
      id: 8,
      name: "Garden Plant Pot Set",
      description: "Beautiful ceramic plant pots for your garden",
      price: 49.99,
      image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&h=400&fit=crop",
      rating: 4.1,
      reviews: 78,
      categoryId: 3
    },
    // Sports & Outdoors
    {
      id: 9,
      name: "Professional Tennis Racket",
      description: "High-performance tennis racket for professionals",
      price: 129.99,
      image: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400&h=400&fit=crop",
      rating: 4.8,
      reviews: 92,
      categoryId: 4
    },
    {
      id: 10,
      name: "Hiking Backpack",
      description: "Durable backpack for outdoor adventures",
      price: 89.99,
      image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop",
      rating: 4.5,
      reviews: 156,
      categoryId: 4
    }
  ])

  const getCategoryBySlug = (slug: string) => {
    return categories.value.find(category => category.slug === slug)
  }

  const getProductsByCategory = (categoryId: number) => {
    return categoryProducts.value.filter(product => product.categoryId === categoryId)
  }

  const getProductsByCategorySlug = (slug: string) => {
    const category = getCategoryBySlug(slug)
    if (category) {
      return getProductsByCategory(category.id)
    }
    return []
  }

  return {
    categories,
    categoryProducts,
    getCategoryBySlug,
    getProductsByCategory,
    getProductsByCategorySlug
  }
}) 