import { z } from 'zod'

const phoneRegex = /^[+]?[\d\s\-()]{7,20}$/

export const quoteSchema = z.object({
  name: z.string().min(2, 'Full name is required').max(100),
  company: z.string().min(2, 'Company name is required').max(100),
  phone: z
    .string()
    .min(7, 'Phone number is required')
    .regex(phoneRegex, 'Enter a valid phone number'),
  email: z.string().email('Invalid email').optional().or(z.literal('')),
  location: z.string().min(2, 'Delivery location is required').max(200),
  approximateQuantity: z.string().optional(),
  message: z.string().max(1000).optional(),
})

export const quoteWithProductsSchema = quoteSchema.extend({
  products: z
    .array(
      z.object({
        productId: z.string(),
        name: z.string(),
        quantity: z.number().min(1),
      })
    )
    .min(1, 'At least one product is required'),
})

export function validateQuoteForm(data) {
  try {
    const result = quoteSchema.parse(data)
    return { success: true, data: result, errors: null }
  } catch (error) {
    if (error instanceof z.ZodError) {
      const errors = error.errors.reduce((acc, err) => {
        acc[err.path.join('.')] = err.message
        return acc
      }, {})
      return { success: false, data: null, errors }
    }
    return { success: false, data: null, errors: { _form: 'Validation failed' } }
  }
}

export function validateQuoteWithProducts(data) {
  try {
    const result = quoteWithProductsSchema.parse(data)
    return { success: true, data: result, errors: null }
  } catch (error) {
    if (error instanceof z.ZodError) {
      const errors = error.errors.reduce((acc, err) => {
        acc[err.path.join('.')] = err.message
        return acc
      }, {})
      return { success: false, data: null, errors }
    }
    return { success: false, data: null, errors: { _form: 'Validation failed' } }
  }
}