// src/components/WhatsAppButton.jsx
import React from 'react'
import { MessageCircle } from 'lucide-react'
import { getWhatsAppLink } from '../utils/whatsapp'

function WhatsAppButton() {
  return (
    <a
      href={getWhatsAppLink()}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-40 flex items-center justify-center w-14 h-14 bg-green-500 text-white rounded-full shadow-lg hover:bg-green-600 transition-colors hover:scale-105 duration-200"
      aria-label="Contact us on WhatsApp"
    >
      <MessageCircle className="h-7 w-7" />
    </a>
  )
}

export default WhatsAppButton