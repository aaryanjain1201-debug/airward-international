import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase-server'

async function checkAdmin(supabase: any) {
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { error: 'Unauthorized', status: 401 }
  const { data: profile } = await supabase.from('profiles').select('role').eq('id', user.id).single()
  if (profile?.role !== 'admin') return { error: 'Forbidden', status: 403 }
  return { user }
}

export async function GET() {
  try {
    const supabase = await createClient()
    const auth = await checkAdmin(supabase)
    if (auth.error) return NextResponse.json({ error: auth.error }, { status: auth.status })

    const { data, error } = await supabase.from('packages').select('*').order('created_at', { ascending: false })
    if (error) throw error
    return NextResponse.json({ packages: data })
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient()
    const auth = await checkAdmin(supabase)
    if (auth.error) return NextResponse.json({ error: auth.error }, { status: auth.status })

    const body = await request.json()
    const { title, description, destination, country, duration, price, originalPrice, category, image, highlights, inclusions, exclusions, featured, bestSeller } = body

    if (!title || !description || !destination || !price) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const { data, error } = await supabase.from('packages').insert({
      title,
      description,
      destination,
      country: country || '',
      duration: duration || 1,
      price,
      original_price: originalPrice || null,
      category: category || 'Beach',
      image: image || '',
      highlights: highlights || [],
      inclusions: inclusions || [],
      exclusions: exclusions || [],
      featured: featured || false,
      best_seller: bestSeller || false,
    }).select().single()

    if (error) throw error
    return NextResponse.json({ package: data }, { status: 201 })
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const supabase = await createClient()
    const auth = await checkAdmin(supabase)
    if (auth.error) return NextResponse.json({ error: auth.error }, { status: auth.status })

    const { id, ...updates } = await request.json()
    if (!id) return NextResponse.json({ error: 'Package ID required' }, { status: 400 })

    const dbUpdates: any = {}
    if (updates.title) dbUpdates.title = updates.title
    if (updates.description) dbUpdates.description = updates.description
    if (updates.destination) dbUpdates.destination = updates.destination
    if (updates.country) dbUpdates.country = updates.country
    if (updates.duration) dbUpdates.duration = updates.duration
    if (updates.price) dbUpdates.price = updates.price
    if (updates.originalPrice !== undefined) dbUpdates.original_price = updates.originalPrice
    if (updates.category) dbUpdates.category = updates.category
    if (updates.image) dbUpdates.image = updates.image
    if (updates.highlights) dbUpdates.highlights = updates.highlights
    if (updates.inclusions) dbUpdates.inclusions = updates.inclusions
    if (updates.exclusions) dbUpdates.exclusions = updates.exclusions
    if (updates.featured !== undefined) dbUpdates.featured = updates.featured
    if (updates.bestSeller !== undefined) dbUpdates.best_seller = updates.bestSeller

    const { data, error } = await supabase.from('packages').update(dbUpdates).eq('id', id).select().single()
    if (error) throw error
    return NextResponse.json({ package: data })
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const supabase = await createClient()
    const auth = await checkAdmin(supabase)
    if (auth.error) return NextResponse.json({ error: auth.error }, { status: auth.status })

    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')
    if (!id) return NextResponse.json({ error: 'Package ID required' }, { status: 400 })

    const { error } = await supabase.from('packages').delete().eq('id', id)
    if (error) throw error
    return NextResponse.json({ message: 'Package deleted' })
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}