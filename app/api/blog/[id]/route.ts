import Blog from "@/models/blog"
import Comment from "@/models/comment"
import { connectDB } from "@/utils/database"
import { NextApiRequest, NextApiResponse } from "next"

export const GET = async (req: Request, { params }) => {

    try {
        await connectDB()
        let blog = await Blog.findById(params.id).populate('author')
        const comments = await Comment.find({ blogId: params.id }).populate('by').sort({ updatedAt: -1 })
        blog = { ...blog._doc, comments }
        if (!blog) return new Response("Blog not found", { status: 404 })
        return new Response(JSON.stringify(blog), { status: 200 })
    } catch (error: any) {
        return new Response(error.message, { status: 500 })
    }
}
export const PATCH = async (req: Request, { params }) => {
    const { title, content } = await req.json()
    try {
        const existingBlog = await Blog.findById(params.id)
        if (!existingBlog) return new Response("Blog not found", { status: 404 })
        const newBlog = await Blog.findByIdAndUpdate(params.id, { $set: { title, content } }, { new: true })
        return new Response(JSON.stringify(newBlog), { status: 200 })
    } catch (error: any) {
        return new Response(error.message, { status: 500 })
    }
}
export const DELETE = async (req: Request, { params }) => {
    try {
        await connectDB()
        await Blog.findByIdAndDelete(params.id)
        await Comment.deleteMany({ blogId: params.id })
        return new Response("Blog deleted successfully", { status: 200 })
    } catch (error: any) {
        return new Response(error.message, { status: 500 })
    }
}