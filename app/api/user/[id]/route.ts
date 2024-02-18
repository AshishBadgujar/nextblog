import User from "@/models/user"
import Comment from "@/models/comment"
import { connectDB } from "@/utils/database"
import { NextApiRequest, NextApiResponse } from "next"

export const GET = async (req: Request, { params }) => {
    try {
        await connectDB()
        const user = await User.findById(params.id)
        if (!user) return new Response("User not found", { status: 404 })
        return new Response(JSON.stringify(user), { status: 200 })
    } catch (error: any) {
        return new Response(error.message, { status: 500 })
    }
}
export const PATCH = async (req: Request, { params }) => {
    const { bio, fb, x, insta, yt } = await req.json()
    try {
        const existingUser = await User.findById(params.id)
        if (!existingUser) return new Response("User not found", { status: 404 })
        const newUser = await User.findByIdAndUpdate(params.id, { $set: { bio, fb, x, insta, yt } }, { new: true })
        return new Response(JSON.stringify(newUser), { status: 200 })
    } catch (error: any) {
        return new Response(error.message, { status: 500 })
    }
}
export const DELETE = async (req: Request, { params }) => {
    try {
        await connectDB()
        await User.findByIdAndDelete(params.id)
        await Comment.deleteMany({ userId: params.id })
        return new Response("User deleted successfully", { status: 200 })
    } catch (error: any) {
        return new Response(error.message, { status: 500 })
    }
}