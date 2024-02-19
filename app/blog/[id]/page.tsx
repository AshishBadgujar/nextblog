"use client"
import React from 'react'
import { useParams } from 'next/navigation'
import FullBlog from '@/components/blog'

const page = () => {
   const params = useParams()
   const id = params.id

   return (
      <main>
         <FullBlog id={id} />
      </main>
   )
}

export default page
