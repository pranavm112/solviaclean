import React from 'react'
import { Link } from 'react-router-dom'
import { Sparkles, Droplet, Heart, Settings } from 'lucide-react'

const categories = [
  {
    id: 'housekeeping',
    name: 'Housekeeping',
    icon: Sparkles,
    description: 'Mops, buckets, brushes and cleaning tools',
    color: 'bg-blue-50 text-blue-600',
  },
  {
    id: 'cleaning-chemicals',
    name: 'Cleaning Chemicals',
    icon: Droplet,
    description: 'Floor cleaners, disinfectants, degreasers',
    color: 'bg-green-50 text-green-600',
  },
  {
    id: 'hygiene-products',
    name: 'Hygiene Products',
    icon: Heart,
    description: 'Tissues, hand wash, sanitizers, bags',
    color: 'bg-pink-50 text-pink-600',
  },
  {
    id: 'dispensers-accessories',
    name: 'Dispensers & Accessories',
    icon: Settings,
    description: 'Soap, sanitizer & tissue dispensers',
    color: 'bg-purple-50 text-purple-600',
  },
]

function ProductCategories() {
  return (
    <section className="py-16 md:py-20 bg-[#FAF8F5]" id="categories">
      <div className="container-custom">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-semibold text-gray-900">
            Browse by Category
          </h2>
          <p className="mt-3 text-base text-gray-600">
            Find the right products for your business from our comprehensive range
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {categories.map((category) => {
            const Icon = category.icon
            return (
              <Link
                key={category.id}
                to={`/products?category=${encodeURIComponent(category.id)}`}
                className="group relative p-6 bg-white rounded-2xl border border-[#EBE6DE] shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
              >
                <div className={`inline-flex p-3 rounded-xl ${category.color} transition-transform group-hover:scale-110 duration-300`}>
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="mt-4 text-base font-semibold text-gray-900 group-hover:text-brand-teal transition-colors leading-snug">
                  {category.name}
                </h3>
                <p className="mt-1.5 text-sm text-gray-500 leading-relaxed">
                  {category.description}
                </p>
                <div className="mt-4 flex items-center text-xs font-medium text-brand-teal opacity-0 group-hover:opacity-100 transition-opacity">
                  Browse Products
                  <span className="ml-1 transition-transform group-hover:translate-x-1">→</span>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default ProductCategories