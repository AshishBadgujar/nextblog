"use client"
import React, { useEffect, useState } from 'react'
import BannerCard from '../common/card/BannerCard'
import PostCard from '../common/card/PostCard'
import Link from 'next/link'
import { useBlogContext } from '@/context/blog'
import { IBlog } from '@/data/interfaces'

export default function Feed() {
    const { blogs } = useBlogContext()
    const [myBlogs, setMyBlogs] = useState<IBlog[]>([])
    useEffect(() => {
        setMyBlogs(blogs)
    }, [blogs])
    return (
        <>
            {myBlogs.length == 0 ?
                <section className="h-screen flex justify-center items-center">
                    <progress className="progress w-12"></progress>
                </section>
                :
                <>
                    <section>
                        <BannerCard blog={myBlogs[0]} />
                    </section>
                    <section className="my-20">
                        <h3 className="text-base-content font-bold text-2xl mb-8 font-work leading-8">
                            Latest Post
                        </h3>
                        <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                            {myBlogs.slice(1).map((item: any) => (
                                <PostCard key={item} blog={item} />
                            ))}
                        </div>
                        <div className="flex items-center justify-center w-full mt-8">
                            <Link
                                href={`/explore`}
                                className="btn btn-outline btn-secondary text-secondary-content/60 font-work font-medium text-base"
                            >
                                View All Post
                            </Link>
                        </div>
                    </section>
                </>
            }

        </>
    )
}
