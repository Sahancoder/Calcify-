'use client'

import { useMemo, useState } from 'react'

interface CropRect {
  x: number
  y: number
  w: number
  h: number
}

interface ContainerSize {
  w: number
  h: number
}

interface CropOverlayProps {
  crop: CropRect
  setCrop: (c: CropRect) => void
  containerSize: ContainerSize
}

export default function CropOverlay({ crop, setCrop, containerSize }: CropOverlayProps) {
  const [drag, setDrag] = useState<{ dx: number; dy: number } | null>(null)

  const box = useMemo(
    () => ({
      left: crop.x * containerSize.w,
      top: crop.y * containerSize.h,
      width: crop.w * containerSize.w,
      height: crop.h * containerSize.h,
    }),
    [crop, containerSize]
  )

  const startDrag = (e: React.MouseEvent) => {
    setDrag({ dx: e.clientX - box.left, dy: e.clientY - box.top })
  }

  const onMove = (e: React.MouseEvent) => {
    if (!drag) return
    const l = Math.max(0, Math.min(containerSize.w - box.width, e.clientX - drag.dx))
    const t = Math.max(0, Math.min(containerSize.h - box.height, e.clientY - drag.dy))
    setCrop({ x: l / containerSize.w, y: t / containerSize.h, w: crop.w, h: crop.h })
  }

  const stop = () => setDrag(null)

  return (
    <div className="absolute inset-0 select-none" onMouseMove={onMove} onMouseUp={stop}>
      {/* darken outside */}
      <div className="absolute inset-0 bg-black/55" />

      {/* hole */}
      <div
        style={{
          left: box.left,
          top: box.top,
          width: box.width,
          height: box.height,
        }}
        className="absolute rounded-xl border-2 border-white/90 shadow-[0_0_0_9999px_rgba(0,0,0,0.55)]"
      />

      {/* draggable area */}
      <div
        style={{
          left: box.left,
          top: box.top,
          width: box.width,
          height: box.height,
        }}
        className="absolute rounded-xl cursor-move"
        onMouseDown={startDrag}
      />

      {/* corner handles */}
      {['tl', 'tr', 'bl', 'br'].map((k, i) => {
        const style: React.CSSProperties = {
          width: 18,
          height: 18,
          border: '3px solid white',
          position: 'absolute',
          borderRadius: 4,
        }
        if (k === 'tl') {
          style.left = box.left - 3
          style.top = box.top - 3
        }
        if (k === 'tr') {
          style.left = box.left + box.width - 15
          style.top = box.top - 3
        }
        if (k === 'bl') {
          style.left = box.left - 3
          style.top = box.top + box.height - 15
        }
        if (k === 'br') {
          style.left = box.left + box.width - 15
          style.top = box.top + box.height - 15
        }
        return <div key={i} style={style} />
      })}
    </div>
  )
}
