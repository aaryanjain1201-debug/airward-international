'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Package, Users, CreditCard, TrendingUp, Plus, Edit, Trash2, Search, X, Eye, Bell, Settings, LogOut, Loader2 } from 'lucide-react'
import { createClient } from '@/lib/supabase-client'
import { useRouter } from 'next/navigation'

export default function AdminPage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState('dashboard')
  const [searchTerm, setSearchTerm] = useState('')
  const [stats, setStats] = useState<any>(null)
  const [dbPackages, setDbPackages] = useState<any[]>([])
  const [bookings, setBookings] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [editingPkg, setEditingPkg] = useState<any>(null)
  const [pkgForm, setPkgForm] = useState({ title: '', description: '', destination: '', country: '', duration: 3, price: 0, originalPrice: 0, category: 'Beach', image: '', featured: false, bestSeller: false })

  useEffect(() => {
    const supabase = createClient()
    const init = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) { router.push('/login'); return }

      const { data: profile } = await supabase.from('profiles').select('role').eq('id', user.id).single()
      if (profile?.role !== 'admin') { router.push('/dashboard'); return }

      await loadData()
    }
    init()
  }, [router])

  const loadData = async () => {
    setLoading(true)
    try {
      const [statsRes, pkgRes, bookingRes] = await Promise.all([
        fetch('/api/admin/stats'),
        fetch('/api/admin/packages'),
        fetch('/api/bookings?all=true'),
      ])
      const statsData = await statsRes.json()
      const pkgData = await pkgRes.json()
      const bookingData = await bookingRes.json()
      setStats(statsData.stats)
      setDbPackages(pkgData.packages || [])
      setBookings(bookingData.bookings || [])
    } catch (err) { console.error(err) }
    setLoading(false)
  }

  const handleSavePackage = async () => {
    try {
      const method = editingPkg ? 'PUT' : 'POST'
      const body = editingPkg ? { id: editingPkg.id, ...pkgForm } : pkgForm
      await fetch('/api/admin/packages', { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) })
      setShowModal(false)
      setEditingPkg(null)
      resetForm()
      await loadData()
    } catch (err) { alert('Error saving package') }
  }

  const handleDeletePackage = async (id: string) => {
    if (!confirm('Are you sure you want to delete this package?')) return
    await fetch(`/api/admin/packages?id=${id}`, { method: 'DELETE' })
    await loadData()
  }

  const handleUpdateBookingStatus = async (id: string, status: string) => {
    await fetch('/api/bookings', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id, status }) })
    await loadData()
  }

  const resetForm = () => setPkgForm({ title: '', description: '', destination: '', country: '', duration: 3, price: 0, originalPrice: 0, category: 'Beach', image: '', featured: false, bestSeller: false })

  const openEditModal = (pkg: any) => {
    setEditingPkg(pkg)
    setPkgForm({ title: pkg.title, description: pkg.description, destination: pkg.destination, country: pkg.country || '', duration: pkg.duration || 3, price: pkg.price, originalPrice: pkg.original_price || 0, category: pkg.category || 'Beach', image: pkg.image || '', featured: pkg.featured || false, bestSeller: pkg.best_seller || false })
    setShowModal(true)
  }

  const handleLogout = async () => { await fetch('/api/auth/logout', { method: 'POST' }); router.push('/') }

  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: TrendingUp },
    { id: 'packages', label: 'Packages', icon: Package },
    { id: 'bookings', label: 'Bookings', icon: CreditCard },
    { id: 'settings', label: 'Settings', icon: Settings },
  ]

  if (loading) return <div className="min-h-screen bg-gray-50 flex items-center justify-center"><Loader2 className="w-8 h-8 animate-spin text-mmt-400" /></div>

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200">
        <div className="container-custom py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h1 className="text-xl font-bold text-gray-900">Admin Panel</h1>
            <span className="text-xs bg-mmt-50 text-mmt-600 px-2 py-0.5 rounded-full font-medium">v2.0</span>
          </div>
          <div className="flex items-center gap-3">
            <button className="relative p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg"><Bell className="w-5 h-5" /><span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" /></button>
            <button onClick={handleLogout} className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg"><LogOut className="w-5 h-5" /></button>
          </div>
        </div>
      </div>

      <div className="container-custom py-6">
        <div className="flex flex-col lg:flex-row gap-6">
          <aside className="lg:w-56 shrink-0">
            <nav className="card p-2 lg:sticky lg:top-24">
              {tabs.map(tab => (
                <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${activeTab === tab.id ? 'bg-mmt-400 text-white' : 'text-gray-600 hover:bg-gray-100'}`}>
                  <tab.icon className="w-4 h-4" />{tab.label}
                </button>
              ))}
            </nav>
          </aside>

          <main className="flex-1 min-w-0">
            {activeTab === 'dashboard' && stats && (
              <div>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                  {[
                    { icon: Package, label: 'Total Packages', value: stats.totalPackages, color: 'bg-blue-500' },
                    { icon: Users, label: 'Total Users', value: stats.totalUsers, color: 'bg-green-500' },
                    { icon: CreditCard, label: 'Revenue', value: `₹${stats.totalRevenue.toLocaleString()}`, color: 'bg-purple-500' },
                    { icon: TrendingUp, label: 'Confirmed', value: stats.confirmedBookings, color: 'bg-orange-500' },
                  ].map((stat, i) => (
                    <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} className="card p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div className={`w-10 h-10 ${stat.color} rounded-xl flex items-center justify-center`}><stat.icon className="w-5 h-5 text-white" /></div>
                      </div>
                      <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                      <div className="text-xs text-gray-500">{stat.label}</div>
                    </motion.div>
                  ))}
                </div>

                <div className="card p-5">
                  <h2 className="font-semibold text-gray-900 mb-4">Recent Bookings</h2>
                  {bookings.length === 0 ? (
                    <p className="text-gray-500 text-sm">No bookings yet.</p>
                  ) : (
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead><tr className="border-b border-gray-100"><th className="text-left py-3 px-2 text-gray-500 font-medium">ID</th><th className="text-left py-3 px-2 text-gray-500 font-medium">Package</th><th className="text-left py-3 px-2 text-gray-500 font-medium">Date</th><th className="text-right py-3 px-2 text-gray-500 font-medium">Amount</th><th className="text-center py-3 px-2 text-gray-500 font-medium">Status</th></tr></thead>
                        <tbody>{bookings.slice(0, 5).map((b: any) => (
                          <tr key={b.id} className="border-b border-gray-50"><td className="py-3 px-2 text-gray-400 text-xs">{b.id.substring(0, 8)}</td><td className="py-3 px-2 font-medium text-gray-900">{b.packages?.title || 'Package'}</td><td className="py-3 px-2 text-gray-500">{b.travel_date}</td><td className="py-3 px-2 text-right font-medium">₹{b.total_price?.toLocaleString()}</td><td className="py-3 px-2 text-center"><span className={`px-2 py-0.5 rounded-full text-xs font-medium ${b.status === 'confirmed' ? 'bg-green-50 text-green-700' : b.status === 'pending' ? 'bg-yellow-50 text-yellow-700' : 'bg-red-50 text-red-700'}`}>{b.status}</span></td></tr>
                        ))}</tbody>
                      </table>
                    </div>
                  )}
                </div>
              </div>
            )}

            {activeTab === 'packages' && (
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="font-semibold text-gray-900">Manage Packages</h2>
                  <button onClick={() => { resetForm(); setEditingPkg(null); setShowModal(true) }} className="btn-primary text-sm flex items-center gap-2"><Plus className="w-4 h-4" /> Add Package</button>
                </div>
                <div className="card overflow-hidden">
                  <div className="p-4 border-b border-gray-100">
                    <div className="relative max-w-xs"><Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" /><input type="text" placeholder="Search..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="w-full pl-9 pr-4 py-2 bg-gray-50 rounded-lg border-0 focus:ring-2 focus:ring-mmt-400 outline-none text-sm" /></div>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead><tr className="border-b border-gray-100 bg-gray-50"><th className="text-left py-3 px-4 text-gray-500 font-medium">Package</th><th className="text-left py-3 px-4 text-gray-500 font-medium">Destination</th><th className="text-right py-3 px-4 text-gray-500 font-medium">Price</th><th className="text-center py-3 px-4 text-gray-500 font-medium">Actions</th></tr></thead>
                      <tbody>{dbPackages.filter(p => p.title?.toLowerCase().includes(searchTerm.toLowerCase())).map(pkg => (
                        <tr key={pkg.id} className="border-b border-gray-50 hover:bg-gray-50">
                          <td className="py-3 px-4 font-medium text-gray-900">{pkg.title}</td>
                          <td className="py-3 px-4 text-gray-600">{pkg.destination}</td>
                          <td className="py-3 px-4 text-right font-semibold text-mmt-400">₹{pkg.price?.toLocaleString()}</td>
                          <td className="py-3 px-4"><div className="flex items-center justify-center gap-1">
                            <button onClick={() => openEditModal(pkg)} className="p-1.5 text-gray-400 hover:text-green-600 rounded-lg hover:bg-green-50"><Edit className="w-4 h-4" /></button>
                            <button onClick={() => handleDeletePackage(pkg.id)} className="p-1.5 text-gray-400 hover:text-red-600 rounded-lg hover:bg-red-50"><Trash2 className="w-4 h-4" /></button>
                          </div></td>
                        </tr>
                      ))}</tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'bookings' && (
              <div className="card p-6">
                <h2 className="font-semibold text-gray-900 mb-4">All Bookings</h2>
                {bookings.length === 0 ? <p className="text-gray-500 text-sm">No bookings yet.</p> : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead><tr className="border-b border-gray-100"><th className="text-left py-3 text-gray-500 font-medium">ID</th><th className="text-left py-3 text-gray-500 font-medium">Package</th><th className="text-left py-3 text-gray-500 font-medium">Date</th><th className="text-right py-3 text-gray-500 font-medium">Amount</th><th className="text-center py-3 text-gray-500 font-medium">Status</th><th className="text-center py-3 text-gray-500 font-medium">Actions</th></tr></thead>
                      <tbody>{bookings.map((b: any) => (
                        <tr key={b.id} className="border-b border-gray-50">
                          <td className="py-3 text-gray-400 text-xs">{b.id.substring(0, 8)}</td>
                          <td className="py-3 text-gray-600">{b.packages?.title || 'Package'}</td>
                          <td className="py-3 text-gray-500">{b.travel_date}</td>
                          <td className="py-3 text-right font-medium">₹{b.total_price?.toLocaleString()}</td>
                          <td className="py-3 text-center"><span className={`px-2 py-0.5 rounded-full text-xs font-medium ${b.status === 'confirmed' ? 'bg-green-50 text-green-700' : b.status === 'pending' ? 'bg-yellow-50 text-yellow-700' : 'bg-red-50 text-red-700'}`}>{b.status}</span></td>
                          <td className="py-3 text-center">
                            {b.status === 'pending' && (
                              <div className="flex gap-1 justify-center">
                                <button onClick={() => handleUpdateBookingStatus(b.id, 'confirmed')} className="text-xs px-2 py-1 bg-green-50 text-green-600 rounded hover:bg-green-100">Confirm</button>
                                <button onClick={() => handleUpdateBookingStatus(b.id, 'cancelled')} className="text-xs px-2 py-1 bg-red-50 text-red-600 rounded hover:bg-red-100">Cancel</button>
                              </div>
                            )}
                          </td>
                        </tr>
                      ))}</tbody>
                    </table>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'settings' && (
              <div className="card p-6">
                <h2 className="font-semibold text-gray-900 mb-4">Settings</h2>
                <div className="space-y-4">
                  <div><label className="block text-sm font-medium text-gray-700 mb-1.5">Website Name</label><input type="text" defaultValue="Airward International" className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-mmt-400 outline-none text-sm" /></div>
                  <div><label className="block text-sm font-medium text-gray-700 mb-1.5">Support Email</label><input type="email" defaultValue="info@airwardinternational.com" className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-mmt-400 outline-none text-sm" /></div>
                  <button className="btn-primary text-sm">Save Settings</button>
                </div>
              </div>
            )}
          </main>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-5 border-b border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900">{editingPkg ? 'Edit Package' : 'Add New Package'}</h3>
              <button onClick={() => { setShowModal(false); setEditingPkg(null) }} className="p-1 text-gray-400 hover:text-gray-600"><X className="w-5 h-5" /></button>
            </div>
            <div className="p-5 space-y-4">
              <div><label className="block text-sm font-medium text-gray-700 mb-1.5">Title *</label><input value={pkgForm.title} onChange={e => setPkgForm({ ...pkgForm, title: e.target.value })} className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-mmt-400 outline-none text-sm" /></div>
              <div><label className="block text-sm font-medium text-gray-700 mb-1.5">Description *</label><textarea value={pkgForm.description} onChange={e => setPkgForm({ ...pkgForm, description: e.target.value })} rows={3} className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-mmt-400 outline-none text-sm resize-none" /></div>
              <div className="grid grid-cols-2 gap-4">
                <div><label className="block text-sm font-medium text-gray-700 mb-1.5">Destination *</label><input value={pkgForm.destination} onChange={e => setPkgForm({ ...pkgForm, destination: e.target.value })} className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-mmt-400 outline-none text-sm" /></div>
                <div><label className="block text-sm font-medium text-gray-700 mb-1.5">Country</label><input value={pkgForm.country} onChange={e => setPkgForm({ ...pkgForm, country: e.target.value })} className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-mmt-400 outline-none text-sm" /></div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div><label className="block text-sm font-medium text-gray-700 mb-1.5">Duration (Days)</label><input type="number" value={pkgForm.duration} onChange={e => setPkgForm({ ...pkgForm, duration: Number(e.target.value) })} className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-mmt-400 outline-none text-sm" /></div>
                <div><label className="block text-sm font-medium text-gray-700 mb-1.5">Price (₹) *</label><input type="number" value={pkgForm.price} onChange={e => setPkgForm({ ...pkgForm, price: Number(e.target.value) })} className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-mmt-400 outline-none text-sm" /></div>
                <div><label className="block text-sm font-medium text-gray-700 mb-1.5">Original Price (₹)</label><input type="number" value={pkgForm.originalPrice} onChange={e => setPkgForm({ ...pkgForm, originalPrice: Number(e.target.value) })} className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-mmt-400 outline-none text-sm" /></div>
              </div>
              <div><label className="block text-sm font-medium text-gray-700 mb-1.5">Category</label><select value={pkgForm.category} onChange={e => setPkgForm({ ...pkgForm, category: e.target.value })} className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-mmt-400 outline-none text-sm">{['Beach', 'Mountain', 'City', 'Cultural', 'Romantic', 'Adventure'].map(c => <option key={c}>{c}</option>)}</select></div>
              <div><label className="block text-sm font-medium text-gray-700 mb-1.5">Image URL</label><input value={pkgForm.image} onChange={e => setPkgForm({ ...pkgForm, image: e.target.value })} placeholder="https://..." className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-mmt-400 outline-none text-sm" /></div>
              <div className="flex gap-6">
                <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={pkgForm.featured} onChange={e => setPkgForm({ ...pkgForm, featured: e.target.checked })} className="rounded text-mmt-400" /> Featured</label>
                <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={pkgForm.bestSeller} onChange={e => setPkgForm({ ...pkgForm, bestSeller: e.target.checked })} className="rounded text-mmt-400" /> Best Seller</label>
              </div>
            </div>
            <div className="flex justify-end gap-3 p-5 border-t border-gray-100">
              <button onClick={() => { setShowModal(false); setEditingPkg(null) }} className="px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-lg">Cancel</button>
              <button onClick={handleSavePackage} className="btn-primary text-sm">{editingPkg ? 'Update Package' : 'Add Package'}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}