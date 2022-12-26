const {Router} = require('express');
const AdminController= require('../controllers/AdminController')
const validator = require('../middlewares/validation');
const auth = require('../middlewares/authMiddleware');


const router = new Router();


router.get ('/employee-list',auth.checkAuth,auth.isAdmin,AdminController.getEmployees);

router.post('/create-employee',auth.checkAuth,auth.isAdmin,validator.signup,AdminController.registerEmployee);

router.delete('/:id/delete-employee',auth.checkAuth,auth.isAdmin,AdminController.deleteEmployee);

router.patch('/:id/edit-employee',auth.checkAuth,auth.isAdmin,validator.updateEmployee,AdminController.editEmployee);



router.post('/create-batch',auth.checkAuth,auth.isAdmin,validator.createBatch,AdminController.createBatch);

router.delete('/:batchID/delete-batch',auth.checkAuth,auth.isAdmin,AdminController.deleteBatch);

router.patch('/:batchID/edit-batch',auth.checkAuth,auth.isAdmin,validator.editBatch,AdminController.editBatch);

router.get('/get-batch-list',auth.checkAuth,auth.isAdmin,AdminController.getBatchList)


module.exports =router;