import React from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { Phone, Mail, MapPin, MessageCircle } from 'lucide-react'
import WHATSAPP_CONFIG from '../utils/whatsapp'

function Footer() {
  const currentYear = new Date().getFullYear()
  const navigate = useNavigate()
  const location = useLocation()
  const isHome = location.pathname === '/'

  // Smooth-scroll to a section on home, or navigate home then scroll
  const goToSection = (sectionId) => (e) => {
    e.preventDefault()
    if (isHome) {
      document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    } else {
      navigate('/')
      setTimeout(() => {
        document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }, 150)
    }
  }

  const goToCategory = (categoryKey) => {
    navigate(`/products?category=${categoryKey}`)
    setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 50)
  }

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container-custom py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <h3 className="text-xl font-bold text-white">CleanSupply</h3>
            <p className="mt-2 text-sm text-gray-400">
              Housekeeping, Sanitation & Hygiene Supplies for Businesses
            </p>
            <div className="mt-4 flex space-x-4">
              <a
                href={`https://wa.me/${WHATSAPP_CONFIG.number}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="WhatsApp"
              >
                <MessageCircle className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider">
              Quick Links
            </h4>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <Link
                  to="/"
                  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                  className="hover:text-white transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/products"
                  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                  className="hover:text-white transition-colors"
                >
                  Products
                </Link>
              </li>
              <li>
                <button
                  onClick={goToSection('catalogue')}
                  className="hover:text-white transition-colors text-left"
                >
                  Catalogue
                </button>
              </li>
              <li>
                <button
                  onClick={goToSection('about')}
                  className="hover:text-white transition-colors text-left"
                >
                  About Us
                </button>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider">
              Categories
            </h4>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <button onClick={() => goToCategory('housekeeping')} className="hover:text-white transition-colors text-left">
                  Housekeeping
                </button>
              </li>
              <li>
                <button onClick={() => goToCategory('cleaning-chemicals')} className="hover:text-white transition-colors text-left">
                  Cleaning Chemicals
                </button>
              </li>
              <li>
                <button onClick={() => goToCategory('hygiene-products')} className="hover:text-white transition-colors text-left">
                  Hygiene Products
                </button>
              </li>
              <li>
                <button onClick={() => goToCategory('dispensers-accessories')} className="hover:text-white transition-colors text-left">
                  Dispensers &amp; Accessories
                </button>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider">
              Contact
            </h4>
            <ul className="mt-4 space-y-3 text-sm">
              <li className="flex items-start space-x-3">
                <Phone className="h-4 w-4 text-gray-500 flex-shrink-0 mt-0.5" />
                <span>+91 {WHATSAPP_CONFIG.number}</span>
              </li>
              <li className="flex items-start space-x-3">
                <Mail className="h-4 w-4 text-gray-500 flex-shrink-0 mt-0.5" />
                <span>info@cleansupply.example.com</span>
              </li>
              <li className="flex items-start space-x-3">
                <MapPin className="h-4 w-4 text-gray-500 flex-shrink-0 mt-0.5" />
                <span>Mumbai, Maharashtra, India</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-800 flex flex-col sm:flex-row justify-between items-center text-xs text-gray-500">
          <p>&copy; {currentYear} CleanSupply. All rights reserved.</p>
          <p className="mt-2 sm:mt-0">B2B Housekeeping &amp; Hygiene Supply</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer