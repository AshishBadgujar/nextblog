"use client"
import React, { useEffect, useState } from 'react'
import PageInfo from '../common/pageInfo/PageInfo'
import PostOverlayCard from '../common/card/PostOverlayCard'
import PostCard from '../common/card/PostCard'
import { useBlogContext } from '@/context/blog'
import { IBlog } from '@/data/interfaces'

export default function Explore() {
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
                <div className="container mx-auto mt-12 mb-24 px-5 sm:px-0">
                    <section>
                        {/* <PageInfo /> */}
                    </section>

                    <section className="my-12">
                        <PostOverlayCard blog={myBlogs[0]} />
                    </section>

                    <section className="my-20">
                        <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                            {myBlogs.slice(1).map((item: any) => (
                                <PostCard key={item} blog={item} />
                            ))}
                        </div>
                        <div className="flex items-center justify-center w-full mt-8">
                            <button className="btn btn-outline btn-secondary font-work px-5 text-base font-medium">
                                Load More
                            </button>
                        </div>
                    </section>
                </div>
            }
        </>
    )
}
