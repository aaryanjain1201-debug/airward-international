'use client'

import { useState, useMemo } from 'react'
import { Search, Star, MapPin, Clock, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import Reveal from '@/components/ui/Reveal'

const packages = [
  { id: 1, title: 'Magical Maldives Paradise', destination: 'Maldives', country: 'Maldives', duration: '5D/4N', price: 89999, originalPrice: 119999, rating: 4.9, reviews: 312, image: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=600&h=400&fit=crop', category: 'Beach', badge: 'Best Seller' },
  { id: 2, title: 'Swiss Alps Adventure', destination: 'Switzerland', duration: '7D/6N', price: 149999, originalPrice: 199999, rating: 4.8, reviews: 218, image: 'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=600&h=400&fit=crop', category: 'Mountain', badge: 'Premium' },
  { id: 3, title: 'Dubai Luxury Escape', destination: 'Dubai', duration: '4D/3N', price: 69999, originalPrice: 89999, rating: 4.7, reviews: 456, image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=600&h=400&fit=crop', category: 'City', badge: 'Trending' },
  { id: 4, title: 'Bali Cultural Retreat', destination: 'Bali', duration: '6D/5N', price: 59999, originalPrice: 79999, rating: 4.8, reviews: 189, image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=600&h=400&fit=crop', category: 'Cultural', badge: 'Romantic' },
  { id: 5, title: 'Paris Romantic Getaway', destination: 'Paris', duration: '5D/4N', price: 99999, originalPrice: 129999, rating: 4.9, reviews: 278, image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=600&h=400&fit=crop', category: 'Romantic', badge: 'Popular' },
  { id: 6, title: 'Thailand Island Hopping', destination: 'Thailand', duration: '6D/5N', price: 49999, originalPrice: 69999, rating: 4.6, reviews: 534, image: 'https://images.unsplash.com/photo-1504214208698-ea1916a2195a?w=600&h=400&fit=crop', category: 'Beach', badge: 'Value' },
]

const categories = ['All', 'Beach', 'Mountain', 'City', 'Cultural', 'Romantic', 'Adventure']

export default function PackagesPage() {
  const [search, setSearch] = useState('')
  const [activeCategory, setActiveCategory] = useState('All')

  const filtered = useMemo(() => {
    return packages.filter(pkg => {
      const matchSearch =
        pkg.title.toLowerCase().includes(search.toLowerCase()) ||
        pkg.destination.toLowerCase().includes(search.toLowerCase()) ||
        (pkg.country && pkg.country.toLowerCase().includes(search.toLowerCase()))
      const matchCategory = activeCategory === 'All' || pkg.category === activeCategory
      return matchSearch && matchCategory
    })
  }, [search, activeCategory])

  return (
    <section className="min-h-screen bg-surface-50">
      {/* Hero Header */}
      <div className="relative bg-gradient-to-br from-brand-600 via-brand-500 to-brand-700 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-accent-400 rounded-full blur-3xl" />
        </div>
        <div className="container-wide relative py-16 md:py-20">
          <Reveal delay={0} direction="up">
            <span className="inline-flex items-center gap-1.5 bg-white/15 text-white text-xs font-semibold px-4 py-1.5 rounded-full mb-4 backdrop-blur-sm">
              ✈ Curated Travel Experiences
            </span>
          </Reveal>
          <Reveal delay={100} direction="up">
            <h1 className="display-2xl text-white mb-3">Explore Packages</h1>
          </Reveal>
          <Reveal delay={200} direction="up">
            <p className="text-brand-100 text-lg max-w-xl">
              Discover handpicked travel packages to the world&apos;s most breathtaking destinations. Filter by category, search by name, and find your perfect getaway.
            </p>
          </Reveal>
        </div>
      </div>

      {/* Search and Filter Bar */}
      <div className="container-wide -mt-8 relative z-10 mb-8">
        <Reveal delay={300} direction="up" scale>
          <div className="bg-white rounded-2xl shadow-elevation-3 p-5 md:p-6 border border-surface-100">
            {/* Search */}
            <div className="relative mb-5">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-surface-400" />
              <input
                type="text"
                placeholder="Search by destination or package name..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="input-modern pl-12 py-4 text-base"
              />
            </div>

            {/* Category Tabs */}
            <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide pb-1">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`shrink-0 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 ${
                    activeCategory === cat
                      ? 'bg-brand-600 text-white shadow-glow'
                      : 'bg-surface-100 text-surface-600 hover:bg-surface-200 hover:text-surface-800'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </Reveal>
      </div>

      {/* Results Count */}
      <div className="container-wide mb-6">
        <p className="text-sm text-surface-500 font-medium">
          Showing <span className="text-surface-900 font-semibold">{filtered.length}</span>{' '}
          {filtered.length === 1 ? 'package' : 'packages'}
          {activeCategory !== 'All' && (
            <> in <span className="text-brand-600 font-semibold">{activeCategory}</span></>
          )}
        </p>
      </div>

      {/* Package Grid */}
      <div className="container-wide pb-20">
        {filtered.length === 0 ? (
          <Reveal direction="up">
            <div className="text-center py-20">
              <div className="w-20 h-20 bg-surface-100 rounded-full flex items-center justify-center mx-auto mb-5">
                <Search className="w-8 h-8 text-surface-300" />
              </div>
              <h3 className="text-xl font-semibold text-surface-900 mb-2">No packages found</h3>
              <p className="text-surface-500 mb-6">Try adjusting your search or filter criteria</p>
              <button
                onClick={() => { setSearch(''); setActiveCategory('All') }}
                className="btn-outline"
              >
                Clear Filters
              </button>
            </div>
          </Reveal>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((pkg, i) => {
              const discount = Math.round((1 - pkg.price / pkg.originalPrice) * 100)

              return (
                <Reveal key={pkg.id} delay={i * 80} direction="up" scale>
                  <Link href={`/packages/${pkg.id}`} className="block group">
                    <div className="card-modern overflow-hidden h-full flex flex-col">
                      {/* Image */}
                      <div className="relative h-56 overflow-hidden">
                        <Image
                          src={pkg.image}
                          alt={pkg.title}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-500 ease-out"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />

                        {/* Badges */}
                        <div className="absolute top-3 left-3 flex items-center gap-2">
                          <span className="badge bg-accent-500 text-white border-0 shadow-lg">
                            {pkg.badge}
                          </span>
                          <span className="badge bg-white/90 text-accent-700 border-0 shadow-lg backdrop-blur-sm">
                            {discount}% OFF
                          </span>
                        </div>

                        {/* Category */}
                        <div className="absolute top-3 right-3">
                          <span className="badge bg-white/90 text-brand-700 border-0 shadow-lg backdrop-blur-sm">
                            {pkg.category}
                          </span>
                        </div>

                        {/* Duration */}
                        <div className="absolute bottom-3 left-3 flex items-center gap-1.5 text-white text-sm font-medium">
                          <Clock className="w-4 h-4" />
                          <span>{pkg.duration}</span>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-5 flex flex-col flex-1">
                        <h3 className="text-lg font-bold text-surface-900 mb-1.5 group-hover:text-brand-600 transition-colors line-clamp-2">
                          {pkg.title}
                        </h3>

                        <div className="flex items-center gap-1.5 text-surface-500 text-sm mb-3">
                          <MapPin className="w-4 h-4 text-brand-500" />
                          <span>{pkg.destination}{pkg.country ? `, ${pkg.country}` : ''}</span>
                        </div>

                        {/* Rating */}
                        <div className="flex items-center gap-2 mb-4">
                          <div className="flex items-center gap-1">
                            <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                            <span className="text-sm font-bold text-surface-900">{pkg.rating}</span>
                          </div>
                          <span className="text-xs text-surface-400">({pkg.reviews} reviews)</span>
                        </div>

                        {/* Price & CTA */}
                        <div className="flex items-end justify-between mt-auto pt-4 border-t border-surface-100">
                          <div>
                            <span className="text-sm text-surface-400 line-through block">
                              ₹{pkg.originalPrice.toLocaleString()}
                            </span>
                            <span className="text-2xl font-bold text-brand-600">
                              ₹{pkg.price.toLocaleString()}
                            </span>
                            <span className="text-xs text-surface-500 block">per person</span>
                          </div>
                          <span className="btn-primary btn-sm group-hover:gap-3 transition-all">
                            View <ArrowRight className="w-4 h-4" />
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </Reveal>
              )
            })}
          </div>
        )}
      </div>
    </section>
  )
}
