import { NextResponse } from 'next/server'
import { getBlogs, createBlog } from '@/lib/db'

export const dynamic = 'force-dynamic'

export async function GET() {
   const blogs = await getBlogs()
   return NextResponse.json(blogs)
}

export async function POST(req: Request) {
   try {
      const { title, content, tag, authorName } = await req.json()
      if (!title || !content) {
         return NextResponse.json(
            { error: 'Title and content are required.' },
            { status: 400 }
         )
      }
      const blog = await createBlog({ title, content, tag, authorName })
      return NextResponse.json(blog, { status: 201 })
   } catch {
      return NextResponse.json({ error: 'Failed to create blog.' }, { status: 500 })
   }
}
