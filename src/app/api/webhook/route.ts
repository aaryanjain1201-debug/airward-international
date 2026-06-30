import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { createClient } from '@supabase/supabase-js'

function getStripe() {
  return new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: '2024-12-18.acacia' as any })
}

function getSupabaseAdmin() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )
}

export async function POST(request: NextRequest) {
  const stripe = getStripe()
  const supabaseAdmin = getSupabaseAdmin()
  const body = await request.text()
  const sig = request.headers.get('stripe-signature')!

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET!)
  } catch (err: any) {
    console.error('Webhook signature verification failed:', err.message)
    return NextResponse.json({ error: `Webhook Error: ${err.message}` }, { status: 400 })
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session
    const { userId, packageId, travelers, travelDate } = session.metadata || {}

    if (userId && packageId) {
      const { error } = await supabaseAdmin.from('bookings').insert({
        user_id: userId,
        package_id: packageId,
        travelers: parseInt(travelers || '1'),
        travel_date: travelDate,
        total_price: (session.amount_total || 0) / 100,
        status: 'confirmed',
        stripe_session_id: session.id,
      })

      if (error) {
        console.error('Booking creation error:', error)
      }
    }
  }

  return NextResponse.json({ received: true })
}