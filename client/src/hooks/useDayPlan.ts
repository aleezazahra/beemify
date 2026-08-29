import { useState, useEffect, useCallback } from 'react'
import { DayPlan, DayInputState, SavedSession } from '../types'

const HISTORY_KEY = 'beemify-history'
const HISTORY_LIMIT = 6

function loadHistory(): SavedSession[] {
  try {
    const raw = localStorage.getItem(HISTORY_KEY)
    return raw ? (JSON.parse(raw) as SavedSession[]) : []
  } catch {
    return []
  }
}

export function useDayPlan() {
  const [state, setState] = useState<DayInputState>({
    status: 'idle',
    data: null,
    error: null,
  })
  const [history, setHistory] = useState<SavedSession[]>(loadHistory)

  useEffect(() => {
    localStorage.setItem(HISTORY_KEY, JSON.stringify(history))
  }, [history])

  const generateDay = useCallback(async (description: string) => {
    setState({ status: 'loading', data: null, error: null })
    try {
      const response = await fetch('/api/generate-day', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ description }),
      })
      if (!response.ok) {
        const body = await response.json().catch(() => null)
        throw new Error(body?.error || 'Failed to generate day plan')
      }
      const data: DayPlan = await response.json()
      setState({ status: 'success', data, error: null })
      setHistory((prev) =>
        [
          { description, plan: data, savedAt: Date.now() },
          ...prev,
        ].slice(0, HISTORY_LIMIT)
      )
    } catch (error) {
      setState({
        status: 'error',
        data: null,
        error: error instanceof Error ? error.message : 'Unknown error occurred',
      })
    }
  }, [])

  const regenerateBlock = useCallback(
    async (blockIndex: number) => {
      if (!state.data) return
      const oldPlan = state.data
      setState((prev) => ({ ...prev, status: 'loading' }))
      try {
        const response = await fetch('/api/regenerate-block', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            description: state.data.summary,
            existingBlocks: state.data.blocks,
            blockIndexToRegenerate: blockIndex,
          }),
        })
        if (!response.ok) {
          const body = await response.json().catch(() => null)
          throw new Error(body?.error || 'Failed to regenerate block')
        }
        const { block } = await response.json()
        const newBlocks = [...oldPlan.blocks]
        newBlocks[blockIndex] = block
        const newPlan: DayPlan = { ...oldPlan, blocks: newBlocks }
        setState({ status: 'success', data: newPlan, error: null })
        setHistory((prev) =>
          prev.map((s) =>
            s.plan.summary === oldPlan.summary ? { ...s, plan: newPlan } : s
          )
        )
      } catch (error) {
        setState((prev) => ({
          ...prev,
          status: 'error',
          error: error instanceof Error ? error.message : 'Unknown error occurred',
        }))
      }
    },
    [state.data]
  )

  const reset = useCallback(() => {
    setState({ status: 'idle', data: null, error: null })
  }, [])

  const loadSession = useCallback((session: SavedSession) => {
    setState({ status: 'success', data: session.plan, error: null })
  }, [])

  const removeSession = useCallback((savedAt: number) => {
    setHistory((prev) => prev.filter((s) => s.savedAt !== savedAt))
  }, [])

  return { ...state, history, generateDay, regenerateBlock, reset, loadSession, removeSession }
}
