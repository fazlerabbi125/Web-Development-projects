const { body } = require('express-validator');
const User= require('../models/User');
const validate=require('validator');
const Course= require('../models/Course');

const validator = {
    //Course
    createCourse:[
        body('title').trim()
            .notEmpty().withMessage('Title is required')
            .isString().withMessage('Title must be string!')
            .isLength({min:3}).withMessage('Title Must be at least 3 characters')
            .custom(value => {
                return Course.findOne({title: value}).then(movie => {
                    if (movie) return Promise.reject('Title already in use');
                });
            }),
        body('details').trim()
            .notEmpty().withMessage('details is required')
            .isString().withMessage('details must be string!')
            .isLength({min:10}).withMessage('details must be at least 10 characters'),
        body('timing').trim()
            .notEmpty().withMessage('timing is required')
            .isString().withMessage('timing must be string!')
            .isIn(['9:00 AM to 10:30 AM','11:00 AM to 12:30 PM','3:30 PM to 5:00 PM']).withMessage('timing must be either 9:00 AM to 10:30 AM , 11:00 AM to 12:30 PM, or 3:30 PM to 5:00 PM'),
    ],
    editCourse:[
        body('title').trim()
            .isString().withMessage('Title must be string!')
            .isLength({min:3}).withMessage('Title Must be at least 3 characters')
            .custom((value, { req }) => {
                return Course.findOne({title: value}).then(course => {
                    if (course && course.slug!==req.params.slug) return Promise.reject('Title already in use');
                });
            }),
        body('details').trim()
            .isString().withMessage('details must be string!')
            .isLength({min:10}).withMessage('details must be at least 10 characters'),
        body('timing').trim()
            .isString().withMessage('timing must be string!')
            .isIn(['9:00 AM to 10:30 AM','11:00 AM to 12:30 PM','3:30 PM to 5:00 PM']).withMessage('timing must be either 9:00 AM to 10:30 AM , 11:00 AM to 12:30 PM, or 3:30 PM to 5:00 PM'),
    ],
    lesson:[
        body('title').trim()
        .isString().withMessage('Title must be string!')
        .isLength({min:3}).withMessage('Title Must be at least 3 characters'),
        body('content').trim()
        .isString().withMessage('details must be string!')
        .isLength({min:10}).withMessage('details must be at least 10 characters'),
    ],

    //Admin
    createBatch:[
        body('name').trim()
        .notEmpty().withMessage('Name is required')
        .isString().withMessage('Name must be string!')
        .isLength({min:3}).withMessage('Name Must be at least 3 characters'),
        body('startDate')
        .notEmpty().withMessage('startDate is required')
        .custom((value, { req }) => {
            if (!validate.isDate(value) || ((new Date(value)).getTime()>=(new Date(req.body.endDate)).getTime())) {
                throw new Error("Invalid start date");
            }
            return true;
        }),
        body('endDate')
        .notEmpty().withMessage('endDate is required')
        .custom((value, { req }) => {
            if (!validate.isDate(value) || ((new Date(value)).getTime()<=(new Date(req.body.startDate)).getTime())) {
                throw new Error("Invalid end date");
            }
            return true;
        }),
        body('trainees')
        .custom(async (value, { req }) => {
            if (value && value.length > 0) {
                userCount= await User.find({_id: { $in: value }, role:'trainee'}).count().exec();
                if (userCount!==value.length) throw new Error('Invalid user found');
            }
            return true;
        })
    ],
    editBatch:[
        body('name').trim()
        .isString().withMessage('Name must be string!')
        .isLength({min:3}).withMessage('Name Must be at least 3 characters'),
        body('startDate')
        .custom((value, { req }) => {
            if (!validate.isDate(value) || ((new Date(value)).getTime()>=(new Date(req.body.endDate)).getTime())) {
                throw new Error("Invalid start date");
            }
            return true;
        }),
        body('endDate')
        .custom((value, { req }) => {
            if (!validate.isDate(value) || ((new Date(value)).getTime()<=(new Date(req.body.startDate)).getTime())) {
                throw new Error("Invalid end date");
            }
            return true;
        }),
        body('trainees')
        .custom(async (value, { req }) => {
            if (value && value.length > 0) {
                userCount= await User.find({_id: { $in: value }, role:'trainee'}).count().exec();
                if (userCount!==value.length) throw new Error('Invalid user found');
            }
            return true;
        })
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
        body('role')
        .custom(value => {
            if (value && !['trainer','trainee'].includes(value)) 
                throw new Error('Role must be either trainer or trainee');
            return true;
        }),
        body('gender').trim()
        .notEmpty().withMessage('Gender is required')
        .isString().withMessage('Gender must be string!')
        .isIn(['Male', 'Female','Others']).withMessage('Gender must be either male, female or others'),
        body('password').trim().isLength({ min: 6 }).withMessage('Password must be at least 6 character'),
        body('confirmPassword').trim().custom((value, { req }) => {
            if (value !== req.body.password) {
                throw new Error("Password doensn't match!");
            }
            return true;
        }),
        body('birth_date')
        .notEmpty().withMessage('birth_date is required')
        .isDate().withMessage('birth_date is a valid date'),
        body('courses').custom((value, { req }) => {
            if (value && value.length>0 && req.body.role !== 'trainer') {
                throw new Error("Courses can only be assigned to trainers");
            }
            return true;
        }),
    ],
    updateEmployee:[
        body('name').trim()
        .isString().withMessage('Name must be string!')
        .isLength({min:3}).withMessage('Name Must be at least 3 characters'),
        body('role')
        .isString().withMessage('Role must be string!')
        .custom(value => {
            if (value && !['trainer','trainee'].includes(value)) 
                throw new Error('Role must be either admin, trainer or trainee');
            return true;
        }),
        body('email').trim()
        .isEmail().withMessage('E-mail is invalid')
        .custom((value, { req })  => {
            return User.findOne({ email: value }).then(user => {
                if (user && user._id.toString()!==req.params.id) return Promise.reject('Email already in use');            
            });
        }),
        body('gender').trim()
        .isString().withMessage('Gender must be string!')
        .isIn(['Male', 'Female','Others']).withMessage('Gender must be either male, female or others'),
        body('birth_date').isDate().withMessage('birth_date is a valid date')
    ],

    //Auth
    updateProfile: [
        body('name').trim()
        .isString().withMessage('Name must be string!')
        .isLength({min:3}).withMessage('Name Must be at least 3 characters'),
        body('email').trim().isEmail().withMessage('E-mail is invalid').custom(async(value,{req}) => {
            const user = await User.findOne({ email: value }).exec();
            if (user && user._id.toString()!==req.params.userID) {
                return Promise.reject("E-mail is already exists!");
            }
            return true;
        }),
        body('gender').trim()
        .isString().withMessage('Gender must be string!')
        .isIn(['Male', 'Female','Others']).withMessage('Gender must be either male, female or others'),
        body('birth_date').isDate().withMessage('birth_date is a valid date')
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
        .isLength({ min: 6 }).withMessage("Passowrd must be at least 6 character"),
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
    ],

    //Trainer
    assessment:[
        body('title').trim()
        .isString().withMessage('Title must be string!')
        .isLength({min:6}).withMessage('Title Must be at least 6 characters'),
        body('startTime').trim()
        .notEmpty().withMessage('startTime is required'),
        body('endTime').trim()
        .notEmpty().withMessage('endTime is required')
    ],
    task:[
        body('score').trim()
        .isInt({min:0}).withMessage('score must be integer and at least 0!'),
        body('content').trim()
        .isString().withMessage('content must be string!')
        .isLength({min:10}).withMessage('content must be at least 10 characters'),
    ],
    traineeScore:[
        body('score')
        .notEmpty().withMessage('score is required')
        .isInt({min:0}).withMessage('score must be integer and at least 0!'),
        body('trainee').trim()
        .notEmpty().withMessage('trainee is required')
        .isMongoId().withMessage('trainee is must be specified as mongoDB ID')
    ]
};

module.exports = validator;
