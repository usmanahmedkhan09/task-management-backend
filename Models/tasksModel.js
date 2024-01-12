const mongoose = require('mongoose')
const { Schema } = mongoose;

const tasksSchema = new Schema({
    title: String,
    description: String,
    listId: { type: String, ref: 'Lists' },
}, { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } })

tasksSchema.virtual('subtasks', {
    ref: 'subTasks',
    localField: '_id',
    foreignField: 'taskId'
});
module.exports = mongoose.model('Tasks', tasksSchema)