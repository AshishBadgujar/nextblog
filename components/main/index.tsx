'use client'
import Link from 'next/link'
import Hero from '../common/hero/Hero'
import FeatureCard from '../common/card/FeatureCard'
import PostCard from '../common/card/PostCard'
import { useBlogContext } from '@/context/blog'

export default function Feed() {
   const { blogs, loading } = useBlogContext()

   if (loading) {
      return (
         <section className="state">
            <span className="loader" />
         </section>
      )
   }

   if (blogs.length === 0) {
      return (
         <>
            <Hero />
            <section className="empty-state container">
               <h2 className="display">
                  Nothing here yet.
                  <br />
                  <span className="dim">Write the first post.</span>
               </h2>
               <Link href="/write" className="btn btn--solid">
                  Write a post
               </Link>
            </section>
         </>
      )
   }

   const [lead, ...rest] = blogs
   const indexPosts = blogs.slice(0, 6)
   const remaining = blogs.length - indexPosts.length

   return (
      <>
         <Hero />
         <div className="container" id="latest">
            <div className="home-grid">
               <div className="home-main">
                  <div className="section-head">
                     <p className="eyebrow">
                        <span className="eyebrow__num">01</span> Latest
                     </p>
                  </div>

                  <FeatureCard blog={lead} />

                  {rest.length > 0 && (
                     <div className="home-posts">
                        {rest.map((blog) => (
                           <PostCard key={blog.id} blog={blog} />
                        ))}
                     </div>
                  )}
               </div>

               <aside className="home-side">
                  <p className="side-title">
                     <span className="eyebrow__num">02</span> Index
                  </p>
                  <ol className="post-list">
                     {indexPosts.map((blog, i) => (
                        <li key={blog.id}>
                           <Link href={`/blog/${blog.id}`} className="post-list__item">
                              <span className="post-list__num">
                                 {String(i + 1).padStart(2, '0')}
                              </span>
                              <span>
                                 <span className="post-list__title">{blog.title}</span>
                                 <span className="post-list__meta">
                                    {blog.tag} · {blog.authorName}
                                 </span>
                              </span>
                           </Link>
                        </li>
                     ))}
                  </ol>
                  {remaining > 0 && (
                     <a href="#latest" className="post-list__more">
                        +{remaining} more {remaining === 1 ? 'post' : 'posts'}
                     </a>
                  )}
               </aside>
            </div>
         </div>
      </>
   )
}
