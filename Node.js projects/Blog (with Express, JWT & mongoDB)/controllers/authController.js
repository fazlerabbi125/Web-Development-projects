const User=require('../models/Users');
const jwt=require('jsonwebtoken');

function handleErrors (err) {
    console.log(err.message, err.code);
    let errors = { email: '', password: '' };
  
    // incorrect email
    if (err.message === 'incorrect email') {
      errors.email = 'That email is not registered';
    }
  
    // incorrect password
    if (err.message === 'incorrect password') {
      errors.password = 'That password is incorrect';
    }
  
    // duplicate email error as field is unique
    if (err.code === 11000) {
      errors.email = 'that email is already registered';
      return errors;
    }
  
    // validation errors
    if (err.message.includes('user validation failed')) {
      // console.log(err);
      Object.values(err.errors).forEach(({ properties }) => {
        // console.log(val);
        // console.log(properties);
        errors[properties.path] = properties.message;
      });
    }
  
    return errors;
  }

const duration = 3*24*60*60;//3 days in seconds
function createToken(id){
  return jwt.sign({id},'JWT authentication practice',{expiresIn:duration})
}
module.exports.signup_get= (req, res) =>{
  res.render('auth/signup');
}

module.exports.signup_post= async (req, res) =>{
    const {email, name, password,birth_date,gender} = req.body;

    try {
        const user= await User.create({email, name, password,birth_date,gender})
        const token = createToken(user._id);
        res.cookie('jwt',token,{httpOnly:true, maxAge:duration*1000});//httpOnly=> if true, token not accessible from frontend
        res.status(201).json({user:user._id});
    }
    catch(err){
        error = handleErrors(err);
        res.status(400).send(error);
    }
}

module.exports.login_get= (req, res) =>{
  res.render('auth/login')
}

module.exports.login_post= async (req, res) =>{
}