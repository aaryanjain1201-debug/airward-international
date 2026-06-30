'use client'

export default function Logo({ className = '', dark = true }: { className?: string; dark?: boolean }) {
  const textColor = dark ? '#0a2540' : '#ffffff'
  const subColor = dark ? '#0f4a84' : '#94a3b8'

  return (
    <svg viewBox="0 0 320 80" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <defs>
        <linearGradient id="logoWingGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#0d6ebd"/>
          <stop offset="50%" stopColor="#0f4a84"/>
          <stop offset="100%" stopColor="#0a2540"/>
        </linearGradient>
      </defs>

      {/* Bird icon */}
      <g transform="translate(10, 5) scale(0.7)">
        {/* Wing feather 1 - outermost, sweeps up-left */}
        <path d="M68 85 Q52 60 35 30 Q31 23 27 16 Q23 10 18 13 Q13 16 18 26 Q25 38 35 52 Q42 60 50 68 Q56 74 64 80 Z" fill="url(#logoWingGrad)"/>

        {/* Wing feather 2 - middle */}
        <path d="M70 88 Q57 66 44 44 Q40 37 36 30 Q32 24 28 27 Q24 30 30 40 Q38 52 48 64 Q54 70 62 78 Z" fill="url(#logoWingGrad)" opacity="0.82"/>

        {/* Wing feather 3 - innermost */}
        <path d="M72 90 Q62 72 52 54 Q48 47 44 40 Q40 34 37 37 Q34 40 39 50 Q46 60 55 70 Q60 76 66 82 Z" fill="url(#logoWingGrad)" opacity="0.65"/>

        {/* Body curve */}
        <path d="M72 90 Q76 82 80 74 Q84 66 88 62 Q92 58 94 56 Q96 55 95 56 Q94 58 90 64 Q84 74 78 84 Z" fill="#0a2540"/>

        {/* Head */}
        <path d="M88 60 Q92 53 96 48 Q98 46 100 46 Q102 46 102 49 Q102 52 98 56 Q94 60 90 62 Z" fill="#0a2540"/>

        {/* Beak */}
        <path d="M102 48 L110 50 L102 52 Z" fill="#0d6ebd"/>

        {/* Eye */}
        <circle cx="98" cy="49" r="1.8" fill="white"/>
        <circle cx="98.7" cy="49" r="0.9" fill="#0a2540"/>
      </g>

      {/* AIRWARD text */}
      <text x="72" y="50" fontFamily="'Inter','Helvetica Neue',Arial,sans-serif" fontSize="38" fontWeight="800" fill={textColor} letterSpacing="3">
        AIRWARD
      </text>

      {/* Left line */}
      <line x1="72" y1="60" x2="130" y2="60" stroke={textColor} strokeWidth="1"/>

      {/* INTERNATIONAL text */}
      <text x="135" y="64" fontFamily="'Inter','Helvetica Neue',Arial,sans-serif" fontSize="10" fontWeight="500" fill={subColor} letterSpacing="7">
        INTERNATIONAL
      </text>

      {/* Right line */}
      <line x1="268" y1="60" x2="310" y2="60" stroke={textColor} strokeWidth="1"/>
    </svg>
  )
}
