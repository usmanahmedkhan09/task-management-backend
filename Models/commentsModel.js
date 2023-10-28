import mongoose from "mongoose";
const { Schema } = mongoose;

const commentsSchema = new Schema({
    text: String,
}, { timestamps: true })

module.exports = mongoose.model('Comments', commentsSchema)