import { supabase } from './supabaseClient'

export const MAX_CHAT_CHARS = 1500
// Job descriptions are long; give the fit tool more room so requirements
// sections don't get cut off.
export const MAX_FIT_CHARS = 4000

export type AskType = 'chat' | 'fit-assessment'

export async function askAi(prompt: string, type: AskType): Promise<string> {
  if (!supabase) {
    throw new Error('The AI assistant is not configured yet.')
  }

  const maxChars = type === 'fit-assessment' ? MAX_FIT_CHARS : MAX_CHAT_CHARS
  const trimmed = prompt.trim().slice(0, maxChars)

  const { data, error } = await supabase.functions.invoke('ask-ai', {
    body: { prompt: trimmed, type },
  })

  if (error) {
    throw new Error('The AI assistant is unavailable right now. Please try again later.')
  }

  const answer = (data as { answer?: unknown })?.answer
  if (typeof answer !== 'string' || answer.length === 0) {
    throw new Error('The AI assistant returned an empty response.')
  }

  return answer
}
