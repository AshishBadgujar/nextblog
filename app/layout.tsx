'use client'
import '@/styles/globals.css'
import '@/styles/tiptap.css'
import 'remixicon/fonts/remixicon.css'
import React from 'react'
import Header from '@/components/common/header'
import Footer from '@/components/common/footer'
import AuthProvider from '@/utils/authProvider'
import { BlogProvider } from '@/context/blog'
import { UserProvider } from '@/context/user'
import { CommentProvider } from '@/context/comment'
import { ThemeProvider, } from 'next-themes'


export default function RootLayout({
   children,
}: {
   children: React.ReactNode
}) {

   return (
      <html
         lang="en"
         suppressHydrationWarning
      >
         <body>
            <ThemeProvider
               themes={[
                  'light',
                  'dark'
               ]}
            >
               <AuthProvider>
                  <BlogProvider>
                     <UserProvider>
                        <CommentProvider>
                           <Header />
                           {children}
                           <Footer />
                        </CommentProvider>
                     </UserProvider>
                  </BlogProvider>
               </AuthProvider>
            </ThemeProvider>
         </body>
      </html>
   )
}
