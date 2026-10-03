// src/components/FeaturedProducts.jsx
import React from 'react'
import { Link } from 'react-router-dom'
import ProductCard from './ProductCard'
import { products } from '../data/products'

function FeaturedProducts() {
  const featuredProducts = products.filter(p => p.featured === true).slice(0, 4)
  
  if (featuredProducts.length === 0) return null
  
  return (
    <section className="section-padding bg-gray-50" id="featured">
      <div className="container-custom">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <h2 className="section-title">Featured Products</h2>
            <p className="section-subtitle">
              Popular products from our catalogue — start building your enquiry
            </p>
          </div>
          <Link
            to="/products"
            className="inline-flex items-center text-sm font-medium text-brand-teal hover:text-brand-tealLight transition-colors whitespace-nowrap"
          >
            View all products →
          </Link>
        </div>
        
        <div className="mt-10 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-4">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default FeaturedProducts