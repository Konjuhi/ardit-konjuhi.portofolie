import type { ReactNode } from 'react'

const LINK_TOKEN = /\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)|(https?:\/\/[^\s)]+)/g

export function LinkedText({ text }: { text: string }) {
  const nodes: ReactNode[] = []
  let lastIndex = 0
  let key = 0

  for (const match of text.matchAll(LINK_TOKEN)) {
    const index = match.index ?? 0
    if (index > lastIndex) {
      nodes.push(text.slice(lastIndex, index))
    }

    const label = match[1]
    const href = match[2] ?? match[3]
    if (href) {
      nodes.push(
        <a key={key} className="chat-link" href={href} target="_blank" rel="noreferrer noopener">
          {label ?? href}
        </a>,
      )
      key += 1
    }

    lastIndex = index + match[0].length
  }

  if (lastIndex < text.length) {
    nodes.push(text.slice(lastIndex))
  }

  return <>{nodes}</>
}
