const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const HTTP_STATUS = require("../utils/httpStatus");
const { success, failure } = require("../utils/commonResponse");
const { validationResult } = require("express-validator");
const { promisify } = require("util");
const crypto = require("crypto");
const sendMail = require("../mail/config");
const ejs = require("ejs");
const path = require("path");
const ejsRenderFile = promisify(ejs.renderFile);
const Token = require("../models/Token");
const fs = require("fs");

class AuthController {
    async getProfile(req, res, next) {
        try {
            const id = req.params.userID;
            const user = await User.findById(id)
                .select(
                    "-resetPasswordExpire -resetPasswordToken -emailVerificationToken"
                )
                .exec();
            if (!user)
                return res
                    .status(HTTP_STATUS.BAD_REQUEST)
                    .send(failure("User not found"));
            return res
                .status(HTTP_STATUS.OK)
                .send(success("User fetched successfully!", user));
        } catch (error) {
            next(error);
        }
    }

    async updateProfile(req, res, next) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                if (req.file) {
                    await fs.promises.unlink(
                        path.join(__dirname, "..", "uploads", "profiles", req.file.filename)
                    );
                }
                console.log(errors.mapped());
                return res
                    .status(HTTP_STATUS.UNPROCESSABLE_ENTITY)
                    .send(failure("Invalid Inputs", errors.array()));
            }
            const id = req.params.userID;
            const user = await User.findById(id).exec();
            if (!user)
                return res
                    .status(HTTP_STATUS.BAD_REQUEST)
                    .send(failure("user not found"));
            const { name, email, imgClear, gender, token, birth_date } = req.body;

            if (req.file || imgClear) {
                if (user.photo.startsWith(process.env.BACKEND_URI)) {
                    const filepath = path.join(
                        __dirname,
                        "..",
                        user.photo.split(process.env.BACKEND_URI + "/")[1]
                    );
                    if (fs.existsSync(filepath)) await fs.promises.unlink(filepath);
                }
                user.photo = req.file
                    ? process.env.BACKEND_URI + "/uploads/profiles/" + req.file.filename
                    : "";
            }

            if (name) user.name = name;
            if (email) user.email = email;
            if (gender) user.gender = gender;
            if (birth_date) user.birth_date = birth_date;

            await user.save();

            const userData = {
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
            };
            const access_token = jwt.sign(userData, process.env.JWT_SECRET_KEY, {
                expiresIn: process.env.JWT_EXPIRATION,
            });
            const refresh_token = jwt.sign(userData, process.env.REFRESH_KEY, {
                expiresIn: "7d",
            });
            const jwtRefresh = await Token.findOne({ refreshToken: token }).exec();
            jwtRefresh.refreshToken = refresh_token;
            await jwtRefresh.save();

            const resData = {
                access_token,
                refresh_token,
                name: user.name,
                email: user.email,
            };
            return res
                .status(HTTP_STATUS.OK)
                .send(success("User is updated successfully!", resData));
        } catch (error) {
            next(error);
        }
    }

    async login(req, res, next) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res
                    .status(HTTP_STATUS.UNPROCESSABLE_ENTITY)
                    .send(failure("Invalid Inputs", errors.array()));
            }
            const { email, password } = req.body;
            const user = await User.login(email, password);
            if (!user) {
                return res
                    .status(HTTP_STATUS.UNAUTHORIZED)
                    .send(failure("Unauthorized user login"));
            }

            const userData = {
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
            };
            const access_token = jwt.sign(userData, process.env.JWT_SECRET_KEY, {
                expiresIn: process.env.JWT_EXPIRATION,
            });
            const refresh_token = jwt.sign(userData, process.env.REFRESH_KEY, {
                expiresIn: "7d",
            });

            const jwtRefresh = new Token({ refreshToken: refresh_token });
            await jwtRefresh.save();

            const resData = {
                access_token,
                refresh_token,
            };

            return res
                .status(HTTP_STATUS.OK)
                .send(success("Logged in successfully!", resData));
        } catch (error) {
            console.log(error);
            next(error);
        }
    }

    async verifyEmail(req, res, next) {
        try {
            const { token, id } = req.params;

            const user = await User.findOne({
                _id: id,
                emailVerificationExpire: { $gt: Date.now() },
            }).exec();

            if (!user || user.emailVerificationToken !== token) {
                return res
                    .status(HTTP_STATUS.FORBIDDEN)
                    .send(failure("Unsuccessful verification"));
            }
            user.emailVerificationToken = undefined;
            user.emailVerificationExpire = undefined;
            user.emailVerified = true;
            await user.save();

            const htmlStr = await ejsRenderFile(
                path.join(__dirname, "..", "mail", "EmailConfirmed.ejs"),
                { name: user.name, pageURL: process.env.FRONTEND_URI }
            );
            return res.status(HTTP_STATUS.OK).send(htmlStr);
        } catch (error) {
            console.log(error);
            next(error);
        }
    }

    async confirmEmailOnExpire(req, res, next) {
        try {
            const { id } = req.params;

            const user = await User.findOne({
                _id: id,
                emailVerificationExpire: { $lte: Date.now() },
            }).exec();
            if (!user) {
                return res
                    .status(HTTP_STATUS.FORBIDDEN)
                    .send(failure("Invalid email verification request"));
            }
            user.emailVerificationExpire = Date.now() + 60 * 1000;
            await user.save();

            console.log(user.emailVerificationToken);
            const verificationURL = path.join(
                process.env.BACKEND_URI,
                "verify-email",
                user.emailVerificationToken,
                user._id.toString()
            );
            sendMail({
                from: "Training management app <training-management.com>",
                to: user.email,
                subject: "Confirm your email",
                html: `<h3>Hello ${user.name}. To verify your email , <a href="${verificationURL}" target="_blank" rel="noopener noreferrer">click here</a></h3>`,
            });

            return res
                .status(HTTP_STATUS.OK)
                .send(success("Verfication mail has been sent successfully"));
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
                    .send(failure("Invalid Inputs", errors.array()));
            }
            const email = req.body.email;
            const user = await User.findOne({ email: email });
            if (!user) {
                return res
                    .status(HTTP_STATUS.NOT_FOUND)
                    .send(failure("User doen't exist!"));
            }
            const resetToken = crypto.randomBytes(32).toString("hex");
            user.resetPasswordToken = resetToken;
            user.resetPasswordExpire = await user.save();

            const resetPasswordUrl = path.join(
                process.env.FRONTEND_URI,
                "reset-password",
                resetToken,
                user._id.toString()
            );
            const htmlStr = await ejsRenderFile(
                path.join(__dirname, "..", "mail", "ResetPassword.ejs"),
                { name: user.name, resetUrl: resetPasswordUrl }
            );

            sendMail({
                from: "Training management app <training-management.com>",
                to: email,
                subject: "Reset Your Password",
                html: htmlStr,
            });

            return res
                .status(HTTP_STATUS.OK)
                .send(success("Reset Password link is sent!"));
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
                    .send(failure("Invalid Inputs", errors.array()));
            }

            const { token, userId, password } = req.body;

            const user = await User.findOne({
                _id: userId,
                resetPasswordExpire: { $gt: Date.now() },
            });
            if (!user || user.resetPasswordToken !== token) {
                return res
                    .status(HTTP_STATUS.FORBIDDEN)
                    .send(failure("Invalid Token!"));
            }

            user.password = await bcrypt.hash(password, 10);
            user.resetPasswordToken = undefined;
            user.resetPasswordExpire = undefined;
            await user.save();

            return res
                .status(HTTP_STATUS.OK)
                .send(success("Reset password is successfull!"));
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
                return res
                    .status(HTTP_STATUS.UNPROCESSABLE_ENTITY)
                    .send(failure("Invalid Inputs", errors.array()));
            }
            const oldRefreshToken = req.body.token;

            const foundToken = await Token.findOne({ refreshToken: oldRefreshToken });
            if (!foundToken) {
                return res
                    .status(HTTP_STATUS.FORBIDDEN)
                    .send(failure("Invalid Token!"));
            }
            const decodedData = jwt.verify(oldRefreshToken, process.env.REFRESH_KEY);

            const user = await User.findById(decodedData._id)
                .select("_id name email role")
                .exec();
            const userData = {
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
            };
            //update refreshToken in DB or array and upd
            const access_token = jwt.sign(userData, process.env.JWT_SECRET_KEY, {
                expiresIn: process.env.JWT_EXPIRATION,
            });
            const newRefreshToken = jwt.sign(userData, process.env.REFRESH_KEY, {
                expiresIn: "7d",
            });

            foundToken.refreshToken = newRefreshToken;
            await foundToken.save();

            const resData = {
                access_token,
                refresh_token: newRefreshToken,
            };
            return res
                .status(HTTP_STATUS.OK)
                .send(success("New token generated!", resData));
        } catch (error) {
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
                    .send(failure("Invalid Inputs", errors.array()));
            }
            const token = req.body.token;
            //console.log(token);
            await Token.findOneAndDelete({ refreshToken: token }).exec();
            return res
                .status(HTTP_STATUS.OK)
                .send(success("Refresh token successfully deleted!"));
        } catch (error) {
            console.log(error);
            next(error);
        }
    }
}

module.exports = new AuthController();
