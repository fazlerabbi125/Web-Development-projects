const mongoose=require('mongoose');
const validator=require('validator');

const tokenSchema=new mongoose.Schema({ 
    refreshToken:{
        type: String,
        required: [true,'refreshToken is required'],
        validate:[validator.isJWT,'refreshToken must be a JWT'],
    }
},{timestamps:true});



const Token=mongoose.model('Token',tokenSchema);
module.exports=Token;