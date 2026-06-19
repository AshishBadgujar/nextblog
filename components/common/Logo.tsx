import { BRAND } from '@/config/brand'

export default function Logo() {
   return (
      <span className="brand">
         <span className="brand__mark" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none">
               <path
                  className="brand__spark"
                  d="M12 0.5c1.05 7.6 3.9 10.45 11.5 11.5-7.6 1.05-10.45 3.9-11.5 11.5-1.05-7.6-3.9-10.45-11.5-11.5 7.6-1.05 10.45-3.9 11.5-11.5Z"
               />
            </svg>
         </span>
         <span className="brand__word">
            {BRAND.wordA}
            <span className="brand__word-dim">{BRAND.wordB}</span>
         </span>
      </span>
   )
}
