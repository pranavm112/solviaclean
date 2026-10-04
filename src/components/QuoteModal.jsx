import React, { useState, useEffect } from 'react'
import { X, Send, CheckCircle, AlertCircle, Package } from 'lucide-react'
import { useEnquiry } from '../context/EnquiryContext'
import { products } from '../data/products'
import { validateQuoteWithProducts, validateQuoteForm } from '../utils/validation'

function QuoteModal({ isOpen }) {
  const { items, clearEnquiry, closeQuoteModal, getUniqueProductCount } = useEnquiry()

  const [formData, setFormData] = useState({
    name: '',
    company: '',
    phone: '',
    email: '',
    location: '',
    approximateQuantity: '',
    message: '',
  })
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const productMap = products.reduce((acc, p) => {
    acc[p.id] = p
    return acc
  }, {})

  const enquiryItems = items
    .map((item) => ({ ...item, product: productMap[item.productId] }))
    .filter((item) => item.product)

  const hasProducts = enquiryItems.length > 0
  const uniqueProductCount = getUniqueProductCount()

  useEffect(() => {
    if (!isOpen) {
      setFormData({
        name: '',
        company: '',
        phone: '',
        email: '',
        location: '',
        approximateQuantity: '',
        message: '',
      })
      setErrors({})
      setIsSuccess(false)
      setIsSubmitting(false)
    }
  }, [isOpen])

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') closeQuoteModal()
    }
    if (isOpen) window.addEventListener('keydown', handleEsc)
    return () => window.removeEventListener('keydown', handleEsc)
  }, [isOpen, closeQuoteModal])

  const handleChange = (e) => {
    const { name, value } = e.target
    if (name === 'phone') {
      const cleaned = value.replace(/[^\d+\-()\s]/g, '')
      setFormData((prev) => ({ ...prev, [name]: cleaned }))
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }))
    }
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setErrors({})

    const digits = formData.phone.replace(/\D/g, '')
    if (digits.length < 7) {
      setErrors({ phone: 'Please enter a valid phone number (min 7 digits)' })
      setIsSubmitting(false)
      return
    }

    const data = {
      ...formData,
      products: enquiryItems.map((item) => ({
        productId: item.productId,
        name: item.product.name,
        quantity: item.quantity,
      })),
    }

    const result = hasProducts
      ? validateQuoteWithProducts(data)
      : validateQuoteForm(data)

    if (!result.success) {
      setErrors(result.errors || { _form: 'Please check the form for errors' })
      setIsSubmitting(false)
      return
    }

    try {
      const API_URL = import.meta.env.VITE_API_URL || ''
const response = await fetch(`${API_URL}/api/enquiry`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(result.data),
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(errorData.message || 'Failed to send enquiry')
      }

      setIsSuccess(true)
      clearEnquiry()
      setTimeout(() => {
        closeQuoteModal()
        setIsSuccess(false)
      }, 2500)
    } catch (error) {
      setErrors({
        _form: error.message || 'Something went wrong. Please try again.',
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!isOpen) return null

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm animate-fade-in"
        onClick={closeQuoteModal}
        aria-hidden="true"
      />

      {/* Modal wrapper — centers modal, no scroll on this */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 pointer-events-none">
        {/* Modal card — controls its own scroll */}
        <div
          className="w-full max-w-2xl max-h-[92vh] bg-white rounded-2xl shadow-2xl animate-scale-in flex flex-col pointer-events-auto overflow-hidden"
          role="dialog"
          aria-modal="true"
          aria-labelledby="quote-title"
        >
          {/* ── Sticky Header (inside card, no overlap) ── */}
          <div className="flex items-start justify-between px-5 sm:px-6 py-4 border-b border-gray-100 bg-white flex-shrink-0">
            <div>
              <h2 id="quote-title" className="text-lg sm:text-xl font-semibold text-gray-900 leading-tight">
                {hasProducts ? 'Request a Quote' : 'Get a Quote'}
              </h2>
              <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
                {hasProducts
                  ? `${uniqueProductCount} product${uniqueProductCount !== 1 ? 's' : ''} selected`
                  : "Tell us what you're looking for"}
              </p>
            </div>
            <button
              onClick={closeQuoteModal}
              className="p-1.5 -mr-1 -mt-1 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors flex-shrink-0"
              aria-label="Close"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* ── Scrollable Body ── */}
          <form onSubmit={handleSubmit} className="flex flex-col flex-1 min-h-0">
            <div className="flex-1 overflow-y-auto px-5 sm:px-6 py-5 space-y-5">

              {isSuccess && (
                <div className="flex items-start gap-3 p-4 bg-green-50 text-green-800 rounded-xl border border-green-200">
                  <CheckCircle className="h-5 w-5 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-sm">Enquiry sent successfully!</p>
                    <p className="text-xs text-green-700 mt-0.5">
                      We'll get back to you shortly.
                    </p>
                  </div>
                </div>
              )}

              {errors._form && (
                <div className="flex items-start gap-3 p-4 bg-red-50 text-red-800 rounded-xl border border-red-200">
                  <AlertCircle className="h-5 w-5 flex-shrink-0 mt-0.5" />
                  <span className="text-sm">{errors._form}</span>
                </div>
              )}

              {/* Selected products */}
              {hasProducts && (
                <div className="rounded-xl border border-gray-100 bg-gray-50/60 overflow-hidden">
                  <div className="flex items-center gap-2 px-4 py-2.5 bg-gray-100/60 border-b border-gray-100">
                    <Package className="h-4 w-4 text-gray-500" />
                    <h3 className="text-xs font-semibold text-gray-700 uppercase tracking-wide">
                      Selected Products
                    </h3>
                  </div>
                  <ul className="divide-y divide-gray-100">
                    {enquiryItems.map((item) => (
                      <li
                        key={item.productId}
                        className="flex items-center justify-between px-4 py-2.5 text-sm"
                      >
                        <span className="text-gray-800 truncate pr-3">
                          {item.product.name}
                        </span>
                        <span className="text-gray-500 text-xs font-medium whitespace-nowrap">
                          Qty {item.quantity}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Products Required */}
              {!hasProducts && (
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1.5">
                    Products Required <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="e.g. Floor cleaner 5L, hand wash, disinfectant..."
                    rows={3}
                    className={`w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-teal focus:border-transparent text-sm resize-none ${
                      errors.message ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {errors.message && (
                    <p className="mt-1 text-xs text-red-600">{errors.message}</p>
                  )}
                </div>
              )}

              {/* Contact Details */}
              <div>
                <h3 className="text-sm font-semibold text-gray-700 mb-3">
                  Contact Details
                </h3>

                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Field
                      label="Full Name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Your full name"
                      required
                      error={errors.name}
                    />
                    <Field
                      label="Company / Organization"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      placeholder="Your company name"
                      required
                      error={errors.company}
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Field
                      label="Phone / WhatsApp"
                      name="phone"
                      type="tel"
                      inputMode="tel"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+91 98765 43210"
                      required
                      error={errors.phone}
                    />
                    <Field
                      label="Email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="your@email.com"
                      error={errors.email}
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Field
                      label="Delivery City / Location"
                      name="location"
                      value={formData.location}
                      onChange={handleChange}
                      placeholder="City, state"
                      required
                      error={errors.location}
                    />
                    <Field
                      label="Approximate Quantity"
                      name="approximateQuantity"
                      value={formData.approximateQuantity}
                      onChange={handleChange}
                      placeholder="e.g. 100 units, 50 kg"
                    />
                  </div>

                  {hasProducts && (
                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1.5">
                        Additional Requirements
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Any specific requirements, delivery preferences, etc."
                        rows={3}
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-teal focus:border-transparent text-sm resize-none"
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* ── Sticky Footer (inside card) ── */}
            <div className="flex flex-col-reverse sm:flex-row gap-3 px-5 sm:px-6 py-4 border-t border-gray-100 bg-gray-50/60 flex-shrink-0">
              <button
                type="button"
                onClick={closeQuoteModal}
                className="px-5 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting || isSuccess}
                className="flex-1 flex items-center justify-center px-6 py-2.5 bg-brand-teal text-white font-medium rounded-lg hover:bg-brand-tealLight transition-colors disabled:opacity-60 disabled:cursor-not-allowed text-sm shadow-sm"
              >
                {isSubmitting ? (
                  'Sending...'
                ) : isSuccess ? (
                  <>
                    <CheckCircle className="mr-2 h-4 w-4" />
                    Sent Successfully
                  </>
                ) : (
                  <>
                    <Send className="mr-2 h-4 w-4" />
                    {hasProducts ? 'Send Quote Request' : 'Send Enquiry'}
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

/* Reusable field component */
function Field({ label, name, type = 'text', value, onChange, placeholder, required, error, inputMode }) {
  return (
    <div>
      <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1.5">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        type={type}
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        inputMode={inputMode}
        className={`w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-teal focus:border-transparent text-sm ${
          error ? 'border-red-500' : 'border-gray-300'
        }`}
      />
      {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
    </div>
  )
}

export default QuoteModal