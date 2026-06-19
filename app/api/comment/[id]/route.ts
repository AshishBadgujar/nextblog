import { NextResponse } from 'next/server'
import { deleteComment } from '@/lib/db'

export const dynamic = 'force-dynamic'

type Params = { params: Promise<{ id: string }> }

export async function DELETE(_req: Request, { params }: Params) {
   const { id } = await params
   const ok = await deleteComment(id)
   if (!ok) return NextResponse.json({ error: 'Comment not found' }, { status: 404 })
   return NextResponse.json({ success: true })
}
