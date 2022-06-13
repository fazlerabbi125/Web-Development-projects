const {Router}=require('express');
const authController = require('../controllers/authController');
const authMiddleware = require('../middleware/authMiddleware');
const router= Router();

router.get('/sign-up',authMiddleware.guest ,authController.signup_get);
router.post('/sign-up', authMiddleware.guest ,authController.signup_post);

router.get('/login', authMiddleware.guest ,authController.login_get);
router.post('/login', authMiddleware.guest ,authController.login_post);

router.get('/logout',authMiddleware.requireAuth ,authController.logout);

module.exports = router;