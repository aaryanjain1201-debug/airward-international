'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X } from 'lucide-react'
import Image from 'next/image'
import { createClient } from '@/lib/supabase-client'
import type { User } from '@supabase/supabase-js'

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [user, setUser] = useState<User | null>(null)
  const pathname = usePathname()

  useEffect(() => {
    try {
      if (!process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL === 'your-project-url') return
      const supabase = createClient()
      supabase.auth.getUser().then((res: any) => setUser(res.data.user))
      const { data: { subscription } } = supabase.auth.onAuthStateChange((_event: any, session: any) => {
        setUser(session?.user ?? null)
      })
      return () => subscription.unsubscribe()
    } catch {}
  }, [])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
  }, [pathname])

  const nav = [
    { href: '/', label: 'Home' },
    { href: '/packages', label: 'Packages' },
    { href: '/about', label: 'About' },
    { href: '/contact', label: 'Contact' },
  ]

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out-expo ${
          scrolled
            ? 'bg-white/80 backdrop-blur-xl border-b border-surface-200/50 shadow-elevation-1'
            : 'bg-transparent'
        }`}
      >
        <div className="container-wide h-16 sm:h-18 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5 group">
            <Image src="/logo-icon.svg" alt="Airward International" width={40} height={40} className="transition-all duration-300 group-hover:scale-105" />
            <div className="flex flex-col">
              <span className="text-lg font-bold text-surface-900 leading-tight tracking-tight">Airward</span>
              <span className="text-[9px] font-semibold text-surface-400 uppercase tracking-[0.2em] leading-none">International</span>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  pathname === item.href
                    ? 'text-brand-600 bg-brand-50'
                    : 'text-surface-600 hover:text-surface-900 hover:bg-surface-100'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-3">
            {user ? (
              <Link href="/dashboard" className="btn-primary text-sm">
                Dashboard
              </Link>
            ) : (
              <>
                <Link href="/login" className="btn-ghost text-sm">
                  Sign In
                </Link>
                <Link href="/signup" className="btn-primary text-sm">
                  Get Started
                </Link>
              </>
            )}
          </div>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 rounded-xl hover:bg-surface-100 transition-colors"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </header>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 z-40 md:hidden transition-all duration-300 ${
          mobileOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="absolute inset-0 bg-surface-900/20 backdrop-blur-sm" onClick={() => setMobileOpen(false)} />
        <div
          className={`absolute top-16 left-0 right-0 bg-white/95 backdrop-blur-xl border-b border-surface-200 shadow-elevation-4 transition-all duration-300 ease-out-expo ${
            mobileOpen ? 'translate-y-0 opacity-100' : '-translate-y-4 opacity-0'
          }`}
        >
          <div className="container-wide py-4 flex flex-col gap-1">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                  pathname === item.href
                    ? 'text-brand-600 bg-brand-50'
                    : 'text-surface-600 hover:text-surface-900 hover:bg-surface-50'
                }`}
              >
                {item.label}
              </Link>
            ))}
            <div className="border-t border-surface-100 mt-2 pt-3 flex flex-col gap-2">
              {user ? (
                <Link href="/dashboard" className="btn-primary text-sm justify-center">Dashboard</Link>
              ) : (
                <>
                  <Link href="/login" className="btn-outline text-sm justify-center">Sign In</Link>
                  <Link href="/signup" className="btn-primary text-sm justify-center">Get Started</Link>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}