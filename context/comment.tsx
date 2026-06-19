'use client'
import { createContext, useContext, type ReactNode } from 'react'
import type { IComment } from '@/types'

type CommentContextType = {
   addComment: (comment: Partial<IComment>) => Promise<IComment | null>
   deleteComment: (id: string) => Promise<boolean>
}

const CommentContext = createContext<CommentContextType | null>(null)

export function CommentProvider({ children }: { children: ReactNode }) {
   async function addComment(comment: Partial<IComment>) {
      const res = await fetch('/api/comment', {
         method: 'POST',
         body: JSON.stringify(comment),
      })
      return res.ok ? ((await res.json()) as IComment) : null
   }

   async function deleteComment(id: string) {
      const res = await fetch(`/api/comment/${id}`, { method: 'DELETE' })
      return res.ok
   }

   return (
      <CommentContext.Provider value={{ addComment, deleteComment }}>
         {children}
      </CommentContext.Provider>
   )
}

export function useCommentContext() {
   const ctx = useContext(CommentContext)
   if (!ctx) throw new Error('useCommentContext must be used within CommentProvider')
   return ctx
}
