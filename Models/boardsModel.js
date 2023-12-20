const mongoose = require('mongoose')
const { Schema } = mongoose;

const boardsSchema = new Schema({
    name: { type: String, require: true },
    description: String,
}, { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } })

boardsSchema.virtual('lists', {
    ref: 'List',
    localField: '_id',
    foreignField: 'boardId'
});

module.exports = mongoose.model('Board', boardsSchema)