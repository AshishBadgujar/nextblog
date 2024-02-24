"use client"
import { headerData } from '@/data/headerData'
import { getProviders, signIn, signOut, useSession } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

/**
 * Our MobileNav is a reusable UI component that used to represent navbar section of any website in mobile version.
 *
 * @property website logo, all page title with navigation link, search field.
 *
 * @returns React component that can be easily integrated into any web application.
 */

interface SidebarLayoutProps {
   sidebarOpen: boolean
   setSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const MobileNav = ({ sidebarOpen, setSidebarOpen }: SidebarLayoutProps) => {
   const { data: session } = useSession()

   const [providers, setProviders] = useState<any>(null)
   useEffect(() => {
      const setAuthProviders = async () => {
         const response = await getProviders()
         setProviders(response)
      }
      setAuthProviders()
   }, [])
   return (
      <nav>
         <div className="block xl:hidden">
            <div
               className={`overflow-y-auto z-40 flex pt-5 top-0 flex-col h-screen w-full max-w-[300px] fixed bg-base-200  duration-500 ease-in  gap-2 md:gap-0 shadow-xl ${sidebarOpen ? 'left-0' : '-left-full'
                  }`}
            >
               <div className="relative flex flex-col gap-5 px-5 pb-6 mt-4 text-lg font-normal leading-6">
                  <div className="flex items-center justify-between mb-6">
                     {session?.user &&
                        <div className="avatar cursor-pointer">
                           <div className="w-12 rounded-full">
                              <Link href='/author'>
                                 <Image src={session?.user.image || ''} alt='' height={100} width={100} />
                              </Link>
                           </div>
                        </div>
                     }
                     <svg
                        className="cursor-pointer"
                        onClick={() => setSidebarOpen(!open)}
                        width="10"
                        height="10"
                        viewBox="0 0 10 10"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                     >
                        <path
                           d="M1 9L9 1M1 1L9 9"
                           stroke="#6B7280"
                           strokeWidth="1.5"
                           strokeLinecap="round"
                           strokeLinejoin="round"
                        />
                     </svg>
                  </div>

                  {/*  menu lists */}
                  {headerData.map((item: any, index: number) => (
                     <Link
                        href={item.link}
                        key={index}
                        className="link link-hover text-base text-base-content/80 hover:text-primary transition hover:duration-300 font-work"
                     >
                        {item.name}
                     </Link>
                  ))}
                  {session?.user ?
                     <button className="btn btn-neutral" onClick={() => signOut()}>Logout</button>
                     :
                     <>
                        {providers &&
                           Object.values(providers).map((provider) => (
                              <button className="btn btn-neutral" key={provider.name} onClick={() => signIn(provider.id)}>Login</button>
                           ))
                        }
                     </>
                  }
               </div>
            </div>
         </div>
         {/* bg overlay */}
         <div
            className={`xl:hidden fixed top-0 z-30 transition-all duration-500 ease-in-out bg-[#1B2631] opacity-80 h-full w-full ${sidebarOpen ? 'left-0' : '-left-full'
               }`}
            onClick={() => setSidebarOpen(false)}
         />
      </nav>
   )
}

export default MobileNav
