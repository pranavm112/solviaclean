// src/components/Catalogue.jsx
import React from 'react'
import { Download, FileText, ArrowRight } from 'lucide-react'

function Catalogue() {
  return (
    <section className="py-20 md:py-24 bg-white" id="catalogue">
      <div className="container-custom">
        <div className="max-w-4xl mx-auto">
          <div className="text-center">
            <div className="inline-flex items-center justify-center p-3 bg-primary-100 rounded-2xl mb-6">
              <FileText className="h-8 w-8 text-primary-600" />
            </div>
            <h2 className="section-title">Product Catalogue 2026</h2>
            <p className="section-subtitle mx-auto">
              Download our complete product catalogue containing the full range of housekeeping, 
              sanitation and hygiene products with detailed specifications and pack sizes.
            </p>
          </div>
          
          <div className="mt-10 bg-white rounded-2xl shadow-card border border-gray-100 p-8 md:p-12">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex items-start space-x-4">
                <div className="p-3 bg-primary-50 rounded-xl flex-shrink-0">
                  <FileText className="h-8 w-8 text-primary-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    Complete Product Range
                  </h3>
                  <p className="text-sm text-gray-500 mt-1">
                    PDF • 4.2 MB • Updated January 2026
                  </p>
                  <ul className="mt-3 space-y-1 text-sm text-gray-600">
                    <li>• Full product specifications</li>
                    <li>• Pack sizes and variants</li>
                    <li>• Bulk pricing information</li>
                  </ul>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
                <a
                  href="/catalogue/product-catalogue-2026.pdf"
                  download
                  className="inline-flex items-center justify-center px-6 py-3 bg-brand-teal text-white font-medium rounded-xl hover:bg-brand-tealLight transition-colors shadow-sm"
                >
                  <Download className="mr-2 h-5 w-5" />
                  Download Catalogue
                </a>
                <a
                  href="#quote"
                  className="inline-flex items-center justify-center px-6 py-3 bg-[#FAF8F5] text-gray-700 font-medium rounded-xl border border-gray-300 hover:bg-gray-50 transition-colors"
                >
                  Bulk Pricing?
                  <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </div>
            </div>
          </div>
          
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-500">
              Looking for bulk pricing or custom requirements?{' '}
              <a href="#quote" className="text-brand-teal font-medium hover:underline">
                Get a quote
              </a>
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Catalogue