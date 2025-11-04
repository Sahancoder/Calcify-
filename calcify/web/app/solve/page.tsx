'use client'

import Webcam from 'react-webcam'
import { useRef, useState, useEffect } from 'react'
import BottomSheet from '@/components/BottomSheet'
import CropOverlay from '@/components/CropOverlay'
import Fab from '@/components/Fab'
import { solveProblem } from '@/lib/api'

interface SolveResult {
  latex: string
  result: string
  steps: string[]
}

export default function SolvePage() {
  const cam = useRef<Webcam>(null)
  const [open, setOpen] = useState(false)
  const [busy, setBusy] = useState(false)
  const [out, setOut] = useState<SolveResult | null>(null)
  const [crop, setCrop] = useState({ x: 0.1, y: 0.3, w: 0.8, h: 0.25 })
  const [dim, setDim] = useState({ w: 0, h: 0 })

  useEffect(() => {
    const onResize = () => {
      const el = document.getElementById('cam') as HTMLVideoElement | null
      if (!el) return
      const r = el.getBoundingClientRect()
      setDim({ w: r.width, h: r.height })
    }
    onResize()
    addEventListener('resize', onResize)
    return () => removeEventListener('resize', onResize)
  }, [])

  const capture = async () => {
    if (!cam.current) return
    setBusy(true)
    try {
      const dataUrl = cam.current.getScreenshot()
      const res = await solveProblem(dataUrl!)
      setOut(res)
      setOpen(true)
    } catch (error) {
      console.error('Error solving problem:', error)
      alert('Failed to solve. Please try again.')
    } finally {
      setBusy(false)
    }
  }

  return (
    <main className="mx-auto max-w-md">
      {/* Camera zone */}
      <div className="relative">
        <Webcam
          id="cam"
          ref={cam}
          screenshotFormat="image/jpeg"
          audio={false}
          videoConstraints={{ facingMode: 'environment' }}
          className="w-full h-[calc(100dvh-220px)] object-cover bg-black"
        />
        <CropOverlay crop={crop} setCrop={setCrop} containerSize={dim} />
      </div>

      {/* Bottom action bar */}
      <div className="sticky bottom-0 z-30">
        <div className="mx-auto max-w-md rounded-t-3xl bg-[#0c1116]/80 backdrop-blur text-white p-4 border-t border-white/10">
          <div className="text-sm opacity-80">Solver</div>
          <div className="text-xs opacity-60 -mt-1">Scan equations</div>
          <div className="mt-2 flex items-center justify-center">
            <Fab onClick={capture} busy={busy} />
          </div>
          <div className="mt-2 h-1 w-20 mx-auto rounded-full bg-white/30" />
        </div>
      </div>

      {/* Result bottom sheet */}
      <BottomSheet open={open} setOpen={setOpen}>
        <div className="px-4 pb-6">
          <h2 className="text-lg font-semibold text-brand-900">Solution</h2>
          {out ? (
            <div className="mt-3 space-y-4">
              <div className="text-xl font-mono bg-brand-surface p-3 rounded-lg">{out.latex}</div>
              <div className="space-y-3">
                {out.steps.map((s, i) => (
                  <div key={i}>
                    <div className="text-brand-900/80 font-semibold text-sm">
                      {s.split(':')[0]}
                    </div>
                    <div className="text-brand-900/70 text-sm">
                      {s.split(':').slice(1).join(':')}
                    </div>
                  </div>
                ))}
              </div>
              <div className="text-xl font-bold text-brand-700">Answer: {out.result}</div>
            </div>
          ) : (
            <div className="py-10 text-center text-sm text-brand-900/70">No result yet</div>
          )}
        </div>
      </BottomSheet>
    </main>
  )
}
