const {Router} = require('express');
const CourseController= require('../controllers/CourseController')
const validator = require('../middlewares/validation');
const multer = require('multer');
const path = require('path');
const auth = require('../middlewares/authMiddleware');


const router = new Router();

const fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        if (file) {
            cb(null, path.join(__dirname,'..' ,'uploads','courses'));
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

router.get('/get-course-list',auth.checkAuth,auth.isAdmin,CourseController.getCourseList);
router.get('/:slug/course-details',auth.checkAuth,CourseController.getCourseDetails);
router.post('/create-course',auth.checkAuth,auth.isAdmin,upload.single('image'),validator.createCourse,CourseController.addCourse);
router.patch('/:slug/edit-course',auth.checkAuth,auth.isAdmin,upload.single('image'),validator.editCourse,CourseController.editCourse);
router.delete('/:slug/delete-course',auth.checkAuth,auth.isAdmin,CourseController.deleteCourse);

router.get('/:lessonID/get-lesson',auth.checkAuth,CourseController.getLesson);
router.post('/:slug/add-lesson',auth.checkAuth,auth.isAdmin,validator.lesson,CourseController.addLesson);
router.patch('/:slug/:lessonID/edit-lesson',auth.checkAuth,auth.isAdmin,validator.lesson,CourseController.editLesson);
router.delete('/:slug/:lessonID/delete-lesson',auth.checkAuth,auth.isAdmin,CourseController.deleteLesson);

router.get('/:batchID/get-batch-details',auth.checkAuth,CourseController.getBatchDetails)

module.exports =router;