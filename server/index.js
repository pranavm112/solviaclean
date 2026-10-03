import express from 'express'
import cors from 'cors'
import rateLimit from 'express-rate-limit'
import 'dotenv/config'
import { sendEnquiryEmail } from './mailer.js'

const app = express()
const PORT = process.env.PORT || 5000

// ─── Middleware ───────────────────────────────
app.use(
  cors({
    origin: process.env.ALLOWED_ORIGIN?.split(',') || 'http://localhost:3000',
    credentials: true,
  })
)
app.use(express.json({ limit: '100kb' }))

// Rate limit — 10 submissions per 15 min per IP
const enquiryLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: { message: 'Too many enquiries. Please try again later.' },
})

// ─── Simple validation ────────────────────────
function validateEnquiry(body) {
  const errors = []
  const { name, company, phone, location, products, message } = body

  if (!name || name.trim().length < 2) errors.push('Name is required')
  if (!company || company.trim().length < 2) errors.push('Company is required')
  if (!phone || phone.replace(/\D/g, '').length < 7) errors.push('Valid phone is required')
  if (!location || location.trim().length < 2) errors.push('Location is required')

  const hasProducts = Array.isArray(products) && products.length > 0
  if (!hasProducts && (!message || message.trim().length < 3)) {
    errors.push('Please select products or describe what you need')
  }

  if (body.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.email)) {
    errors.push('Invalid email format')
  }

  return errors
}

// ─── Routes ──────────────────────────────────
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', time: new Date().toISOString() })
})

app.post('/api/enquiry', enquiryLimiter, async (req, res) => {
  try {
    // Honeypot check
    if (req.body.website) {
      console.warn('Honeypot triggered — bot detected')
      return res.status(201).json({ message: 'Received' }) // pretend success
    }

    const errors = validateEnquiry(req.body)
    if (errors.length) {
      return res.status(400).json({ message: errors[0], errors })
    }

    const enquiry = {
      id: `ENQ-${Date.now().toString(36).toUpperCase()}`,
      name: req.body.name.trim(),
      company: req.body.company.trim(),
      phone: req.body.phone.trim(),
      email: req.body.email?.trim() || '',
      location: req.body.location.trim(),
      approximateQuantity: req.body.approximateQuantity?.trim() || '',
      message: req.body.message?.trim() || '',
      products: Array.isArray(req.body.products) ? req.body.products : [],
      source: req.body.products?.length ? 'product-based' : 'direct',
      receivedAt: new Date().toISOString(),
    }

    console.log('📥 New enquiry:', enquiry.id, '—', enquiry.name, '—', enquiry.company)

    await sendEnquiryEmail(enquiry)

    console.log('✅ Email sent for', enquiry.id)

    res.status(201).json({
      message: 'Enquiry received. We will contact you shortly.',
      id: enquiry.id,
    })
  } catch (error) {
    console.error('❌ Enquiry failed:', error)
    res.status(500).json({
      message: 'Something went wrong. Please try again or contact us directly.',
    })
  }
})

app.listen(PORT, () => {
  console.log(`✅ API running on http://localhost:${PORT}`)
})