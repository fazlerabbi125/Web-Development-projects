const mongoose=require('mongoose');
const validator=require('validator');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
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
        minLength:[6,'Must be at least 6 characters, got {VALUE}'],
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    emailVerified:{
        type: Boolean,
        default: false
    },
    refreshToken: String,
    resetPasswordToken: String,
    resetPasswordExpire: Date,
    emailVerificationToken: String
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