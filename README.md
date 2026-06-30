# Airward International - Premium Travel Website

A creative, fully functional travel booking website for Airward International, built with Next.js and deployed on Vercel.

## 🚀 Features

- **Creative Landing Page** - Immersive hero section with animations
- **Package Catalog** - Browse, search, and filter travel packages
- **Package Details** - Full itinerary, pricing, and booking
- **User Dashboard** - Manage bookings, documents, and profile
- **Admin Panel** - Manage packages, view bookings, analytics
- **Client Onboarding** - Multi-step forms for travel documents
- **Voice Agent Placeholder** - Ready for AI voice integration
- **Email Notifications** - Booking confirmations (via Resend)
- **Stripe Payments** - Secure checkout (ready for integration)

## 🛠️ Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Styling:** Tailwind CSS
- **Animations:** Framer Motion
- **Database:** Supabase (PostgreSQL)
- **Auth:** Supabase Auth
- **Payments:** Stripe
- **Email:** Resend
- **Deployment:** Vercel

## 📦 Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Set Up Supabase

1. Create a free account at [supabase.com](https://supabase.com)
2. Create a new project
3. Go to SQL Editor and run the `supabase-schema.sql` file
4. Copy your project URL and anon key

### 3. Set Up Stripe

1. Create a free account at [stripe.com](https://stripe.com)
2. Get your API keys from the Dashboard
3. Set up webhook endpoints (optional for now)

### 4. Set Up Resend

1. Create a free account at [resend.com](https://resend.com)
2. Get your API key

### 5. Configure Environment Variables

Copy `.env.example` to `.env.local` and fill in your credentials:

```bash
cp .env.example .env.local
```

### 6. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## 🌐 Deploy to Vercel

### Option 1: Vercel CLI

```bash
npm i -g vercel
vercel
```

### Option 2: GitHub + Vercel Dashboard

1. Push code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Import your repository
4. Add environment variables
5. Deploy!

### Option 3: Direct Deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/your-username/airward-international)

## 📁 Project Structure

```
airward-international/
├── src/
│   ├── app/
│   │   ├── page.tsx              # Landing page
│   │   ├── layout.tsx            # Root layout
│   │   ├── globals.css           # Global styles
│   │   ├── packages/             # Package pages
│   │   ├── login/                # Auth pages
│   │   ├── signup/
│   │   ├── dashboard/            # User dashboard
│   │   ├── admin/                # Admin panel
│   │   ├── about/
│   │   └── contact/
│   ├── components/               # React components
│   ├── data/                     # Sample data
│   ├── lib/                      # Utilities (Supabase, etc.)
│   └── types/                    # TypeScript types
├── public/                       # Static assets
├── supabase-schema.sql           # Database schema
└── .env.example                  # Environment template
```

## 🎨 Design System

### Colors
- **Primary:** Deep Ocean Blue (#0A1628)
- **Accent:** Sunset Orange (#FF6B35)
- **Teal:** Sky Teal (#00B4D8)
- **Gold:** Premium Gold (#FFD700)

### Typography
- **Headings:** Playfair Display
- **Body:** Inter

## 💰 Cost

**100% FREE** to run with free tiers:
- Vercel: Free hosting
- Supabase: Free 500MB database
- Stripe: No monthly fee (pay per transaction)
- Resend: Free 3,000 emails/month

## 📞 Support

For questions or issues, contact:
- Email: info@airwardinternational.com
- Phone: +91 98765 43210

## 📄 License

Private - All rights reserved by Airward International
