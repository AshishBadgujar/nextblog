"use client"
import React, from 'react'
import AuthorInfo from '../common/card/AuthorInfo'
import PostCard from '../common/card/PostCard'

export default function AuthorComponent({ user, isEdit, setUser, handleEdit, handleDelete, blogs }) {
    return (
        <>
            {user ?
                <>
                    <section>
                        <AuthorInfo isEdit={isEdit} user={user} setUser={setUser} handleEdit={handleEdit} handleDelete={handleDelete} />
                    </section>

                    <section>
                        <div className="container mx-auto mt-12 mb-24 px-5 sm:px-0">
                            <h3 className="text-base-content font-bold text-2xl mb-8">
                                Latest Post
                            </h3>
                            <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                                {blogs.map(
                                    (item: any, index: number) => (
                                        <div key={index}>
                                            <PostCard blog={item} />
                                        </div>
                                    )
                                )}
                            </div>
                        </div>
                    </section>
                </>
                :
                <section className="h-screen flex justify-center items-center">
                    <progress className="progress w-12"></progress>
                </section>
            }
        </>

    )
}
