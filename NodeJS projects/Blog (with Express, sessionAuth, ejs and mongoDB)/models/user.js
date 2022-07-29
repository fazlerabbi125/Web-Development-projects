const mongoose= require('mongoose');
const validator=require('validator');
const bcrypt= require('bcrypt');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        trim:true,
        minLength:[3,'Must be at least 3 characters, got {VALUE}'],
        required:[true, 'Name is required'],
    },
    email: {
        type: String,
        required:[true, 'Email address is required'],
        trim:true,
        unique: true,
        lowercase: true,
        validate:[validator.isEmail,'Please enter a valid email address'],
    },
    password: {
        type: String,
        trim:true,
        required:[true, 'Password is required'],
        minLength:[6,'Minimum length of password is 6 characters'],
    },
    birth_date: {
        required:[true, 'Birth date is required'],
        type:Date,
        default: Date.now
    },
    gender: {
        type: String,
        required:[true, 'Gender is required'],
        enum: ['Male', 'Female','Others'],
    },
    photo:{
        type: String,
        default:'/default-profile.jpg'
    },
    posts:[
        {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'Blog'
        }
    ],

},{timestamps:true});


//model static method

userSchema.statics.login= async function (email,password) {
    const user= await this.findOne({email});
    if (user){
        const passMatch = await bcrypt.compare(password,user.password);
        if (passMatch) return user;
    }
    return null;
}

//model instance method
userSchema.methods.resetPassword= async function (password){
    this.password=password;
    this.resetPasswordToken=undefined;
    this.resetPasswordExpire=undefined;
    this.save();
};

const User=mongoose.model('User',userSchema)/*creates model based on the schema.Specified model is stored
in the database with its name lowercased and pluralized*/
module.exports=User;