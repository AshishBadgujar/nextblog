const formatter = new Intl.DateTimeFormat('en-US', {
   month: 'long',
   day: 'numeric',
   year: 'numeric',
})

/** Format an ISO date string as e.g. "June 19, 2026". */
export function formatDate(value?: string): string {
   if (!value) return ''
   const date = new Date(value)
   if (Number.isNaN(date.getTime())) return ''
   return formatter.format(date)
}

/** Strip HTML tags and clip to a short plain-text excerpt. */
export function excerpt(html = '', max = 150): string {
   const text = html
      .replace(/<[^>]*>/g, ' ')
      .replace(/\s+/g, ' ')
      .trim()
   return text.length > max ? `${text.slice(0, max).trimEnd()}…` : text
}

/** Rough reading time in minutes from HTML content (~200 wpm). */
export function readingTime(html = ''): number {
   const words = (html.replace(/<[^>]*>/g, ' ').match(/\S+/g) || []).length
   return Math.max(1, Math.round(words / 200))
}
