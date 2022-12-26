const mongoose=require('mongoose');
const slugify = require('slugify');
const blogSchema= new mongoose.Schema({
 
//for defining document structure
   //id property automatically created and used as primary key
    title:{
       type:String,
       trim:true,
       required: [true, 'Post title is required'],
       minLength:[3,'Must be at least 3 characters, got {VALUE}']
    },
    body:{
       type:String,
       trim:true,
       required:[true,'Post body is required'],
       minLength:[5,'Must be at least 5 characters, got {VALUE}']
    },
    author:{
      required:true,
      type:mongoose.Schema.Types.ObjectId, 
      ref: 'User',
    },
    slug:String,
},{timestamps:true});/* 2nd argument is an options object and the timestamp property is used to 
automatically generate timestamp properties on our documents
*/

//mongoose hook: pre-save (performs operations before saving to database)
blogSchema.pre('save', async function(next) { //normal function used instead of arrow functions to refer to model instance using this keyword
   this.slug= slugify(this.title+"_"+this._id); 
   next();//To go to the next process
 });

const Blog=mongoose.model('Blog',blogSchema)/*creates model based on the schema.Specified model is stored
in the database with its name lowercased and pluralized*/
module.exports=Blog;