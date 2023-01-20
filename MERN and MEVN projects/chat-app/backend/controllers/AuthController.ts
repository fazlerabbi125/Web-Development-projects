import path from "path";
import fs from "fs";
import crypto from "crypto";
import bcrypt from "bcrypt";
import jwt, { JwtPayload } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";
import HTTP_STATUS from "../utils/httpStatus";
import { success, failure } from "../utils/commonResponse";
import { User, UserDocument, UserModel } from "../models/User";

export const JWT_keys = {
    access: process.env.JWT_ACCESS_KEY || '9f7d5ba0d0',
    refresh: process.env.JWT_REFRESH_KEY || 'b13df694aa'
}

class AuthController {
    saltRounds = 10;

    async signup(req: Request, res: Response, next: NextFunction) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                if (req.file) {
                    await fs.promises.unlink(
                        path.join(__dirname, "..", "uploads", "profiles", req.file.filename)
                    );
                }
                return res.status(HTTP_STATUS.UNPROCESSABLE_ENTITY).send(failure('Invalid Inputs', errors.mapped()));
            }
            const { name, email, date_of_birth, isAdmin }: UserDocument = req.body;
            const password = await bcrypt.hash(req.body.password, this.saltRounds);
            // const emailVerificationToken = crypto.randomBytes(32).toString('hex');
            //emailVerificationToken
            const user = new User({ name, email, password, date_of_birth, isAdmin, });
            await user.save();

            if (!isAdmin) {

            }

            const userData = {
                _id: user._id,
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin,
            };

            const access_token = jwt.sign(userData, JWT_keys.access, { expiresIn: process.env.JWT_EXPIRATION });
            const refresh_token = jwt.sign(userData, JWT_keys.refresh, { expiresIn: '7d' });

            user.refreshToken = refresh_token;
            await user.save();

            const resData = {
                access_token,
                refresh_token
            }

            // const verificationURL = path.join(
            //     process.env.BACKEND_URI || "",
            //     'verify-email',
            //     emailVerificationToken,
            //     user._id?.toString() || ""
            // );
            // const htmlStr = await ejsRenderFile(
            //     path.join(__dirname, '..', 'mail', 'VerifyEmail.ejs'),
            //     { name: user.name, verificationURL }
            // );

            // sendMail({
            //     from: "Watchlist <watch@movie-series.com>",
            //     to: user.email,
            //     subject: "Verify your email",
            //     html: htmlStr
            // });

            return res.status(HTTP_STATUS.OK).send(success('User is created successfully!', resData));

        } catch (error) {
            console.log(error);
            next(error);
        }
    }

    async login(req: Request, res: Response, next: NextFunction) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(HTTP_STATUS.UNPROCESSABLE_ENTITY).send(failure('Invalid Inputs', errors.mapped()));
            }
            const { email, password } = req.body;
            const user = await User.login(email, password);
            if (!user) {
                return res.status(HTTP_STATUS.UNAUTHORIZED).send(failure('Unauthorized user login'));
            }

            const userData = {
                _id: user._id,
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin,
            };
            const access_token = jwt.sign(userData, JWT_keys.access, { expiresIn: process.env.JWT_EXPIRATION });
            const refresh_token = jwt.sign(userData, JWT_keys.refresh, { expiresIn: '7d' });

            user.refreshToken = refresh_token;
            await user.save();

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

    // async verifyEmail(req: Request, res: Response, next: NextFunction) {
    //     try {
    //         const { token, id } = req.params;

    //         const user = await User.findById(id).exec();
    //         if (!user || user.emailVerificationToken !== token) {
    //             return res.status(HTTP_STATUS.FORBIDDEN).send(failure('Invalid Token!'));
    //         }
    //         user.emailVerificationToken = undefined;
    //         user.emailVerified = true;
    //         await user.save();

    //         return res.status(HTTP_STATUS.OK).send(`<h1>Email verification is successfull!</h1>
    //         <h3>To go to homepage, <a href=${process.env.FRONTEND_URI}>click here</a></h3>
    //         `);

    //     } catch (error) {
    //         console.log(error);
    //         next(error);
    //     }
    // }

    // async sendResetPasswordMail(req: Request, res: Response, next: NextFunction) {
    //     try {
    //         const errors = validationResult(req);
    //         if (!errors.isEmpty()) {
    //             return res
    //                 .status(HTTP_STATUS.UNPROCESSABLE_ENTITY)
    //                 .send(failure('Invalid Inputs', errors.mapped()));
    //         }
    //         const email = req.body.email;
    //         const user = await User.findOne({ email: email });
    //         if (!user) {
    //             return res
    //                 .status(HTTP_STATUS.NOT_FOUND)
    //                 .send(failure("User doen't exist!"));
    //         }
    //         const resetToken = crypto.randomBytes(32).toString('hex');
    //         user.resetPasswordToken = resetToken;
    //         user.resetPasswordExpire = Date.now() + 60 * 60 * 1000;
    //         await user.save();

    //         const resetPasswordUrl = path.join(
    //             process.env.FRONTEND_URI,
    //             'reset-password',
    //             resetToken,
    //             user._id.toString()
    //         );
    //         const htmlStr = await ejsRenderFile(
    //             path.join(__dirname, '..', 'mail', 'ResetPassword.ejs'),
    //             { name: user.name, resetUrl: resetPasswordUrl }
    //         );

    //         sendMail({
    //             from: "Watchlist <watch@movie-series.com>",
    //             to: email,
    //             subject: "Reset Your Password",
    //             html: htmlStr
    //         });

    //         return res.status(HTTP_STATUS.OK).send(success('Reset Password link is sent!'));

    //     } catch (error) {
    //         console.log(error);
    //         next(error);
    //     }
    // }

    async resetPassword(req: Request, res: Response, next: NextFunction) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res
                    .status(HTTP_STATUS.UNPROCESSABLE_ENTITY)
                    .send(failure('Invalid Inputs', errors.mapped()));
            }

            const { token, userId, password } = req.body;


            const user = await User.findOne({ _id: userId, resetPasswordExpire: { $gt: Date.now() } });
            if (!user || user.resetPasswordToken !== token) {
                return res.status(HTTP_STATUS.FORBIDDEN).send(failure('Invalid Token!'));
            }

            user.password = await bcrypt.hash(password, this.saltRounds);
            user.resetPasswordToken = undefined;
            user.resetPasswordExpire = undefined;
            await user.save();

            return res.status(HTTP_STATUS.OK).send(success('Reset password is successfull!'));

        } catch (error) {
            console.log(error);
            next(error);
        }
    }

    async renewTokens(req: Request, res: Response, next: NextFunction) {
        // assignment

        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(HTTP_STATUS.UNPROCESSABLE_ENTITY).send(failure('Invalid Inputs', errors.mapped()));
            }
            const oldRefreshToken = req.body.token;

            const foundToken = await User.findOne({ refreshToken: oldRefreshToken });
            if (!foundToken) {
                return res.status(HTTP_STATUS.FORBIDDEN).send(failure('Invalid Token!'));
            }
            const decodedData = jwt.verify(oldRefreshToken, JWT_keys.refresh) as JwtPayload;

            const userData = {
                _id: decodedData._id,
                name: decodedData.name,
                email: decodedData.email,
                isAdmin: decodedData.isAdmin
            }
            //update refreshToken in DB or array and upd
            const access_token = jwt.sign(userData, JWT_keys.access, { expiresIn: process.env.JWT_EXPIRATION });
            const newRefreshToken = jwt.sign(userData, JWT_keys.refresh, { expiresIn: '7d' });

            foundToken.refreshToken = newRefreshToken;
            await foundToken.save();

            const resData = {
                access_token,
                refresh_token: newRefreshToken
            }
            return res.status(HTTP_STATUS.OK).send(success('New token generated!', resData));
        }
        catch (error) {
            console.log(error);
            next(error);
        }
    }

    async logout(req: Request, res: Response, next: NextFunction) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res
                    .status(HTTP_STATUS.UNPROCESSABLE_ENTITY)
                    .send(failure('Invalid Inputs', errors.mapped()));
            }
            const token = req.body.token;
            //console.log(token);
            const user = await User.findOne({ refreshToken: token }).exec();
            if (user) {
                user.refreshToken = undefined;
                await user.save();
                return res.status(HTTP_STATUS.OK).send(success('Refresh token successfully deleted!'));
            }
            else return res.status(HTTP_STATUS.BAD_REQUEST).send(failure('Refresh token successfully deleted!'));
        } catch (error) {
            console.log(error);
            next(error);
        }
    }
}

export default new AuthController();