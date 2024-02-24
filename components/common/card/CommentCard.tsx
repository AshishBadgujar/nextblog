import moment from 'moment'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export default function CommentCard({ comment, deleteComment, canDelete }: any) {
    return (
        <div className="card w-full mb-2 border border-base-content/10 rounded-xl font-work">
            <div className="card-body gap-4">
                <div className="flex items-center justify-between gap-5 text-base-content/60 ">
                    <div className=" flex items-center gap-3">
                        <div className="avatar">
                            <div className="w-9 rounded-full">
                                <Image src={`${comment.by?.image}`} width={50} height={50} alt="avatar" />
                            </div>
                        </div>
                        <div>
                            <h5>
                                <Link
                                    href="/"
                                    className="text-base font-medium hover:text-primary transition hover:duration-300"
                                >
                                    {comment.by?.username}
                                </Link>
                            </h5>
                            <span className="text-base text-xs float-left">{moment(comment.updatedAt).format('MMMM D, YYYY')}</span>
                        </div>
                    </div>

                    {canDelete(comment.by._id) &&
                        <button className="btn btn-circle btn-sm btn-ghost text-error" onClick={() => deleteComment(comment._id)}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                                <path fill-rule="evenodd" d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z" clip-rule="evenodd" />
                            </svg>
                        </button>
                    }
                </div>
                <p>
                    {comment.text}
                </p>
            </div>
        </div>
    )
}
