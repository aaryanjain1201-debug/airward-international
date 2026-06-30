import type { Booking, Review } from '@/types'

/**
 * Local-first data store.
 *
 * Why: Airward must work the moment it's deployed — with ZERO external accounts,
 * API keys, or cost. This store persists user-specific data (bookings, wishlist,
 * profile, reviews) in the browser via localStorage.
 *
 * When the owner is ready for multi-device sync, add Supabase credentials to
 * .env.local — the existing `src/lib/supabase-*` clients and API routes take
 * over automatically; no UI changes needed.
 *
 * All storage keys are namespaced under `airward:` to avoid collisions.
 */

const KEYS = {
  bookings: 'airward:bookings',
  wishlist: 'airward:wishlist',
  profile: 'airward:profile',
  reviews: 'airward:reviews',
} as const

function isClient(): boolean {
  return typeof window !== 'undefined'
}

function read<T>(key: string, fallback: T): T {
  if (!isClient()) return fallback
  try {
    const raw = window.localStorage.getItem(key)
    return raw ? (JSON.parse(raw) as T) : fallback
  } catch {
    return fallback
  }
}

function write<T>(key: string, value: T): void {
  if (!isClient()) return
  try {
    window.localStorage.setItem(key, JSON.stringify(value))
    // Notify same-tab listeners that data changed.
    window.dispatchEvent(new CustomEvent('airward:changed', { detail: { key } }))
  } catch {
    /* storage full or unavailable — non-fatal */
  }
}

function uid(prefix = 'id'): string {
  return `${prefix}_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`
}

/* ----------------------------- Bookings ----------------------------- */

export function getBookings(userId: string | null): Booking[] {
  const all = read<Booking[]>(KEYS.bookings, [])
  if (!userId) return all
  return all.filter((b) => b.userId === userId)
}

export function addBooking(
  booking: Omit<Booking, 'id' | 'createdAt' | 'status'> & { status?: Booking['status'] }
): Booking {
  const all = read<Booking[]>(KEYS.bookings, [])
  const newBooking: Booking = {
    ...booking,
    id: uid('bk'),
    status: booking.status ?? 'confirmed',
    createdAt: new Date().toISOString(),
  }
  write(KEYS.bookings, [newBooking, ...all])
  return newBooking
}

export function updateBookingStatus(id: string, status: Booking['status']): Booking | null {
  const all = read<Booking[]>(KEYS.bookings, [])
  const next = all.map((b) => (b.id === id ? { ...b, status } : b))
  write(KEYS.bookings, next)
  return next.find((b) => b.id === id) ?? null
}

export function deleteBooking(id: string): void {
  const all = read<Booking[]>(KEYS.bookings, [])
  write(
    KEYS.bookings,
    all.filter((b) => b.id !== id)
  )
}

/* ----------------------------- Wishlist ----------------------------- */

export function getWishlist(): string[] {
  return read<string[]>(KEYS.wishlist, [])
}

export function toggleWishlist(packageId: string): string[] {
  const current = getWishlist()
  const next = current.includes(packageId)
    ? current.filter((id) => id !== packageId)
    : [...current, packageId]
  write(KEYS.wishlist, next)
  return next
}

export function inWishlist(packageId: string): boolean {
  return getWishlist().includes(packageId)
}

/* ----------------------------- Profile ----------------------------- */

export interface LocalProfile {
  name: string
  email: string
  phone: string
  avatar: string
}

export function getProfile(): LocalProfile | null {
  return read<LocalProfile | null>(KEYS.profile, null)
}

export function saveProfile(profile: Partial<LocalProfile>): LocalProfile {
  const current = getProfile() ?? { name: '', email: '', phone: '', avatar: '' }
  const next = { ...current, ...profile }
  write(KEYS.profile, next)
  return next
}

/* ----------------------------- Reviews ------------------------------ */

export function getReviews(packageId: string): Review[] {
  const all = read<Review[]>(KEYS.reviews, [])
  return all.filter((r) => r.packageId === packageId)
}

export function addReview(
  review: Omit<Review, 'id' | 'createdAt'>
): Review {
  const all = read<Review[]>(KEYS.reviews, [])
  const newReview: Review = {
    ...review,
    id: uid('rv'),
    createdAt: new Date().toISOString(),
  }
  write(KEYS.reviews, [newReview, ...all])
  return newReview
}

/* --------------------------- Subscription --------------------------- */
/* Stored so the newsletter form actually does something locally. */

export function subscribeEmail(email: string): void {
  const list = read<string[]>('airward:subscribers', [])
  if (!list.includes(email)) {
    write('airward:subscribers', [...list, email])
  }
}

/* ----------------------------- Utility ------------------------------ */

/** Subscribe to any store change (for live UI updates). */
export function onStoreChange(callback: () => void): () => void {
  if (!isClient()) return () => {}
  const handler = () => callback()
  window.addEventListener('airward:changed', handler)
  window.addEventListener('storage', handler)
  return () => {
    window.removeEventListener('airward:changed', handler)
    window.removeEventListener('storage', handler)
  }
}
