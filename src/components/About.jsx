import React from 'react'
import { CheckCircle, Package, Truck, Users } from 'lucide-react'

function About() {
  return (
    <section className="py-20 md:py-24 bg-[#F5F1EB]" id="about">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* Left: Text */}
          <div>
            <span className="inline-block px-3 py-1 text-xs font-medium text-brand-teal bg-brand-teal/10 rounded-full">
              About CleanSupply
            </span>
            <h2 className="mt-4 text-3xl md:text-4xl font-semibold text-gray-900 leading-tight">
              Trusted Supplier of Housekeeping &amp; Hygiene Products
            </h2>
            <p className="mt-5 text-base md:text-lg text-gray-600 leading-relaxed">
              CleanSupply is a dedicated B2B supplier of professional housekeeping,
              sanitation and hygiene products. We serve businesses with reliable,
              commercial-grade products.
            </p>
            <p className="mt-3 text-gray-600 leading-relaxed">
              Our product range includes cleaning tools, chemicals, hygiene essentials
              and dispensers — all carefully selected for institutional and
              commercial use.
            </p>

            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3">
              {[
                'Wide product range',
                'Bulk supply available',
                'Commercial-grade quality',
                'Institutional supply',
              ].map((item) => (
                <div key={item} className="flex items-start space-x-2.5">
                  <CheckCircle className="h-5 w-5 text-brand-teal flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-gray-700">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Stats cards (smaller, breathing room) */}
          <div className="grid grid-cols-2 gap-4">
            <StatCard icon={Package} title="20+" label="Essential Products" tone="sky" />
            <StatCard icon={Users} title="B2B" label="Business Supply" tone="teal" />
            <StatCard icon={Truck} title="Bulk" label="Flexible Quantities" tone="green" />
            <StatCard icon={CheckCircle} title="Fast" label="Quote Response" tone="violet" />
          </div>
        </div>
      </div>
    </section>
  )
}

function StatCard({ icon: Icon, title, label, tone }) {
  const tones = {
    sky:    { bg: 'bg-sky-50',    icon: 'text-sky-600',    ring: 'ring-sky-100' },
    teal:   { bg: 'bg-teal-50',   icon: 'text-brand-teal', ring: 'ring-teal-100' },
    green:  { bg: 'bg-green-50',  icon: 'text-green-600',  ring: 'ring-green-100' },
    violet: { bg: 'bg-violet-50', icon: 'text-violet-600', ring: 'ring-violet-100' },
  }[tone]

  return (
    <div className={`${tones.bg} rounded-2xl p-5 flex flex-col items-start`}>
      <div className={`p-2.5 bg-white rounded-xl ring-1 ${tones.ring}`}>
        <Icon className={`h-5 w-5 ${tones.icon}`} />
      </div>
      <div className="mt-3 text-xl font-bold text-gray-900">{title}</div>
      <div className="text-xs text-gray-500 leading-tight">{label}</div>
    </div>
  )
}

export default About