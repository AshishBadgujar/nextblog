'use client'
import { useEffect, useMemo, useRef, useState } from 'react'
import Link from 'next/link'
import { useBlogContext } from '@/context/blog'

interface Props {
   open: boolean
   onClose: () => void
}

export default function SearchModal({ open, onClose }: Props) {
   const { blogs } = useBlogContext()
   const [query, setQuery] = useState('')
   const inputRef = useRef<HTMLInputElement>(null)

   useEffect(() => {
      if (!open) return
      setQuery('')
      const id = window.setTimeout(() => inputRef.current?.focus(), 0)
      const onKey = (e: KeyboardEvent) => {
         if (e.key === 'Escape') onClose()
      }
      document.addEventListener('keydown', onKey)
      document.body.style.overflow = 'hidden'
      return () => {
         window.clearTimeout(id)
         document.removeEventListener('keydown', onKey)
         document.body.style.overflow = ''
      }
   }, [open, onClose])

   const term = query.trim().toLowerCase()
   const results = useMemo(() => {
      const list = term
         ? blogs.filter((b) =>
              [b.title, b.tag, b.authorName, b.content]
                 .filter(Boolean)
                 .join(' ')
                 .toLowerCase()
                 .includes(term)
           )
         : blogs
      return list.slice(0, 8)
   }, [blogs, term])

   if (!open) return null

   return (
      <div className="search-modal" onMouseDown={onClose} role="dialog" aria-modal="true" aria-label="Search posts">
         <div className="search-modal__panel" onMouseDown={(e) => e.stopPropagation()}>
            <div className="search-modal__field">
               <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
                  <circle cx="9" cy="9" r="6" stroke="currentColor" strokeWidth="1.6" />
                  <path d="M13.5 13.5 17 17" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
               </svg>
               <input
                  ref={inputRef}
                  className="search-modal__input"
                  type="search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search posts…"
                  aria-label="Search posts"
               />
               <button type="button" className="search-modal__esc" onClick={onClose}>
                  Esc
               </button>
            </div>

            <div className="search-modal__results">
               {results.length > 0 ? (
                  results.map((b) => (
                     <Link
                        key={b.id}
                        href={`/blog/${b.id}`}
                        className="search-result"
                        onClick={onClose}
                     >
                        <span className="search-result__title">{b.title}</span>
                        <span className="search-result__meta">
                           {b.tag} · {b.authorName}
                        </span>
                     </Link>
                  ))
               ) : (
                  <p className="search-modal__empty">No posts match “{query.trim()}”.</p>
               )}
            </div>
         </div>
      </div>
   )
}
