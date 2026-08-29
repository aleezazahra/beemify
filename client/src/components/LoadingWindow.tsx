import { useEffect, useState } from 'react'

const commands = [
  'run vibes.exe --read-day',
  'reading your description...',
  'analyzing energy levels...',
  'loading cozy_activities.dll',
  'balancing work and rest...',
  'brewing motivation...',
  'sprinkling pixel dust...',
  'rendering your perfect day...',
]

export default function LoadingWindow() {
  const [fillCount, setFillCount] = useState(0)
  const [cmdIndex, setCmdIndex] = useState(0)

  useEffect(() => {
    const fillInterval = setInterval(() => {
      setFillCount((prev) => (prev < 10 ? prev + 1 : 10))
    }, 400)
    return () => clearInterval(fillInterval)
  }, [])

  useEffect(() => {
    const cmdInterval = setInterval(() => {
      setCmdIndex((prev) => (prev + 1) % commands.length)
    }, 1200)
    return () => clearInterval(cmdInterval)
  }, [])

  return (
    <div className="retro-window max-w-md mx-auto">
        <div className="window-titlebar bg-mint">
          <div className="flex items-center gap-2 flex-1">
            <span>Generating Plan</span>
          </div>
        </div>

      <div className="p-8 space-y-6 text-center">
        <div className="heart-progress">
          {[...Array(10)].map((_, i) => (
            <div key={i} className={`pixel-heart ${i < fillCount ? '' : 'empty'}`} />
          ))}
        </div>

        <div className="text-left bg-gray-900 border-2 border-gray-600 rounded p-3">
          <p className="font-chrome text-[10px] text-green-400 break-all">
            C:\beemify&gt; {commands[cmdIndex]}
            <span className="terminal-cursor" aria-hidden="true" />
          </p>
        </div>
      </div>
    </div>
  )
}
