'use client'

import { useRef, useEffect, ReactNode } from 'react'

interface Props {
  children: ReactNode
  className?: string
  delay?: number
  direction?: 'up' | 'down' | 'left' | 'right' | 'none'
  scale?: boolean
  blur?: boolean
  once?: boolean
  threshold?: number
}

export default function Reveal({
  children,
  className = '',
  delay = 0,
  direction = 'up',
  scale = false,
  blur = false,
  once = true,
  threshold = 0.1,
}: Props) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const getTransform = () => {
      switch (direction) {
        case 'up': return 'translateY(40px)'
        case 'down': return 'translateY(-40px)'
        case 'left': return 'translateX(40px)'
        case 'right': return 'translateX(-40px)'
        case 'none': return 'none'
      }
    }

    el.style.opacity = '0'
    el.style.transform = `${getTransform()}${scale ? ' scale(0.96)' : ''}`
    if (blur) el.style.filter = 'blur(10px)'
    el.style.transition = `opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms, transform 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms${blur ? ', filter 0.8s cubic-bezier(0.16, 1, 0.3, 1) ' + delay + 'ms' : ''}`

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.style.opacity = '1'
          el.style.transform = 'translateY(0) translateX(0) scale(1)'
          if (blur) el.style.filter = 'blur(0)'
          if (once) observer.unobserve(el)
        } else if (!once) {
          el.style.opacity = '0'
          el.style.transform = `${getTransform()}${scale ? ' scale(0.96)' : ''}`
          if (blur) el.style.filter = 'blur(10px)'
        }
      },
      { threshold }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [delay, direction, scale, blur, once, threshold])

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  )
}