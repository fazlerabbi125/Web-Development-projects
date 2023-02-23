const HTTP_STATUS = require('../utils/httpStatus');

const requireAuth = function (req, res, next) {
    if (req.session.user) next();
    else res.status(HTTP_STATUS.UNAUTHORIZED).redirect('/login');
}

const guest = function (req, res, next) {
    if (!req.session.user) next();
    else res.status(HTTP_STATUS.UNAUTHORIZED).redirect('/');
}

module.exports = {requireAuth,guest};