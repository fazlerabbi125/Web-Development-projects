const express = require('express');
const authController = require('../controllers/AuthController');
const validator = require('../middlewares/validation');
const {guest,checkAuth} = require('../middlewares/authMiddleware');
const multer = require('multer');
const path = require('path');

const router = express.Router();

const fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        if (file) {
            cb(null, path.join(__dirname,'..' ,'uploads','profiles'));
        } else {
            cb('No file found', null);
        }
    },
    filename: (req, file, cb) => {
        if (file) {
            const uniquePrefix = Date.now() + '-' + Math.round(Math.random() * 1E9)+"-"
            cb(null,uniquePrefix+
                file.originalname.split('.')[0].replace(/\ /g, '') +path.extname(file.originalname));
                // replaces \ with '' with file.orginalname
        } else {
            cb('No file found', null);
        }
    },
});

const checkImage = (req, file, cb) => {
    if (file) {
        if ( ['image/jpeg','image/jpg','image/png'].includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(new Error('Only PNG, JPG and JPEG files are supported'));
        }
    } // To accept the file pass `true`, otherwise pass `false`
    // else {            //cb(null, false);
    //     cb(new Error('No file found'));
    // }
};

const upload = multer({
    storage: fileStorage,
    fileFilter: checkImage,
});

router.get('/:userID/get-profile', checkAuth, authController.getProfile);

router.patch('/:userID/update-profile', checkAuth, upload.single('photo'), validator.updateProfile,authController.updateProfile);

router.post('/login',guest, validator.login, authController.login);

router.get("/verify-email/:token/:id",authController.verifyEmail)

router.patch("/email-on-expire-mail/:id",authController.confirmEmailOnExpire)

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