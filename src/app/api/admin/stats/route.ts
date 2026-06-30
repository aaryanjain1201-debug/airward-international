import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase-server'

export async function GET() {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const { data: profile } = await supabase.from('profiles').select('role').eq('id', user.id).single()
    if (profile?.role !== 'admin') return NextResponse.json({ error: 'Forbidden' }, { status: 403 })

    const [packagesRes, bookingsRes, usersRes] = await Promise.all([
      supabase.from('packages').select('id', { count: 'exact', head: true }),
      supabase.from('bookings').select('*'),
      supabase.from('profiles').select('id', { count: 'exact', head: true }),
    ])

    const bookings = bookingsRes.data || []
    const totalRevenue = bookings.filter(b => b.status === 'confirmed').reduce((sum, b) => sum + (b.total_price || 0), 0)
    const pendingBookings = bookings.filter(b => b.status === 'pending').length
    const confirmedBookings = bookings.filter(b => b.status === 'confirmed').length

    return NextResponse.json({
      stats: {
        totalPackages: packagesRes.count || 0,
        totalBookings: bookings.length,
        totalUsers: usersRes.count || 0,
        totalRevenue,
        pendingBookings,
        confirmedBookings,
      },
      recentBookings: bookings.slice(0, 10),
    })
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}