import Link from 'next/link';
import Reveal from '@/components/ui/Reveal';

const stats = [
  { number: '500+', label: 'Destinations' },
  { number: '15,000+', label: 'Travelers' },
  { number: '98%', label: 'Satisfaction' },
  { number: '12+', label: 'Years' },
];

const values = [
  {
    title: 'Trust',
    description: 'We build lasting relationships through transparency, reliability, and honest communication at every touchpoint.',
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
      </svg>
    ),
  },
  {
    title: 'Excellence',
    description: 'We strive for perfection in every journey, from the first inquiry to the final destination.',
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
      </svg>
    ),
  },
  {
    title: 'Innovation',
    description: 'We leverage cutting-edge technology and creative solutions to redefine modern travel experiences.',
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18" />
      </svg>
    ),
  },
  {
    title: 'Customer First',
    description: 'Every decision we make starts with a simple question: how does this serve our travelers better?',
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
      </svg>
    ),
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-brand-600 via-brand-700 to-brand-900 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
        <div className="container-wide py-24 md:py-32 relative z-10">
          <Reveal delay={0.1}>
            <h1 className="text-4xl md:text-6xl font-bold text-white text-center">
              About Airward International
            </h1>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="text-xl text-brand-100 text-center mt-6 max-w-2xl mx-auto">
              Pioneering exceptional travel experiences since 2013
            </p>
          </Reveal>
        </div>
      </section>

      {/* Founders */}
      <section className="section-gap">
        <div className="container-tight">
          <Reveal delay={0.1}>
            <h2 className="text-3xl md:text-4xl font-bold text-surface-900 text-center mb-4">
              Meet Our Founders
            </h2>
            <p className="text-surface-500 text-center mb-12 max-w-xl mx-auto">
              Visionary leaders dedicated to transforming how the world travels
            </p>
          </Reveal>

          <div className="grid md:grid-cols-2 gap-8">
            <Reveal delay={0.2} direction="left">
              <div className="card-modern p-8 text-center">
                <div className="w-32 h-32 bg-gradient-to-br from-brand-400 to-brand-600 rounded-full mx-auto mb-6 flex items-center justify-center">
                  <span className="text-white text-4xl font-bold">AJ</span>
                </div>
                <h3 className="text-2xl font-bold text-surface-900">Arihant Jain</h3>
                <p className="text-brand-600 font-medium mt-1">Chief Executive Officer</p>
                <p className="text-surface-500 mt-4 leading-relaxed">
                  With over a decade of experience in the travel industry, Arihant has led Airward International
                  from a small startup to a globally recognized travel partner. His passion for innovation and
                  customer-centric approach drives the company&apos;s vision forward.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.3} direction="right">
              <div className="card-modern p-8 text-center">
                <div className="w-32 h-32 bg-gradient-to-br from-accent-400 to-accent-600 rounded-full mx-auto mb-6 flex items-center justify-center">
                  <span className="text-white text-4xl font-bold">SJ</span>
                </div>
                <h3 className="text-2xl font-bold text-surface-900">Shweta Jain</h3>
                <p className="text-accent-600 font-medium mt-1">Chief Operating Officer</p>
                <p className="text-surface-500 mt-4 leading-relaxed">
                  Shweta brings operational excellence and strategic insight to Airward International.
                  Her dedication to seamless operations and team building ensures that every traveler
                  receives an unmatched experience from booking to destination.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="section-gap bg-surface-50">
        <div className="container-tight">
          <Reveal>
            <div className="text-center max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-surface-900 mb-6">Our Mission</h2>
              <p className="text-lg text-surface-600 leading-relaxed">
                To empower every traveler with seamless, personalized, and unforgettable journeys. We believe
                that travel has the power to transform lives, bridge cultures, and create lasting memories.
                Our mission is to make world-class travel accessible to everyone, everywhere.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Stats */}
      <section className="section-gap bg-gradient-to-br from-brand-600 to-brand-800">
        <div className="container-wide">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <Reveal key={stat.label} delay={0.1 * (index + 1)}>
                <div className="text-center">
                  <div className="text-4xl md:text-5xl font-bold text-white">{stat.number}</div>
                  <div className="text-brand-200 mt-2 text-lg">{stat.label}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section-gap">
        <div className="container-wide">
          <Reveal>
            <h2 className="text-3xl md:text-4xl font-bold text-surface-900 text-center mb-4">
              Our Values
            </h2>
            <p className="text-surface-500 text-center mb-12 max-w-xl mx-auto">
              The principles that guide every decision we make
            </p>
          </Reveal>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <Reveal key={value.title} delay={0.1 * (index + 1)} direction="up">
                <div className="card-modern p-8 text-center h-full">
                  <div className="w-16 h-16 bg-brand-50 rounded-2xl flex items-center justify-center mx-auto mb-6 text-brand-600">
                    {value.icon}
                  </div>
                  <h3 className="text-xl font-bold text-surface-900 mb-3">{value.title}</h3>
                  <p className="text-surface-500 leading-relaxed">{value.description}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-gap bg-surface-50">
        <div className="container-tight">
          <Reveal>
            <div className="card-modern p-12 text-center bg-gradient-to-br from-brand-50 to-accent-50">
              <h2 className="text-3xl md:text-4xl font-bold text-surface-900 mb-4">
                Start Your Journey
              </h2>
              <p className="text-surface-500 mb-8 max-w-lg mx-auto">
                Ready to explore the world with Airward International? Let us plan your next adventure.
              </p>
              <Link
                href="/flights"
                className="btn-primary inline-flex items-center gap-2 px-8 py-4 text-lg"
              >
                Explore Flights
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
