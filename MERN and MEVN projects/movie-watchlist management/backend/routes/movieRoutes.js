const {Router} = require('express');
const MovieController= require('../controllers/MovieController')
const router = new Router();
const validator = require('../middlewares/validation');
const auth = require('../middlewares/authMiddleware');



router.get('/',MovieController.getAll);

router.get('/movie-details/:id',MovieController.getMovie);//was previously /employee/:id

router.post('/add-to-list',auth.checkAuth,auth.isNormalUser,validator.watchList,MovieController.postWatchList);

router.delete('/delete-from-list/:listItemID',auth.checkAuth,auth.isNormalUser,MovieController.deleteMovieFromWatchList);

router.get('/get-list',auth.checkAuth,auth.isNormalUser,MovieController.getWatchList);

router.put('/change-status/:listItemID',auth.checkAuth,auth.isNormalUser,validator.status,MovieController.putChangeStatus);


module.exports =router;