import Link from 'next/link'
import Image from 'next/image'
import { Mail, Phone, MapPin, ArrowUpRight } from 'lucide-react'

export default function Footer() {
  const links = {
    Packages: [
      { label: 'Beach Holidays', href: '/packages?category=Beach' },
      { label: 'Mountain Tours', href: '/packages?category=Mountain' },
      { label: 'City Breaks', href: '/packages?category=City' },
      { label: 'Cultural Tours', href: '/packages?category=Cultural' },
      { label: 'Adventure', href: '/packages?category=Adventure' },
    ],
    Company: [
      { label: 'About Us', href: '/about' },
      { label: 'Careers', href: '#' },
      { label: 'Blog', href: '#' },
      { label: 'Press', href: '#' },
    ],
    Support: [
      { label: 'Help Center', href: '/contact' },
      { label: 'Contact Us', href: '/contact' },
      { label: 'Privacy Policy', href: '#' },
      { label: 'Terms of Service', href: '#' },
    ],
  }

  return (
    <footer className="bg-surface-950 text-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.03]">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-brand-500 rounded-full blur-[120px]" />
      </div>

      <div className="container-wide relative">
        <div className="pt-20 sm:pt-28 pb-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8">
            <div className="lg:col-span-4">
              <Link href="/" className="flex items-center mb-6 group">
                <Image src="/logo.svg" alt="Airward International" width={160} height={45} className="brightness-0 invert transition-all duration-300 group-hover:scale-[1.02]" />
              </Link>
              <p className="text-surface-400 text-sm leading-relaxed max-w-sm mb-6">
                Founded by Arihant Jain &amp; Shweta Jain. Creating unforgettable travel experiences from Ahmedabad, India.
              </p>
              <div className="flex flex-col gap-3 text-sm">
                <a href="mailto:info@airwardinternational.com" className="flex items-center gap-2 text-surface-400 hover:text-white transition-colors">
                  <Mail className="w-4 h-4" /> info@airwardinternational.com
                </a>
                <a href="tel:+918866401355" className="flex items-center gap-2 text-surface-400 hover:text-white transition-colors">
                  <Phone className="w-4 h-4" /> +91 88664 01355
                </a>
                <div className="flex items-center gap-2 text-surface-400">
                  <MapPin className="w-4 h-4" /> Ahmedabad, India
                </div>
              </div>
            </div>

            {Object.entries(links).map(([title, items]) => (
              <div key={title} className="lg:col-span-2">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-surface-500 mb-4">{title}</h4>
                <ul className="flex flex-col gap-2.5">
                  {items.map((link) => (
                    <li key={link.label}>
                      <Link href={link.href} className="text-sm text-surface-400 hover:text-white transition-colors duration-200 flex items-center gap-1 group">
                        {link.label}
                        <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            <div className="lg:col-span-2">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-surface-500 mb-4">Stay Updated</h4>
              <p className="text-sm text-surface-400 mb-4">Get the best deals delivered to your inbox.</p>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="Your email"
                  className="flex-1 px-3 py-2 bg-surface-800/50 border border-surface-700/50 rounded-lg text-sm text-white placeholder:text-surface-500 focus:outline-none focus:ring-2 focus:ring-brand-500/30 focus:border-brand-500 transition-all"
                />
                <button className="px-4 py-2 bg-brand-600 hover:bg-brand-500 text-white text-sm font-medium rounded-lg transition-colors">
                  →
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-surface-800/50 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-surface-500">© {new Date().getFullYear()} Airward International. All rights reserved.</p>
          <div className="flex items-center gap-4">
            {['Twitter', 'Instagram', 'LinkedIn'].map((social) => (
              <a key={social} href="#" className="text-xs text-surface-500 hover:text-white transition-colors">{social}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}