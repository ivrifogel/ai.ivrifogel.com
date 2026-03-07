'use client'

import { useRef, useState, useCallback } from 'react'

type TiltedCardProps = {
  children: React.ReactNode
  className?: string
  rotateAmplitude?: number
  scaleOnHover?: number
  caption?: string
}

export default function TiltedCard({
  children,
  className = '',
  rotateAmplitude = 14,
  scaleOnHover = 1.05,
  caption,
}: TiltedCardProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [transform, setTransform] = useState('')
  const [isHovered, setIsHovered] = useState(false)
  const [captionPos, setCaptionPos] = useState({ x: 0, y: 0 })

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!ref.current) return
      const rect = ref.current.getBoundingClientRect()
      const x = (e.clientX - rect.left) / rect.width - 0.5
      const y = (e.clientY - rect.top) / rect.height - 0.5
      const rotateX = -y * rotateAmplitude
      const rotateY = x * rotateAmplitude
      setTransform(
        `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(${scaleOnHover}, ${scaleOnHover}, ${scaleOnHover})`
      )
      setCaptionPos({ x: e.clientX - rect.left, y: e.clientY - rect.top })
    },
    [rotateAmplitude, scaleOnHover]
  )

  const handleMouseEnter = () => setIsHovered(true)

  const handleMouseLeave = () => {
    setIsHovered(false)
    setTransform('')
  }

  return (
    <div
      ref={ref}
      className={`relative ${className}`}
      style={{ perspective: '800px' }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div
        className="transition-transform duration-200 ease-out"
        style={{
          transform: transform || 'perspective(800px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)',
          transformStyle: 'preserve-3d',
        }}
      >
        {children}
      </div>

      {/* Floating caption */}
      {caption && (
        <div
          className="pointer-events-none absolute z-10 rounded bg-white px-2.5 py-1 text-[11px] font-semibold text-gray-900 shadow-md transition-opacity duration-150"
          style={{
            left: captionPos.x + 10,
            top: captionPos.y - 30,
            opacity: isHovered ? 1 : 0,
          }}
        >
          {caption}
        </div>
      )}
    </div>
  )
}
