import { useEffect, useState } from 'react'
import { DayPlan, Block } from '../types'

interface ResultWindowProps {
  plan: DayPlan
  onRegenerate: (blockIndex: number) => void
  onStartOver: () => void
}

const STORAGE_KEY = 'beemify-checklist'

const blockKey = (block: Block) => `${block.time}::${block.activity}`

function loadCompleted(): string[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? (JSON.parse(raw) as string[]) : []
  } catch {
    return []
  }
}

function CheckIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4" aria-hidden="true">
      <path d="M4 12.5l5.5 5.5L20 6.5" />
    </svg>
  )
}

export default function ResultWindow({
  plan,
  onRegenerate,
  onStartOver,
}: ResultWindowProps) {
  const [completed, setCompleted] = useState<Set<string>>(
    () => new Set(loadCompleted())
  )

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([...completed]))
  }, [completed])

  const toggle = (key: string) => {
    setCompleted((prev) => {
      const next = new Set(prev)
      if (next.has(key)) {
        next.delete(key)
      } else {
        next.add(key)
      }
      return next
    })
  }

  const total = plan.blocks.length
  const done = plan.blocks.filter((b) => completed.has(blockKey(b))).length
  const percent = total > 0 ? Math.round((done / total) * 100) : 0
  const allDone = total > 0 && done === total

  return (
    <div className="space-y-4">
      <div className="retro-window">
        <div className="window-titlebar bg-blossom">
          <div className="flex items-center gap-2 flex-1">
            <span>Your Perfect Day</span>
          </div>
          <div className="window-controls">
            <div className="control-dot" />
            <div className="control-dot" />
            <div className="control-dot" />
          </div>
        </div>

        <div className="p-5 space-y-4">
          <p className="font-body text-base text-gray-800 leading-relaxed">
            {plan.summary}
          </p>

          <div className="bg-pistachio/40 border-2 border-white rounded-lg p-3 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-chrome text-xs font-bold text-gray-700">
                PROGRESS
              </span>
              <span className="font-chrome text-xs font-bold text-gray-700">
                {done}/{total}
              </span>
            </div>
            <div className="h-4 bg-white border-2 border-gray-300 rounded-full overflow-hidden">
              <div
                className="h-full bg-blossom rounded-full transition-all duration-300"
                style={{ width: `${percent}%` }}
              />
            </div>
            {allDone && (
              <p className="font-display text-sm font-bold text-gray-800 text-center pt-1">
                All done! You earned your rest today.
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="space-y-3">
        {plan.blocks.map((block: Block, index: number) => {
          const key = blockKey(block)
          const isDone = completed.has(key)
          return (
            <div
              key={index}
              className={`retro-window p-4 flex items-start gap-3 transition-opacity duration-300 ${
                isDone ? 'opacity-60' : ''
              }`}
            >
              <button
                onClick={() => toggle(key)}
                aria-label={isDone ? 'Mark as not done' : 'Mark as done'}
                className={`w-6 h-6 shrink-0 mt-0.5 border-2 rounded-md flex items-center justify-center transition-colors duration-150 ${
                  isDone
                    ? 'bg-blossom border-blossom'
                    : 'bg-white border-gray-300 hover:border-blossom'
                }`}
              >
                {isDone && <CheckIcon />}
              </button>

              <div className="flex-1 min-w-0">
                <span className="inline-block px-2 py-0.5 bg-mint text-white font-chrome text-[10px] rounded mb-1.5">
                  {block.time}
                </span>
                <p
                  className={`font-display text-lg font-bold leading-snug transition-all duration-200 ${
                    isDone ? 'line-through text-gray-400' : 'text-gray-800'
                  }`}
                >
                  {block.activity}
                </p>
                <p
                  className={`font-body text-sm mt-1 leading-relaxed transition-all duration-200 ${
                    isDone ? 'text-gray-400' : 'text-gray-600'
                  }`}
                >
                  {block.note}
                </p>
                <button
                  onClick={() => onRegenerate(index)}
                  className="retro-button-secondary text-xs mt-3"
                >
                  Regenerate
                </button>
              </div>
            </div>
          )
        })}
      </div>

      <div className="text-center pb-2">
        <button onClick={onStartOver} className="retro-button-primary">
          Start Over
        </button>
      </div>
    </div>
  )
}
