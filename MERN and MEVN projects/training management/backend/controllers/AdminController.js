const User = require('../models/User');
const Evaluation = require('../models/Evaluation');
const Course = require('../models/Course');
const Batch = require('../models/Batch');
const Task = require('../models/Task');
const { success, failure } = require('../utils/commonResponse');
const HTTP_STATUS = require('../utils/httpStatus');
const { validationResult } = require('express-validator');
const path = require('path');
const bcrypt = require('bcrypt');
const { promisify } = require('util');
const crypto = require('crypto');
const sendMail = require('../mail/config');
const ejs = require('ejs');
const ejsRenderFile = promisify(ejs.renderFile);
const getPagination = require('../utils/pagination');

class AdminController {

    async getEmployees(req, res, next) {
        try {
            const page = req.query.page ? parseInt(req.query.page) : 1;
            const type = req.query.type ? req.query.type : "";
            let total, itemsPerPage, employees;
            if (type === "trainer") {
                total = await User.find({ role: type }).count().exec();
                itemsPerPage = req.query.itemsPerPage ? parseInt(req.query.itemsPerPage) : total;
                const { skip, limit } = getPagination(page, itemsPerPage);
                employees = await User.find({ role: type }).skip(skip).limit(limit).select('-password -emailVerified -emailVerificationToken -resetPasswordToken -resetPasswordExpire').exec();
            }
            else if (type === "trainee") {
                total = await User.find({ role: type }).count().exec();
                itemsPerPage = req.query.itemsPerPage ? parseInt(req.query.itemsPerPage) : total;
                const { skip, limit } = getPagination(page, itemsPerPage);
                employees = await User.find({ role: type }).skip(skip).limit(limit).select('-password -emailVerified -emailVerificationToken -resetPasswordToken -resetPasswordExpire').exec();
            }
            else {
                total = await User.find({ $or: [{ role: "trainer" }, { role: "trainee" }] }).count().exec();
                itemsPerPage = req.query.itemsPerPage ? parseInt(req.query.itemsPerPage) : total;
                const { skip, limit } = getPagination(page, itemsPerPage);
                employees = await User.find({ $or: [{ role: "trainer" }, { role: "trainee" }] }).skip(skip).limit(limit).select('-password -emailVerified -emailVerificationToken -resetPasswordToken -resetPasswordExpire').exec();
            }

            return res.status(HTTP_STATUS.OK).send(success('Employees have been fetched successfully!', { employees, total }));

        } catch (error) {
            next(error);
        }
    }

    async registerEmployee(req, res, next) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                console.log(errors.mapped());
                return res.status(HTTP_STATUS.UNPROCESSABLE_ENTITY).send(failure('Invalid Inputs', errors.array()));
            }
            const { name, email, gender, role, birth_date } = req.body;
            const password = await bcrypt.hash(req.body.password, 10);
            const emailVerificationToken = crypto.randomBytes(32).toString('hex');
            const user = new User({ name, email, password, gender, role, birth_date, emailVerificationToken, emailVerificationExpire: Date.now() + 7 * 24 * 60 * 60 * 1000 });
            await user.save();

            if (role === "trainer" && req.body.courses) {
                await Promise.all(courses.map(async (courseID) => {
                    const course = await Course.findById(courseID).exec();
                    await course.addTrainer(user._id);
                }));
            }
            const verificationURL = path.join(
                process.env.BACKEND_URI,
                'verify-email',
                emailVerificationToken,
                user._id.toString()
            );
            const htmlStr = await ejsRenderFile(
                path.join(__dirname, '..', 'mail', 'ProfileRegistration.ejs'),
                { name: user.name, verificationURL, password: req.body.password }
            );

            sendMail({
                from: "Training management app <training-management.com>",
                to: user.email,
                subject: "Profile Registration",
                html: htmlStr
            });

            return res.status(HTTP_STATUS.OK).send(success('User is created successfully!', user));

        } catch (error) {
            console.log(error);
            next(error);
        }
    }


    async editEmployee(req, res, next) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(HTTP_STATUS.UNPROCESSABLE_ENTITY).send(failure('Invalid Inputs', errors.array()));
            }
            const { name, email, gender, role, courses, birth_date } = req.body;
            const id = req.params.id;
            const updatedUser = await User.findById(id).exec();

            if (!updatedUser) return res.status(HTTP_STATUS.BAD_REQUEST).send(failure('Employee not found for update'));

            if (name) updatedUser.name = name;
            if (email) updatedUser.email = email;
            if (birth_date) updatedUser.birth_date = birth_date;
            if (role) {
                if (updatedUser.role === "trainer" && role === "trainee") await Course.removeTrainer(updatedUser._id);
                else if (updatedUser.role === "trainee" && role === "trainer") {
                    await Batch.removeTrainee(updatedUser._id);
                    const assessments = await Evaluation.find({ "traineeScores.trainee": updatedUser._id }).exec();
                    if (assessments.length > 0) {
                        await Promise.all(assessments.map(async function (assessment) {
                            assessment.traineeScores = assessment.traineeScores.filter((item) => {
                                return item.trainee.toString() !== updatedUser._id.toString();
                            })
                            await assessment.save();
                        }));
                    }
                }
                updatedUser.role = role;
            }
            if (gender) updatedUser.gender = gender;
            await updatedUser.save();

            if (updatedUser.role === "trainer" && courses && courses.length > 0) {// [] and {} gives true
                //undefined doesn't work with updateMany or updateOne as it is not a MongoDB datatype
                await Course.removeTrainer(updatedUser._id);//or await Course.updateMany({ trainer: updatedUser._id }, { trainer: null }).exec()
                await Promise.all(courses.map(async (courseID) => {
                    const course = await Course.findById(courseID).exec();
                    await course.addTrainer(updatedUser._id);
                }));
            }
            return res.status(HTTP_STATUS.OK).send(success('Employee details updated successfully', updatedUser));
        } catch (error) {
            next(error);
        }
    }

    async deleteEmployee(req, res, next) {
        try {
            const id = req.params.id;
            const user = await User.findByIdAndDelete(id).exec();
            if (!user) return res.status(HTTP_STATUS.BAD_REQUEST).send(failure('Employee not found for deletion'));
            if (user.photo.startsWith(process.env.BACKEND_URI)) {
                const filepath = path.join(__dirname, '..', user.photo.split(process.env.BACKEND_URI + '/')[1]);
                if (fs.existsSync(filepath)) await fs.promises.unlink(filepath);
            }

            if (user.role === 'trainer') await Course.removeTrainer(user._id);
            else if (user.role === 'trainee') {
                await Batch.removeTrainee(user._id);
                const assessments = await Evaluation.find({ "traineeScores.trainee": user._id }).exec();
                if (assessments.length > 0) {
                    await Promise.all(assessments.map(async function (assessment) {
                        assessment.traineeScores = assessment.traineeScores.filter((item) => {
                            return item.trainee.toString() !== user._id.toString();
                        })
                        await assessment.save();
                    }));
                }
            }

            return res.status(HTTP_STATUS.OK).send(success('Employee has been deleted successfully', user));
        } catch (error) {
            next(error);
        }
    }

    async createBatch(req, res, next) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                console.log(errors.mapped());
                return res.status(HTTP_STATUS.UNPROCESSABLE_ENTITY).send(failure('Invalid Inputs', errors.array()));
            }
            const { name, startDate, endDate, trainees, assignedCourses } = req.body;
            const batch = new Batch({ name, startDate, endDate, trainees: trainees || [], assignedCourses: assignedCourses || [] });
            await batch.save();
            await Promise.all(assignedCourses.map(async function (item) {
                const course = await Course.findById(item).exec();
                course.trainingBatches.push(batch._id);
                await course.save();
            }));
            return res.status(HTTP_STATUS.OK).send(success('Batch has been added successfully', batch));
        } catch (error) {
            next(error);
        }
    }

    async editBatch(req, res, next) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                console.log(errors.mapped());
                return res.status(HTTP_STATUS.UNPROCESSABLE_ENTITY).send(failure('Invalid Inputs', errors.array()));
            }
            const { name, startDate, endDate, trainees, assignedCourses } = req.body;
            const batchID = req.params.batchID;
            const batch = await Batch.findById(batchID).exec();
            if (!batch) return res.status(HTTP_STATUS.BAD_REQUEST).send(failure('Batch was not found for update'));
            if (name) batch.name = name;
            if (startDate) batch.startDate = startDate;
            if (endDate) batch.endDate = endDate;
            if (trainees) batch.trainees = trainees;
            if (assignedCourses) {
                await Course.updateMany({ trainingBatches: batch._id }, { $pull: { trainingBatches: batch._id } }).exec();
                batch.assignedCourses = assignedCourses;
                await Promise.all(assignedCourses.map(async function (item) {
                    const course = await Course.findById(item).exec();
                    course.trainingBatches.push(batch._id);
                    await course.save();
                }));
            }
            await batch.save();
            return res.status(HTTP_STATUS.OK).send(success('Batch has been updated successfully', batch));
        } catch (error) {
            next(error);
        }
    }
    async deleteBatch(req, res, next) {
        try {
            const batchID = req.params.batchID;
            const batch = await Batch.findByIdAndDelete(batchID).exec();
            if (!batch) return res.status(HTTP_STATUS.BAD_REQUEST).send(failure('Batch not found for deletion'));
            await Course.updateMany({ trainingBatches: batch._id }, { $pull: { trainingBatches: batch._id } }).exec();
            const delEval = await Evaluation.find({ batch: batch._id }).exec();
            await Evaluation.deleteMany({ batch: batch._id }).exec();
            if (delEval) {
                await Promise.all(delEval.map(async (item) => await Task.deleteMany({ assessment: item._id }).exec()));
            }
            return res.status(HTTP_STATUS.OK).send(success('Batch has been deleted successfully', batch));
        } catch (error) {
            next(error);
        }
    }

    async getBatchList(req, res, next) {
        try {
            const page = req.query.page ? parseInt(req.query.page) : 1;
            const period = req.query.period ? req.query.period : "";
            let batchlist, total;
            const currentDate = new Date().toISOString().split('T')[0];
            if (period === "prev") {
                total = await Batch.find({ endDate: { $lt: currentDate } }).count().exec();
                const itemsPerPage = req.query.itemsPerPage ? parseInt(req.query.itemsPerPage) : total;
                const { skip, limit } = getPagination(page, itemsPerPage);
                batchlist = await Batch.find({ endDate: { $lt: currentDate } }).skip(skip).limit(limit).exec();
            }
            else if (period === "running") {
                total = await Batch.find({ endDate: { $gte: currentDate } }).count().exec();
                const itemsPerPage = req.query.itemsPerPage ? parseInt(req.query.itemsPerPage) : total;
                const { skip, limit } = getPagination(page, itemsPerPage);
                batchlist = await Batch.find({ endDate: { $gte: currentDate } }).skip(skip).limit(limit).exec();
            }
            else {
                total = await Batch.find().count().exec();
                const itemsPerPage = req.query.itemsPerPage ? parseInt(req.query.itemsPerPage) : total;
                const { skip, limit } = getPagination(page, itemsPerPage);
                batchlist = await Batch.find().skip(skip).limit(limit).exec();
            }
            return res.status(HTTP_STATUS.OK).send(success('Batches have been fetched successfully!', { batchlist, total }));
        } catch (error) {
            next(error);
        }
    }
}

module.exports = new AdminController();