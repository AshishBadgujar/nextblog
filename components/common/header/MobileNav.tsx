'use client'
import Link from 'next/link'
import type { Dispatch, SetStateAction } from 'react'
import Logo from '../Logo'

interface Props {
   sidebarOpen: boolean
   setSidebarOpen: Dispatch<SetStateAction<boolean>>
}

export default function MobileNav({ sidebarOpen, setSidebarOpen }: Props) {
   const close = () => setSidebarOpen(false)
   return (
      <nav className="mobile-nav">
         <div className={`drawer glass${sidebarOpen ? ' is-open' : ''}`}>
            <div className="drawer__head">
               <Logo />
               <button
                  type="button"
                  aria-label="Close menu"
                  className="icon-btn"
                  onClick={close}
               >
                  <svg viewBox="0 0 10 10" fill="none">
                     <path d="M1 9L9 1M1 1L9 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
               </button>
            </div>
            <Link href="/" onClick={close}>
               Home
            </Link>
            <Link href="/write" className="btn btn--solid" onClick={close}>
               Write a post
            </Link>
         </div>
         {sidebarOpen && <div className="scrim" onClick={close} />}
      </nav>
   )
}
