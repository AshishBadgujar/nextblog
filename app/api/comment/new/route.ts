import Comment from "@/models/comment"
import { connectDB } from "@/utils/database"
import { NextApiRequest, NextApiResponse } from "next"

export const POST = async (req: Request) => {
    const { userId, blogId, text } = await req.json()
    try {
        await connectDB()
        const newComment = new Comment({
            by: userId,
            blogId,
            text
        })
        await newComment.save()
        return new Response(JSON.stringify(newComment), { status: 201 })
    } catch (error) {
        return new Response("Failed to create a Comment", { status: 500 })
    }
}