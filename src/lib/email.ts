import { Resend } from 'resend'

function getResend() {
  if (!process.env.RESEND_API_KEY) {
    throw new Error('RESEND_API_KEY environment variable is not set')
  }
  return new Resend(process.env.RESEND_API_KEY)
}

export async function sendBookingConfirmation(to: string, name: string, packageTitle: string, date: string, travelers: number, totalPrice: number) {
  try {
    const resend = getResend()
    await resend.emails.send({
      from: 'Airward International <noreply@airwardinternational.com>',
      to,
      subject: `Booking Confirmed - ${packageTitle}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: #006CE4; color: white; padding: 20px; border-radius: 10px 10px 0 0; text-align: center;">
            <h1 style="margin: 0;">✈️ Booking Confirmed!</h1>
          </div>
          <div style="background: #f9fafb; padding: 30px; border: 1px solid #e5e7eb;">
            <p>Hi <strong>${name}</strong>,</p>
            <p>Your booking has been confirmed! Here are the details:</p>
            <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border: 1px solid #e5e7eb;">
              <p><strong>Package:</strong> ${packageTitle}</p>
              <p><strong>Travel Date:</strong> ${date}</p>
              <p><strong>Travelers:</strong> ${travelers}</p>
              <p><strong>Total Paid:</strong> ₹${totalPrice.toLocaleString()}</p>
            </div>
            <p>You can view your booking details in your dashboard.</p>
            <div style="text-align: center; margin: 20px 0;">
              <a href="${process.env.NEXT_PUBLIC_APP_URL}/dashboard" style="background: #006CE4; color: white; padding: 12px 30px; text-decoration: none; border-radius: 8px; font-weight: bold;">View Booking</a>
            </div>
          </div>
          <div style="text-align: center; padding: 20px; color: #6b7280; font-size: 12px;">
            <p>Airward International | Ahmedabad, India</p>
            <p>📞 +91 88664 01355 | ✉️ info@airwardinternational.com</p>
          </div>
        </div>
      `,
    })
  } catch (err) {
    console.error('Email send error:', err)
  }
}

export async function sendContactEmail(name: string, email: string, subject: string, message: string) {
  try {
    const resend = getResend()
    await resend.emails.send({
      from: 'Airward International <noreply@airwardinternational.com>',
      to: 'info@airwardinternational.com',
      subject: `Contact Form: ${subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2>New Contact Form Submission</h2>
          <p><strong>From:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Subject:</strong> ${subject}</p>
          <hr />
          <p><strong>Message:</strong></p>
          <p>${message}</p>
        </div>
      `,
    })
  } catch (err) {
    console.error('Email send error:', err)
  }
}

export async function sendBookingStatusUpdate(to: string, name: string, packageTitle: string, status: string) {
  const statusColors: Record<string, string> = {
    confirmed: '#22c55e',
    cancelled: '#ef4444',
    pending: '#eab308',
    completed: '#3b82f6',
  }
  try {
    const resend = getResend()
    await resend.emails.send({
      from: 'Airward International <noreply@airwardinternational.com>',
      to,
      subject: `Booking ${status.charAt(0).toUpperCase() + status.slice(1)} - ${packageTitle}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: ${statusColors[status] || '#6b7280'}; color: white; padding: 20px; border-radius: 10px 10px 0 0; text-align: center;">
            <h1 style="margin: 0;">Booking ${status.charAt(0).toUpperCase() + status.slice(1)}</h1>
          </div>
          <div style="background: #f9fafb; padding: 30px; border: 1px solid #e5e7eb;">
            <p>Hi <strong>${name}</strong>,</p>
            <p>Your booking for <strong>${packageTitle}</strong> has been <strong>${status}</strong>.</p>
            <div style="text-align: center; margin: 20px 0;">
              <a href="${process.env.NEXT_PUBLIC_APP_URL}/dashboard" style="background: #006CE4; color: white; padding: 12px 30px; text-decoration: none; border-radius: 8px; font-weight: bold;">View Details</a>
            </div>
          </div>
        </div>
      `,
    })
  } catch (err) {
    console.error('Email send error:', err)
  }
}