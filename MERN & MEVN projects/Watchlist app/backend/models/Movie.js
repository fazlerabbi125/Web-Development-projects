const mongoose=require('mongoose');
const validator=require('validator');

const movieSchema=new mongoose.Schema({ 
    title: {
        type: String,
        unique: true,
        minLength:[3,'Must be at least 3 characters, got {VALUE}'],
        required:[true, 'Title is required'],
    },
    genre: {
        type: String,
        required:[true, 'Genre is required'],
        minLength:[2,'Must be at least 2 characters, got {VALUE}'],
    },
    year:{
       type:Number,
       required:[true, 'Year is required'],
       min:[1980,'Year must be 1980 onwards.'],
       max:[2023,'Year must be less than or equal to 2023.'],
    },
    imgUrl:{
        type: String,
        default:''
    },
    rating: {
        type:Number,
        min:[0,'Rating must be 0 onwards.'],
        max:[10,'Rating must be less than or equal to 10.'],
    },
    description: {
        type: String,
        required:[true, 'Description is required'],
        minLength:[5,'Must be at least 5 characters, got {VALUE}'],
    },
    country: {
        type: String,
        minLength:[2,'Must be at least 2 characters, got {VALUE}'],
        required:[true, 'Country is required'],
    },
    language: {
        type: String,
        minLength:[3,'Must be at least 3 characters, got {VALUE}'],
        required:[true, 'Language is required'],
    },
});

const Movie=mongoose.model('Movie',movieSchema);
module.exports=Movie;