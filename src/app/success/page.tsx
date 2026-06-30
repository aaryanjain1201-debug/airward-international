'use client';

import { Suspense } from 'react';
import Link from 'next/link';
import Reveal from '@/components/ui/Reveal';

function SuccessContent() {
  return (
    <Reveal delay={0} scale>
      <div className="w-full max-w-md mx-auto text-center">
        {/* Check Icon Animation */}
        <div className="relative w-28 h-28 mx-auto mb-8">
          <div className="absolute inset-0 bg-green-100 rounded-full animate-ping opacity-20" />
          <div className="relative w-28 h-28 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center shadow-lg shadow-green-500/25">
            <svg
              className="w-14 h-14 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
        </div>

        <h1 className="text-3xl md:text-4xl font-bold text-surface-900 mb-4">
          Payment Successful!
        </h1>

        <p className="text-lg text-surface-500 mb-10">
          Your booking has been confirmed. A confirmation email has been sent to your registered email address.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/dashboard" className="btn-primary flex items-center justify-center gap-2 px-8 py-3">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
            </svg>
            View Dashboard
          </Link>
          <Link
            href="/"
            className="btn-outline flex items-center justify-center gap-2 px-8 py-3"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
            </svg>
            Back to Home
          </Link>
        </div>
      </div>
    </Reveal>
  );
}

export default function SuccessPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-green-50 via-white to-brand-50 flex items-center justify-center p-4">
      <Suspense
        fallback={
          <div className="w-full max-w-md mx-auto text-center">
            <div className="animate-pulse space-y-4">
              <div className="h-28 w-28 bg-surface-200 rounded-full mx-auto" />
              <div className="h-10 bg-surface-200 rounded w-3/4 mx-auto" />
              <div className="h-4 bg-surface-200 rounded w-2/3 mx-auto" />
              <div className="flex gap-4 justify-center mt-8">
                <div className="h-12 bg-surface-200 rounded-xl w-40" />
                <div className="h-12 bg-surface-200 rounded-xl w-40" />
              </div>
            </div>
          </div>
        }
      >
        <SuccessContent />
      </Suspense>
    </main>
  );
}
