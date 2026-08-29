import { Router, Request, Response } from 'express'
import { DayPlan, Block } from '../types.js'
import {
  dayPlanSystemPrompt,
  regenerateBlockSystemPrompt,
  buildDayPlanPrompt,
  buildRegenerateBlockPrompt,
} from '../prompts/dayPlan.js'
import { callOpenRouter, parseJSON } from '../services/openrouter.js'

const router = Router()
const apiKey = process.env.OPENROUTER_API_KEY || ''
const model = process.env.MODEL || 'meta-llama/llama-3.3-70b-instruct'

router.post('/generate-day', async (req: Request, res: Response) => {
  try {
    const { description } = req.body

    if (!description || typeof description !== 'string') {
      res.status(400).json({ error: 'Missing or invalid description' })
      return
    }

    if (!apiKey) {
      res.status(500).json({ error: 'API key not configured' })
      return
    }

    const userPrompt = buildDayPlanPrompt(description)

    let content = await callOpenRouter(dayPlanSystemPrompt, userPrompt, model, apiKey)

    let plan: DayPlan
    try {
      plan = parseJSON<DayPlan>(content)
    } catch {
      const stricter = `${dayPlanSystemPrompt}\n\nRETRY: Return ONLY the JSON object, nothing else. No markdown, no explanation.`
      content = await callOpenRouter(stricter, userPrompt, model, apiKey)
      plan = parseJSON<DayPlan>(content)
    }

    if (!plan.summary || !Array.isArray(plan.blocks) || plan.blocks.length === 0) {
      throw new Error('Invalid day plan structure')
    }

    res.json(plan)
  } catch (error) {
    console.error('Error generating day plan:', error)
    const message = error instanceof Error ? error.message : 'Failed to generate day plan'
    res.status(500).json({ error: message })
  }
})

router.post('/regenerate-block', async (req: Request, res: Response) => {
  try {
    const { description, existingBlocks, blockIndexToRegenerate } = req.body

    if (!description || !Array.isArray(existingBlocks) || typeof blockIndexToRegenerate !== 'number') {
      res.status(400).json({ error: 'Missing or invalid parameters' })
      return
    }

    if (blockIndexToRegenerate < 0 || blockIndexToRegenerate >= existingBlocks.length) {
      res.status(400).json({ error: 'Invalid block index' })
      return
    }

    if (!apiKey) {
      res.status(500).json({ error: 'API key not configured' })
      return
    }

    const userPrompt = buildRegenerateBlockPrompt(description, existingBlocks, blockIndexToRegenerate)

    let content = await callOpenRouter(regenerateBlockSystemPrompt, userPrompt, model, apiKey)

    let response: { block: Block }
    try {
      response = parseJSON<{ block: Block }>(content)
    } catch {
      const stricter = `${regenerateBlockSystemPrompt}\n\nRETRY: Return ONLY the JSON object, nothing else. No markdown, no explanation.`
      content = await callOpenRouter(stricter, userPrompt, model, apiKey)
      response = parseJSON<{ block: Block }>(content)
    }

    if (!response.block || !response.block.time || !response.block.activity || !response.block.note) {
      throw new Error('Invalid block structure')
    }

    res.json(response)
  } catch (error) {
    console.error('Error regenerating block:', error)
    const message = error instanceof Error ? error.message : 'Failed to regenerate block'
    res.status(500).json({ error: message })
  }
})

export default router
