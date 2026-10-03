import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Package, Users, ShieldCheck } from 'lucide-react'
import { useEnquiry } from '../context/EnquiryContext'



function Hero() {
  const { openQuoteModal } = useEnquiry()
  return (
    <section className="relative pt-10 pb-16 md:pt-16 md:pb-24 overflow-hidden">
      {/* Warm gradient background */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-[#FAF8F5] via-[#F5F1EB] to-[#FAF8F5]" />

      {/* Animated floating blobs */}
      <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-10 -right-20 w-[420px] h-[420px] rounded-full bg-brand-teal/[0.07] blur-3xl animate-float" />
        <div className="absolute -bottom-20 -left-20 w-[380px] h-[380px] rounded-full bg-amber-200/25 blur-3xl animate-float-reverse" />
        <div className="absolute top-1/3 left-1/2 w-[300px] h-[300px] rounded-full bg-primary-200/20 blur-3xl animate-float" style={{ animationDelay: '2s' }} />
      </div>

      {/* Fine grid pattern with soft fade */}
      <div
        className="absolute inset-0 -z-10 opacity-[0.04]"
        style={{
          backgroundImage:
            'linear-gradient(to right, #1a1a1a 1px, transparent 1px), linear-gradient(to bottom, #1a1a1a 1px, transparent 1px)',
          backgroundSize: '48px 48px',
          maskImage: 'radial-gradient(ellipse at 30% 40%, black 30%, transparent 75%)',
          WebkitMaskImage: 'radial-gradient(ellipse at 30% 40%, black 30%, transparent 75%)',
        }}
      />

      <div className="container-custom relative">
        <div className="max-w-3xl">

          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 mb-6 bg-white/80 backdrop-blur-sm border border-[#EBE6DE] rounded-full shadow-sm animate-fade-up">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full rounded-full bg-brand-teal opacity-75 animate-ping" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-brand-teal" />
            </span>
            <span className="text-xs font-medium text-gray-700 tracking-wide">
              B2B Supply — Bulk &amp; Institutional
            </span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-[3.75rem] font-bold text-gray-900 leading-[1.05] tracking-tight animate-fade-up-delay-1">
            Housekeeping, Sanitation &amp;{' '}
            <span className="relative inline-block">
              <span className="relative z-10 text-brand-teal">Hygiene Supplies</span>
              <span className="absolute left-0 -bottom-1 h-3 w-full bg-brand-teal/[0.12] rounded-full -z-0" />
            </span>{' '}
            for Businesses
          </h1>

          {/* Subheading */}
          <p className="mt-5 text-lg md:text-xl text-gray-600 leading-relaxed max-w-2xl animate-fade-up-delay-2">
            Commercial-grade cleaning products, sanitation solutions and hygiene
            essentials for hotels, restaurants, offices, hospitals and institutions.
            Bulk supply available.
          </p>

          {/* CTAs */}
          <div className="mt-8 flex flex-wrap gap-3 animate-fade-up-delay-3">
            <button
  onClick={openQuoteModal}
  className="inline-flex items-center px-7 py-3.5 bg-white text-gray-800 font-medium rounded-xl border border-[#EBE6DE] shadow-sm hover:border-gray-300 hover:-translate-y-0.5 hover:shadow-md transition-all duration-200"
>
  Get a Quote
</button>
          </div>

          {/* Feature pills */}
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-2xl animate-fade-up-delay-4">
            <FeaturePill icon={Package} title="Wide Product Range" subtitle="20+ essential products" />
            <FeaturePill icon={Users} title="Bulk Supply" subtitle="For businesses & institutions" />
            <FeaturePill icon={ShieldCheck} title="Quality Products" subtitle="Commercial-grade standards" />
          </div>
        </div>
      </div>
    </section>
  )
}

function FeaturePill({ icon: Icon, title, subtitle }) {
  return (
    <div className="flex items-start gap-3 px-4 py-3 bg-white/70 backdrop-blur-sm border border-[#EBE6DE] rounded-xl shadow-sm hover:shadow-md hover:bg-white transition-all duration-200">
      <div className="flex-shrink-0 p-2 bg-brand-teal/10 rounded-lg">
        <Icon className="h-4 w-4 text-brand-teal" />
      </div>
      <div className="min-w-0">
        <div className="text-sm font-semibold text-gray-900 truncate">{title}</div>
        <div className="text-xs text-gray-500 truncate">{subtitle}</div>
      </div>
    </div>
  )
}

export default Hero