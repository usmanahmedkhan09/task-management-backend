const mongoose = require('mongoose')
const { Schema } = mongoose;

const boardsSchema = new Schema({
    name: String,
    description: String,
    lists: [{ type: Schema.Types.ObjectId, ref: 'List' }]
}, { timestamps: true })

module.exports = mongoose.model('Board', boardsSchema)