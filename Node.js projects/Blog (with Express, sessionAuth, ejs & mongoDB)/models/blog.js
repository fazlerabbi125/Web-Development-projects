const mongoose=require('mongoose');

const blogSchema=new mongoose.Schema({  //for defining document structure
   //id property automatically created and used as primary key
    title:{
       type:String,
       required:true
    },
    snippet:{
       type:String,
       required:true
    },
    body:{
       type:String,
       required:true
    }
},{timestamps:true})/* 2nd argument is an options object and the timestamp property is used to 
automatically generate timestamp properties on our documents
*/
const Blog=mongoose.model('Blog',blogSchema)/*creates model based on the schema.Specified model is stored
in the database with its name lowercased and pluralized*/
module.exports=Blog;