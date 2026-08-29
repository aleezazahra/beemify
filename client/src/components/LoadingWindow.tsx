import { useEffect, useState } from 'react'

const statusMessages = [
  'reading your day...',
  'understanding your needs...',
  'building your plan...',
  'adding the magic touch...',
  'almost there...',
]

export default function LoadingWindow() {
  const [fillCount, setFillCount] = useState(0)
  const [statusMessage, setStatusMessage] = useState(statusMessages[0])
  const [messageIndex, setMessageIndex] = useState(0)

  useEffect(() => {
    const fillInterval = setInterval(() => {
      setFillCount((prev) => (prev < 10 ? prev + 1 : 10))
    }, 400)
    return () => clearInterval(fillInterval)
  }, [])

  useEffect(() => {
    const messageInterval = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % statusMessages.length)
      setStatusMessage(statusMessages[(messageIndex + 1) % statusMessages.length])
    }, 2000)
    return () => clearInterval(messageInterval)
  }, [messageIndex])

  return (
    <div className="retro-window max-w-md mx-auto">
      <div className="window-titlebar bg-mint">
        <div className="flex items-center gap-2 flex-1">
          <span>Generating Plan</span>
        </div>
        <div className="window-controls">
          <div className="control-dot" />
          <div className="control-dot" />
          <div className="control-dot" />
        </div>
      </div>

      <div className="p-8 space-y-6 text-center">
        <div className="heart-progress">
          {[...Array(10)].map((_, i) => (
            <div key={i} className={`heart-icon ${i < fillCount ? 'filled' : ''}`} />
          ))}
        </div>

        <p className="font-body text-sm h-6 text-gray-600 font-medium">
          {statusMessage}
        </p>
      </div>
    </div>
  )
}
