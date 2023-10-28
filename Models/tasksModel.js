import mongoose from "mongoose";
const { Schema } = mongoose;

const tasksSchema = new Schema({
    title: String,
    description: String,
    due_date: { type: Date, default: Date().now() },
    assigned_to: { type: Date, default: Date().now() },
    labels: [String],
    sub_tasks: [],
    comments: [],
    attachments: [],
}, { timestamps: true })

module.exports = mongoose.model('Tasks', tasksSchema)