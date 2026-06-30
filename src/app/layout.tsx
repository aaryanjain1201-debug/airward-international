import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import ChatBot from '@/components/ChatBot'

const inter = Inter({ subsets: ['latin'], display: 'swap' })

export const metadata: Metadata = {
  title: {
    default: 'Airward International - Book International Travel Packages',
    template: '%s | Airward International',
  },
  description: 'Compare and book international travel packages at best prices. Hotels, holidays, and visa services from Ahmedabad, India.',
  keywords: ['travel', 'international travel', 'vacation packages', 'tours', 'holidays', 'hotels', 'visa', 'Airward International'],
  authors: [{ name: 'Airward International' }],
  openGraph: {
    title: 'Airward International - Book International Travel Packages',
    description: 'Curated travel experiences to the world\'s most extraordinary destinations.',
    url: 'https://airward-international.vercel.app',
    siteName: 'Airward International',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Airward International',
    description: 'Curated travel experiences to the world\'s most extraordinary destinations.',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:z-[100] focus:top-4 focus:left-4 focus:bg-brand-600 focus:text-white focus:px-4 focus:py-2 focus:rounded-lg focus:outline-none">
          Skip to content
        </a>
        <Header />
        <main id="main-content" className="min-h-screen">{children}</main>
        <Footer />
        <ChatBot />
      </body>
    </html>
  )
}
