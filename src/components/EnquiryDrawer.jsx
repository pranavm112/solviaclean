// src/components/EnquiryDrawer.jsx
import React, { useState } from 'react'
import { X, Minus, Plus, Trash2, ShoppingCart, Send, MessageCircle } from 'lucide-react'
import { useEnquiry } from '../context/EnquiryContext'
import { products } from '../data/products'
import { getWhatsAppLink, generateEnquiryWhatsAppMessage } from '../utils/whatsapp'

function EnquiryDrawer({ isOpen }) {
  const {
    items,
    removeItem,
    incrementQuantity,
    decrementQuantity,
    clearEnquiry,
    closeDrawer,
    openQuoteModal,
    getUniqueProductCount,
  } = useEnquiry()
  
  const [isSubmitting, setIsSubmitting] = useState(false)
  
  const productMap = products.reduce((acc, p) => {
    acc[p.id] = p
    return acc
  }, {})
  
  const enquiryItems = items
    .map(item => ({
      ...item,
      product: productMap[item.productId],
    }))
    .filter(item => item.product)
  
  const totalProducts = enquiryItems.reduce((sum, item) => sum + item.quantity, 0)
  const uniqueProductCount = getUniqueProductCount()
  
  const handleWhatsApp = () => {
    const message = generateEnquiryWhatsAppMessage(items, productMap)
    window.open(getWhatsAppLink(message), '_blank')
  }
  
  if (!isOpen) return null
  
  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-50 drawer-overlay animate-fade-in"
        onClick={closeDrawer}
        aria-hidden="true"
      />
      
      {/* Drawer */}
      <div className="fixed right-0 top-0 bottom-0 z-50 w-full sm:w-96 bg-white shadow-drawer animate-slide-up flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-100">
          <div className="flex items-center space-x-3">
            <ShoppingCart className="h-5 w-5 text-primary-600" />
            <h2 className="text-lg font-semibold text-gray-900">Your Enquiry</h2>
          </div>
          <button
            onClick={closeDrawer}
            className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 transition-colors"
            aria-label="Close enquiry"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        
        {/* Body */}
        <div className="flex-1 overflow-y-auto p-4">
          {enquiryItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center py-12">
              <div className="p-4 bg-gray-100 rounded-full mb-4">
                <ShoppingCart className="h-10 w-10 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900">Your enquiry is empty</h3>
              <p className="mt-2 text-sm text-gray-500">
                Browse our products and add items to request a quote.
              </p>
              <button
                onClick={closeDrawer}
                className="mt-6 px-6 py-2 bg-primary-600 text-white font-medium rounded-lg hover:bg-primary-700 transition-colors"
              >
                Browse Products
              </button>
            </div>
          ) : (
            <>
              <div className="mb-3 text-sm text-gray-500">
                {uniqueProductCount} product{uniqueProductCount !== 1 ? 's' : ''} selected
                {' · '}
                {totalProducts} unit{totalProducts !== 1 ? 's' : ''}
              </div>
              
              <div className="space-y-4">
                {enquiryItems.map((item) => (
                  <div key={item.productId} className="bg-gray-50 rounded-lg p-3">
                    <div className="flex items-start justify-between">
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-medium text-gray-900 truncate">
                          {item.product.name}
                        </h4>
                        <p className="text-xs text-gray-500">
                          {item.product.category}
                        </p>
                      </div>
                      <button
                        onClick={() => removeItem(item.productId)}
                        className="p-1 text-gray-400 hover:text-red-600 rounded hover:bg-red-50 transition-colors flex-shrink-0"
                        aria-label="Remove item"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                    
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => decrementQuantity(item.productId)}
                          className="p-1 text-gray-600 hover:text-gray-900 rounded border border-gray-300 hover:bg-gray-100 transition-colors"
                          aria-label="Decrease quantity"
                          disabled={item.quantity <= 1}
                        >
                          <Minus className="h-3 w-3" />
                        </button>
                        <span className="w-8 text-center text-sm font-medium text-gray-900">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => incrementQuantity(item.productId)}
                          className="p-1 text-gray-600 hover:text-gray-900 rounded border border-gray-300 hover:bg-gray-100 transition-colors"
                          aria-label="Increase quantity"
                        >
                          <Plus className="h-3 w-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
        
        {/* Footer */}
        {enquiryItems.length > 0 && (
          <div className="p-4 border-t border-gray-100 space-y-3 bg-gray-50">
            <button
              onClick={openQuoteModal}
              className="w-full flex items-center justify-center px-4 py-3 bg-brand-teal text-white font-medium rounded-xl hover:bg-brand-tealLight transition-colors shadow-sm"
            >
              <Send className="mr-2 h-4 w-4" />
              Request Quote for {uniqueProductCount} Product{uniqueProductCount !== 1 ? 's' : ''}
            </button>
            
            <div className="flex items-center gap-3">
              <button
                onClick={handleWhatsApp}
                className="flex-1 flex items-center justify-center px-4 py-2.5 bg-green-600 text-white font-medium rounded-xl hover:bg-green-700 transition-colors text-sm"
              >
                <MessageCircle className="mr-2 h-4 w-4" />
                WhatsApp
              </button>
              <button
                onClick={() => {
                  if (confirm('Are you sure you want to clear your enquiry?')) {
                    clearEnquiry()
                  }
                }}
                className="px-4 py-2.5 text-sm text-gray-500 hover:text-red-600 rounded-xl hover:bg-red-50 transition-colors"
              >
                Clear All
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  )
}

export default EnquiryDrawer