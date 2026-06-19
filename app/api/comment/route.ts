import { NextResponse } from 'next/server'
import { createComment } from '@/lib/db'

export const dynamic = 'force-dynamic'

export async function POST(req: Request) {
   try {
      const { blogId, name, text } = await req.json()
      if (!blogId || !text) {
         return NextResponse.json(
            { error: 'blogId and text are required.' },
            { status: 400 }
         )
      }
      const comment = await createComment({ blogId, name, text })
      return NextResponse.json(comment, { status: 201 })
   } catch {
      return NextResponse.json({ error: 'Failed to create comment.' }, { status: 500 })
   }
}
