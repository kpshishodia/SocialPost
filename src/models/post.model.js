const mongoose = require("mongoose")

// Very small Post schema:
// - image: where you can store an ImageKit URL or ID
// - caption: text that goes with the image
// You can expand this later with user info, timestamps, likes, etc.
const postSchema = new mongoose.Schema({
    image: String,
    caption: String,
})

const postModel = mongoose.model("Post", postSchema)

module.exports = postModel