const mongoose=require('mongoose');
const validator=require('validator');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        trim:true,
        minLength:[3,'Must be at least 3 characters, got {VALUE}'],
        required:[true, 'Name is required'],
    },
    email: {
        type: String,
        require: true,
        unique: true,
        validate:[validator.isEmail,'Please enter a valid email address'],
    },
    password: {
        type: String,
        require: true,
        trim:true,
        minLength:[6,'Must be at least 6 characters, got {VALUE}'],
    },
    role: {
        type: String,
        enum: ['admin', 'trainer','trainee'],
        default: 'admin'
    },
    gender: {
        type: String,
        required:[true, 'Gender is required'],
        enum: ['Male', 'Female','Others'],
    },
    birth_date:{
        type: Date,
        require: true,
    },
    photo:{
        type: String,
        default:''
    },
    emailVerified:{
        type: Boolean,
        default: false
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
    emailVerificationToken: String,
    emailVerificationExpire:Date
});

userSchema.statics.login= async function(email,password){
    const user = await this.findOne({ email}).exec();
    if (user) {
        const passMatch = await bcrypt.compare(password, user.password);
        if (passMatch) return user;
    }
    return null;
}    

const User = mongoose.model('User', userSchema);
module.exports = User;