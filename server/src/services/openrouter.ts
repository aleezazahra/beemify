interface OpenRouterMessage {
  role: 'user' | 'assistant' | 'system'
  content: string
}

interface OpenRouterRequest {
  model: string
  messages: OpenRouterMessage[]
  temperature?: number
  max_tokens?: number
}

interface OpenRouterResponse {
  id: string
  object: string
  created: number
  model: string
  choices: Array<{
    index: number
    message: {
      role: string
      content: string
    }
    finish_reason: string
  }>
  usage: {
    prompt_tokens: number
    completion_tokens: number
  }
}

export async function callOpenRouter(
  systemPrompt: string,
  userPrompt: string,
  model: string,
  apiKey: string
): Promise<string> {
  const messages: OpenRouterMessage[] = [
    { role: 'system', content: systemPrompt },
    { role: 'user', content: userPrompt },
  ]

  const payload: OpenRouterRequest = {
    model,
    messages,
    temperature: 0.7,
    max_tokens: 1024,
  }

  const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify(payload),
  })

  if (!response.ok) {
    let detail = response.statusText
    try {
      const body = await response.json() as { error?: { message?: string } }
      if (body?.error?.message) detail = body.error.message
    } catch {
      // ignore body parse errors, fall back to statusText
    }
    if (response.status === 401) {
      throw new Error(`OpenRouter auth failed (401): check OPENROUTER_API_KEY. ${detail}`)
    }
    if (response.status === 404) {
      throw new Error(`OpenRouter model not found (404): "${model}" is unavailable. ${detail}`)
    }
    if (response.status === 429) {
      throw new Error(`OpenRouter rate limited (429). ${detail}`)
    }
    throw new Error(`OpenRouter API error (${response.status}): ${detail}`)
  }

  const data = await response.json() as OpenRouterResponse
  const content = data.choices[0]?.message?.content

  if (!content) {
    throw new Error('No response content from OpenRouter')
  }

  return content
}

export function parseJSON<T>(jsonString: string): T {
  const trimmed = jsonString.trim()
  const startIndex = trimmed.indexOf('{')
  const endIndex = trimmed.lastIndexOf('}')

  if (startIndex === -1 || endIndex === -1) {
    throw new Error('Invalid JSON: no object found')
  }

  const extractedJSON = trimmed.substring(startIndex, endIndex + 1)
  return JSON.parse(extractedJSON) as T
}
