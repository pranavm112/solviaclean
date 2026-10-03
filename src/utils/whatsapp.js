const WHATSAPP_CONFIG = {
  number: '919876543210', // ⚠️ CHANGE to your real WhatsApp number
  message: 'Hello, I would like to enquire about your housekeeping and hygiene products.',
}

export function getWhatsAppLink(message = '') {
  const base = `https://wa.me/${WHATSAPP_CONFIG.number}`
  return message ? `${base}?text=${encodeURIComponent(message)}` : `${base}?text=${encodeURIComponent(WHATSAPP_CONFIG.message)}`
}

export function generateEnquiryWhatsAppMessage(products, productMap) {
  if (!products || products.length === 0) return WHATSAPP_CONFIG.message
  let message = 'Hello, I would like a quote for:\n\n'
  products.forEach((item) => {
    const product = productMap[item.productId]
    if (product) message += `• ${product.name} — Qty ${item.quantity}\n`
  })
  message += '\nPlease share pricing and availability.'
  return message
}

export default WHATSAPP_CONFIG