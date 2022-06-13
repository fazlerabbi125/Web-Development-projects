
const requireAuth = function (req, res, next) {
    if (req.session.user) next();
    else res.redirect('/login');
}

const guest = function (req, res, next) {
    if (!req.session.user) next();
    else res.redirect('/');
}

module.exports = {requireAuth,guest};