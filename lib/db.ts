import { promises as fs } from 'fs'
import path from 'path'
import { randomBytes } from 'crypto'
import type { IBlog, IComment } from '@/types'

/**
 * Tiny offline, file-based data store.
 * Everything lives in JSON files under /storage — no database server,
 * no cloud, fully offline.
 */

/** Short, URL-safe id (~8 chars). */
const genId = () => randomBytes(6).toString('base64url')

const STORAGE_DIR = path.join(process.cwd(), 'storage')
const BLOGS_FILE = path.join(STORAGE_DIR, 'blogs.json')
const COMMENTS_FILE = path.join(STORAGE_DIR, 'comments.json')

async function read<T>(file: string): Promise<T[]> {
   try {
      const raw = await fs.readFile(file, 'utf-8')
      return JSON.parse(raw) as T[]
   } catch {
      return []
   }
}

async function write<T>(file: string, data: T[]): Promise<void> {
   await fs.mkdir(STORAGE_DIR, { recursive: true })
   await fs.writeFile(file, JSON.stringify(data, null, 2), 'utf-8')
}

const now = () => new Date().toISOString()

/* ----------------------------- Blogs ----------------------------- */

export async function getBlogs(): Promise<IBlog[]> {
   const blogs = await read<IBlog>(BLOGS_FILE)
   return blogs.sort((a, b) =>
      (b.updatedAt || '').localeCompare(a.updatedAt || '')
   )
}

export async function getBlog(id: string): Promise<IBlog | null> {
   const blogs = await read<IBlog>(BLOGS_FILE)
   const blog = blogs.find((b) => b.id === id)
   if (!blog) return null
   const comments = await getCommentsByBlog(id)
   return { ...blog, comments }
}

export async function createBlog(
   data: Omit<IBlog, 'id' | 'createdAt' | 'updatedAt' | 'comments'>
): Promise<IBlog> {
   const blogs = await read<IBlog>(BLOGS_FILE)
   const blog: IBlog = {
      id: genId(),
      title: data.title,
      content: data.content,
      tag: data.tag,
      authorName: data.authorName?.trim() || 'Anonymous',
      createdAt: now(),
      updatedAt: now(),
   }
   blogs.push(blog)
   await write(BLOGS_FILE, blogs)
   return blog
}

export async function updateBlog(
   id: string,
   data: Partial<Pick<IBlog, 'title' | 'content' | 'tag'>>
): Promise<IBlog | null> {
   const blogs = await read<IBlog>(BLOGS_FILE)
   const index = blogs.findIndex((b) => b.id === id)
   if (index === -1) return null
   blogs[index] = { ...blogs[index], ...data, updatedAt: now() }
   await write(BLOGS_FILE, blogs)
   return blogs[index]
}

export async function deleteBlog(id: string): Promise<boolean> {
   const blogs = await read<IBlog>(BLOGS_FILE)
   const next = blogs.filter((b) => b.id !== id)
   if (next.length === blogs.length) return false
   await write(BLOGS_FILE, next)
   const comments = await read<IComment>(COMMENTS_FILE)
   await write(
      COMMENTS_FILE,
      comments.filter((c) => c.blogId !== id)
   )
   return true
}

/* ---------------------------- Comments ---------------------------- */

export async function getCommentsByBlog(blogId: string): Promise<IComment[]> {
   const comments = await read<IComment>(COMMENTS_FILE)
   return comments
      .filter((c) => c.blogId === blogId)
      .sort((a, b) => (b.createdAt || '').localeCompare(a.createdAt || ''))
}

export async function createComment(
   data: Omit<IComment, 'id' | 'createdAt' | 'updatedAt'>
): Promise<IComment> {
   const comments = await read<IComment>(COMMENTS_FILE)
   const comment: IComment = {
      id: genId(),
      blogId: data.blogId,
      name: data.name?.trim() || 'Anonymous',
      text: data.text,
      createdAt: now(),
      updatedAt: now(),
   }
   comments.push(comment)
   await write(COMMENTS_FILE, comments)
   return comment
}

export async function deleteComment(id: string): Promise<boolean> {
   const comments = await read<IComment>(COMMENTS_FILE)
   const next = comments.filter((c) => c.id !== id)
   if (next.length === comments.length) return false
   await write(COMMENTS_FILE, next)
   return true
}
