import { useEffect, useRef, useState } from 'react'

const TRACKS = [
  { title: 'bee tune 01', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3' },
  { title: 'bee tune 02', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3' },
  { title: 'bee tune 03', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3' },
  { title: 'bee tune 04', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3' },
  { title: 'bee tune 05', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3' },
  { title: 'bee tune 06', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3' },
]

function PlayIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 ml-0.5" aria-hidden="true">
      <path d="M7 4.5v15l13-7.5-13-7.5z" />
    </svg>
  )
}

function PauseIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4" aria-hidden="true">
      <path d="M6 4h4v16H6zM14 4h4v16h-4z" />
    </svg>
  )
}

function PrevIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5" aria-hidden="true">
      <path d="M6 6h2v12H6zM18 6l-9 6 9 6V6z" />
    </svg>
  )
}

function NextIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5" aria-hidden="true">
      <path d="M16 6h2v12h-2zM6 6l9 6-9 6V6z" />
    </svg>
  )
}

export default function MusicPlayer() {
  const audioRef = useRef<HTMLAudioElement>(null)
  const [index, setIndex] = useState(0)
  const [playing, setPlaying] = useState(false)
  const [error, setError] = useState(false)

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return
    if (playing) {
      audio.play().catch(() => {
        setPlaying(false)
        setError(true)
      })
    } else {
      audio.pause()
    }
  }, [playing, index])

  const skip = (dir: number) => {
    setIndex((prev) => (prev + dir + TRACKS.length) % TRACKS.length)
    setError(false)
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 w-44 sm:w-52 retro-window border-blossom shadow-xl">
      <div className="window-titlebar bg-blossom text-white">
        <span className="font-chrome text-[10px]">beemify radio</span>
        <div className="window-controls">
          <div className="control-dot" />
          <div className="control-dot" />
          <div className="control-dot" />
        </div>
      </div>

      <div className="p-2 space-y-2 bg-white">
        <div className="flex items-center gap-2">
          <div className={`eq ${playing && !error ? 'eq-playing' : ''}`} aria-hidden="true">
            <span /><span /><span /><span />
          </div>
          <p
            className="font-chrome text-[10px] text-gray-700 truncate flex-1"
            title={error ? 'stream hiccup, try again' : TRACKS[index].title}
          >
            {error ? 'stream hiccup...' : TRACKS[index].title}
          </p>
        </div>

        <div className="flex items-center justify-center gap-2">
          <button onClick={() => skip(-1)} className="mp-btn" aria-label="Previous track">
            <PrevIcon />
          </button>
          <button
            onClick={() => {
              setError(false)
              setPlaying((p) => !p)
            }}
            className="mp-btn mp-btn-main"
            aria-label={playing ? 'Pause' : 'Play'}
          >
            {playing ? <PauseIcon /> : <PlayIcon />}
          </button>
          <button onClick={() => skip(1)} className="mp-btn" aria-label="Next track">
            <NextIcon />
          </button>
        </div>
      </div>

      <audio
        ref={audioRef}
        src={TRACKS[index].url}
        onEnded={() => setIndex((i) => (i + 1) % TRACKS.length)}
        preload="none"
      />
    </div>
  )
}
