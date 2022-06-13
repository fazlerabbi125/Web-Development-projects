const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const HTTP_STATUS = require('../utils/httpStatus');
const { success, failure } = require('../utils/commonResponse');
const { validationResult } = require('express-validator');
const { promisify } = require('util');
const crypto = require('crypto');
const sendMail = require('../mail/config');
const ejs = require('ejs');
const path = require('path');
const ejsRenderFile = promisify(ejs.renderFile);
const Token = require('../models/Token')

class AuthController {
    
    async signup(req, res, next) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(HTTP_STATUS.UNPROCESSABLE_ENTITY).send(failure('Invalid Inputs', errors.array()));
            }
            const {name,email,isAdmin} = req.body;
            const password = await bcrypt.hash(req.body.password, 10);
            const emailVerificationToken= crypto.randomBytes(32).toString('hex');
            const user = new User({name,email,password,isAdmin,emailVerificationToken});
            await user.save();

            const userData = {
                _id: user._id,
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin,
            };
            const access_token = jwt.sign(userData, process.env.JWT_SECRET_KEY, {expiresIn: process.env.JWT_EXPIRATION});
            const refresh_token = jwt.sign(userData, process.env.REFRESH_KEY, {expiresIn: '7d'});
            
            const jwtRefresh= new Token({ refreshToken: refresh_token });
            await jwtRefresh.save();

            const resData = {
                access_token,
                refresh_token
            }
            
            const verificationURL = path.join(
                process.env.BACKEND_URI,
                'verify-email',
                emailVerificationToken,
                user._id.toString()
            );
            const htmlStr = await ejsRenderFile(
                path.join(__dirname, '..', 'mail', 'VerifyEmail.ejs'),
                { name: user.name, verificationURL }
            );

            sendMail({
                from: "Watchlist <watch@movie-series.com>",
                to: user.email,
                subject: "Verify your email",
                html: htmlStr
            });

            return res.status(HTTP_STATUS.OK).send(success('User is created successfully!', resData));

        } catch (error) {
            console.log(error);
            next(error);
        }
    }

    async login(req, res, next) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(HTTP_STATUS.UNPROCESSABLE_ENTITY).send(failure('Invalid Inputs', errors.array()));
            }
            const {email,password} = req.body;
            const user = await User.login(email,password);
            if (!user) {
                return res.status(HTTP_STATUS.UNAUTHORIZED).send(failure('Unauthorized user login'));
            }
            
            const userData = {
                _id: user._id,
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin,
            };
            const access_token = jwt.sign(userData, process.env.JWT_SECRET_KEY, {expiresIn: process.env.JWT_EXPIRATION});
            const refresh_token = jwt.sign(userData, process.env.REFRESH_KEY, {expiresIn: '7d'});
            
            const jwtRefresh= new Token({ refreshToken: refresh_token });
            await jwtRefresh.save();

            const resData = {
                access_token,
                refresh_token
            }

            return res.status(HTTP_STATUS.OK).send(success('Logged in successfully!', resData));

        } catch (error) {
            console.log(error);
            next(error);
        }
    }

    async verifyEmail(req, res,next) {
        try {
            const {token,id} = req.params;

            const user = await User.findById( id ).exec();
            if (!user || user.emailVerificationToken !== token) {
                return res.status(HTTP_STATUS.FORBIDDEN).send(failure('Invalid Token!'));
            }
            user.emailVerificationToken = undefined;
            user.emailVerified= true;
            await user.save();

            return res.status(HTTP_STATUS.OK).send(`<h1>Email verification is successfull!</h1>
            <h3>To go to homepage, <a href=${process.env.FRONTEND_URI}>click here</a></h3>
            `);

        } catch (error) {
            console.log(error);
            next(error);
        }
    }
    
    async sendResetPasswordMail(req, res, next) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res
                    .status(HTTP_STATUS.UNPROCESSABLE_ENTITY)
                    .send(failure('Invalid Inputs', errors.array()));
            }
            const email = req.body.email;
            const user = await User.findOne({ email: email });
            if (!user) {
                return res
                    .status(HTTP_STATUS.NOT_FOUND)
                    .send(failure("User doen't exist!"));
            }
            const resetToken = crypto.randomBytes(32).toString('hex');
            user.resetPasswordToken = resetToken;
            user.resetPasswordExpire = Date.now() + 60 * 60 * 1000;
            await user.save();

            const resetPasswordUrl = path.join(
                process.env.FRONTEND_URI,
                'reset-password',
                resetToken,
                user._id.toString()
            );
            const htmlStr = await ejsRenderFile(
                path.join(__dirname, '..', 'mail', 'ResetPassword.ejs'),
                { name: user.name, resetUrl: resetPasswordUrl }
            );

            sendMail({
                from: "Manga Shop <shop@manga.com>",
                to: email,
                subject: "Reset Your Password",
                html: htmlStr
            });

            return res.status(HTTP_STATUS.OK).send(success('Reset Password link is sent!'));

        } catch (error) {
            console.log(error);
            next(error);
        }
    }

    async resetPassword(req, res, next) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res
                    .status(HTTP_STATUS.UNPROCESSABLE_ENTITY)
                    .send(failure('Invalid Inputs', errors.array()));
            }

            const {token,userId,password}=req.body;


            const user = await User.findOne({ _id: userId, resetPasswordExpire: { $gt: Date.now() } });
            if (!user || user.resetPasswordToken !== token) {
                return res.status(HTTP_STATUS.FORBIDDEN).send(failure('Invalid Token!'));
            }

            user.password = await bcrypt.hash(password, 10);
            user.resetPasswordToken = undefined;
            user.resetPasswordExpire = undefined;
            await user.save();

            return res.status(HTTP_STATUS.OK).send(success('Reset password is successfull!'));

        } catch (error) {
            console.log(error);
            next(error);
        }
    }

    async renewTokens(req, res, next) {
        // assignment
        
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(HTTP_STATUS.UNPROCESSABLE_ENTITY).send(failure('Invalid Inputs', errors.array()));
            }
            const oldRefreshToken=req.body.token;
            
            const foundToken= await Token.findOne({refreshToken:oldRefreshToken});
            if (!foundToken){
                return res.status(HTTP_STATUS.FORBIDDEN).send(failure('Invalid Token!'));
            }
            const decodedData=jwt.verify(oldRefreshToken, process.env.REFRESH_KEY);
            
            const userData={
                _id: decodedData._id,
                name: decodedData.name,
                email: decodedData.email,
                isAdmin: decodedData.isAdmin
            }
            //update refreshToken in DB or array and upd
            const access_token = jwt.sign(userData, process.env.JWT_SECRET_KEY, {expiresIn: process.env.JWT_EXPIRATION});
            const newRefreshToken = jwt.sign(userData, process.env.REFRESH_KEY, {expiresIn: '7d'});
            
            foundToken.refreshToken=newRefreshToken;
            await foundToken.save();

            const resData = {
                access_token,
                refresh_token:newRefreshToken
            }
            return res.status(HTTP_STATUS.OK).send(success('New token generated!', resData));
        }    
        catch (error) {
            console.log(error);
            next(error);
        }  
    }

    async logout(req, res, next) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res
                    .status(HTTP_STATUS.UNPROCESSABLE_ENTITY)
                    .send(failure('Invalid Inputs', errors.array()));
            }
            const token=req.body.token;
            //console.log(token);
            await Token.findOneAndDelete({refreshToken:token}).exec();
            return res.status(HTTP_STATUS.OK).send(success('Refresh token successfully deleted!'));
        } catch (error) {
            console.log(error);
            next(error);
        }
    }
}

module.exports = new AuthController();