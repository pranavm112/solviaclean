// src/components/ProductListing.jsx
import React, { useState, useEffect, useMemo } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import ProductCard from './ProductCard'
import { products } from '../data/products'
import { Search, X } from 'lucide-react'

const categoryMap = {
  'housekeeping': 'Housekeeping',
  'cleaning-chemicals': 'Cleaning Chemicals',
  'hygiene-products': 'Hygiene Products',
  'dispensers-accessories': 'Dispensers & Accessories',
}

const categoryOptions = [
  { value: '', label: 'All Categories' },
  { value: 'housekeeping', label: 'Housekeeping' },
  { value: 'cleaning-chemicals', label: 'Cleaning Chemicals' },
  { value: 'hygiene-products', label: 'Hygiene Products' },
  { value: 'dispensers-accessories', label: 'Dispensers & Accessories' },
]

function ProductListing() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')
  
  // Sync with URL params
  useEffect(() => {
    const categoryParam = searchParams.get('category') || ''
    const searchParam = searchParams.get('search') || ''
    
    // Find matching category key
    const matchedCategory = Object.keys(categoryMap).find(
      key => categoryMap[key] === categoryParam || key === categoryParam
    ) || ''
    
    setSelectedCategory(matchedCategory)
    setSearchQuery(searchParam)
  }, [searchParams])
  
  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      // Category filter
      if (selectedCategory) {
        const categoryName = categoryMap[selectedCategory]
        if (product.category !== categoryName) return false
      }
      
      // Search filter
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim()
        const matchName = product.name.toLowerCase().includes(query)
        const matchDesc = product.description.toLowerCase().includes(query)
        const matchCategory = product.category.toLowerCase().includes(query)
        if (!matchName && !matchDesc && !matchCategory) return false
      }
      
      return true
    })
  }, [selectedCategory, searchQuery])
  
  const handleCategoryChange = (e) => {
    const value = e.target.value
    setSelectedCategory(value)
    const params = new URLSearchParams(searchParams)
    if (value) {
      params.set('category', categoryMap[value] || value)
    } else {
      params.delete('category')
    }
    setSearchParams(params)
  }
  
  const handleSearchSubmit = (e) => {
    e.preventDefault()
    const params = new URLSearchParams(searchParams)
    if (searchQuery.trim()) {
      params.set('search', searchQuery.trim())
    } else {
      params.delete('search')
    }
    setSearchParams(params)
  }
  
  const clearSearch = () => {
    setSearchQuery('')
    const params = new URLSearchParams(searchParams)
    params.delete('search')
    setSearchParams(params)
  }
  
  const clearFilters = () => {
    setSearchQuery('')
    setSelectedCategory('')
    setSearchParams({})
  }
  
  const hasFilters = searchQuery || selectedCategory
  
  return (
    <section className="py-10 md:py-12 bg-white">
      <div className="container-custom">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-semibold text-gray-900">
              Our Products
            </h1>
            <p className="mt-2 text-gray-600">
              {filteredProducts.length} products available
            </p>
          </div>
          
          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-3">
            <form onSubmit={handleSearchSubmit} className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products..."
                className="w-full sm:w-56 px-4 py-2.5 pr-10 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={clearSearch}
                  className="absolute right-10 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
              <button
                type="submit"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <Search className="h-4 w-4" />
              </button>
            </form>
            
            <select
              value={selectedCategory}
              onChange={handleCategoryChange}
              className="px-4 py-2.5 text-sm border border-gray-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              {categoryOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            
            {hasFilters && (
              <button
                onClick={clearFilters}
                className="px-4 py-2.5 text-sm text-gray-600 hover:text-gray-900 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Clear Filters
              </button>
            )}
          </div>
        </div>
        
        {filteredProducts.length === 0 ? (
          <div className="mt-16 text-center py-16">
            <p className="text-lg text-gray-600">No products match your search criteria.</p>
            <button
              onClick={clearFilters}
              className="mt-4 inline-flex items-center px-6 py-3 bg-primary-600 text-white font-medium rounded-lg hover:bg-primary-700 transition-colors"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="mt-8 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

export default ProductListing