import { createClient } from '@/lib/supabase-server'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const supabase = await createClient()
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')
  const redirect = searchParams.get('redirect') || '/dashboard'

  if (code) {
    const { error } = await supabase.auth.exchangeCodeForSession(code)
    if (!error) {
      const { data: { user } } = await supabase.auth.getUser()
      if (user) {
        const { data: profile } = await supabase.from('profiles').select('id').eq('id', user.id).single()
        if (!profile) {
          const fullName = user.user_metadata?.full_name || user.user_metadata?.name || ''
          await supabase.from('profiles').insert({
            id: user.id,
            full_name: fullName,
            email: user.email,
            phone: user.user_metadata?.phone || '',
            role: 'user',
          })
        }
      }
      return NextResponse.redirect(`${origin}${redirect}`)
    }
  }

  return NextResponse.redirect(`${origin}/login?error=Could+not+authenticate`)
}