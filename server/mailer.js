import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function sendEnquiryEmail(enquiry) {
  const {
    id,
    name,
    company,
    phone,
    email,
    location,
    approximateQuantity,
    message,
    products,
    source,
    receivedAt,
  } = enquiry

  const subject = `New Enquiry — ${name} (${company})`

  const productsHtml =
    products && products.length
      ? `
      <h3 style="margin:24px 0 8px;color:#0f766e;">Selected Products</h3>
      <table style="width:100%;border-collapse:collapse;font-size:14px;">
        <thead>
          <tr style="background:#f5f1eb;">
            <th style="text-align:left;padding:8px;border:1px solid #e5e7eb;">Product</th>
            <th style="text-align:right;padding:8px;border:1px solid #e5e7eb;width:80px;">Qty</th>
          </tr>
        </thead>
        <tbody>
          ${products
            .map(
              (p) => `
            <tr>
              <td style="padding:8px;border:1px solid #e5e7eb;">${escapeHtml(p.name)}</td>
              <td style="padding:8px;border:1px solid #e5e7eb;text-align:right;">${p.quantity}</td>
            </tr>`
            )
            .join('')}
        </tbody>
      </table>
    `
      : `
      <h3 style="margin:24px 0 8px;color:#0f766e;">Requirements</h3>
      <p style="padding:12px;background:#f5f1eb;border-radius:8px;font-size:14px;">${escapeHtml(message || '—')}</p>
    `

  const html = `
    <div style="font-family:-apple-system,Segoe UI,Roboto,sans-serif;max-width:600px;margin:0 auto;padding:24px;color:#111827;">
      <div style="border-left:4px solid #0d7c7c;padding-left:12px;margin-bottom:24px;">
        <h1 style="margin:0;font-size:20px;color:#0d7c7c;">New Enquiry</h1>
        <p style="margin:4px 0 0;color:#6b7280;font-size:13px;">
          Received ${new Date(receivedAt).toLocaleString()} · Ref ${id}
        </p>
      </div>

      <h3 style="margin:24px 0 8px;color:#0f766e;">Customer Details</h3>
      <table style="width:100%;font-size:14px;border-collapse:collapse;">
        <tr><td style="padding:6px 0;color:#6b7280;width:140px;">Name</td><td style="padding:6px 0;"><strong>${escapeHtml(name)}</strong></td></tr>
        <tr><td style="padding:6px 0;color:#6b7280;">Company</td><td style="padding:6px 0;">${escapeHtml(company)}</td></tr>
        <tr><td style="padding:6px 0;color:#6b7280;">Phone</td><td style="padding:6px 0;"><a href="tel:${escapeHtml(phone)}" style="color:#0d7c7c;">${escapeHtml(phone)}</a></td></tr>
        <tr><td style="padding:6px 0;color:#6b7280;">Email</td><td style="padding:6px 0;">${email ? `<a href="mailto:${escapeHtml(email)}" style="color:#0d7c7c;">${escapeHtml(email)}</a>` : '<span style="color:#9ca3af;">—</span>'}</td></tr>
        <tr><td style="padding:6px 0;color:#6b7280;">Location</td><td style="padding:6px 0;">${escapeHtml(location)}</td></tr>
        ${approximateQuantity ? `<tr><td style="padding:6px 0;color:#6b7280;">Approx. Qty</td><td style="padding:6px 0;">${escapeHtml(approximateQuantity)}</td></tr>` : ''}
        <tr><td style="padding:6px 0;color:#6b7280;">Source</td><td style="padding:6px 0;">${source === 'product-based' ? 'Product catalogue' : 'Direct enquiry'}</td></tr>
      </table>

      ${productsHtml}

      <div style="margin-top:32px;padding-top:16px;border-top:1px solid #e5e7eb;font-size:12px;color:#9ca3af;">
        Sent from CleanSupply website
      </div>
    </div>
  `

  const { data, error } = await resend.emails.send({
    from: `CleanSupply Enquiries <${process.env.FROM_EMAIL}>`,
    to: process.env.BUSINESS_EMAIL,
    replyTo: email || undefined,
    subject,
    html,
  })

  if (error) {
    console.error('Resend error:', error)
    throw new Error(error.message || 'Failed to send email')
  }

  return data
}

function escapeHtml(str = '') {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}