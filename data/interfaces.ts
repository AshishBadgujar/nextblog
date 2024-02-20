export interface IBlog {
    _id?: string,
    title: string,
    content: string,
    author?: IUser,
    mediaUrl?: string,
    tag?: string,
    createdAt?: string,
    updatedAt?: string,
    comments?: IComment[]
}
export interface IUser {
    _id?: string,
    email: string,
    username: string,
    image: string,
    bio?: string,
    fb?: string,
    x?: string,
    insta?: string,
    yt?: string,
    createdAt?: string,
    updatedAt?: string
}
export interface IComment {
    _id?: string,
    by: IUser,
    blogId: string,
    text: string,
    createdAt?: string,
    updatedAt?: string
}