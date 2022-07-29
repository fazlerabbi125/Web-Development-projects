const {Router} = require('express');
const AdminController= require('../controllers/AdminController')
const validator = require('../middlewares/validation');
const multer = require('multer');
const path = require('path');
const auth = require('../middlewares/authMiddleware');


const router = new Router();

const fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        if (file) {
            cb(null, path.join(__dirname,'..' ,'uploads'));
        } else {
            cb('No file found', null);
        }
    },
    filename: (req, file, cb) => {
        if (file) {
            const uniquePrefix = Date.now() + '-' + Math.round(Math.random() * 1E9)+"-"
            cb(null,uniquePrefix+
                file.originalname.split('.')[0].replace(/\ /g, '') +path.extname(file.originalname));
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


router.post('/create',auth.checkAuth,auth.isAdmin,upload.single('poster'),validator.createMovie,AdminController.addMovie);

router.delete('/:id/delete',auth.checkAuth,auth.isAdmin,AdminController.deleteMovie);

router.put('/:id/edit',auth.checkAuth,auth.isAdmin,upload.single('poster'),validator.updateMovie,AdminController.editMovie);

module.exports =router;