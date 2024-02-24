'use client'
import { IBlog } from '@/data/interfaces'
import React, { ReactNode, useContext, useEffect } from 'react'
import { createContext, useState } from 'react'


type postContextType = {
    blogs: IBlog[],
    getData: () => any;
    getBlog: (id: string) => any
    addBlog: (newBlog: any) => any;
    editBlog: (id: string, updatedBlog: any) => any;
    deleteBlog: (id: string) => any;
}

const postContextDefaultValues: postContextType = {
    blogs: [],
    getData: () => { },
    getBlog: () => { },
    addBlog: () => { },
    editBlog: () => { },
    deleteBlog: () => { },
}
const BlogContext = createContext<postContextType>(postContextDefaultValues)
type Props = {
    children: ReactNode;
}

export const BlogProvider = ({ children }: Props) => {
    const [blogs, setBlogs] = useState<IBlog[]>([]);

    async function getData() {
        const res = await fetch('/api/blog', { cache: 'reload' })
        if (!res.ok) {
            throw new Error('Failed to fetch data')
        }
        let temp = await res.json()
        setBlogs(temp)
        return temp
    }
    useEffect(() => {
        getData()
    }, [])

    const addBlog = async (newBlog: any) => {
        try {
            const response = await fetch("/api/blog/new", {
                method: "POST",
                body: JSON.stringify(newBlog)
            })
            if (response.ok) {
                let temp = await response.json()
                getData()
                return temp
            }
        } catch (error) {
            console.log(error)
            return null
        }
    }
    const getBlog = async (id: string) => {
        const res = await fetch(`/api/blog/${id}`)
        if (!res.ok) {
            throw new Error('Failed to fetch data')
        }
        let temp = await res.json()
        return temp
    }

    const editBlog = async (id: string, updatedBlog: any) => {
        try {
            const response = await fetch(`/api/blog/${id}`, {
                method: "PATCH",
                body: JSON.stringify(updatedBlog)
            })
            if (response.ok) {
                let temp = await response.json()
                setBlogs((prevBlogs: any[]) => {
                    return prevBlogs.map(post => {
                        if (post._id === id) {
                            return { ...post, ...updatedBlog };
                        }
                        return post;
                    });
                });
                return temp
            }
        } catch (error) {
            console.log(error)
            return null
        }
    }

    const deleteBlog = async (id: string) => {
        try {
            const response = await fetch(`/api/blog/${id}`, {
                method: "DELETE",
            })
            if (response.ok) {
                const updatedBlogs = blogs.filter((post: any) => post._id !== id);
                setBlogs(updatedBlogs);
                return true
            }
        } catch (error) {
            console.log(error)
            return false
        }
    }

    return (
        <BlogContext.Provider value={{
            blogs,
            getData,
            getBlog,
            addBlog,
            editBlog,
            deleteBlog
        }}>
            {children}
        </BlogContext.Provider>
    )
}

export const useBlogContext = () => useContext(BlogContext)
