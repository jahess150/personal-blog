// Middleware to check if the admin is logged in
function isAdmin(req, res, next) {
    if (req.session.userId) {
        return next();
    } else {
        res.redirect('/admin/login');
    }
}

module.exports = { isAdmin };
