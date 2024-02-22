"use client"
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { IUser } from '@/data/interfaces'
import { useSession } from 'next-auth/react'

/**
 * Our AuthorInfo is a reusable UI component that can be used to represent user details information.
 *
 * @property author image, author name and position, author's short information and authors's social identity.
 *
 * @returns React component that can be easily integrated into any web application.
 */


const AuthorInfo = ({ isEdit, user, setUser, handleEdit, handleDelete }: any) => {
   const [isAuthor, setIsAuthor] = useState(false)

   const { data: session } = useSession()

   useEffect(() => {
      if (session && user._id && session?.user?.id === user?._id) {
         setIsAuthor(true)
      } else {
         setIsAuthor(false)
      }
      console.log("isAuthor=", session, user, isAuthor)
   }, [session, user])

   const onChange = (e: any) => {
      setUser({
         ...user,
         [e.target.name]: e.target.value
      })
   }
   return (
      <div className="container mx-auto sm:mt-8 bg-base-200 px-5 sm:px-0 rounded-xl font-work">
         {isAuthor &&
            <span className="float-right cursor-pointer mr-4 mt-4">
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
            </span>
         }

         <div className="py-12">
            <div className="flex items-center justify-center gap-4">
               <div className="avatar">
                  <div className="w-16 rounded-full">
                     <Image
                        src={user.image}
                        width={64}
                        height={64}
                        alt="avatar_image"
                     />
                  </div>
               </div>
               <div>
                  <h5 className="text-base-content text-base sm:text-xl font-medium">
                     {user.username}
                  </h5>
                  <span className="text-base-content/60 text-xs sm:text-sm">
                     Collaborator & Editor
                  </span>
               </div>
            </div>
            {/* <div className="skeleton w-32 h-32"></div> */}
            {isEdit ?
               <div className="text-center my-6 max-w-2xl w-full mx-auto">
                  <textarea name='bio' value={user.bio} onChange={onChange} className="textarea textarea-bordered h-auto w-full text-sm sm:text-lg text-base-content/70" placeholder="Bio"></textarea>
               </div>
               :
               <p className="text-sm sm:text-lg text-base-content/70 text-center py-6 max-w-2xl w-full mx-auto">
                  {user?.bio}
               </p>
            }


            <div className="flex items-center justify-center gap-2">
               {isEdit && socialShare?.map((item, index) => (
                  <label className="input input-bordered flex items-center gap-2">
                     {item?.icon()}
                     <input type="text" name={item.key} value={user[item.key]} onChange={onChange} className="outline-none grow" placeholder="https://example.com" />
                  </label>
               ))}
               {!isEdit && socialShare?.map((item, index) => (
                  <Link
                     href={user[item?.key] || '#'}
                     target="_blank"
                     key={index}
                     className="bg-secondary text-secondary-content hover:text-primary-content w-8 h-8 flex justify-center items-center rounded-md hover:bg-primary transition duration-300 ease-in-out"
                  >
                     {item?.icon()}
                  </Link>
               ))}
            </div>
         </div>
      </div>
   )
}

export default AuthorInfo

// social share icons
const socialShare = [
   {
      id: 1,
      key: 'fb',
      icon: () => (
         <svg
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
         >
            <path
               fillRule="evenodd"
               clipRule="evenodd"
               d="M14 7.04242C14 3.17679 10.8656 0.0424194 7 0.0424194C3.13438 0.0424194 0 3.17679 0 7.04242C0 10.5362 2.55938 13.4321 5.90625 13.9577V9.06648H4.12844V7.04242H5.90625V5.50023C5.90625 3.74617 6.95156 2.77648 8.55031 2.77648C9.31625 2.77648 10.1175 2.91336 10.1175 2.91336V4.63617H9.23438C8.36531 4.63617 8.09344 5.17554 8.09344 5.72992V7.04242H10.0347L9.72469 9.06648H8.09375V13.9584C11.4406 13.433 14 10.5371 14 7.04242Z"
               fill="currentColor"
            />
         </svg>
      ),
      alt: 'facebook_icon',
      link: '/',
   },
   {
      id: 2,
      key: 'x',
      icon: () => (
         <svg
            width="16"
            height="12"
            viewBox="0 0 16 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
         >
            <path
               d="M15.5 1.42176C14.9373 1.66624 14.342 1.82732 13.7328 1.89988C14.373 1.525 14.8545 0.929435 15.0869 0.224883C14.4816 0.578818 13.8205 0.827155 13.1319 0.959258C12.8419 0.655361 12.4932 0.413603 12.1069 0.248678C11.7205 0.0837537 11.3047 -0.00089311 10.8847 -0.000116778C9.18406 -0.000116778 7.80781 1.35613 7.80781 3.02801C7.80661 3.26056 7.83325 3.49242 7.88719 3.71863C6.66771 3.66146 5.4736 3.35038 4.38124 2.80528C3.28889 2.26017 2.32234 1.49306 1.54344 0.553008C1.27018 1.01367 1.12567 1.53927 1.125 2.07488C1.125 3.12488 1.67281 4.05301 2.5 4.59676C2.00991 4.58513 1.52987 4.45541 1.10063 4.21863V4.25613C1.10063 5.72488 2.16313 6.94676 3.56938 7.22488C3.30493 7.29538 3.03243 7.3311 2.75875 7.33113C2.56456 7.33147 2.3708 7.31263 2.18031 7.27488C2.57125 8.47801 3.70906 9.35301 5.05688 9.37801C3.96168 10.222 2.61707 10.6782 1.23438 10.6749C0.988943 10.6745 0.743739 10.6599 0.5 10.6311C1.90662 11.5293 3.5417 12.0044 5.21063 11.9999C10.8781 11.9999 13.9744 7.38426 13.9744 3.38113C13.9744 3.24988 13.9709 3.11863 13.9647 2.99051C14.5657 2.56303 15.0856 2.03179 15.5 1.42176V1.42176Z"
               fill="currentColor"
            />
         </svg>
      ),
      alt: 'twitter_icon',
      link: '/',
   },
   {
      id: 3,
      key: 'insta',
      icon: () => (
         <svg
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
         >
            <path
               d="M9.91656 1.16656C10.6895 1.16887 11.43 1.47692 11.9766 2.02345C12.5231 2.56997 12.8311 3.31054 12.8334 4.08344V9.91656C12.8311 10.6895 12.5231 11.43 11.9766 11.9766C11.43 12.5231 10.6895 12.8311 9.91656 12.8334H4.08344C3.31054 12.8311 2.56997 12.5231 2.02345 11.9766C1.47692 11.43 1.16887 10.6895 1.16656 9.91656V4.08344C1.16887 3.31054 1.47692 2.56997 2.02345 2.02345C2.56997 1.47692 3.31054 1.16887 4.08344 1.16656H9.91656ZM9.91656 0H4.08344C1.8375 0 0 1.8375 0 4.08344V9.91656C0 12.1625 1.8375 14 4.08344 14H9.91656C12.1625 14 14 12.1625 14 9.91656V4.08344C14 1.8375 12.1625 0 9.91656 0Z"
               fill="currentColor"
            />
            <path
               d="M10.7916 4.08344C10.6185 4.08344 10.4493 4.03212 10.3054 3.93597C10.1615 3.83983 10.0494 3.70317 9.98317 3.54329C9.91694 3.3834 9.89961 3.20747 9.93338 3.03773C9.96714 2.868 10.0505 2.71209 10.1728 2.58972C10.2952 2.46735 10.4511 2.38401 10.6209 2.35025C10.7906 2.31649 10.9665 2.33382 11.1264 2.40004C11.2863 2.46627 11.423 2.57842 11.5191 2.72231C11.6152 2.86621 11.6666 3.03538 11.6666 3.20844C11.6668 3.32341 11.6443 3.43731 11.6005 3.54358C11.5566 3.64985 11.4921 3.74641 11.4108 3.82771C11.3295 3.90901 11.233 3.97345 11.1267 4.01734C11.0204 4.06122 10.9065 4.08368 10.7916 4.08344Z"
               fill="currentColor"
            />
            <path
               d="M7 4.66656C7.46151 4.66656 7.91266 4.80342 8.29639 5.05982C8.68012 5.31622 8.9792 5.68065 9.15582 6.10703C9.33243 6.53341 9.37864 7.00259 9.2886 7.45523C9.19856 7.90787 8.97633 8.32365 8.64999 8.64999C8.32365 8.97633 7.90787 9.19856 7.45523 9.2886C7.00259 9.37864 6.53341 9.33243 6.10703 9.15582C5.68065 8.9792 5.31622 8.68012 5.05982 8.29639C4.80342 7.91266 4.66656 7.46151 4.66656 7C4.66722 6.38134 4.91328 5.7882 5.35074 5.35074C5.7882 4.91328 6.38134 4.66722 7 4.66656ZM7 3.5C6.30777 3.5 5.63108 3.70527 5.0555 4.08986C4.47993 4.47444 4.03133 5.02107 3.76642 5.66061C3.50152 6.30015 3.4322 7.00388 3.56725 7.68282C3.7023 8.36175 4.03564 8.98539 4.52513 9.47487C5.01461 9.96436 5.63825 10.2977 6.31718 10.4327C6.99612 10.5678 7.69985 10.4985 8.33939 10.2336C8.97893 9.96867 9.52556 9.52007 9.91014 8.9445C10.2947 8.36892 10.5 7.69223 10.5 7C10.5 6.07174 10.1313 5.1815 9.47487 4.52513C8.8185 3.86875 7.92826 3.5 7 3.5Z"
               fill="currentColor"
            />
         </svg>
      ),
      alt: 'instagram_icon',
      link: '/',
   },
   {
      id: 4,
      key: 'yt',
      icon: () => (
         <svg
            width="16"
            height="12"
            viewBox="0 0 16 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
         >
            <path
               d="M15.8961 2.64969C15.8961 1.24344 14.8617 0.112187 13.5836 0.112187C11.8524 0.0312499 10.0867 0 8.28236 0H7.71986C5.91986 0 4.15111 0.03125 2.41986 0.1125C1.14486 0.1125 0.110481 1.25 0.110481 2.65625C0.0323556 3.76844 -0.000769439 4.88094 0.00110556 5.99344C-0.00201944 7.10594 0.0333972 8.21948 0.107356 9.33406C0.107356 10.7403 1.14173 11.8809 2.41673 11.8809C4.23548 11.9653 6.10111 12.0028 7.99798 11.9997C9.89798 12.0059 11.7584 11.9664 13.5792 11.8809C14.8574 11.8809 15.8917 10.7403 15.8917 9.33406C15.9667 8.21844 16.0011 7.10594 15.998 5.99031C16.0051 4.87781 15.9711 3.76427 15.8961 2.64969ZM6.46986 9.05906V2.91844L11.0011 5.98719L6.46986 9.05906Z"
               fill="currentColor"
            />
         </svg>
      ),
      alt: 'youtube_icon',
      link: '/',
   },
]
