import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import { Inter, JetBrains_Mono } from 'next/font/google'
import '@/styles/globals.css'
import '@/styles/tiptap.css'
import 'remixicon/fonts/remixicon.css'
import Header from '@/components/common/header'
import Providers from './providers'
import { BRAND } from '@/config/brand'

const sans = Inter({
   subsets: ['latin'],
   weight: ['300', '400', '500', '600', '700', '800', '900'],
   variable: '--font-sans',
   display: 'swap',
})

const mono = JetBrains_Mono({
   subsets: ['latin'],
   weight: ['400', '500', '700'],
   variable: '--font-mono',
   display: 'swap',
})

export const metadata: Metadata = {
   title: `${BRAND.name} — ${BRAND.tagline}`,
   description: 'A fast, offline, black & white blogging space.',
}

// Applies the saved theme before first paint to avoid a flash of the wrong theme.
const themeScript = `(function(){try{var t=localStorage.getItem('theme');if(t==='light')document.documentElement.setAttribute('data-theme','light')}catch(e){}})()`

export default function RootLayout({ children }: { children: ReactNode }) {
   return (
      <html lang="en" className={`${sans.variable} ${mono.variable}`} suppressHydrationWarning>
         <body>
            <script dangerouslySetInnerHTML={{ __html: themeScript }} />
            <Providers>
               <Header />
               <main className="page">{children}</main>
            </Providers>
         </body>
      </html>
   )
}
