const express = require("express");
const router = express.Router();
const Post = require("../models/post");
const { isAdmin } = require("../middleware/auth");

// INDEX - Show all blog posts
router.get("/", isAdmin, async (req, res) => {
    try {
        const posts = await Post.find({});
        res.render("index", { posts });
    } catch (err) {
        console.log(err);
        res.redirect("/");
    }
});

// NEW - Show form to create a new post
router.get("/new", isAdmin, (req, res) => {
    res.render("new");
});

// CREATE - Add a new post to MongoDB database
router.post("/", isAdmin, async (req, res) => {
    const newPost = {
        title: req.body.title,
        content: req.body.content,
    };

    try {
        await Post.create(newPost);
        res.redirect("/posts");
    } catch (err) {
        console.log(err);
        res.redirect("/posts/new");
    }
});

// SHOW - Show details of a single post
router.get("/:id", isAdmin, async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        res.render("show", { post });
    } catch (err) {
        console.log(err);
        res.redirect("/posts");
    }
});

// EDIT - Show form to edit a post
router.get("/:id/edit", isAdmin, async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        res.render("edit", { post });
    } catch (err) {
        console.log(err);
        res.redirect("/posts");
    }
});

// UPDATE - Update a specific post
router.put("/:id", isAdmin, async (req, res) => {
    const updatedPost = {
        title: req.body.title,
        content: req.body.content,
    };

    try {
        await Post.findByIdAndUpdate(req.params.id, updatedPost);
        res.redirect(`/posts/${req.params.id}`);
    } catch (err) {
        console.log(err);
        res.redirect("/posts");
    }
});

// DELETE - Delete a specific post
router.delete("/:id", isAdmin, async (req, res) => {
    try {
        await Post.findByIdAndRemove(req.params.id);
        res.redirect("/posts");
    } catch (err) {
        console.log(err);
        res.redirect("/posts");
    }
});

module.exports = router;
