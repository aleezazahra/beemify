export interface Block {
  time: string
  activity: string
  note: string
}

export interface DayPlan {
  summary: string
  blocks: Block[]
}

export interface DayInputState {
  status: 'idle' | 'loading' | 'success' | 'error'
  data: DayPlan | null
  error: string | null
}

export interface SavedSession {
  description: string
  plan: DayPlan
  savedAt: number
}
