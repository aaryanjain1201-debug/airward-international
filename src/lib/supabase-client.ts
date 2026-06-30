'use client'

import { createBrowserClient } from '@supabase/ssr'

let client: ReturnType<typeof createBrowserClient> | null = null

export function createClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!url || !key || url === 'your-project-url' || key === 'your-anon-key') {
    return new Proxy({} as any, {
      get: (_, prop) => {
        if (prop === 'auth') return { getUser: async () => ({ data: { user: null } }), onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } }) }
        if (prop === 'from') return () => ({ select: () => ({ eq: () => ({ single: async () => ({ data: null, error: null }) }) }) })
        return () => ({})
      }
    })
  }

  if (!client) {
    client = createBrowserClient(url, key)
  }
  return client
}