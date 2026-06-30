import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase-server'

export async function POST() {
  try {
    const supabase = await createClient()
    await supabase.auth.signOut()
    return NextResponse.json({ message: 'Logged out successfully' }, { status: 200 })
  } catch (err) {
    console.error('Logout error:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}