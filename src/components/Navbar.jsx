import React, { useState, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { Menu, X, ShoppingCart } from 'lucide-react'
import { useEnquiry } from '../context/EnquiryContext'

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()
  const { getUniqueProductCount, toggleDrawer, items } = useEnquiry()

  const itemCount = getUniqueProductCount()
  const hasItems = items.length > 0
  const isHome = location.pathname === '/'

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Smooth scroll to section (only on home page)
  const handleSectionLink = (e, sectionId) => {
    e.preventDefault()
    setIsMenuOpen(false)

    if (!isHome) {
      // Navigate home first, then scroll
      navigate('/')
      setTimeout(() => {
        const el = document.getElementById(sectionId)
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }, 150)
    } else {
      const el = document.getElementById(sectionId)
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-100'
          : 'bg-white/80 backdrop-blur-md border-b border-gray-100/60'
      }`}
    >
      <nav className="container-custom py-2.5">
        <div className="flex items-center justify-between">

          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 flex-shrink-0">
            <span className="text-xl font-bold text-brand-teal">CleanSupply</span>
            <span className="hidden sm:inline text-xs text-gray-400 font-light">|</span>
            <span className="hidden sm:inline text-[11px] text-gray-500 font-light tracking-wide">
              B2B Hygiene
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center space-x-1">
            <Link
              to="/"
              className="px-3 py-1.5 text-sm font-medium text-gray-700 hover:text-brand-teal rounded-lg hover:bg-gray-50 transition-colors"
            >
              Home
            </Link>
            <Link
              to="/products"
              className="px-3 py-1.5 text-sm font-medium text-gray-700 hover:text-brand-teal rounded-lg hover:bg-gray-50 transition-colors"
            >
              Products
            </Link>
            <button
              onClick={(e) => handleSectionLink(e, 'catalogue')}
              className="px-3 py-1.5 text-sm font-medium text-gray-700 hover:text-brand-teal rounded-lg hover:bg-gray-50 transition-colors"
            >
              Catalogue
            </button>
            <button
              onClick={(e) => handleSectionLink(e, 'about')}
              className="px-3 py-1.5 text-sm font-medium text-gray-700 hover:text-brand-teal rounded-lg hover:bg-gray-50 transition-colors"
            >
              About
            </button>
            <button
              onClick={(e) => handleSectionLink(e, 'contact')}
              className="px-3 py-1.5 text-sm font-medium text-gray-700 hover:text-brand-teal rounded-lg hover:bg-gray-50 transition-colors"
            >
              Contact
            </button>
          </div>

          {/* Desktop actions */}
          <div className="hidden lg:flex items-center space-x-2.5">
            <button
              onClick={toggleDrawer}
              className={`relative flex items-center space-x-1.5 px-3.5 py-1.5 text-sm font-medium rounded-lg transition-colors ${
                hasItems
                  ? 'bg-primary-50 text-primary-700 hover:bg-primary-100'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <ShoppingCart className="h-4 w-4" />
              <span>Enquiry</span>
              {hasItems && (
                <span className="ml-1 bg-primary-600 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </button>

            <button
              onClick={(e) => handleSectionLink(e, 'quote')}
              className="px-4 py-1.5 bg-brand-teal text-white text-sm font-medium rounded-lg hover:bg-brand-tealLight transition-colors shadow-sm"
            >
              Get a Quote
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center space-x-2 lg:hidden">
            <button
              onClick={toggleDrawer}
              className={`relative p-1.5 rounded-lg transition-colors ${
                hasItems ? 'text-primary-600' : 'text-gray-600'
              }`}
              aria-label="Enquiry"
            >
              <ShoppingCart className="h-5 w-5" />
              {hasItems && (
                <span className="absolute -top-1 -right-1 bg-primary-600 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </button>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-1.5 text-gray-600 hover:text-gray-900 rounded-lg hover:bg-gray-100 transition-colors"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile nav */}
        {isMenuOpen && (
          <div className="lg:hidden mt-2 pt-2 border-t border-gray-100 animate-slide-down">
            <div className="flex flex-col space-y-0.5">
              <Link to="/" onClick={() => setIsMenuOpen(false)} className="px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg">
                Home
              </Link>
              <Link to="/products" onClick={() => setIsMenuOpen(false)} className="px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg">
                Products
              </Link>
              <button onClick={(e) => handleSectionLink(e, 'catalogue')} className="text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg">
                Catalogue
              </button>
              <button onClick={(e) => handleSectionLink(e, 'about')} className="text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg">
                About
              </button>
              <button onClick={(e) => handleSectionLink(e, 'contact')} className="text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg">
                Contact
              </button>
              <button
                onClick={(e) => handleSectionLink(e, 'quote')}
                className="mt-1 px-3 py-2 bg-brand-teal text-white text-sm text-center font-medium rounded-lg hover:bg-brand-tealLight transition-colors"
              >
                Get a Quote
              </button>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}

export default Navbar