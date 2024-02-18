import Blog from "@/models/blog"
import { connectDB } from "@/utils/database"

export const POST = async (req: Request, res: Response) => {
    const { userId, title, content, mediaUrl, tag } = await req.json()
    try {
        await connectDB()
        const newBlog = new Blog({
            author: userId,
            title,
            content,
            mediaUrl,
            tag
        })
        await newBlog.save()
        return new Response(JSON.stringify(newBlog), { status: 201 })
    } catch (error: any) {
        return new Response(error, { status: 500 })
    }
}