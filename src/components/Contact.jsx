// src/components/Contact.jsx
import React from 'react'
import { Phone, Mail, MapPin, MessageCircle, Clock } from 'lucide-react'
import WHATSAPP_CONFIG from '../utils/whatsapp'

function Contact() {
  return (
    <section className="section-padding bg-[#FAF8F5]" id="contact">
      <div className="container-custom">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="section-title">Get in Touch</h2>
          <p className="section-subtitle mx-auto">
            Have questions or need assistance? Reach out to us through any of the 
            channels below.
          </p>
        </div>
        
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <a
            href={`tel:+${WHATSAPP_CONFIG.number}`}
            className="flex flex-col items-center p-6 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
          >
            <div className="p-3 bg-blue-100 rounded-xl">
              <Phone className="h-6 w-6 text-blue-600" />
            </div>
            <h4 className="mt-4 font-medium text-gray-900">Phone</h4>
            <p className="text-sm text-gray-500">Call us for quick enquiries</p>
          </a>
          
          <a
            href={`https://wa.me/${WHATSAPP_CONFIG.number}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center p-6 bg-green-50 rounded-xl hover:bg-green-100 transition-colors"
          >
            <div className="p-3 bg-green-100 rounded-xl">
              <MessageCircle className="h-6 w-6 text-green-600" />
            </div>
            <h4 className="mt-4 font-medium text-gray-900">WhatsApp</h4>
            <p className="text-sm text-gray-500">Chat with us on WhatsApp</p>
          </a>
          
          <a
            href="mailto:info@cleansupply.example.com"
            className="flex flex-col items-center p-6 bg-red-50 rounded-xl hover:bg-red-100 transition-colors"
          >
            <div className="p-3 bg-red-100 rounded-xl">
              <Mail className="h-6 w-6 text-red-600" />
            </div>
            <h4 className="mt-4 font-medium text-gray-900">Email</h4>
            <p className="text-sm text-gray-500">Send us an email</p>
          </a>
          
          <div className="flex flex-col items-center p-6 bg-gray-50 rounded-xl">
            <div className="p-3 bg-gray-200 rounded-xl">
              <Clock className="h-6 w-6 text-gray-600" />
            </div>
            <h4 className="mt-4 font-medium text-gray-900">Business Hours</h4>
            <p className="text-sm text-gray-500">Mon–Sat, 9:00 AM – 6:00 PM</p>
          </div>
        </div>
        
        {/* Address */}
        <div className="mt-8 p-6 bg-gray-50 rounded-xl max-w-2xl mx-auto">
          <div className="flex items-start justify-center space-x-3">
            <MapPin className="h-5 w-5 text-gray-500 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-gray-600 text-center">
              CleanSupply B2B Services<br />
              Mumbai, Maharashtra, India<br />
              <span className="text-xs text-gray-400">Service area: Mumbai & surrounding regions</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Contact