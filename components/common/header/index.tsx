'use client'
import { useState } from 'react'
import Link from 'next/link'
import { BRAND } from '@/config/brand'
import Logo from '../Logo'
import ThemeToggle from '../ThemeToggle'
import SearchModal from '../search/SearchModal'
import MobileNav from './MobileNav'

export default function Header() {
   const [sidebarOpen, setSidebarOpen] = useState(false)
   const [searchOpen, setSearchOpen] = useState(false)

   return (
      <>
      <header className="site-header">
         <div className="container site-header__row">
            <Link href="/" className="site-logo" aria-label={`${BRAND.name} home`}>
               <Logo />
            </Link>

            <div className="nav-bar">
               <ThemeToggle />
               <button
                  type="button"
                  className="nav-search"
                  aria-label="Search posts"
                  onClick={() => setSearchOpen(true)}
               >
                  <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
                     <circle cx="9" cy="9" r="6" stroke="currentColor" strokeWidth="1.6" />
                     <path d="M13.5 13.5 17 17" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                  </svg>
               </button>
               <Link href="/write" className="btn btn--solid btn--header">
                  Write
               </Link>
               <button
                  type="button"
                  aria-label="Open menu"
                  className="menu-btn"
                  onClick={() => setSidebarOpen(true)}
               >
                  <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                     <path
                        d="M3.33 5h13.34M3.33 10h13.34M3.33 15h13.34"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                     />
                  </svg>
               </button>
            </div>
         </div>
      </header>
      {/* rendered OUTSIDE the header so their backdrop-filter samples the page,
          not the (also backdrop-filtered) header */}
      <MobileNav sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <SearchModal open={searchOpen} onClose={() => setSearchOpen(false)} />
   </>
   )
}
