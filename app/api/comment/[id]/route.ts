import Comment from "@/models/comment"
import { connectDB } from "@/utils/database"
import { NextApiRequest, NextApiResponse } from "next"

export const PATCH = async (req: Request, { params }) => {
    const { text } = await req.json()
    try {
        const existingComment = await Comment.findById(params.id)
        if (!existingComment) return new Response("Comment not found", { status: 404 })
        const newComment = await Comment.findByIdAndUpdate(params.id, { $set: { text } }, { new: true })
        return new Response(JSON.stringify(newComment), { status: 200 })
    } catch (error: any) {
        return new Response(error.message, { status: 500 })
    }
}
export const DELETE = async (req: Request, { params }) => {
    try {
        await connectDB()
        await Comment.findByIdAndDelete(params.id)
        return new Response("Comment deleted successfully", { status: 200 })
    } catch (error: any) {
        return new Response(error.message, { status: 500 })
    }
}