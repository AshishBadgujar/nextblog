import type { Metadata } from 'next'
import Feed from '@/components/main'
import { BRAND } from '@/config/brand'

export const metadata: Metadata = {
   title: `Home | ${BRAND.name}`,
   description: `The latest posts on ${BRAND.name}.`,
}

export default function HomePage() {
   return <Feed />
}
