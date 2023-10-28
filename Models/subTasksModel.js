import mongoose from "mongoose";
const { Schema } = mongoose;

const subTasksSchema = new Schema({
    description: String,
    isComplete: Boolean,

}, { timestamps: true })

module.exports = mongoose.model('subTasks', subTasksSchema)