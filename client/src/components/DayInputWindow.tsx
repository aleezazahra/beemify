import { useState } from 'react'
import { DraggableWindow } from './DraggableWindow'

interface DayInputWindowProps {
  onGenerate: (description: string) => void
}

export default function DayInputWindow({ onGenerate }: DayInputWindowProps) {
  const [input, setInput] = useState('')

  const handleSubmit = () => {
    if (input.trim()) {
      onGenerate(input)
    }
  }

  return (
    <DraggableWindow defaultX={0.5} defaultY={0.2} zIndex={20}>
      <div className="retro-window">
        <div className="window-titlebar bg-blossom">
          <div className="flex items-center gap-2 flex-1">
            <span>Describe Your Day</span>
          </div>
          <div className="window-controls">
            <div className="control-dot" />
            <div className="control-dot" />
            <div className="control-dot" />
          </div>
        </div>

        <div className="p-6 space-y-4">
          <p className="font-body text-sm text-gray-700">
            Tell me about your day! Share your mood, energy level, must-dos, or anything else that matters.
          </p>

          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault()
                handleSubmit()
              }
            }}
            placeholder="I'm feeling energetic today and have a meeting at 2pm, but I want to make sure I get some rest too..."
            className="retro-textarea h-32 resize-none"
          />

          <div className="flex justify-center pt-4">
            <button
              onClick={handleSubmit}
              disabled={!input.trim()}
              className="retro-button-primary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Generate My Day
            </button>
          </div>
        </div>
      </div>
    </DraggableWindow>
  )
}
