const mongoose = require("mongoose");
const { Schema } = mongoose;

const listsSchema = new Schema({
    name: String,
    tasks: String,

}, { timestamps: true })

module.exports = mongoose.model('List', listsSchema)