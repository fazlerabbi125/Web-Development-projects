const mongoose= require('mongoose');
const validator=require('validator');
const bcrypt= require('bcryptjs');
  
const userSchema = mongoose.Schema({
    email: {
        type: String,
        required:[true, 'Please enter an email address'],
        unique: true,
        lowercase: true,
        validate:[validator.isEmail,'Please enter a valid email address'],
    },
    name: {
        type: String,
        minLength:[3,'Must be at least 3 characters, got {VALUE}'],
        required:[true, 'Please enter your name'],
    },
    password: {
        type: String,
        required:[true, 'Please enter a password'],
        minLength:[6,'Minimum length of password is 6 characters'],
    },
    birth_date: {
        required:[true, 'Please choose your birth date'],
        type:Date,
        default: Date.now
    },
    gender: {
        type: String,
        required:[true, 'Please choose your gender'],
        enum: ['Male', 'Female','Others'],
    },

},{timestamps:true});
//jwt_secret_key

userSchema.pre('save', async function(next) { //normal function used instead of arrow functions to refer to User instance using this keyword
  // Hashing passwords with bcrypt
  const salt= await bcrypt.genSalt();// async function
  this.password = await bcrypt.hash(this.password,salt);
  next();//To go to the next process in the file
});
const User=mongoose.model('User',userSchema)/*creates model based on the schema.Specified model is stored
in the database with its name lowercased and pluralized*/
module.exports=User;