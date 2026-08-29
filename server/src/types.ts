export interface Block {
  time: string
  activity: string
  note: string
}

export interface DayPlan {
  summary: string
  blocks: Block[]
}
