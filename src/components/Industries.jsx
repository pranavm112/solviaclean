// src/components/Industries.jsx
import React from 'react'
import { Building2, Hotel, Store, Building, Hospital, School } from 'lucide-react'

const industries = [
  { icon: Hotel, name: 'Hotels & Resorts' },
  { icon: Store, name: 'Restaurants' },
  { icon: Building, name: 'Offices' },
  { icon: Hospital, name: 'Hospitals' },
  { icon: School, name: 'Schools' },
  { icon: Building2, name: 'Commercial Facilities' },
]

function Industries() {
  return (
    <section className="section-padding bg-[#FAF8F5]" id="industries">
      <div className="container-custom">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="section-title">Who We Supply</h2>
          <p className="section-subtitle mx-auto">
            We provide housekeeping, sanitation and hygiene products to businesses 
            and institutions across sectors
          </p>
        </div>
        
        <div className="mt-10 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {industries.map((industry, index) => {
            const Icon = industry.icon
            return (
              <div
                key={index}
                className="flex flex-col items-center p-6 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors text-center"
              >
                <div className="p-3 bg-[#FAF8F5] rounded-xl shadow-card">
                  <Icon className="h-6 w-6 text-gray-700" />
                </div>
                <span className="mt-3 text-sm font-medium text-gray-800">
                  {industry.name}
                </span>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default Industries