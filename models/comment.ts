import { Schema, model, models } from 'mongoose'
const { ObjectId } = Schema.Types

const commentSchema = new Schema({
    by: { type: ObjectId, ref: 'User' },
    blogId: { type: ObjectId, ref: 'Blog' },
    text: { type: String, required: [true, "Text is required."] },
}, { timestamps: true })

const Comment = models.Comment || model('Comment', commentSchema)

export default Comment