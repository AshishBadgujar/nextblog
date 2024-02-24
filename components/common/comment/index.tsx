"use client"
import { useCommentContext } from '@/context/comment'
import React, { useEffect, useState } from 'react'
import CommentCard from '../card/CommentCard'
import { IComment } from '@/data/interfaces'

export default function Comments({ currentUser, blog }: any) {
    const { addComment, deleteComment } = useCommentContext()
    const [text, setText] = useState('')
    const [comments, setComments] = useState<any[]>([])

    useEffect(() => {
        if (blog.comments) {
            setComments(blog.comments)
        }
    }, [blog])

    const onComment = async () => {
        let temp = await addComment({ text, blogId: blog._id, by: currentUser.id, })
        setComments([temp, ...comments])
        setText('')
    }
    const deleteThisComment = async (id: string) => {
        let temp = await deleteComment(id)
        if (temp) {
            setComments(comments.filter(i => i._id != id))
        }
    }

    const canDelete = (commentById: string) => {
        if (currentUser?.id == blog.author._id || currentUser?.id == commentById) {
            return true
        } else {
            false
        }
    }
    return (
        <>
            {currentUser &&
                <div className="py-6">
                    <h3 className='font-semibold text-xl mb-4'>
                        Write Comment</h3>
                    <textarea value={text} onChange={(e) => setText(e.target.value)} required className="textarea textarea-bordered h-24 w-full" placeholder="The blog is awesome!!!"></textarea>
                    <button className="btn btn-neutral mt-4" onClick={onComment}>Post</button>
                </div>
            }
            <h3 className='font-semibold text-2xl mb-4'>
                What People Says</h3>
            {comments.length > 0 ?
                comments.map((item: IComment, index: number) => <CommentCard key={index} comment={item} deleteComment={deleteThisComment} canDelete={canDelete} />)
                :
                <section className="flex justify-center items-center">
                    <p>No comments Yet</p>
                </section>
            }
        </>
    )
}
