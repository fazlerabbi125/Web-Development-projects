const {Router}=require('express');
const authController = require('../controllers/authController');
const authMiddleware = require('../middleware/authMiddleware');
const validation = require('../middleware/validation');
const multer =require ('multer');
const path = require('path');

const router= Router();

const fileStorage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname,'..','assets','uploads'))//won't work with '../assets/uploads'. Use .. after __dirname to go outside of current directory
    },
    filename: function (req, file, cb) {
        console.log(file.originalname);
        const filename= Math.round(Math.random() * 1E7)+ '-'+file.originalname.split('.')[0].replace(/\ /g, '') + '-'+Date.now();
        cb(null,  filename+path.extname(file.originalname))
    }
  })
  
const upload = multer({ 
    storage: fileStorage,
    fileFilter:function(req, file, cb){
        if (file){
            if (["image/jpeg", "image/png", "image/jpg"].includes(file.mimetype)) cb(null, true);
            else cb(new Error('Only PNG, JPG and JPEG files are supported'));
        }
        
        // The function should call `cb` with a boolean to indicate if the file should be accepted
        
        // To reject this file pass `false`, like so: cb(null, false)
        // To accept the file pass `true`, like so: cb(null, true)
        // You can always pass an error if something goes wrong: cb(new Error('I don\'t have a clue!'))
    }
})

router.get('/sign-up',authMiddleware.guest ,authController.signup_get);
router.post('/sign-up', authMiddleware.guest,upload.single('photo'),validation.signup,authController.signup_post);

router.get('/login', authMiddleware.guest ,authController.login_get);
router.post('/login', authMiddleware.guest, validation.login,authController.login_post);

router.get('/logout',authMiddleware.requireAuth ,authController.logout);

router.get('/user/:id',authMiddleware.requireAuth,authController.getProfile);
router.get('/user/:id/update',authMiddleware.requireAuth,authController.getProfileUpdateForm);
router.post('/user/:id/update',authMiddleware.requireAuth,upload.single('photo'),validation.updateProfile,authController.updateProfileInfo);
router.get('/user/:id/reset-password',authMiddleware.requireAuth,authController.getResetForm);
router.post('/user/:id/reset-password',authMiddleware.requireAuth,validation.resetPassword,authController.resetPassword);
router.delete('/user/:id/delete',authMiddleware.requireAuth,authController.deleteUser);


module.exports = router;
