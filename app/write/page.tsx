'use client'
import { useState, type FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useBlogContext } from '@/context/blog'
import TiptapEditor from '@/components/common/editor'
import { TAGS } from '@/types'

export default function WritePage() {
   const router = useRouter()
   const { addBlog } = useBlogContext()
   const [title, setTitle] = useState('')
   const [authorName, setAuthorName] = useState('')
   const [content, setContent] = useState('')
   const [tag, setTag] = useState('')
   const [submitting, setSubmitting] = useState(false)

   const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      setSubmitting(true)
      const blog = await addBlog({ title, content, tag, authorName })
      if (blog) router.push(`/blog/${blog.id}`)
      else setSubmitting(false)
   }

   return (
      <div className="container narrow compose">
         <Link href="/" className="article__back">
            ← Back
         </Link>
         <p className="eyebrow">
            <span className="eyebrow__num">✎</span> New post
         </p>

         <form onSubmit={handleSubmit} className="compose__form">
            <input
               type="text"
               required
               placeholder="Title"
               value={title}
               onChange={(e) => setTitle(e.target.value)}
               className="compose__title"
               aria-label="Title"
            />

            <div className="compose__meta">
               <label className="field">
                  <span className="field__label">Author</span>
                  <input
                     type="text"
                     placeholder="Anonymous"
                     value={authorName}
                     onChange={(e) => setAuthorName(e.target.value)}
                     className="input"
                  />
               </label>
               <label className="field">
                  <span className="field__label">Category</span>
                  <select
                     className="select"
                     value={tag}
                     onChange={(e) => setTag(e.target.value)}
                     required
                  >
                     <option disabled value="">
                        Pick one
                     </option>
                     {TAGS.map((t) => (
                        <option key={t} value={t}>
                           {t}
                        </option>
                     ))}
                  </select>
               </label>
            </div>

            <TiptapEditor content={content} setContent={setContent} />

            <div className="compose__actions">
               <Link href="/" className="btn">
                  Cancel
               </Link>
               <button className="btn btn--solid" disabled={submitting}>
                  {submitting ? 'Publishing…' : 'Publish'}
               </button>
            </div>
         </form>
      </div>
   )
}
