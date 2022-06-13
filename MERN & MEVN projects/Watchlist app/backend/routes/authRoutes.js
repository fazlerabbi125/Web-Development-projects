const express = require('express');
const authController = require('../controllers/AuthController');
const validator = require('../middlewares/validation');
const {guest,checkAuth} = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/signup',guest, validator.signup, authController.signup);

router.post('/login',guest, validator.login, authController.login);

router.get("/verify-email/:token/:id",authController.verifyEmail)

router.post('/refresh-token',validator.refreshToken,authController.renewTokens);

router.post('/logout',validator.refreshToken,authController.logout);

router.post(
    '/send-reset-password-mail',guest,
    validator.resetPasswordMail,
    authController.sendResetPasswordMail
);

router.post(
    '/reset-password',
    validator.resetPassword,
    authController.resetPassword
);

module.exports = router;