"use client"
import React, { useCallback, useEffect, useState } from 'react'
import { useParams, usePathname, useRouter, useSearchParams } from 'next/navigation'
import FullBlog from '@/components/blog'
import { IBlog } from '@/data/interfaces'
import { useBlogContext } from '@/context/blog'

const page = () => {
   const params = useParams()
   const router = useRouter()
   const pathname = usePathname()
   const searchParams = useSearchParams()
   const id = params.id

   const editMode = searchParams.get('editMode')

   const [isEdit, setIsEdit] = useState<boolean>(JSON.parse(editMode || 'false'))
   const { getBlog, editBlog, deleteBlog } = useBlogContext()
   let mainBlog: IBlog = {
      title: '',
      content: ''
   }
   const [blog, setBlog] = useState<IBlog>({
      title: '',
      content: ''
   })
   const createQueryString = useCallback(
      (name: string, value: string) => {
         const params = new URLSearchParams(searchParams.toString())
         params.set(name, value)

         return params.toString()
      },
      [searchParams]
   )

   useEffect(() => {
      async function getThisBlog() {
         if (id) {
            let temp = await getBlog(String(id))
            mainBlog = temp
            setBlog(temp)
         }
      }
      getThisBlog()
   }, [id])

   const handleEdit = async () => {
      if (isEdit) {
         let temp = await editBlog(String(blog._id), { title: blog.title, content: blog.content })
         if (!temp) {
            setBlog(mainBlog)
         }
         setIsEdit(false)
         router.push(pathname + '?' + createQueryString('editMode', JSON.stringify(false)))
      } else {
         setIsEdit(true)
         router.push(pathname + '?' + createQueryString('editMode', JSON.stringify(true)))
      }
   }

   const handleDelete = async () => {
      if (id) {
         let temp = await deleteBlog(String(blog._id))
         if (temp) {
            router.push('/')
         }
      }
   }

   return (
      <main>
         <FullBlog blog={blog} setBlog={setBlog} isEdit={isEdit} handleEdit={handleEdit} handleDelete={handleDelete} />
      </main>
   )
}

export default page
