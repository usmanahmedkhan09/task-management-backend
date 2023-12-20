const mongoose = require("mongoose");
const { Schema } = mongoose;

const listsSchema = new Schema({
    name: String,
    boardId: { type: Schema.Types.ObjectId, ref: 'Board' },

}, { timestamps: true })

module.exports = mongoose.model('List', listsSchema)