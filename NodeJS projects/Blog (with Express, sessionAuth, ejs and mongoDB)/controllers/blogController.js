const Blog=require('../models/blog'); //Import mongoDB model
const User=require('../models/user'); 
const { validationResult } = require('express-validator');
const HTTP_STATUS = require('../utils/httpStatus');

class BlogController {

    blog_details(req,res,next){
        const slug= req.params.slug; //To get parameter passed in URL
        res.locals.header= "Post details"
        Blog.findOne({slug}).populate('author','_id name') //returns a document which matches the given ID
        .then((result)=>{res.render('details',{blog:result})})
        .catch((err)=>next(err));
    }
    
    blog_delete(req,res,next){
        const _id= req.params.id; 

        Blog.findOneAndDelete({_id,author:req.session.user.id})//finds a document which matches the given ID and deletes it. Returns deleted item
        .then((result)=>{
            console.log(`Deleted: ${result}`);
            res.json({redirect:'/'});
        })//send JSON response. res.send can also be used to send JSON response only if you are sending an object or array
        .catch((err)=>next(err));
    }
    
    async blog_create(req,res,next){
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            console.log(errors.array());
            return res.status(HTTP_STATUS.UNPROCESSABLE_ENTITY).render('blogForm',{errors:errors.mapped(),edit:false,header:"Add Post"});
        }
        try {
            const blog=new Blog({...req.body,author:req.session.user.id});
            await blog.save();
            const user = await User.findById(req.session.user.id).exec();
            user.posts.push(blog._id);
            await user.save();
            res.redirect('/');
        } catch (err) {
            next(err);
        }
    }

    async get_blog_edit(req,res,next){
        try {
            const slug= req.params.slug;
            const blog=await Blog.findOne({slug,author:req.session.user.id}).exec(); //Executes the query. Returns promise instead of cursor/query     
            if (!blog) throw new Error('No posts found');
            res.locals.header="Edit your post"
            res.render('blogForm',{blog,edit:true,errors:{}});
        } catch (error) {
            next(error);
        }
    }
    async put_blog_edit(req,res, next){
        try{
            const _id= req.params.id;
            const blog=await Blog.findOne({_id,author:req.session.user.id}).exec();
            if (!blog) throw new Error('No posts found');
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                console.log(errors.array());
                return res.status(HTTP_STATUS.UNPROCESSABLE_ENTITY).render('blogForm',{errors:errors.mapped(),blog,edit:true,header:"Edit your post"});
            }
            const {title,body}=req.body
            if (title) blog.title=title;
            if (body) blog.body=body;
            await blog.save();
            res.redirect(`/blogs/${blog.slug}`);
        } catch (error) {
            next(error);
        }
    }

}


module.exports=new BlogController();