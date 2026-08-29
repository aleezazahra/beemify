import { useEffect } from 'react'
import { Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom'
import { useDayPlan } from '../hooks/useDayPlan'
import Landing from './Landing'
import DayInputWindow from './DayInputWindow'
import LoadingWindow from './LoadingWindow'
import ResultWindow from './ResultWindow'
import ErrorDialog from './ErrorDialog'
import MusicPlayer from './MusicPlayer'

export default function App() {
  const { status, data, error, history, generateDay, regenerateBlock, reset, loadSession, removeSession } = useDayPlan()
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    if (status === 'success') navigate('/result')
    if (status === 'error') navigate('/error')
  }, [status, navigate])

  const handleStartOver = () => {
    reset()
    navigate('/')
  }

  return (
    <div className="min-h-screen bg-dusk-gradient flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-yellow-300 rounded-full star"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
            }}
          />
        ))}
      </div>

      <div className={`relative z-10 w-full ${location.pathname === '/' ? 'max-w-4xl' : 'max-w-2xl'}`}>
        {location.pathname !== '/' && (
          <button
            onClick={() => navigate(-1)}
            className="retro-button-secondary text-xs mb-4"
          >
            Back
          </button>
        )}

        <Routes>
          <Route
            path="/"
            element={
              <Landing
                onStart={() => navigate('/describe')}
                history={history}
                onOpenSession={loadSession}
                onRemoveSession={removeSession}
              />
            }
          />

          <Route
            path="/describe"
            element={
              status === 'loading'
                ? <Navigate to="/generating" replace />
                : (
                  <DayInputWindow
                    onGenerate={(desc) => {
                      generateDay(desc)
                      navigate('/generating')
                    }}
                  />
                )
            }
          />

          <Route
            path="/generating"
            element={
              status === 'loading' && !data
                ? <LoadingWindow />
                : data
                  ? <Navigate to="/result" replace />
                  : <Navigate to="/" replace />
            }
          />

          <Route
            path="/result"
            element={
              data && status !== 'error'
                ? <ResultWindow plan={data} onRegenerate={regenerateBlock} onStartOver={handleStartOver} />
                : status === 'error'
                  ? <Navigate to="/error" replace />
                  : <Navigate to="/" replace />
            }
          />

          <Route
            path="/error"
            element={
              status === 'error' && error
                ? <ErrorDialog message={error} onClose={handleStartOver} />
                : <Navigate to="/" replace />
            }
          />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>

      <MusicPlayer />
    </div>
  )
}
