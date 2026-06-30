'use client'

import { useRef, ReactNode, MouseEvent } from 'react'

interface Props {
  children: ReactNode
  className?: string
  strength?: number
  as?: 'button' | 'a'
  href?: string
  onClick?: () => void
}

export default function MagneticButton({ children, className = '', strength = 0.3, as = 'button', href, onClick }: Props) {
  const ref = useRef<HTMLButtonElement & HTMLAnchorElement>(null)

  const handleMouseMove = (e: MouseEvent) => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2
    el.style.transform = `translate(${x * strength}px, ${y * strength}px)`
  }

  const handleMouseLeave = () => {
    const el = ref.current
    if (!el) return
    el.style.transform = 'translate(0, 0)'
  }

  const Tag = as

  return (
    <Tag
      ref={ref}
      href={href}
      onClick={onClick}
      className={`transition-transform duration-300 ease-out-expo ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </Tag>
  )
}