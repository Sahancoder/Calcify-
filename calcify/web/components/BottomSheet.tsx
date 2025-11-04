'use client'

import { useEffect, useRef } from 'react'

interface BottomSheetProps {
  open: boolean
  setOpen: (v: boolean) => void
  children: React.ReactNode
}

export default function BottomSheet({ open, setOpen, children }: BottomSheetProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!ref.current) return
    ref.current.style.transform = open ? 'translateY(0%)' : 'translateY(100%)'
  }, [open])

  return (
    <div className="fixed inset-0 z-40 pointer-events-none">
      <div
        className={`absolute inset-0 bg-black/60 transition-opacity ${
          open ? 'opacity-100' : 'opacity-0'
        } pointer-events-auto`}
        onClick={() => setOpen(false)}
      />
      <div ref={ref} className="absolute bottom-0 left-0 right-0 pointer-events-auto">
        <div className="mx-auto max-w-md rounded-t-3xl bg-white shadow-2xl transition-transform duration-300 max-h-[80vh] overflow-y-auto">
          <div className="mx-auto mt-2 h-1.5 w-12 rounded-full bg-black/10" />
          {children}
        </div>
      </div>
    </div>
  )
}
