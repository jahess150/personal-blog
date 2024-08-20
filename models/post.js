const mongoose = require('mongoose');

// Define blog post schema
const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    created: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('Post', postSchema);
