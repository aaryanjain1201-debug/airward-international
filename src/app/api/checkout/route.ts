import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'

function getStripe() {
  return new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: '2024-12-18.acacia' as any })
}

export async function POST(request: NextRequest) {
  try {
    const stripe = getStripe()
    const { packageId, packageTitle, price, travelers, travelDate, userId, email } = await request.json()

    if (!packageId || !price || !travelers || !travelDate) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      customer_email: email || undefined,
      line_items: [
        {
          price_data: {
            currency: 'inr',
            product_data: {
              name: packageTitle || 'Travel Package',
              description: `${travelers} traveler(s) | Date: ${travelDate}`,
              metadata: { packageId },
            },
            unit_amount: Math.round(price * 100),
          },
          quantity: travelers,
        },
      ],
      mode: 'payment',
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/packages/${packageId}`,
      metadata: {
        userId: userId || '',
        packageId,
        travelers: travelers.toString(),
        travelDate,
      },
    })

    return NextResponse.json({ url: session.url })
  } catch (err: any) {
    console.error('Stripe error:', err)
    return NextResponse.json({ error: err.message || 'Payment session creation failed' }, { status: 500 })
  }
}