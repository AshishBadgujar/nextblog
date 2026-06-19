import { NextResponse } from 'next/server'
import { getBlog, updateBlog, deleteBlog } from '@/lib/db'

export const dynamic = 'force-dynamic'

type Params = { params: Promise<{ id: string }> }

export async function GET(_req: Request, { params }: Params) {
   const { id } = await params
   const blog = await getBlog(id)
   if (!blog) return NextResponse.json({ error: 'Blog not found' }, { status: 404 })
   return NextResponse.json(blog)
}

export async function PATCH(req: Request, { params }: Params) {
   const { id } = await params
   const { title, content } = await req.json()
   const blog = await updateBlog(id, { title, content })
   if (!blog) return NextResponse.json({ error: 'Blog not found' }, { status: 404 })
   return NextResponse.json(blog)
}

export async function DELETE(_req: Request, { params }: Params) {
   const { id } = await params
   const ok = await deleteBlog(id)
   if (!ok) return NextResponse.json({ error: 'Blog not found' }, { status: 404 })
   return NextResponse.json({ success: true })
}
