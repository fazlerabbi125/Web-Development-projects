const {Router} = require('express');
const validator = require('../middlewares/validation');
const auth = require('../middlewares/authMiddleware');
const TrainerController = require('../controllers/TrainerController')

const router = new Router();

router.get('/:batchID/:courseID/get-assessmentList',auth.checkAuth,auth.isTrainer,TrainerController.getAssessmentList);
router.post('/:batchID/:courseID/add-assessment', auth.checkAuth,auth.isTrainer,validator.assessment,TrainerController.addAssessment);
router.patch('/:evalID/edit-assessment', auth.checkAuth,auth.isTrainer,validator.assessment,TrainerController.editAssessment);
router.delete('/:evalID/delete-assessment', auth.checkAuth,auth.isTrainer,TrainerController.deleteAssessment);

router.get('/:evalID/get-assessment', auth.checkAuth,auth.isTrainer,TrainerController.getAssessmentDetails)
router.post('/:evalID/add-task', auth.checkAuth,auth.isTrainer,validator.task,TrainerController.addTask);
router.patch('/:taskID/edit-task', auth.checkAuth,auth.isTrainer,validator.task,TrainerController.editTask);
router.delete('/:taskID/delete-task', auth.checkAuth,auth.isTrainer,TrainerController.deleteTask);

router.patch('/:evalID/set-trainer-scores', auth.checkAuth,auth.isTrainer,validator.traineeScore,TrainerController.setTraineeScores);

router.get('/get-courses',auth.checkAuth,auth.isTrainer,TrainerController.getTrainerCourses)
router.get('/get-batches',auth.checkAuth,auth.isTrainer,TrainerController.getTrainingBatches)


module.exports = router;