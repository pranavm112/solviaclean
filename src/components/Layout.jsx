import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'
import Footer from './Footer'
import EnquiryDrawer from './EnquiryDrawer'
import QuoteModal from './QuoteModal'
import WhatsAppButton from './WhatsAppButton'
import { useEnquiry } from '../context/EnquiryContext'

function Layout() {
  const { isDrawerOpen, isQuoteModalOpen } = useEnquiry()

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      {/* pt-16 offsets the fixed navbar (~64px) */}
      <main className="flex-grow pt-14">
        <Outlet />
      </main>
      <Footer />
      <EnquiryDrawer isOpen={isDrawerOpen} />
      <QuoteModal isOpen={isQuoteModalOpen} />
      <WhatsAppButton />
    </div>
  )
}

export default Layout