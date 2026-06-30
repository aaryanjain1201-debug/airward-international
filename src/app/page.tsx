import { Suspense } from 'react'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import Image from 'next/image'
import {
  Plane,
  ArrowRight,
  Hotel,
  Compass,
  FileText,
  Star,
  Shield,
  Clock,
  Headphones,
  MapPin,
  Users,
  ChevronRight,
  Heart,
  Award,
  TrendingUp,
  Sparkles,
  Quote,
  Globe,
  Calendar,
  Search,
  CheckCircle,
} from 'lucide-react'
import Reveal from '@/components/ui/Reveal'
import CountUp from '@/components/ui/CountUp'
import Marquee from '@/components/ui/Marquee'
import MagneticButton from '@/components/ui/MagneticButton'
import FloatingParticles from '@/components/ui/FloatingParticles'

const Globe3D = dynamic(() => import('@/components/ui/Globe3D'), { ssr: false })

const destinations = [
  'Maldives', 'Swiss Alps', 'Dubai', 'Bali', 'Paris',
  'Santorini', 'Tokyo', 'New York', 'London', 'Singapore',
  'Barcelona', 'Rome', 'Mauritius', 'Phuket', 'Cairo',
]

const categories = [
  {
    icon: Hotel,
    label: 'Hotels',
    description: 'Handpicked luxury stays across 500+ destinations worldwide',
    color: 'from-brand-500 to-brand-700',
    bgColor: 'bg-brand-50',
    iconColor: 'text-brand-600',
  },
  {
    icon: Compass,
    label: 'Holidays',
    description: 'Curated tour packages crafted by travel experts',
    color: 'from-accent-500 to-accent-700',
    bgColor: 'bg-accent-50',
    iconColor: 'text-accent-600',
  },
  {
    icon: FileText,
    label: 'Visa',
    description: 'Hassle-free visa processing for 190+ countries',
    color: 'from-emerald-500 to-emerald-700',
    bgColor: 'bg-emerald-50',
    iconColor: 'text-emerald-600',
  },
]

const packages = [
  {
    id: 1,
    title: 'Maldives Paradise Escape',
    destination: 'Maldives',
    image: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=600&h=400&fit=crop',
    price: 89999,
    originalPrice: 124999,
    rating: 4.9,
    reviews: 342,
    duration: '5 Nights / 6 Days',
    badge: 'Best Seller',
    badgeColor: 'bg-accent-500',
    features: ['5★ Beach Villa', 'All Inclusive', 'Snorkeling'],
  },
  {
    id: 2,
    title: 'Swiss Alps Adventure',
    destination: 'Switzerland',
    image: 'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=600&h=400&fit=crop',
    price: 149999,
    originalPrice: 189999,
    rating: 4.8,
    reviews: 218,
    duration: '7 Nights / 8 Days',
    badge: 'Premium',
    badgeColor: 'bg-brand-600',
    features: ['Mountain View Suite', 'Ski Pass', 'Train Journey'],
  },
  {
    id: 3,
    title: 'Dubai City of Gold',
    destination: 'Dubai',
    image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=600&h=400&fit=crop',
    price: 64999,
    originalPrice: 82999,
    rating: 4.7,
    reviews: 567,
    duration: '4 Nights / 5 Days',
    badge: 'Trending',
    badgeColor: 'bg-emerald-500',
    features: ['Burj View Room', 'Desert Safari', 'City Tour'],
  },
  {
    id: 4,
    title: 'Bali Serenity Retreat',
    destination: 'Bali, Indonesia',
    image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=600&h=400&fit=crop',
    price: 54999,
    originalPrice: 72999,
    rating: 4.9,
    reviews: 423,
    duration: '6 Nights / 7 Days',
    badge: 'Romantic',
    badgeColor: 'bg-pink-500',
    features: ['Private Pool Villa', 'Spa Package', 'Temple Tour'],
  },
]

const deals = [
  {
    title: 'Early Bird Offer',
    description: 'Book 30 days in advance and save up to 25% on all international packages',
    icon: Clock,
    color: 'from-brand-500 via-brand-600 to-brand-700',
    discount: '25% OFF',
  },
  {
    title: 'Group Discount',
    description: 'Travel with 5+ friends and unlock exclusive group pricing on every booking',
    icon: Users,
    color: 'from-accent-500 via-accent-600 to-accent-700',
    discount: '15% OFF',
  },
  {
    title: 'Honeymoon Special',
    description: 'Free room upgrade, candlelight dinner, and couples spa on select packages',
    icon: Heart,
    color: 'from-pink-500 via-rose-500 to-red-500',
    discount: 'FREE UPGRADE',
  },
]

const stats = [
  { value: 500, suffix: '+', label: 'Destinations', icon: Globe },
  { value: 15000, suffix: '+', label: 'Happy Travelers', icon: Users },
  { value: 98, suffix: '%', label: 'Satisfaction', icon: Award },
  { value: 12, suffix: '+', label: 'Years Experience', icon: TrendingUp },
]

const testimonials = [
  {
    name: 'Priya Sharma',
    location: 'Mumbai, India',
    rating: 5,
    quote: 'Airward made our Maldives honeymoon absolutely magical. Every detail was perfectly arranged — from the overwater villa to the sunset dinner cruise. Cannot recommend enough!',
    avatar: 'PS',
  },
  {
    name: 'Rahul Mehta',
    location: 'Delhi, India',
    rating: 5,
    quote: 'Booked a Swiss Alps trip for my family. The kids loved skiing and the mountain views were breathtaking. Airward handled everything seamlessly. Will book again!',
    avatar: 'RM',
  },
  {
    name: 'Ananya Patel',
    location: 'Bangalore, India',
    rating: 5,
    quote: 'The visa processing was surprisingly fast and smooth. Got my Schengen visa in just 5 days. Their team guided me through every step. Truly professional service!',
    avatar: 'AP',
  },
]

export default function HomePage() {
  return (
    <main className="min-h-screen">
      {/* ─── HERO ─── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-surface-950 via-brand-950 to-surface-950 min-h-[90vh] flex items-center">
        {/* Dot grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              'radial-gradient(circle, white 1px, transparent 1px)',
            backgroundSize: '32px 32px',
          }}
        />

        {/* Glow orbs */}
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-brand-500/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-accent-500/15 rounded-full blur-[120px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-400/10 rounded-full blur-[150px]" />

        {/* 3D Floating Particles */}
        <FloatingParticles count={50} className="opacity-30" />

        <div className="container-wide relative z-10 py-20 md:py-32">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left: Content */}
            <div className="max-w-2xl mx-auto lg:mx-0 text-center lg:text-left">
              <Reveal delay={0}>
                <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 backdrop-blur-sm rounded-full px-5 py-2 mb-8">
                  <Sparkles className="w-4 h-4 text-accent-400" />
                  <span className="text-sm text-white/70 font-medium">
                    Your Ultimate Travel Partner
                  </span>
                </div>
              </Reveal>

              <Reveal delay={100}>
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.1] mb-6 text-balance">
                  Discover Your{' '}
                  <span className="gradient-text">Next Adventure</span>
                </h1>
              </Reveal>

              <Reveal delay={200}>
                <p className="text-lg md:text-xl text-white/50 max-w-2xl mx-auto lg:mx-0 mb-10 leading-relaxed">
                  Find and book international travel packages at unbeatable prices.
                  Hotels, holidays, and visa services — all in one place.
                </p>
              </Reveal>

              {/* Trust Badges */}
              <Reveal delay={400}>
                <div className="flex flex-wrap items-center justify-center lg:justify-start gap-6 md:gap-10 mt-10">
                  {[
                    { icon: Shield, label: 'Secure Booking' },
                    { icon: Headphones, label: '24/7 Support' },
                    { icon: Star, label: '5,000+ Reviews' },
                    { icon: Award, label: 'Best Price Guarantee' },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-2 text-white/40">
                      <item.icon className="w-4 h-4" />
                      <span className="text-xs font-medium">{item.label}</span>
                    </div>
                  ))}
                </div>
              </Reveal>
            </div>

            {/* Right: 3D Globe */}
            <div className="relative hidden lg:block">
              <Suspense fallback={<div className="aspect-square flex items-center justify-center"><div className="w-12 h-12 border-4 border-brand-500/30 border-t-brand-500 rounded-full animate-spin" /></div>}>
                <Globe3D className="w-full h-[500px]" />
              </Suspense>
            </div>
          </div>
        </div>

        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-surface-0 to-transparent" />
      </section>

      {/* ─── MARQUEE ─── */}
      <section className="py-8 border-b border-surface-100">
        <Marquee
          items={destinations}
          speed={40}
          className="py-2"
        />
      </section>

      {/* ─── CATEGORIES ─── */}
      <section className="section-gap">
        <div className="container-wide">
          <Reveal>
            <div className="text-center mb-14">
              <span className="badge-brand mb-4 inline-flex">Explore</span>
              <h2 className="text-3xl md:text-4xl font-bold text-surface-900 mb-4">
                What Are You Looking For?
              </h2>
              <p className="text-surface-500 text-lg max-w-xl mx-auto">
                Choose from our range of travel services tailored to your needs
              </p>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {categories.map((cat, i) => (
              <Reveal key={i} delay={i * 100}>
                <Link href="/packages">
                  <div className="group card-modern p-8 text-center hover:shadow-glow transition-all duration-500 cursor-pointer h-full">
                    <div
                      className={`w-16 h-16 ${cat.bgColor} rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-500`}
                    >
                      <cat.icon className={`w-8 h-8 ${cat.iconColor}`} />
                    </div>
                    <h3 className="text-xl font-bold text-surface-900 mb-2 group-hover:text-brand-600 transition-colors">
                      {cat.label}
                    </h3>
                    <p className="text-surface-500 text-sm leading-relaxed mb-4">
                      {cat.description}
                    </p>
                    <span className="inline-flex items-center gap-1 text-sm font-semibold text-brand-600 group-hover:gap-2 transition-all">
                      Explore Now <ArrowRight className="w-4 h-4" />
                    </span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FEATURED PACKAGES ─── */}
      <section className="section-gap bg-surface-50">
        <div className="container-wide">
          <Reveal>
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-14">
              <div>
                <span className="badge-accent mb-4 inline-flex">Featured</span>
                <h2 className="text-3xl md:text-4xl font-bold text-surface-900 mb-3">
                  Trending Packages
                </h2>
                <p className="text-surface-500 text-lg">
                  Handpicked experiences loved by thousands of travelers
                </p>
              </div>
              <Link
                href="/packages"
                className="inline-flex items-center gap-2 text-brand-600 font-semibold mt-4 md:mt-0 hover:gap-3 transition-all"
              >
                View All Packages <ChevronRight className="w-5 h-5" />
              </Link>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {packages.map((pkg, i) => (
              <Reveal key={pkg.id} delay={i * 100}>
                <Link href="/packages">
                  <div className="group card-modern overflow-hidden h-full flex flex-col">
                    <div className="relative h-56 overflow-hidden">
                      <Image
                        src={pkg.image}
                        alt={pkg.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                      <span
                        className={`absolute top-3 left-3 ${pkg.badgeColor} text-white text-xs font-bold px-3 py-1 rounded-full`}
                      >
                        {pkg.badge}
                      </span>
                      <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm text-surface-900 text-xs font-bold px-2.5 py-1 rounded-full">
                        {Math.round(
                          ((pkg.originalPrice - pkg.price) /
                            pkg.originalPrice) *
                            100
                        )}
                        % OFF
                      </div>
                      <div className="absolute bottom-3 left-3 flex items-center gap-1.5 text-white text-sm">
                        <MapPin className="w-3.5 h-3.5" />
                        <span className="font-medium">{pkg.destination}</span>
                      </div>
                    </div>

                    <div className="p-5 flex flex-col flex-1">
                      <h3 className="font-bold text-surface-900 mb-2 group-hover:text-brand-600 transition-colors">
                        {pkg.title}
                      </h3>

                      <div className="flex items-center gap-1.5 mb-3">
                        <Clock className="w-3.5 h-3.5 text-surface-400" />
                        <span className="text-xs text-surface-500">
                          {pkg.duration}
                        </span>
                        <span className="text-surface-200 mx-1">·</span>
                        <div className="flex items-center gap-0.5">
                          <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                          <span className="text-xs font-semibold text-surface-700">
                            {pkg.rating}
                          </span>
                          <span className="text-xs text-surface-400">
                            ({pkg.reviews})
                          </span>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-1.5 mb-4">
                        {pkg.features.map((f, j) => (
                          <span
                            key={j}
                            className="text-xs bg-surface-50 text-surface-600 px-2 py-0.5 rounded-md border border-surface-100"
                          >
                            {f}
                          </span>
                        ))}
                      </div>

                      <div className="mt-auto pt-4 border-t border-surface-100 flex items-end justify-between">
                        <div>
                          <span className="text-xs text-surface-400 line-through block">
                            ₹{pkg.originalPrice.toLocaleString()}
                          </span>
                          <span className="text-xl font-bold text-brand-600">
                            ₹{pkg.price.toLocaleString()}
                          </span>
                          <span className="text-xs text-surface-400 ml-1">
                            / person
                          </span>
                        </div>
                        <MagneticButton
                          as="button"
                          className="btn-primary btn-sm"
                        >
                          Book Now
                        </MagneticButton>
                      </div>
                    </div>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─── DEALS ─── */}
      <section className="section-gap">
        <div className="container-wide">
          <Reveal>
            <div className="text-center mb-14">
              <span className="badge mb-4 inline-flex">Limited Time</span>
              <h2 className="text-3xl md:text-4xl font-bold text-surface-900 mb-4">
                Exclusive Deals & Offers
              </h2>
              <p className="text-surface-500 text-lg max-w-xl mx-auto">
                Don&apos;t miss out on these limited-time travel deals
              </p>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {deals.map((deal, i) => (
              <Reveal key={i} delay={i * 100}>
                <div
                  className={`relative bg-gradient-to-br ${deal.color} rounded-2xl p-8 text-white overflow-hidden h-full`}
                >
                  {/* Decorative circles */}
                  <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-2xl" />
                  <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-white/10 rounded-full blur-2xl" />

                  <div className="relative z-10">
                    <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mb-6">
                      <deal.icon className="w-7 h-7" />
                    </div>
                    <div className="inline-block bg-white/20 text-white text-xs font-bold px-3 py-1 rounded-full mb-4">
                      {deal.discount}
                    </div>
                    <h3 className="text-xl font-bold mb-3">{deal.title}</h3>
                    <p className="text-white/70 text-sm leading-relaxed mb-6">
                      {deal.description}
                    </p>
                    <Link
                      href="/packages"
                      className="inline-flex items-center gap-2 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white font-semibold text-sm px-5 py-2.5 rounded-xl transition-all duration-300"
                    >
                      Grab Deal <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─── STATS ─── */}
      <section className="section-gap bg-surface-950 relative overflow-hidden">
        {/* Dot grid */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              'radial-gradient(circle, white 1px, transparent 1px)',
            backgroundSize: '32px 32px',
          }}
        />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-brand-500/10 rounded-full blur-[120px]" />

        <div className="container-wide relative z-10">
          <Reveal>
            <div className="text-center mb-14">
              <span className="badge-brand mb-4 inline-flex">Our Impact</span>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Numbers Speak for Themselves
              </h2>
              <p className="text-white/50 text-lg max-w-xl mx-auto">
                Trusted by thousands of travelers across the globe
              </p>
            </div>
          </Reveal>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {stats.map((stat, i) => (
              <Reveal key={i} delay={i * 100}>
                <div className="text-center group">
                  <div className="w-16 h-16 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center mx-auto mb-5 group-hover:border-brand-400/50 group-hover:bg-brand-500/10 transition-all duration-500">
                    <stat.icon className="w-7 h-7 text-brand-400" />
                  </div>
                  <div className="text-3xl md:text-4xl font-bold text-white mb-1">
                    <CountUp value={stat.value} suffix={stat.suffix} />
                  </div>
                  <div className="text-sm text-white/40 font-medium">
                    {stat.label}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─── TESTIMONIALS ─── */}
      <section className="section-gap">
        <div className="container-wide">
          <Reveal>
            <div className="text-center mb-14">
              <span className="badge mb-4 inline-flex">Testimonials</span>
              <h2 className="text-3xl md:text-4xl font-bold text-surface-900 mb-4">
                What Our Travelers Say
              </h2>
              <p className="text-surface-500 text-lg max-w-xl mx-auto">
                Real stories from real travelers who explored the world with us
              </p>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <Reveal key={i} delay={i * 100}>
                <div className="card-modern p-8 h-full flex flex-col">
                  <Quote className="w-10 h-10 text-brand-200 mb-4" />
                  <p className="text-surface-600 leading-relaxed mb-6 flex-1">
                    &ldquo;{t.quote}&rdquo;
                  </p>
                  <div className="flex items-center gap-3 pt-4 border-t border-surface-100">
                    <div className="w-11 h-11 bg-gradient-to-br from-brand-500 to-brand-700 rounded-full flex items-center justify-center text-white font-bold text-sm">
                      {t.avatar}
                    </div>
                    <div className="flex-1">
                      <div className="font-semibold text-surface-900 text-sm">
                        {t.name}
                      </div>
                      <div className="text-xs text-surface-400">
                        {t.location}
                      </div>
                    </div>
                    <div className="flex gap-0.5">
                      {Array.from({ length: t.rating }).map((_, j) => (
                        <Star
                          key={j}
                          className="w-3.5 h-3.5 text-amber-400 fill-amber-400"
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="section-gap">
        <div className="container-wide">
          <Reveal>
            <div className="relative bg-gradient-to-br from-brand-600 via-brand-700 to-brand-900 rounded-3xl overflow-hidden">
              {/* Decorative elements */}
              <div className="absolute inset-0 opacity-10">
                <div
                  style={{
                    backgroundImage:
                      'radial-gradient(circle, white 1px, transparent 1px)',
                    backgroundSize: '24px 24px',
                  }}
                  className="w-full h-full"
                />
              </div>
              <div className="absolute top-0 right-0 w-96 h-96 bg-accent-500/20 rounded-full blur-[100px]" />
              <div className="absolute bottom-0 left-0 w-80 h-80 bg-brand-300/20 rounded-full blur-[100px]" />

              <div className="relative z-10 px-8 py-16 md:px-16 md:py-20 text-center">
                <Reveal delay={100}>
                  <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-5 py-2 mb-8">
                    <Plane className="w-4 h-4 text-accent-300" />
                    <span className="text-sm text-white/80 font-medium">
                      Your Journey Begins Here
                    </span>
                  </div>
                </Reveal>

                <Reveal delay={200}>
                  <h2 className="text-3xl md:text-5xl font-bold text-white mb-5 text-balance">
                    Ready to Explore?
                  </h2>
                </Reveal>

                <Reveal delay={300}>
                  <p className="text-white/60 text-lg max-w-xl mx-auto mb-10">
                    Join 15,000+ happy travelers who have discovered their dream
                    destinations with Airward International.
                  </p>
                </Reveal>

                <Reveal delay={400}>
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <MagneticButton
                      as="a"
                      href="/packages"
                      className="btn-accent btn-lg"
                    >
                      Browse Packages
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </MagneticButton>
                    <MagneticButton
                      as="a"
                      href="/contact"
                      className="btn-ghost btn-lg !text-white !border-white/20 hover:!bg-white/10"
                    >
                      <Headphones className="w-5 h-5 mr-2" />
                      Talk to an Expert
                    </MagneticButton>
                  </div>
                </Reveal>

                <Reveal delay={500}>
                  <div className="flex items-center justify-center gap-6 mt-10 text-white/40 text-sm">
                    <div className="flex items-center gap-1.5">
                      <CheckCircle className="w-4 h-4 text-green-400" />
                      No hidden charges
                    </div>
                    <div className="flex items-center gap-1.5">
                      <CheckCircle className="w-4 h-4 text-green-400" />
                      Free cancellation
                    </div>
                    <div className="flex items-center gap-1.5">
                      <CheckCircle className="w-4 h-4 text-green-400" />
                      24/7 support
                    </div>
                  </div>
                </Reveal>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  )
}
