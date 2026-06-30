'use client'

import { useRef, useState, useEffect } from 'react'

interface Props {
  children: React.ReactNode
  className?: string
  maxTilt?: number
  scale?: number
}

export default function TiltCard({ children, className = '', maxTilt = 15, scale = 1.02 }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const [rotateX, setRotateX] = useState(0)
  const [rotateY, setRotateY] = useState(0)
  const [isHovering, setIsHovering] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const handleMouseMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      const centerX = rect.width / 2
      const centerY = rect.height / 2

      const rotateYVal = ((x - centerX) / centerX) * maxTilt
      const rotateXVal = ((centerY - y) / centerY) * maxTilt

      setRotateY(rotateYVal)
      setRotateX(rotateXVal)
    }

    const handleMouseLeave = () => {
      setRotateX(0)
      setRotateY(0)
      setIsHovering(false)
    }

    const handleMouseEnter = () => {
      setIsHovering(true)
    }

    el.addEventListener('mousemove', handleMouseMove)
    el.addEventListener('mouseleave', handleMouseLeave)
    el.addEventListener('mouseenter', handleMouseEnter)

    return () => {
      el.removeEventListener('mousemove', handleMouseMove)
      el.removeEventListener('mouseleave', handleMouseLeave)
      el.removeEventListener('mouseenter', handleMouseEnter)
    }
  }, [maxTilt])

  return (
    <div
      ref={ref}
      className={`relative perspective-1000 ${className}`}
      style={{
        transformStyle: 'preserve-3d',
        transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(${isHovering ? scale : 1})`,
        transition: 'transform 0.1s ease-out, box-shadow 0.3s ease-out',
        willChange: 'transform',
      }}
    >
      {children}
      <div
        className="absolute inset-0 bg-gradient-to-br from-brand-500/10 via-transparent to-accent-500/10 opacity-0 hover:opacity-100 transition-opacity duration-500 rounded-2xl pointer-events-none"
      />
    </div>
  )
}