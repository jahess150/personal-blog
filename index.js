require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const Post = require("./models/post");
const bodyParser = require("body-parser");
const methodOverride = require("method-override");
const session = require('express-session');
const flash = require('connect-flash');
const bcrypt = require('bcrypt');
const { isAdmin } = require('./middleware/auth');

const app = express();

// Set up sessions
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
}));

// Set up flash messages
app.use(flash());

// Make session data and flash messages available in all views
app.use((req, res, next) => {
    res.locals.currentUser = req.session.userId;
    res.locals.error = req.flash('error');
    next();
});

// Define the admin user (TODO: Switch the user to the database)
const admin = {
    username: 'admin',
    passwordHash: bcrypt.hashSync('password', 10)
};

// Include routing for blog posts
const postRoutes = require("./routes/posts");
app.use("/posts", postRoutes);

/* ------ ADMIN ROUTES ------ */

// Show admin login form
app.get('/admin/login', (req, res) => {
    res.render('login');
});

// Handle login logic
app.post('/admin/login', async (req, res) => {
    const { username, password } = req.body;

    // Check if data matches admin credentials
    if (username === admin.username && await bcrypt.compare(password, admin.passwordHash)) {
        req.session.userId = admin.username;
        res.redirect('/admin/dashboard');
    } else {
        req.flash('error', 'Invalid credentials');
        res.redirect('/admin/login');
    }
});

// Logout the admin
app.get('/admin/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/admin/login');
});

// Admin dashboard
app.get('/admin/dashboard', isAdmin, (req, res) => {
    if (!req.session.userId) {
        return res.redirect('/admin/login'); // If not logged in, redirect
    }
    res.render('dashboard');
});

// Connect to MongoDB
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
