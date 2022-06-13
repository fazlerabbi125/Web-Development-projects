const mongoose= require('mongoose');
const validator=require('validator');
const bcrypt= require('bcryptjs');
  
const userSchema = mongoose.Schema({
    email: {
        type: String,
        required:[true, 'Email address is required'],
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
        required:[true, 'Password is required'],
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
    photo:{
        type: String,
        default:'http://localhost:8000/default-profile.jpg'
    }

},{timestamps:true});

//mongoose hook: pre-save (performs operations before saving to database)
userSchema.pre('save', async function(next) { //normal function used instead of arrow functions to refer to User instance using this keyword
  // Hashing passwords with bcrypt
  const salt= await bcrypt.genSalt();// async function
  this.password = await bcrypt.hash(this.password,salt);
  next();//To go to the next process in the file
});

//static method to login users

userSchema.statics.login= async function (email,password) {
    const user= await this.findOne({email});
    if (user){
       const auth = await bcrypt.compare(password,user.password);
       if (auth) return user;
    }
    return null;
}

const User=mongoose.model('User',userSchema)/*creates model based on the schema.Specified model is stored
in the database with its name lowercased and pluralized*/
module.exports=User;