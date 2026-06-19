'use client'
import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import FullBlog from '@/components/blog'
import { useBlogContext } from '@/context/blog'
import type { IBlog } from '@/types'

export default function BlogPage() {
   const params = useParams()
   const router = useRouter()
   const id = String(params.id)
   const { getBlog, editBlog, deleteBlog } = useBlogContext()

   const [blog, setBlog] = useState<IBlog>({ title: '', content: '' })
   const [original, setOriginal] = useState<IBlog | null>(null)
   const [isEdit, setIsEdit] = useState(false)

   useEffect(() => {
      let active = true
      getBlog(id).then((data) => {
         if (active && data) {
            setBlog(data)
            setOriginal(data)
         }
      })
      return () => {
         active = false
      }
   }, [id])

   const handleEdit = async () => {
      if (isEdit) {
         const updated = await editBlog(id, {
            title: blog.title,
            content: blog.content,
         })
         if (!updated && original) setBlog(original)
         setIsEdit(false)
      } else {
         setIsEdit(true)
      }
   }

   const handleDelete = async () => {
      const ok = await deleteBlog(id)
      if (ok) router.push('/')
   }

   return (
      <FullBlog
         blog={blog}
         setBlog={setBlog}
         isEdit={isEdit}
         handleEdit={handleEdit}
         handleDelete={handleDelete}
      />
   )
}
