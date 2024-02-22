"use client"
import { IBlog } from '@/data/interfaces'
import moment from 'moment'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import Comments from '../common/comment'

type props = {
   blog: IBlog,
   setBlog: React.Dispatch<React.SetStateAction<IBlog>>,
   isEdit: boolean,
   handleEdit: () => {},
   handleDelete: () => {}
}

export default function FullBlog({ blog, setBlog, isEdit, handleEdit, handleDelete }: props) {
   const [isAuthor, setIsAuthor] = useState(false)
   const { data: session } = useSession()

   useEffect(() => {
      if (session && blog._id && session?.user?.id === blog.author?._id) {
         setIsAuthor(true)
      } else {
         setIsAuthor(false)
      }
      console.log("isAuthor=", session, blog, isAuthor)
   }, [session, blog])

   const onChange = (e: any) => {
      setBlog({
         ...blog,
         [e.target.name]: e.target.value
      })
   }
   if (!blog.mediaUrl) {
      return <section className="h-screen flex justify-center items-center">
         <progress className="progress w-12"></progress>
      </section>
   }
   return (
      <section>
         <div className="container mx-auto px-5 pb-12 md:px-0 w-full md:w-10/12 lg:w-5/12 font-work">
            <div className="py-6">
               {isAuthor &&
                  <span className="float-right cursor-pointer ml-2">
                     {isEdit ?
                        <button onClick={handleEdit} className="btn btn-ghost btn-circle btn-sm"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                           <path d="M11.47 1.72a.75.75 0 0 1 1.06 0l3 3a.75.75 0 0 1-1.06 1.06l-1.72-1.72V7.5h-1.5V4.06L9.53 5.78a.75.75 0 0 1-1.06-1.06l3-3ZM11.25 7.5V15a.75.75 0 0 0 1.5 0V7.5h3.75a3 3 0 0 1 3 3v9a3 3 0 0 1-3 3h-9a3 3 0 0 1-3-3v-9a3 3 0 0 1 3-3h3.75Z" />
                        </svg></button>
                        :
                        <div className="dropdown dropdown-bottom dropdown-hover dropdown-end float-right cursor-pointer ">
                           <div tabIndex={0} >
                              <span className="btn btn-ghost btn-circle btn-sm">
                                 <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                    <path fill-rule="evenodd" d="M11.078 2.25c-.917 0-1.699.663-1.85 1.567L9.05 4.889c-.02.12-.115.26-.297.348a7.493 7.493 0 0 0-.986.57c-.166.115-.334.126-.45.083L6.3 5.508a1.875 1.875 0 0 0-2.282.819l-.922 1.597a1.875 1.875 0 0 0 .432 2.385l.84.692c.095.078.17.229.154.43a7.598 7.598 0 0 0 0 1.139c.015.2-.059.352-.153.43l-.841.692a1.875 1.875 0 0 0-.432 2.385l.922 1.597a1.875 1.875 0 0 0 2.282.818l1.019-.382c.115-.043.283-.031.45.082.312.214.641.405.985.57.182.088.277.228.297.35l.178 1.071c.151.904.933 1.567 1.85 1.567h1.844c.916 0 1.699-.663 1.85-1.567l.178-1.072c.02-.12.114-.26.297-.349.344-.165.673-.356.985-.57.167-.114.335-.125.45-.082l1.02.382a1.875 1.875 0 0 0 2.28-.819l.923-1.597a1.875 1.875 0 0 0-.432-2.385l-.84-.692c-.095-.078-.17-.229-.154-.43a7.614 7.614 0 0 0 0-1.139c-.016-.2.059-.352.153-.43l.84-.692c.708-.582.891-1.59.433-2.385l-.922-1.597a1.875 1.875 0 0 0-2.282-.818l-1.02.382c-.114.043-.282.031-.449-.083a7.49 7.49 0 0 0-.985-.57c-.183-.087-.277-.227-.297-.348l-.179-1.072a1.875 1.875 0 0 0-1.85-1.567h-1.843ZM12 15.75a3.75 3.75 0 1 0 0-7.5 3.75 3.75 0 0 0 0 7.5Z" clip-rule="evenodd" />
                                 </svg>
                              </span>
                           </div>
                           <ul tabIndex={0} className="dropdown-content z-[1] menu p-1 shadow bg-base-100 rounded-lg">
                              <li> <a className='p-2' onClick={handleEdit}> <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                                 <path d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-12.15 12.15a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32L19.513 8.2Z" />
                              </svg>Edit</a></li>
                              <li>
                                 <a className='p-2 text-error' onClick={handleDelete}> <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                                    <path fill-rule="evenodd" d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z" clip-rule="evenodd" />
                                 </svg>Delete</a></li>
                           </ul>
                        </div>
                     }
                  </span>}

               <div className="w-fit text-white px-2.5 py-1 bg-primary text-xs md:text-sm rounded-md mb-2 md:mb-4 font-medium">
                  {blog.tag}
               </div>
               {isEdit ?
                  <input type="text" name='title' value={blog.title} onChange={onChange} className="text-3xl font-semibold input input-bordered input-lg px-3 w-full" />
                  :
                  <h3 className="text-base-content font-semibold text-xl md:text-2xl lg:text-4xl leading-5 md:leading-10 ">
                     {blog.title}
                  </h3>
               }
               <div className="mt-3 md:mt-6 flex items-center gap-5 text-base-content/60">
                  <div className=" flex items-center gap-3">
                     <div className="avatar">
                        <div className="w-9 rounded-full">
                           <Image
                              src={`${blog.author?.image}`}
                              alt="avatar"
                              width={100}
                              height={100}
                           />
                        </div>
                     </div>
                     <a
                        href="/"
                        className=" text-xs md:text-sm font-medium hover:text-primary transition hover:duration-300"
                     >
                        {blog.author?.username}
                     </a>
                  </div>
                  <p className="text-xs md:text-sm">{moment(blog.updatedAt).format('MMMM D, YYYY')}</p>
               </div>
            </div>
            <div className="mt-4">
               <Image
                  width="800"
                  height="462"
                  alt={`blog_image`}
                  className={`rounded-xl`}
                  src={`${blog.mediaUrl}`}
               />
            </div>

            <div className="py-8">
               {isEdit ?
                  <textarea value={blog.content} onChange={onChange} name='content' className="textarea textarea-bordered h-80 w-full" placeholder="Content"></textarea>
                  :
                  blog.content
               }
            </div>
            <div className="divider"></div>
            <Comments currentUser={session?.user} blog={blog} />
         </div>
      </section >
   )
}
