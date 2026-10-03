import React from 'react'
import { Search, ArrowRight } from 'lucide-react'
import { useEnquiry } from '../context/EnquiryContext'

function CantFindSection() {
  const { openQuoteModal } = useEnquiry()

  return (
    <section className="py-20 md:py-24 bg-[#F5F1EB]">
      <div className="container-custom">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center justify-center p-3 bg-amber-100 rounded-2xl mb-6">
            <Search className="h-8 w-8 text-amber-600" />
          </div>
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-900">
            Can't Find What You're Looking For?
          </h2>
          <p className="mt-4 text-lg text-gray-600 max-w-xl mx-auto">
            Tell us the product, quantity and location and we'll help you find
            the right solution.
          </p>

          {/* Newly spaced button wrapper */}
          <div className="mt-10">
            <button
              onClick={openQuoteModal}
              className="inline-flex items-center px-8 py-4 bg-brand-teal text-white font-medium rounded-xl hover:bg-brand-tealLight transition-all duration-200 shadow-lg shadow-brand-teal/20 hover:shadow-xl hover:-translate-y-0.5"
            >
              Send an Enquiry
              <ArrowRight className="ml-2 h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default CantFindSection