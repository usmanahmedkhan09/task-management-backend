const mongoose = require('mongoose')
const { Schema } = mongoose;

const subTasksSchema = new Schema({
    description: String,
    isComplete: {
        type: Boolean,
        default: false
    },
    taskId: { type: Schema.Types.ObjectId, ref: 'Tasks' },

}, { timestamps: true })

module.exports = mongoose.model('subTasks', subTasksSchema)