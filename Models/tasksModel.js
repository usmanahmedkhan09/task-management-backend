const mongoose = require('mongoose')
const { Schema } = mongoose;

const tasksSchema = new Schema({
    title: String,
    description: String,
    listId: { type: String, ref: 'Lists' },
    subtasks: [{ type: Schema.Types.ObjectId, ref: 'subTasks' }],
    // due_date: { type: Date, default: new Date().now() },
    // assigned_to: { type: Date, default: new Date().now() },
    labels: [String],
    comments: [],
    attachments: [],
}, { timestamps: true })

module.exports = mongoose.model('Tasks', tasksSchema)