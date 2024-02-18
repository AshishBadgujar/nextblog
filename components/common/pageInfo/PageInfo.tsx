import Link from 'next/link'
import React from 'react'

/**
 * Our PageInfo is a reusable UI component that used to represent pge title and breadcrumbs section.
 *
 * @property page title as heading, previous all pages navigation link.
 *
 * @returns React component that can be easily integrated into any web application.
 */

const PageInfo = () => {
   return (
      <div className="py-4 bg-base-100 text-center font-work">
         <h1 className="text-base-content text-3xl font-semibold">
            Explore by tag
         </h1>

      </div>
   )
}

export default PageInfo
