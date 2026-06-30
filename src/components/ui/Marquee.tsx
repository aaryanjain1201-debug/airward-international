'use client'

import { ReactNode } from 'react'

interface Props {
  items: string[]
  speed?: number
  className?: string
  pauseOnHover?: boolean
}

export default function Marquee({ items, speed = 30, className = '', pauseOnHover = true }: Props) {
  const content = [...items, ...items]

  return (
    <div className={`marquee-container ${className}`}>
      <div
        className="flex gap-8 whitespace-nowrap"
        style={{
          animation: `marquee ${speed}s linear infinite`,
          width: 'max-content',
        }}
        onMouseEnter={pauseOnHover ? (e) => (e.currentTarget.style.animationPlayState = 'paused') : undefined}
        onMouseLeave={pauseOnHover ? (e) => (e.currentTarget.style.animationPlayState = 'running') : undefined}
      >
        {content.map((item, i) => (
          <span key={i} className="text-surface-400 font-medium text-sm tracking-wide uppercase shrink-0">
            {item}
            <span className="mx-6 text-surface-200">✦</span>
          </span>
        ))}
      </div>
    </div>
  )
}