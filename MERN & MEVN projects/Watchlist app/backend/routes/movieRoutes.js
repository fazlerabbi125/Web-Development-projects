const {Router} = require('express');
const MovieController= require('../controllers/MovieController')
const router = new Router();
const validator = require('../middlewares/validation');
const auth = require('../middlewares/authMiddleware');



router.get('/',MovieController.getAll);

router.get('/movie-details/:id',MovieController.getMovie);//was previously /employee/:id

router.post('/add-to-list',auth.checkAuth,validator.watchList,MovieController.postWatchList);

router.delete('/delete-from-list/:listItemID',auth.checkAuth,MovieController.deleteMovieFromWatchList);

router.get('/get-list',auth.checkAuth,MovieController.getWatchList);

router.put('/change-status/:listItemID',auth.checkAuth,validator.status,MovieController.putChangeStatus);


module.exports =router;