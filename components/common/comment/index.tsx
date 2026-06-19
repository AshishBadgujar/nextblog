'use client'
import { useEffect, useState } from 'react'
import { useCommentContext } from '@/context/comment'
import CommentCard from '../card/CommentCard'
import type { IBlog, IComment } from '@/types'

export default function Comments({ blog }: { blog: IBlog }) {
   const { addComment, deleteComment } = useCommentContext()
   const [name, setName] = useState('')
   const [text, setText] = useState('')
   const [comments, setComments] = useState<IComment[]>([])

   useEffect(() => {
      setComments(blog.comments || [])
   }, [blog])

   const onComment = async () => {
      if (!text.trim() || !blog.id) return
      const created = await addComment({ blogId: blog.id, name, text })
      if (created) {
         setComments((prev) => [created, ...prev])
         setText('')
         setName('')
      }
   }

   const onDelete = async (id: string) => {
      const ok = await deleteComment(id)
      if (ok) setComments((prev) => prev.filter((c) => c.id !== id))
   }

   return (
      <section className="comments">
         <h3 className="comments__head">
            Discussion
            <span className="comments__count">{comments.length}</span>
         </h3>

         <div className="comment-form">
            <input
               value={name}
               onChange={(e) => setName(e.target.value)}
               className="input"
               placeholder="Your name (optional)"
            />
            <textarea
               value={text}
               onChange={(e) => setText(e.target.value)}
               className="textarea"
               rows={5}
               placeholder="Add to the conversation…"
            />
            <div className="comment-form__row">
               <button className="btn btn--solid" onClick={onComment} disabled={!text.trim()}>
                  Post comment
               </button>
            </div>
         </div>

         {comments.length > 0 ? (
            <div className="comment-list">
               {comments.map((comment) => (
                  <CommentCard key={comment.id} comment={comment} deleteComment={onDelete} />
               ))}
            </div>
         ) : (
            <p className="muted">No comments yet — be the first.</p>
         )}
      </section>
   )
}
