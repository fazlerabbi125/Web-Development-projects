//Use routers to group requests to routes with a similar pattern
const express=require('express');
//Import mongoDB model if controller not used: const Blog=require('../models/blog');
const blogController= require('../controllers/blogController');//Import controller
const router=express.Router();//Create express router instance
// ../ for the folder outside current folder/directory and ./ means in same directory
router.get('/blogs/create',(req,res)=>{/*Routes which does not use a URL route 
    parameter should be placed above those containing it to prevent the router for 
    confusing the rest of the url as a route parameter. Write a function body similiar 
    to this if controllers are not used.
    */
    console.log("Request received");
    res.render('create',{title:'Create'});
});

router.post('/blogs/create',blogController.blog_create); //POST request handler

router.get('/blogs/:id',blogController.blog_details);//2nd argument passes controller function

router.delete('/blogs/:id',blogController.blog_delete);



module.exports= router;