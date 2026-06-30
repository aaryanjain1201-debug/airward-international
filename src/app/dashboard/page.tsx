'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Calendar, CreditCard, User, Settings, LogOut, Plane, FileText, Download, Users } from 'lucide-react'
import Link from 'next/link'
import { createClient } from '@/lib/supabase-client'

export default function DashboardPage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState('bookings')
  const [user, setUser] = useState<any>(null)
  const [profile, setProfile] = useState<any>(null)
  const [bookings, setBookings] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const supabase = createClient()

    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        router.push('/login')
        return
      }
      setUser(user)

      const { data: profileData } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single()
      setProfile(profileData)

      const { data: bookingData } = await supabase
        .from('bookings')
        .select('*, packages(*)')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
      setBookings(bookingData || [])

      setLoading(false)
    }

    getUser()
  }, [router])

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' })
    router.push('/')
    router.refresh()
  }

  const initials = profile?.full_name
    ? profile.full_name.split(' ').map((n: string) => n[0]).join('').toUpperCase()
    : user?.email?.substring(0, 2).toUpperCase() || 'U'

  if (loading) {
    return <section className="min-h-screen bg-gray-50 flex items-center justify-center"><div className="animate-spin w-8 h-8 border-4 border-mmt-400 border-t-transparent rounded-full" /></section>
  }

  return (
    <section className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200">
        <div className="container-custom py-6">
          <h1 className="text-2xl font-bold text-gray-900">My Account</h1>
        </div>
      </div>
      <div className="container-custom py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <aside className="lg:col-span-1">
            <div className="card p-5 sticky top-24">
              <div className="flex items-center gap-3 mb-5 pb-4 border-b border-gray-100">
                <div className="w-12 h-12 rounded-full bg-mmt-400 text-white flex items-center justify-center font-bold text-lg">{initials}</div>
                <div><h3 className="font-semibold text-gray-900">{profile?.full_name || user?.email}</h3><p className="text-xs text-gray-500">{user?.email}</p></div>
              </div>
              <nav className="space-y-1">
                {[
                  { id: 'bookings', icon: Plane, label: 'My Bookings' },
                  { id: 'documents', icon: FileText, label: 'Documents' },
                  { id: 'profile', icon: User, label: 'Profile' },
                  { id: 'settings', icon: Settings, label: 'Settings' },
                ].map(item => (
                  <button key={item.id} onClick={() => setActiveTab(item.id)} className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${activeTab === item.id ? 'bg-mmt-50 text-mmt-600' : 'text-gray-600 hover:bg-gray-100'}`}>
                    <item.icon className="w-4 h-4" />{item.label}
                  </button>
                ))}
                <hr className="my-2" />
                <button onClick={handleLogout} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-red-500 hover:bg-red-50 transition-colors"><LogOut className="w-4 h-4" />Logout</button>
              </nav>
            </div>
          </aside>

          <main className="lg:col-span-3 space-y-6">
            {activeTab === 'bookings' && (
              <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-4">My Bookings ({bookings.length})</h2>
                {bookings.length === 0 ? (
                  <div className="card p-12 text-center">
                    <Plane className="w-16 h-16 text-gray-200 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">No Bookings Yet</h3>
                    <p className="text-sm text-gray-500 mb-4">Start exploring our packages and book your dream vacation!</p>
                    <Link href="/packages" className="btn-primary text-sm">Browse Packages</Link>
                  </div>
                ) : bookings.map((b: any, i: number) => (
                  <motion.div key={b.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} className="card overflow-hidden mb-4">
                    <div className="p-5">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-xs text-gray-400">#{b.id.substring(0, 8)}</span>
                            <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${b.status === 'confirmed' ? 'bg-green-50 text-green-700' : b.status === 'pending' ? 'bg-yellow-50 text-yellow-700' : 'bg-red-50 text-red-700'}`}>{b.status}</span>
                          </div>
                          <h3 className="font-semibold text-gray-900">{b.packages?.title || 'Travel Package'}</h3>
                          <div className="flex flex-wrap gap-3 mt-1 text-xs text-gray-500">
                            <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" />{b.travel_date}</span>
                            <span className="flex items-center gap-1"><Users className="w-3.5 h-3.5" />{b.travelers} travelers</span>
                          </div>
                        </div>
                        <div className="text-right shrink-0">
                          <div className="text-lg font-bold text-mmt-400">₹{b.total_price?.toLocaleString()}</div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}

            {activeTab === 'documents' && (
              <div className="card p-8 text-center">
                <FileText className="w-16 h-16 text-gray-200 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-1">No Documents Yet</h3>
                <p className="text-sm text-gray-500">Your travel documents will appear here after booking.</p>
              </div>
            )}

            {activeTab === 'profile' && (
              <div className="card p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Profile Information</h2>
                <form className="space-y-4" onSubmit={async (e) => {
                  e.preventDefault()
                  const supabase = createClient()
                  const form = e.target as HTMLFormElement
                  const fullName = (form.elements.namedItem('fullName') as HTMLInputElement).value
                  await supabase.from('profiles').upsert({ id: user.id, full_name: fullName, email: user.email })
                  setProfile({ ...profile, full_name: fullName })
                  alert('Profile updated!')
                }}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div><label className="block text-sm font-medium text-gray-700 mb-1.5">Full Name</label><input name="fullName" type="text" defaultValue={profile?.full_name || ''} className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-mmt-400 outline-none text-sm" /></div>
                    <div><label className="block text-sm font-medium text-gray-700 mb-1.5">Email</label><input type="email" defaultValue={user?.email || ''} disabled className="w-full px-4 py-2.5 border border-gray-100 rounded-lg text-sm bg-gray-50" /></div>
                    <div><label className="block text-sm font-medium text-gray-700 mb-1.5">Phone</label><input type="tel" defaultValue={profile?.phone || ''} className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-mmt-400 outline-none text-sm" /></div>
                  </div>
                  <button type="submit" className="btn-primary text-sm">Save Changes</button>
                </form>
              </div>
            )}

            {activeTab === 'settings' && (
              <div className="card p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Settings</h2>
                <div className="space-y-6">
                  <div><h3 className="font-medium text-gray-900 mb-3">Notifications</h3>
                    <div className="space-y-3">
                      {['Email Notifications', 'SMS Alerts', 'Booking Updates', 'Promotional Offers'].map(item => (
                        <label key={item} className="flex items-center justify-between"><span className="text-sm text-gray-600">{item}</span><input type="checkbox" defaultChecked className="rounded text-mmt-400" /></label>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </main>
        </div>
      </div>
    </section>
  )
}