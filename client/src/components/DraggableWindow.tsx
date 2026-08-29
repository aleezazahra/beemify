import { useState, useRef, useCallback, useEffect } from 'react'

interface DraggableWindowProps {
  children: React.ReactNode
  defaultX?: number
  defaultY?: number
  zIndex?: number
}

export function DraggableWindow({
  children,
  defaultX = 0.5,
  defaultY = 0.08,
  zIndex = 10,
}: DraggableWindowProps) {
  const [pos, setPos] = useState({ x: 0, y: 0 })
  const [dragging, setDragging] = useState(false)
  const dragOffset = useRef({ x: 0, y: 0 })
  const startPos = useRef({ x: 0, y: 0 })
  const elRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (elRef.current) {
      const w = elRef.current.offsetWidth
      setPos({
        x: Math.max(0, Math.min(window.innerWidth - w, window.innerWidth * defaultX - w / 2)),
        y: Math.max(10, window.innerHeight * defaultY),
      })
    }
  }, [defaultX, defaultY])

  const onDown = useCallback(
    (e: React.PointerEvent) => {
      const titlebar = (e.target as HTMLElement).closest('.window-titlebar')
      if (!titlebar) return
      e.preventDefault()
      setDragging(true)
      startPos.current = { x: e.clientX, y: e.clientY }
      dragOffset.current = { x: pos.x, y: pos.y }
    },
    [pos]
  )

  useEffect(() => {
    if (!dragging) return
    const onMove = (e: PointerEvent) => {
      const dx = e.clientX - startPos.current.x
      const dy = e.clientY - startPos.current.y
      const w = elRef.current.offsetWidth
      const h = elRef.current.offsetHeight
      setPos({
        x: Math.max(0, Math.min(window.innerWidth - w, dragOffset.current.x + dx)),
        y: Math.max(0, Math.min(window.innerHeight - h, dragOffset.current.y + dy)),
      })
    }
    const onUp = () => setDragging(false)
    window.addEventListener('pointermove', onMove)
    window.addEventListener('pointerup', onUp)
    return () => {
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerup', onUp)
    }
  }, [dragging])

  return (
    <div
      ref={elRef}
      className={`draggable-window ${dragging ? 'cursor-grabbing' : 'cursor-grab'}`}
      style={{
        position: 'fixed',
        left: `${pos.x}px`,
        top: `${pos.y}px`,
        transform: 'none',
        zIndex: dragging ? 50 : zIndex,
        width: 'min(90vw, 520px)',
        maxWidth: '90vw',
        touchAction: 'none',
        userSelect: dragging ? 'none' : undefined,
        transition: dragging ? 'none' : 'left 0.18s ease, top 0.18s ease',
      }}
      onPointerDown={onDown}
    >
      {children}
    </div>
  )
}