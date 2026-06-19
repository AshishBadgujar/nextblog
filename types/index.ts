export interface IBlog {
   id?: string
   title: string
   content: string
   tag?: string
   authorName?: string
   createdAt?: string
   updatedAt?: string
   comments?: IComment[]
}

export interface IComment {
   id?: string
   blogId: string
   name: string
   text: string
   createdAt?: string
   updatedAt?: string
}

export const TAGS = [
   'Economy',
   'Business',
   'Health',
   'Sports',
   'Technology',
   'Others',
] as const
