import { Schema, models, model } from "mongoose"


const { ObjectId } = Schema.Types

const blogSchema = new Schema({
    title: {
        type: String,
        required: [true, "Title is required."]
    },
    content: {
        type: String,
        required: [true, "Content is required."]
    },
    author: {
        type: ObjectId,
        ref: 'User'
    },
    mediaUrl: {
        type: String,
        required: [true, "Media is required."]
    },
    tag: {
        type: String,
        required: [true, "Category is required."],
        enum: ['Economy', 'Business', 'Health', 'Sports', 'Technology', 'Others']
    }
}, { timestamps: true })

const Blog = models.Blog || model('Blog', blogSchema)
export default Blog

