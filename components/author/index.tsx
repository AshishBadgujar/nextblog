"use client"
import React, { useEffect, useState } from 'react'
import AuthorInfo from '../common/card/AuthorInfo'
import PostCard from '../common/card/PostCard'
import { useSession } from 'next-auth/react'
import { useUserContext } from '@/context/user'
import { IBlog, IUser } from '@/data/interfaces'

export default function AuthorComponent() {
    const { data: session } = useSession()
    const { getUser, getBlogsByUserId } = useUserContext()

    const [user, setUser] = useState<IUser>()
    const [blogs, setBlogs] = useState<IBlog[]>([])
    useEffect(() => {
        async function getUserData() {
            let temp = await getUser(session?.user.id)
            setUser(temp)
            let temp2 = await getBlogsByUserId(session?.user.id)
            setBlogs(temp2)
        }
        session?.user && getUserData()
    }, [session])
    return (
        <>
            {user ?
                <>
                    <section>
                        <AuthorInfo user={user} />
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
                <span className="loading loading-spinner loading-lg"></span>
            }
        </>

    )
}
