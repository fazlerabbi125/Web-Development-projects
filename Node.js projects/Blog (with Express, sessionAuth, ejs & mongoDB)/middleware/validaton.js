//validate:[validator.isEmail,'Please enter a valid email address'],
const { body } = require('express-validator');
const Movie= require('../models/Movie');
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
                if (value && !validate.isURL(value)) 
                    throw new Error('Image URL must be either null or a valid URL');
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
                if (value && !validate.isURL(value)) 
                    throw new Error('Image URL must be either null or a valid URL');
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
    ]
};

module.exports = validator;
