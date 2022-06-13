const User=require('../models/Users');

class AuthController {
  
  signup_get (req, res){
    res.render('auth/signup');
  }

  async signup_post (req, res,next){
    const {email, name, password,birth_date,gender,password2} = req.body;

    try {
        if (password !== password2) throw new Error('Passwords do not match');
        const user= await User.create({email, name, password,birth_date,gender});
        console.log("You are now logged in");
        req.session.user={id:user_id,name:user.name,photo:user.photo};
        res.redirect('/');
    }
    catch(err){
        next(err);
        let errors={};
        // duplicate email error as field is unique
        if (err.code === 11000 && err.message.toLowerCase().includes('email')) {
           errors.email = 'that email is already registered';
         }
      
        // validation errors
        else if (err.message.toLowerCase().includes('user validation failed')) {
          // console.log(err);
          Object.values(err.errors).forEach(({ properties }) => {
            errors[properties.path]=properties.message;
          });
        }
        else{
          errors.password = err.message;
        }
        console.log(errors);
        res.render('auth/signup',{errors})
    }
  }
  
  login_get(req, res){
    res.render('auth/login')
  }

  async login_post (req, res,next){
    const {email, password} = req.body;
  
    try {
      const user = await User.login(email, password);
      if (user){
        console.log("You are now logged in");
        req.session.user={id:user_id,name:user.name,photo:user.photo};
        return res.redirect('/');
      }
      res.redirect('/login');
    } catch (err) {
      let errors={};
      if (err.message === 'incorrect email') {
        errors.email = 'That email is not registered';
      }
      // incorrect password
      if (err.message === 'incorrect password') {
        errors.password = 'That password is incorrect';
      }
      console.log(errors);
    }
  }
  logout=(req,res) => {// /logout
    req.session.destroy((err)=>{
      if (err)  res.send(err.message);
      res.redirect('/');
    });
  }
}



module.exports= new AuthController();