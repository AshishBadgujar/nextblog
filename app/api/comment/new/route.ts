import Comment from "@/models/comment"
import { connectDB } from "@/utils/database"

export const POST = async (req: Request) => {
    const { by, blogId, text } = await req.json()
    try {
        await connectDB()
        let newComment = await new Comment({
            by,
            blogId,
            text
        }).save()
        newComment = await newComment.populate('by')
        return new Response(JSON.stringify(newComment), { status: 201 })
    } catch (error) {
        return new Response("Failed to create a Comment", { status: 500 })
    }
}