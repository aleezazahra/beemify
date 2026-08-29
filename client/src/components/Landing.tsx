import { useState, useEffect } from 'react'
import { SavedSession } from '../types'
import { DraggableWindow } from './DraggableWindow'

interface LandingProps {
  onStart: () => void
  history: SavedSession[]
  onOpenSession: (session: SavedSession) => void
  onRemoveSession: (savedAt: number) => void
}

function GitHubIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4" aria-hidden="true">
      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.905 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
    </svg>
  )
}

function HeartIcon() {
  return <span className="heart-beat inline-block mx-1" aria-hidden="true">💗</span>
}

function BeeAvatar() {
  return (
    <div className="bee-bob">
      <svg viewBox="0 0 120 100" className="w-36 h-30 mx-auto" aria-hidden="true">
        <g className="bee-wing bee-wing-left">
          <ellipse cx="42" cy="28" rx="16" ry="22" fill="white" opacity="0.85" stroke="#d1d5db" strokeWidth="2" />
        </g>
        <g className="bee-wing bee-wing-right">
          <ellipse cx="78" cy="28" rx="16" ry="22" fill="white" opacity="0.85" stroke="#d1d5db" strokeWidth="2" />
        </g>
        <ellipse cx="60" cy="58" rx="34" ry="28" fill="#F7A325" stroke="#374151" strokeWidth="3" />
        <path d="M52 31 q-6 27 0 54" stroke="#374151" strokeWidth="6" fill="none" strokeLinecap="round" />
        <path d="M68 31 q6 27 0 54" stroke="#374151" strokeWidth="6" fill="none" strokeLinecap="round" />
        <circle cx="48" cy="52" r="4" fill="#374151" />
        <circle cx="72" cy="52" r="4" fill="#374151" />
        <circle cx="49.5" cy="50.5" r="1.3" fill="white" />
        <circle cx="73.5" cy="50.5" r="1.3" fill="white" />
        <path d="M52 66 q8 6 16 0" stroke="#374151" strokeWidth="2.5" fill="none" strokeLinecap="round" />
        <circle cx="47" cy="65" r="3" fill="#F9A8D4" opacity="0.7" />
        <circle cx="73" cy="65" r="3" fill="#F9A8D4" opacity="0.7" />
        <line x1="94" y1="58" x2="108" y2="58" stroke="#374151" strokeWidth="4" strokeLinecap="round" />
        <path d="M28 20 l-6 -8 M34 16 l-2 -10" stroke="#374151" strokeWidth="2.5" strokeLinecap="round" />
        <circle cx="21" cy="11" r="2.5" fill="#E87A90" />
        <circle cx="31" cy="5" r="2.5" fill="#E87A90" />
      </svg>
    </div>
  )
}

export default function Landing({ onStart, history, onOpenSession, onRemoveSession }: LandingProps) {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 767px)')
    setIsMobile(mq.matches)
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  return (
    <div className="space-y-4">
      <DraggableWindow defaultX={isMobile ? 0.1 : 0.18} defaultY={0.04} zIndex={20}>
        <div className="retro-window flex flex-col">
          <div className="window-titlebar bg-blossom">
            <a
              href="https://github.com/aleezazahra"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-white hover:opacity-80 transition-opacity"
            >
              <GitHubIcon />
              <span className="text-xs">@aleezazahra</span>
            </a>
            <div className="flex items-center gap-3 ml-auto">
              <h1 className="font-chrome text-sm font-bold text-white tracking-wider">
                beemify
              </h1>
              <div className="window-controls">
                <button
                  type="button"
                  aria-label="Minimize"
                  className="w-4 h-4 flex items-center justify-center text-white text-[10px] font-bold hover:bg-white/25 rounded-sm transition-colors cursor-default"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" className="w-2.5 h-2.5" aria-hidden="true">
                    <path d="M5 12h14" />
                  </svg>
                </button>
                <button
                  type="button"
                  aria-label="Close"
                  className="w-4 h-4 flex items-center justify-center text-white hover:bg-white/25 rounded-sm transition-colors cursor-default"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" className="w-2.5 h-2.5" aria-hidden="true">
                    <path d="M6 6l12 12M18 6L6 18" />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          <div className="p-8 text-center space-y-6 flex-1 flex flex-col justify-center">
            <BeeAvatar />

            <div>
              <h2 className="font-display text-3xl font-bold text-gray-800 mb-2">
                Plan your perfect day
              </h2>
              <p className="font-body text-sm text-gray-600 max-w-md mx-auto">
                Tell the little bee about your mood and energy, and it will
                buzz back with a cozy 24-hour plan made just for you.
              </p>
            </div>

            <button onClick={onStart} className="retro-button-primary">
              Get Started
            </button>
          </div>
        </div>
      </DraggableWindow>

      <DraggableWindow defaultX={isMobile ? 0.1 : 0.55} defaultY={0.3} zIndex={15}>
        <div className="retro-window flex flex-col">
          <div className="window-titlebar bg-marigold">
            <div className="flex items-center gap-2 flex-1">
              <span>how it works</span>
            </div>
            <div className="window-controls">
              <div className="control-dot" />
              <div className="control-dot" />
              <div className="control-dot" />
            </div>
          </div>
          <div className="p-5 space-y-4">
            <p className="font-body text-sm text-gray-700 leading-relaxed">
              beemify turns a quick note about your day into a full 24-hour
              schedule. Write anything: how you feel, how much energy you have,
              what you absolutely must get done, or nothing at all. The little
              bee reads it and plans around your life.
            </p>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <span className="shrink-0 w-6 h-6 bg-blossom text-white font-chrome text-[10px] flex items-center justify-center rounded-full">1</span>
                <p className="font-body text-sm text-gray-700 leading-relaxed">
                  <span className="font-bold">Describe your day.</span> Type a few
                  lines about your mood, energy, plans, and must-dos. There is no
                  wrong way to write it.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <span className="shrink-0 w-6 h-6 bg-blossom text-white font-chrome text-[10px] flex items-center justify-center rounded-full">2</span>
                <p className="font-body text-sm text-gray-700 leading-relaxed">
                  <span className="font-bold">Get your plan.</span> The AI buzzes
                  back with a realistic, time-blocked schedule and a warm summary
                  that understands how you feel.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <span className="shrink-0 w-6 h-6 bg-blossom text-white font-chrome text-[10px] flex items-center justify-center rounded-full">3</span>
                <p className="font-body text-sm text-gray-700 leading-relaxed">
                  <span className="font-bold">Live your day.</span> Check blocks
                  off as you go, track your progress bar, regenerate any block you
                  do not vibe with, and revisit old plans anytime below.
                </p>
              </div>
            </div>
          </div>
        </div>
      </DraggableWindow>

      {history.length > 0 && (
        <DraggableWindow defaultX={isMobile ? 0.5 : 0.32} defaultY={0.62} zIndex={10}>
          <div className="retro-window">
            <div className="window-titlebar bg-mint">
              <div className="flex items-center gap-2 flex-1">
                <span>past plans</span>
              </div>
              <div className="window-controls">
                <div className="control-dot" />
                <div className="control-dot" />
                <div className="control-dot" />
              </div>
            </div>
            <div className="p-3 space-y-2">
              {history.map((session) => (
                <div
                  key={session.savedAt}
                  className="flex items-center gap-2 bg-pistachio/30 border-2 border-white rounded p-2"
                >
                  <button
                    onClick={() => onOpenSession(session)}
                    className="flex-1 min-w-0 text-left font-body text-xs text-gray-700 hover:text-gray-900 transition-colors"
                    title={session.description}
                  >
                    <span className="font-chrome text-[10px] text-gray-500 mr-2">
                      {new Date(session.savedAt).toLocaleDateString()}
                    </span>
                    {session.plan.summary.length > 70
                      ? `${session.plan.summary.slice(0, 70)}...`
                      : session.plan.summary}
                  </button>
                  <button
                    onClick={() => onRemoveSession(session.savedAt)}
                    aria-label="Remove session"
                    className="w-5 h-5 shrink-0 flex items-center justify-center text-gray-400 hover:text-red-500 transition-colors"
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" className="w-3 h-3" aria-hidden="true">
                      <path d="M6 6l12 12M18 6L6 18" />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          </div>
        </DraggableWindow>
      )}

      <p className="text-center font-body text-xs text-gray-500 pt-10">
        made with
        <HeartIcon />
        by aleeza
      </p>
    </div>
  )
}
