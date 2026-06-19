'use client'
import { useEffect, useState } from 'react'

type Theme = 'dark' | 'light'

export default function ThemeToggle() {
   const [theme, setTheme] = useState<Theme>('dark')
   const [mounted, setMounted] = useState(false)

   useEffect(() => {
      const current =
         (document.documentElement.getAttribute('data-theme') as Theme) || 'dark'
      setTheme(current)
      setMounted(true)
   }, [])

   const toggle = () => {
      const next: Theme = theme === 'dark' ? 'light' : 'dark'
      setTheme(next)
      if (next === 'light') {
         document.documentElement.setAttribute('data-theme', 'light')
      } else {
         document.documentElement.removeAttribute('data-theme')
      }
      try {
         localStorage.setItem('theme', next)
      } catch {
         /* ignore */
      }
   }

   return (
      <button
         type="button"
         className="theme-toggle"
         onClick={toggle}
         aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
      >
         {/* show the icon of the theme you'll switch TO (avoid SSR mismatch before mount) */}
         {mounted && theme === 'light' ? (
            <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
               <path
                  d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinejoin="round"
               />
            </svg>
         ) : (
            <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
               <circle cx="12" cy="12" r="4.2" stroke="currentColor" strokeWidth="1.6" />
               <path
                  d="M12 2v2.2M12 19.8V22M4.2 4.2l1.6 1.6M18.2 18.2l1.6 1.6M2 12h2.2M19.8 12H22M4.2 19.8l1.6-1.6M18.2 5.8l1.6-1.6"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
               />
            </svg>
         )}
      </button>
   )
}
