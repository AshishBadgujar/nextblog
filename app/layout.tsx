'use client'
import '@/styles/globals.css'
import React from 'react'
import { GlobalProvider } from '@/context/store'
import Header from '@/components/common/header'
import Footer from '@/components/common/footer'
import { Providers } from '@/utils/themeMode' // Plus Jakarta Sans font family with 4 weights and 2 styles
import AuthProvider from '@/utils/authProvider'
import { BlogProvider } from '@/context/blog'
import { UserProvider } from '@/context/user'
import { CommentProvider } from '@/context/comment'

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
            <Providers>
               <BlogProvider>
                  <UserProvider>
                     <CommentProvider>
                        <GlobalProvider>
                           <AuthProvider>
                              <Header />
                              {children}
                              <Footer />
                           </AuthProvider>
                        </GlobalProvider>
                     </CommentProvider>
                  </UserProvider>
               </BlogProvider>
            </Providers>
         </body>
      </html>
   )
}
