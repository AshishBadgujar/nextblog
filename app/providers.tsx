'use client'
import type { ReactNode } from 'react'
import { BlogProvider } from '@/context/blog'
import { CommentProvider } from '@/context/comment'

export default function Providers({ children }: { children: ReactNode }) {
   return (
      <BlogProvider>
         <CommentProvider>{children}</CommentProvider>
      </BlogProvider>
   )
}
