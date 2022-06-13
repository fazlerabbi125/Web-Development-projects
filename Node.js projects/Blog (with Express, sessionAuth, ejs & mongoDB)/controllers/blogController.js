const Blog=require('../models/blog'); //Import mongoDB model

const blog_details=(req,res)=>{
    const id= req.params.id; //To get parameter passed in URL
    Blog.findById(id) //returns a document which matches the given ID
    .then((result)=>res.render('details',{blog:result}))
    .catch((err)=>console.log(err));
}

function blog_delete(req,res){
    const id= req.params.id; 
    Blog.findByIdAndDelete(id)//finds a document which matches the given ID and deletes it
    .then((result)=>res.json({redirect:'/'}))//send JSON response
    .catch((err)=>console.log(err));
}

function blog_create(req,res){
    const blog=new Blog(req.body);
    blog.save() 
    .then((result)=>res.redirect('/'))
    .catch((err)=>console.log(err));
}

module.exports={blog_details,
    blog_delete:blog_delete,blog_create};