const {Router} = require('express');
const validator = require('../middlewares/validation');
const auth = require('../middlewares/authMiddleware');
const TraineeController = require('../controllers/TraineeController');
const multer = require('multer');
const path = require('path');

const router = new Router();

// const fileStorage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         if (file) {
//             cb(null, path.join(__dirname,'..' ,'uploads','submissions'));
//         } else {
//             cb('No file found', null);
//         }
//     },
//     filename: (req, file, cb) => {
//         if (file) {
//             const uniquePrefix = Date.now() + '-' + Math.round(Math.random() * 1E9)+"-"
//             cb(null,uniquePrefix+
//                 file.originalname.split('.')[0].replace(/\ /g, '') +path.extname(file.originalname));
//         } else {
//             cb('No file found', null);
//         }
//     },
// });

// const checkSubmission = (req, file, cb) => {
//     if (file) {
//         if ( ['application/pdf','application/msword','application/vnd.openxmlformats-officedocument.wordprocessingml.document','application/zip'].includes(
//             file.mimetype)) {
//             cb(null, true);
//         } else {
//             cb(null, false);
//         }
//     } // To accept the file pass `true`, otherwise pass `false`
//     // else {            //cb(null, false);
//     //     cb(new Error('No file found'));
//     // }
// };

// const upload = multer({
//     storage: fileStorage,
//     fileFilter: checkSubmission,
// });

router.get('/get-batch-list',auth.checkAuth,auth.isTrainee,TraineeController.getBatches)
router.get('/:batchID/:courseID/get-assessmentList',auth.checkAuth,auth.isTrainee,TraineeController.getAssessmentList);
router.get('/:evalID/get-assessment', auth.checkAuth,auth.isTrainee,TraineeController.getAssessmentDetails)

module.exports =router;
