require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const Post = require("./models/post");
const bodyParser = require("body-parser");
const methodOverride = require("method-override");
const app = express();

// Include routing for blog posts
const postRoutes = require("./routes/posts");
app.use("/posts", postRoutes);

// Connect to MongoDB

require("dotenv").config(); // Import environment variables
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// Set up middleware for route handling
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride("_method")); // Allow HTTP overrides for REST API
app.use(express.static("public"));
app.set("view engine", "ejs");

// Placeholder route for testing server
app.get("/", (req, res) => {
    res.send("Hello, personal blog!");
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
