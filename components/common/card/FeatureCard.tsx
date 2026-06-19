import Link from 'next/link'
import { formatDate, excerpt } from '@/lib/format'
import type { IBlog } from '@/types'

export default function FeatureCard({ blog }: { blog: IBlog }) {
   return (
      <article className="feature-card">
         {blog.tag && <span className="tag">{blog.tag}</span>}
         <h3 className="feature-card__title">
            <Link href={`/blog/${blog.id}`}>{blog.title}</Link>
         </h3>
         <p className="feature-card__excerpt">{excerpt(blog.content, 220)}</p>
         <div className="byline">
            <span className="byline__author">{blog.authorName}</span>
            <span>{formatDate(blog.updatedAt)}</span>
         </div>
      </article>
   )
}
