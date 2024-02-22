"use client"
import React, { useCallback, useEffect, useState } from 'react'
import AuthorInfo from '../common/card/AuthorInfo'
import PostCard from '../common/card/PostCard'
import { signOut, useSession } from 'next-auth/react'
import { useUserContext } from '@/context/user'
import { IBlog, IUser } from '@/data/interfaces'
import { useParams, usePathname, useRouter, useSearchParams } from 'next/navigation'

export default function AuthorComponent() {
    const { data: session } = useSession()
    const params = useParams()
    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()
    const id = params.id

    const editMode = searchParams.get('editMode')

    const [isEdit, setIsEdit] = useState<boolean>(JSON.parse(editMode || 'false'))

    const { getUser, getBlogsByUserId, editUser, deleteUser } = useUserContext()

    const [user, setUser] = useState<IUser>()
    const [blogs, setBlogs] = useState<IBlog[]>([])

    let mainUser: IUser = {
        email: '',
        username: '',
        image: ''
    }

    const createQueryString = useCallback(
        (name: string, value: string) => {
            const params = new URLSearchParams(searchParams.toString())
            params.set(name, value)

            return params.toString()
        },
        [searchParams]
    )


    useEffect(() => {
        async function getUserData() {
            let temp = await getUser(session?.user.id)
            mainUser = temp
            setUser(temp)
            let temp2 = await getBlogsByUserId(session?.user.id)
            setBlogs(temp2)
        }
        session?.user && getUserData()
    }, [session])

    const handleEdit = async () => {
        if (isEdit) {
            let temp = await editUser(String(user?._id), { bio: user?.bio, fb: user?.fb, x: user?.x, insta: user?.insta, yt: user?.yt })
            if (!temp) {
                setUser(mainUser)
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
            let temp = await deleteUser(String(user?._id))
            if (temp) {
                signOut()
                router.push('/')
            }
        }
    }

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
