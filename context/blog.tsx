'use client'
import {
   createContext,
   useCallback,
   useContext,
   useEffect,
   useState,
   type ReactNode,
} from 'react'
import type { IBlog } from '@/types'

type BlogContextType = {
   blogs: IBlog[]
   loading: boolean
   refresh: () => Promise<IBlog[]>
   getBlog: (id: string) => Promise<IBlog | null>
   addBlog: (blog: Partial<IBlog>) => Promise<IBlog | null>
   editBlog: (id: string, blog: Partial<IBlog>) => Promise<IBlog | null>
   deleteBlog: (id: string) => Promise<boolean>
}

const BlogContext = createContext<BlogContextType | null>(null)

export function BlogProvider({ children }: { children: ReactNode }) {
   const [blogs, setBlogs] = useState<IBlog[]>([])
   const [loading, setLoading] = useState(true)

   async function refresh() {
      const res = await fetch('/api/blog', { cache: 'no-store' })
      const data: IBlog[] = res.ok ? await res.json() : []
      setBlogs(data)
      setLoading(false)
      return data
   }

   useEffect(() => {
      refresh()
   }, [])

   async function getBlog(id: string) {
      const res = await fetch(`/api/blog/${id}`, { cache: 'no-store' })
      return res.ok ? ((await res.json()) as IBlog) : null
   }

   async function addBlog(blog: Partial<IBlog>) {
      const res = await fetch('/api/blog', {
         method: 'POST',
         body: JSON.stringify(blog),
      })
      if (!res.ok) return null
      const created: IBlog = await res.json()
      await refresh()
      return created
   }

   async function editBlog(id: string, blog: Partial<IBlog>) {
      const res = await fetch(`/api/blog/${id}`, {
         method: 'PATCH',
         body: JSON.stringify(blog),
      })
      if (!res.ok) return null
      const updated: IBlog = await res.json()
      setBlogs((prev) => prev.map((b) => (b.id === id ? { ...b, ...updated } : b)))
      return updated
   }

   async function deleteBlog(id: string) {
      const res = await fetch(`/api/blog/${id}`, { method: 'DELETE' })
      if (!res.ok) return false
      setBlogs((prev) => prev.filter((b) => b.id !== id))
      return true
   }

   return (
      <BlogContext.Provider
         value={{ blogs, loading, refresh, getBlog, addBlog, editBlog, deleteBlog }}
      >
         {children}
      </BlogContext.Provider>
   )
}

export function useBlogContext() {
   const ctx = useContext(BlogContext)
   if (!ctx) throw new Error('useBlogContext must be used within BlogProvider')
   return ctx
}
