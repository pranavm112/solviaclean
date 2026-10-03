import React from 'react'
import { Send } from 'lucide-react'
import { useEnquiry } from '../context/EnquiryContext'

function QuoteSection() {
  const { openQuoteModal } = useEnquiry()

  return (
    <section
      id="quote"
      className="relative py-20 md:py-28 overflow-hidden bg-gradient-to-br from-[#0D7C7C] via-[#0f8a8a] to-[#0a6666] text-white"
    >
      {/* Decorative circles */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-white/[0.06] rounded-full -translate-y-1/2 translate-x-1/3 blur-2xl" />
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-white/[0.05] rounded-full translate-y-1/2 -translate-x-1/3 blur-2xl" />

      <div className="container-custom relative text-center max-w-3xl">
        <h2 className="text-3xl md:text-4xl font-semibold">
          Ready to Get a Quote?
        </h2>
        <p className="mt-4 text-lg text-white/85">
          Tell us what you need and we'll get back with pricing and availability.
        </p>
        <button
          onClick={openQuoteModal}
          className="mt-8 inline-flex items-center px-8 py-4 bg-white text-brand-teal font-semibold rounded-xl hover:bg-gray-50 hover:-translate-y-0.5 transition-all duration-200 shadow-xl"
        >
          <Send className="mr-2 h-5 w-5" />
          Get a Quote
        </button>
      </div>
    </section>
  )
}

export default QuoteSection