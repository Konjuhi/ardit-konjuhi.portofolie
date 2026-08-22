import { FunctionsFetchError, FunctionsHttpError } from '@supabase/supabase-js'
import { supabase } from './supabaseClient'

export const MAX_CHAT_CHARS = 1500
// Job descriptions are long; give the fit tool more room so requirements
// sections don't get cut off.
export const MAX_FIT_CHARS = 4000

export type AskType = 'chat' | 'fit-assessment'

export type AiFailureKind = 'capacity' | 'network' | 'unavailable'

const USER_MESSAGES: Record<AiFailureKind, string> = {
  capacity: 'The AI service is at capacity right now. Please try again later today or tomorrow.',
  network: 'Could not reach the AI service. Check your internet connection and try again.',
  unavailable: 'The AI assistant hit an unexpected problem. Please try again later.',
}

type FunctionErrorBody = {
  code?: unknown
  error?: unknown
}

function bodyCode(body: unknown): string | undefined {
  if (!body || typeof body !== 'object') {
    return undefined
  }
  const code = (body as FunctionErrorBody).code
  const message = (body as FunctionErrorBody).error
  if (code === 'capacity' || code === 'unavailable') {
    return code
  }
  if (typeof message === 'string' && message.toLowerCase().includes('at capacity')) {
    return 'capacity'
  }
  return undefined
}

async function readErrorBody(error: { context?: Response }, data: unknown): Promise<unknown> {
  if (data && typeof data === 'object') {
    return data
  }
  const response = error.context
  if (response && typeof response.clone === 'function') {
    try {
      return await response.clone().json()
    } catch {
      return null
    }
  }
  return null
}

function failureFrom(kind: AiFailureKind): Error {
  return new Error(USER_MESSAGES[kind])
}

export async function askAi(prompt: string, type: AskType): Promise<string> {
  if (!supabase) {
    throw new Error('The AI assistant is not configured yet.')
  }

  if (typeof navigator !== 'undefined' && navigator.onLine === false) {
    throw failureFrom('network')
  }

  const maxChars = type === 'fit-assessment' ? MAX_FIT_CHARS : MAX_CHAT_CHARS
  const trimmed = prompt.trim().slice(0, maxChars)

  try {
    const { data, error } = await supabase.functions.invoke('ask-ai', {
      body: { prompt: trimmed, type },
    })

    if (error) {
      if (error instanceof FunctionsFetchError) {
        throw failureFrom('network')
      }

      const body = await readErrorBody(error, data)
      const status = error instanceof FunctionsHttpError ? error.context.status : undefined
      const code = bodyCode(body)

      if (code === 'capacity' || status === 429) {
        throw failureFrom('capacity')
      }
      throw failureFrom('unavailable')
    }

    const answer = (data as { answer?: unknown })?.answer
    if (typeof answer !== 'string' || answer.length === 0) {
      throw failureFrom('unavailable')
    }

    return answer
  } catch (error) {
    if (error instanceof Error && Object.values(USER_MESSAGES).includes(error.message)) {
      throw error
    }
    throw failureFrom('network')
  }
}
