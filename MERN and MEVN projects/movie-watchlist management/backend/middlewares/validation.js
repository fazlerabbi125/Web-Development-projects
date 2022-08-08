//validate:[validator.isEmail,'Please enter a valid email address'],
const { body } = require('express-validator');
const Movie= require('../models/Movie');
const User= require('../models/User');
const validate=require('validator');


const validator = {
    createMovie: [
        body('title').trim()
            .notEmpty().withMessage('Title is required')
            .isString().withMessage('Title must be string!')
            .isLength({min:3}).withMessage('Title Must be at least 3 characters')
            .custom(value => {
                return Movie.findOne({title: value}).then(movie => {
                if (movie) return Promise.reject('Title already in use');
                });
            })
            ,
        body('genre').trim()
            .notEmpty().withMessage('genre is required')
            .isString().withMessage('genre must be string!')
            .isLength({min:2}).withMessage('genre must be at least 2 characters'),
        body('year')
            .notEmpty().withMessage('year is required')
            .isInt({min:1980,max:2023}).withMessage('year must be an integer between 1980 and 2023'),
        body('imgUrl').trim()
            .isString().withMessage('imgUrl must be string!')
            .custom(value => {
                if (value && !/(https?:\/\/)([^\s(["<,>/]*)(\/)[^\s[",><]*(.png|.jpg|.jpeg)(\?[^\s[",><]*)?/.test(value)) 
                    throw new Error('Image URL must be either null or a png, jpg or jpeg file');
                return true;
            }),
        body('rating')
            .custom(value => {
                if (value && !validate.isInt(value.toString(),{ min: 0, max: 10 })) 
                    throw new Error('Rating must be either null or an integer between 0 and 10');
                return true;
            }),
        body('description').trim()
            .notEmpty().withMessage('description is required')
            .isString().withMessage('description must be string!')
            .isLength({min:5}).withMessage('description must be at least 5 characters'),
        body('country').trim()
            .notEmpty().withMessage('country is required')
            .isString().withMessage('country must be string!')
            .isLength({min:2}).withMessage('country Must be at least 2 characters'),
        body('language').trim()
            .notEmpty().withMessage('language is required')
            .isString().withMessage('language must be string!')
            .isLength({min:3}).withMessage('language Must be at least 3 characters')
    ],
    updateMovie: [
        body('title').trim()
            .isString().withMessage('Title must be string!')
            .isLength({min:3}).withMessage('Title Must be at least 3 characters')
            .custom((value, { req })  => {
                return Movie.findOne({title: value}).then(movie => {
                  if (movie && movie._id.toString()!==req.params.id) return Promise.reject('Title already in use');
                });
              })
            ,
        body('genre').trim()
            .isString().withMessage('genre must be string!')
            .isLength({min:2}).withMessage('genre must be at least 2 characters'),
        body('year')
            .isInt({min:1980,max:2023}).withMessage('year must be an integer between 1980 and 2023'),
        body('imgUrl').trim()
            .isString().withMessage('imgUrl must be string!')
            .custom(value => {
                if (value && !/(https?:\/\/)([^\s(["<,>/]*)(\/)[^\s[",><]*(.png|.jpg|.jpeg)(\?[^\s[",><]*)?/.test(value)) 
                    throw new Error('Image URL must be either null or a png, jpg, or jpeg file');
                return true;
            }),
        body('rating')
            .custom(value => {
                if (value && !validate.isInt(value.toString(),{ min: 0, max: 10 })) 
                    throw new Error('Rating must be either null or an integer between 0 and 10');
                return true;
            }),
        body('description').trim()
            .isString().withMessage('description must be string!')
            .isLength({min:5}).withMessage('description must be at least 5 characters'),
        body('country').trim()
            .isString().withMessage('country must be string!')
            .isLength({min:2}).withMessage('country Must be at least 2 characters'),
        body('language').trim()
            .isString().withMessage('language must be string!')
            .isLength({min:3}).withMessage('language Must be at least 3 characters')
    ],
    watchList:[
        body('id')
        .notEmpty().withMessage('Movie id is required')
        .isString().withMessage('Movie id must be string!'),
    ],
    status:[
        body('status').trim()
        .notEmpty().withMessage('Movie status is required')
        .isString().withMessage('Movie status must be string!')
        .isIn(["N/A", 'Completed','Watching','Considering','Skipping']).withMessage('Invalid movie status value')
    ],
    signup: [
        body('name').trim()
        .notEmpty().withMessage('Name is required')
        .isString().withMessage('Name must be string!')
        .isLength({min:3}).withMessage('Name Must be at least 3 characters'),
        body('email').trim().isEmail().withMessage('E-mail is invalid').custom(async(value) => {
            const user = await User.findOne({ email: value }).exec();
            if (user) {
                return Promise.reject("E-mail is already exists!");
            }
            return true;
        }),
        body('password').trim().isLength({ min: 6 }).withMessage('Password must be at least 6 character'),
        body('confirmPassword').trim().custom((value, { req }) => {
            if (value !== req.body.password) {
                throw new Error("Password doensn't match!");
            }
            return true;
        })
    ],
    
    login: [
        body('email').trim().notEmpty().withMessage('Email is required').isEmail().withMessage('E-mail is invalid'),
        body('password').trim().notEmpty().withMessage('Password is required'),
    ],
    resetPasswordMail: body('email')
        .trim()
        .isEmail().withMessage('Please give a valid email'),
    
    resetPassword: [
        body("token").trim().isString().withMessage("Token is required and must be string"),
        body("userId").trim().isString().withMessage("userId is required and must be string"),
        body("password")
          .trim()
          .isLength({ min: 6 })
          .withMessage("Passowrd must be at least 6 character"),
        body("confirmPassword")
          .trim()
          .custom((value, { req }) => {
            if (value !== req.body.password) {
              throw new Error("Password doesn't match!");
            }
            return true;
          }),
      ],
      refreshToken:[
        body("token").trim()
        .notEmpty().withMessage('Token is required')
        .isString().withMessage("Token must be string")
        .isJWT().withMessage("Token must be a JWT")
      ]
};

module.exports = validator;
