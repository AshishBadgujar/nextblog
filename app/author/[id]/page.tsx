"use client"
import AuthorComponent from '@/components/author'
import { useUserContext } from '@/context/user'
import { IBlog, IUser } from '@/data/interfaces'
import { signOut, useSession } from 'next-auth/react'
import { useParams, usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useCallback, useEffect, useState } from 'react'

const Page = () => {
    const router = useRouter()
    const pathname = usePathname()
    const params = useParams()
    const searchParams = useSearchParams()
    let id = params.id

    const editMode = searchParams.get('editMode')

    const [isEdit, setIsEdit] = useState<boolean>(JSON.parse(editMode || 'false'))

    const { getUser, getBlogsByUserId, editUser, deleteUser } = useUserContext()

    const [user, setUser] = useState<IUser>()
    const [blogs, setBlogs] = useState<IBlog[]>([])

    let mainUser: IUser = {
        _id: '',
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
            let temp = await getUser(String(id))
            mainUser = temp
            setUser(temp)
            let temp2 = await getBlogsByUserId(String(id))
            setBlogs(temp2)
        }
        getUserData()
    }, [])

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
        if (user._id) {
            let temp = await deleteUser(String(user?._id))
            if (temp) {
                signOut()
                router.push('/')
            }
        }
    }

    return (
        <main>
            <AuthorComponent isEdit={isEdit} user={user} setUser={setUser} handleEdit={handleEdit} handleDelete={handleDelete} blogs={blogs} />
        </main>
    )
}

export default Page
