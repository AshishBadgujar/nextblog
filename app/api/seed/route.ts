import { NextResponse } from 'next/server'
import { seed } from '@/lib/db'

export const dynamic = 'force-dynamic'

/**
 * Seed the database with the bundled starter posts.
 *   curl -X POST https://<app>/api/seed
 * Idempotent (INSERT OR REPLACE), so it's safe to run again.
 */
export async function POST() {
   try {
      const result = await seed()
      return NextResponse.json({ ok: true, ...result })
   } catch {
      return NextResponse.json({ error: 'Seed failed' }, { status: 500 })
   }
}
