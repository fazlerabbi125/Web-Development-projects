const { body } = require('express-validator');// can use validator package methods and has its own validation functionalities
const User= require('../models/user');
const validate=require('validator');


const validator = {
    createPost: [
        body('title').trim()
            .notEmpty().withMessage('Title is required')
            .isString().withMessage('Title must be string!')
            .isLength({min:3}).withMessage('Title must be at least 3 characters'),
        body('body').trim()
            .notEmpty().withMessage('Body is required')
            .isString().withMessage('Body must be string!')
            .isLength({min:5}).withMessage('Body must be at least 5 characters'),
    ],
    editPost: [
        body('title').trim()
            .isString().withMessage('Title must be string!')
            .isLength({min:3}).withMessage('Title Must be at least 3 characters'),
        body('body').trim()
            .isString().withMessage('Body must be string!')
            .isLength({min:5}).withMessage('Body must be at least 5 characters'),
    ],
    signup: [
        body('name').trim()
        .notEmpty().withMessage('Name is required')
        .isString().withMessage('Name must be string!')
        .isLength({min:3}).withMessage('Name Must be at least 3 characters'),
        body('email').trim()
        .notEmpty().withMessage('Email is required')
        .isEmail().withMessage('Email is invalid')
        .custom(async(value) => {
            const user = await User.findOne({ email: value }).exec();
            if (user) {
                throw new Error("E-mail is already exists!");
            }
            return true;
        }),
        body('password').trim()
        .notEmpty().withMessage('Password is required')
        .isLength({ min: 6 }).withMessage("Password must be at least 6 character"),
        body('confirmPassword').trim().custom((value, { req }) => {
            if (value !== req.body.password) {
                throw new Error("Password doensn't match");
            }
            return true;
        }),
        body('birth_date').trim()
            .notEmpty().withMessage('Date of birth is required')
            .isDate().withMessage('Invalid Date format'),
        body('gender').trim()
        .notEmpty().withMessage('Gender is required')
        .isString().withMessage('Gender must be string!')
        .isIn(['Male', 'Female','Others']).withMessage(),
    ],
    
    login: [
        body('email').trim()
        .notEmpty().withMessage('Email is required')
        .isEmail().withMessage('E-mail is invalid'),
        body('password').trim()
        .notEmpty().withMessage('Password is required'),
    ],
    updateProfile: [
        body('name').trim()
        .isString().withMessage('Name must be string!')
        .isLength({min:3}).withMessage('Name must be at least 3 characters'),
        body('email').trim()
        .isEmail().withMessage('Email is invalid')
        .custom(async(value,{req}) => {
            const user = await User.findOne({ email: value }).exec();
            if (user && user._id.toString()!==req.params.id.toString()) {
                throw new Error("E-mail is already exists!");
            }
            return true;
        }),
        body('photoClear').trim()
            .isString().withMessage('photoClear must be string!'),
        body('birth_date').trim()
            .isDate().withMessage('Invalid Date format'),
        body('gender').trim()
        .isString().withMessage('Gender must be string!')
        .isIn(['Male', 'Female','Others']).withMessage(),
    ],
    
    resetPassword: [
        body("password").trim()
        .notEmpty().withMessage('Password is required')
        .isLength({ min: 6 }).withMessage("Passowrd must be at least 6 character"),
        body("confirmPassword").trim()
        .notEmpty().withMessage('Please confirm your password')
        .custom((value, { req }) => {
            if (value !== req.body.password) throw new Error("Passwords don't match!");
            return true;
        }),
    ]
};

module.exports = validator;
