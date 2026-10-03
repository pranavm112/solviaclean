import React, { useState } from 'react'
import { Plus, Check } from 'lucide-react'
import { useEnquiry } from '../context/EnquiryContext'

function ProductCard({ product }) {
  const { addItem, items } = useEnquiry()
  const [justAdded, setJustAdded] = useState(false)
  const isInEnquiry = items.some(item => item.productId === product.id)

  const handleAddToEnquiry = () => {
    addItem(product.id, 1)
    setJustAdded(true)
    setTimeout(() => setJustAdded(false), 1500)
  }

  return (
    <div className="group bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden flex flex-col h-full">

      {/* Image — smaller aspect ratio */}
      <div className="relative aspect-[4/3] bg-gray-50 overflow-hidden">
        <img
          src={product.image || '/images/placeholder-product.jpg'}
          alt={product.name}
          onError={(e) => { e.target.src = '/images/placeholder-product.jpg' }}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
          loading="lazy"
        />
        {product.featured && (
          <span className="absolute top-2.5 left-2.5 px-2 py-0.5 bg-primary-600 text-white text-[10px] font-semibold uppercase tracking-wider rounded">
            Featured
          </span>
        )}
      </div>

      {/* Content — tighter padding */}
      <div className="flex-1 p-4 flex flex-col">
        <div className="text-[10px] font-semibold text-primary-600 uppercase tracking-wider">
          {product.category}
        </div>

        <h3 className="mt-1.5 text-[15px] font-semibold text-gray-900 line-clamp-2 leading-snug">
          {product.name}
        </h3>

        <p className="mt-1.5 text-xs text-gray-500 line-clamp-2 flex-1 leading-relaxed">
          {product.description}
        </p>

        {product.specifications?.length > 0 && (
          <div className="mt-2.5 flex flex-wrap gap-1">
            {product.specifications.slice(0, 3).map((spec, i) => (
              <span
                key={i}
                className="px-1.5 py-0.5 bg-gray-50 border border-gray-100 text-gray-600 text-[10px] rounded"
              >
                {spec}
              </span>
            ))}
          </div>
        )}

        {/* Add to Enquiry */}
        <button
          onClick={handleAddToEnquiry}
          disabled={isInEnquiry}
          className={`mt-3 w-full flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-medium rounded-lg transition-all ${
            isInEnquiry
              ? 'bg-green-50 text-green-700 cursor-default border border-green-100'
              : 'bg-gray-900 text-white hover:bg-gray-800'
          }`}
        >
          {isInEnquiry ? (
            <>
              <Check className="h-3.5 w-3.5" />
              <span>Added to Enquiry</span>
            </>
          ) : (
            <>
              <Plus className="h-3.5 w-3.5" />
              <span>Add to Enquiry</span>
            </>
          )}
        </button>
      </div>
    </div>
  )
}

export default ProductCard