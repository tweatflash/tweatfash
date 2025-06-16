'use client'

import { useEffect, useRef, useState } from 'react'

export default function LiveSearch() {
  const [query, setQuery]     = useState('')
  const [results, setResults] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const abortRef = useRef<AbortController | null>(null)

  useEffect(() => {
    // 1️⃣ Ignore empty queries
    if (!query.trim()) { setResults([]); return }

    // 2️⃣ Debounce: fire only after 300 ms of silence
    const id = setTimeout(() => {
      // 3️⃣ Cancel the previous in-flight request (if any)
      abortRef.current?.abort()
      const controller = new AbortController()
      abortRef.current = controller
      setLoading(true)

      fetch(`/api/search?q=${encodeURIComponent(query)}`, {
        signal: controller.signal,
        cache : 'no-store',          // keep it dynamic
      })
        .then(r => r.json())
        .then(data => setResults(data))
        .catch(err => {
          if (err.name !== 'AbortError') console.error(err)
        })
        .finally(() => setLoading(false))
    }, 300)

    // Cleanup for the debounce timer
    return () => clearTimeout(id)
  }, [query])

  return (
    <>
      <input
        value={query}
        onChange={e => setQuery(e.target.value)}
        placeholder="Search…"
        className="w-full rounded border px-3 py-2"
      />

      {loading && <p className="text-xs text-zinc-500">Searching…</p>}

      <ul className="mt-2 space-y-1">
        {results.map((item: any) => (
          <li key={item.id} className="rounded bg-zinc-100 p-2">
            {item.title}
          </li>
        ))}
      </ul>
    </>
  )
}