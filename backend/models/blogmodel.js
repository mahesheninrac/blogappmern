const mongoose = require("mongoose");
const User = require("./userModel");

const BlogSchema = new mongoose.Schema({
    title: String,
    content: String,
    author:{type:mongoose.Schema.Types.ObjectId, ref:"User"},
    updatedAt: {
        type: Date,
        default: Date.now
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
})