import { promises as fs } from 'fs'
import path from 'path'
import { randomBytes } from 'crypto'
import { createClient, type Client } from '@libsql/client'
import type { IBlog, IComment } from '@/types'
import { seedBlogs, seedComments } from './seed-data'

/**
 * SQLite data layer (libSQL).
 *   • Development -> a local SQLite file at storage/nextblogs.db (auto-seeded).
 *   • Production  -> Turso (set TURSO_DATABASE_URL + TURSO_AUTH_TOKEN).
 */

const genId = () => randomBytes(6).toString('base64url')
const now = () => new Date().toISOString()

// Use Turso only in production; dev always uses the local file (even if the
// Turso env vars are present via `vercel env pull`).
const useTurso =
   process.env.NODE_ENV === 'production' && !!process.env.TURSO_DATABASE_URL
const url = useTurso ? process.env.TURSO_DATABASE_URL! : 'file:storage/nextblogs.db'
const authToken = useTurso ? process.env.TURSO_AUTH_TOKEN : undefined

let ready: Promise<Client> | null = null

async function db(): Promise<Client> {
   if (ready) return ready
   ready = (async () => {
      if (url.startsWith('file:')) {
         await fs.mkdir(path.join(process.cwd(), 'storage'), { recursive: true })
      }
      const c = createClient({ url, authToken })
      await c.batch(
         [
            `CREATE TABLE IF NOT EXISTS blogs (
               id TEXT PRIMARY KEY,
               title TEXT NOT NULL,
               content TEXT NOT NULL,
               tag TEXT,
               authorName TEXT,
               createdAt TEXT NOT NULL,
               updatedAt TEXT NOT NULL
            )`,
            `CREATE TABLE IF NOT EXISTS comments (
               id TEXT PRIMARY KEY,
               blogId TEXT NOT NULL,
               name TEXT,
               text TEXT NOT NULL,
               createdAt TEXT NOT NULL,
               updatedAt TEXT NOT NULL
            )`,
            `CREATE INDEX IF NOT EXISTS idx_comments_blog ON comments (blogId)`,
         ],
         'write'
      )
      // auto-seed only the local dev database when it's empty
      if (!useTurso) {
         const count = await c.execute('SELECT COUNT(*) AS n FROM blogs')
         if (Number(count.rows[0].n) === 0) await seedInto(c)
      }
      return c
   })()
   return ready
}

/** Insert the bundled seed content (idempotent via INSERT OR REPLACE). */
async function seedInto(c: Client) {
   const stmts = [
      ...seedBlogs.map((b) => ({
         sql: 'INSERT OR REPLACE INTO blogs (id,title,content,tag,authorName,createdAt,updatedAt) VALUES (?,?,?,?,?,?,?)',
         args: [b.id ?? genId(), b.title, b.content, b.tag ?? null, b.authorName ?? 'Anonymous', b.createdAt ?? now(), b.updatedAt ?? now()],
      })),
      ...seedComments.map((c2) => ({
         sql: 'INSERT OR REPLACE INTO comments (id,blogId,name,text,createdAt,updatedAt) VALUES (?,?,?,?,?,?)',
         args: [c2.id ?? genId(), c2.blogId, c2.name ?? 'Anonymous', c2.text, c2.createdAt ?? now(), c2.updatedAt ?? now()],
      })),
   ]
   if (stmts.length) await c.batch(stmts, 'write')
}

/** Public seed entry point (used by the /api/seed route for production). */
export async function seed(): Promise<{ blogs: number; comments: number }> {
   const c = await db()
   await seedInto(c)
   return { blogs: seedBlogs.length, comments: seedComments.length }
}

/* ----------------------------- Blogs ----------------------------- */

export async function getBlogs(): Promise<IBlog[]> {
   const c = await db()
   const res = await c.execute('SELECT * FROM blogs ORDER BY updatedAt DESC')
   return res.rows as unknown as IBlog[]
}

export async function getBlog(id: string): Promise<IBlog | null> {
   const c = await db()
   const res = await c.execute({ sql: 'SELECT * FROM blogs WHERE id = ?', args: [id] })
   if (res.rows.length === 0) return null
   const blog = res.rows[0] as unknown as IBlog
   blog.comments = await getCommentsByBlog(id)
   return blog
}

export async function createBlog(
   data: Omit<IBlog, 'id' | 'createdAt' | 'updatedAt' | 'comments'>
): Promise<IBlog> {
   const c = await db()
   const blog: IBlog = {
      id: genId(),
      title: data.title,
      content: data.content,
      tag: data.tag,
      authorName: data.authorName?.trim() || 'Anonymous',
      createdAt: now(),
      updatedAt: now(),
   }
   await c.execute({
      sql: 'INSERT INTO blogs (id,title,content,tag,authorName,createdAt,updatedAt) VALUES (?,?,?,?,?,?,?)',
      args: [blog.id!, blog.title, blog.content, blog.tag ?? null, blog.authorName ?? null, blog.createdAt!, blog.updatedAt!],
   })
   return blog
}

export async function updateBlog(
   id: string,
   data: Partial<Pick<IBlog, 'title' | 'content' | 'tag'>>
): Promise<IBlog | null> {
   const c = await db()
   const existing = await c.execute({ sql: 'SELECT * FROM blogs WHERE id = ?', args: [id] })
   if (existing.rows.length === 0) return null
   const prev = existing.rows[0] as unknown as IBlog
   const next: IBlog = {
      ...prev,
      title: data.title ?? prev.title,
      content: data.content ?? prev.content,
      tag: data.tag ?? prev.tag,
      updatedAt: now(),
   }
   await c.execute({
      sql: 'UPDATE blogs SET title=?, content=?, tag=?, updatedAt=? WHERE id=?',
      args: [next.title, next.content, next.tag ?? null, next.updatedAt!, id],
   })
   return next
}

export async function deleteBlog(id: string): Promise<boolean> {
   const c = await db()
   const res = await c.execute({ sql: 'DELETE FROM blogs WHERE id = ?', args: [id] })
   await c.execute({ sql: 'DELETE FROM comments WHERE blogId = ?', args: [id] })
   return res.rowsAffected > 0
}

/* ---------------------------- Comments ---------------------------- */

export async function getCommentsByBlog(blogId: string): Promise<IComment[]> {
   const c = await db()
   const res = await c.execute({
      sql: 'SELECT * FROM comments WHERE blogId = ? ORDER BY createdAt DESC',
      args: [blogId],
   })
   return res.rows as unknown as IComment[]
}

export async function createComment(
   data: Omit<IComment, 'id' | 'createdAt' | 'updatedAt'>
): Promise<IComment> {
   const c = await db()
   const comment: IComment = {
      id: genId(),
      blogId: data.blogId,
      name: data.name?.trim() || 'Anonymous',
      text: data.text,
      createdAt: now(),
      updatedAt: now(),
   }
   await c.execute({
      sql: 'INSERT INTO comments (id,blogId,name,text,createdAt,updatedAt) VALUES (?,?,?,?,?,?)',
      args: [comment.id!, comment.blogId, comment.name ?? null, comment.text, comment.createdAt!, comment.updatedAt!],
   })
   return comment
}

export async function deleteComment(id: string): Promise<boolean> {
   const c = await db()
   const res = await c.execute({ sql: 'DELETE FROM comments WHERE id = ?', args: [id] })
   return res.rowsAffected > 0
}
