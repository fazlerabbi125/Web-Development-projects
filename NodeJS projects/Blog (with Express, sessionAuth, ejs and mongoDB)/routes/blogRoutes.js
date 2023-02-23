//Use routers to group requests to routes with a similar pattern
const express=require('express');
//Import mongoDB model if controller not used: const Blog=require('../models/blog');
const blogController= require('../controllers/blogController');//Import controller
const authMiddleware = require('../middleware/authMiddleware');//Import middleware
const validation = require('../middleware/validation');

const router=express.Router();//Create express router instance
// ../ for the folder outside current folder/directory and ./ means in same directory


router.get('/create',authMiddleware.requireAuth,(req,res)=>{/*Routes which does not use a URL route 
    parameter should be placed above those containing it to prevent the router for 
    confusing the rest of the url as a route parameter. Write a function body similiar 
    to this if controllers are not used.
    */
   res.locals.header="Add Post"
   res.render('blogForm',{edit:false,errors:{}});
});
router.post('/create',authMiddleware.requireAuth,validation.createPost,blogController.blog_create); //POST request handler

//paths starting with route parameters below to prevent the router for confusing the rest of the url as a route parameter
router.get('/:slug',blogController.blog_details);//2nd argument passes controller function
router.get('/:slug/edit',authMiddleware.requireAuth,blogController.get_blog_edit);
router.post('/:id/edit',authMiddleware.requireAuth,validation.editPost,blogController.put_blog_edit);

router.delete('/:id/delete',authMiddleware.requireAuth,blogController.blog_delete);



module.exports= router;