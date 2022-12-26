const Course = require('../models/Course');
const Batch = require('../models/Batch');
const Lesson = require('../models/Lesson');
const Evaluation = require('../models/Evaluation');
const Task = require('../models/Task');
const { success, failure } = require('../utils/commonResponse');
const HTTP_STATUS = require('../utils/httpStatus');
const { validationResult } = require('express-validator');
const path = require('path');
const fs = require('fs');
const getPagination = require('../utils/pagination');

class CourseController {

    async getCourseList(req, res, next) {
        try {
            const page = req.query.page ? parseInt(req.query.page) : 1;
            const querytitle = req.query.title ? req.query.title : "";
            let size, itemsPerPage, courseList;
            if (querytitle) {
                const regex = new RegExp(querytitle, "i");
                size = await Course.find({ title: regex }).count().exec();
                itemsPerPage = req.query.itemsPerPage ? parseInt(req.query.itemsPerPage) : size;
                const { skip, limit } = getPagination(page, itemsPerPage);
                courseList = await Course.find({ title: regex }).skip(skip).limit(limit).populate('trainer', '_id name email').select('-details').exec();
            }
            else {
                size = await Course.find().count().exec();
                itemsPerPage = req.query.itemsPerPage ? parseInt(req.query.itemsPerPage) : size;
                const { skip, limit } = getPagination(page, itemsPerPage);
                courseList = await Course.find().skip(skip).limit(limit).populate('trainer', '_id name email').select('-details').exec();
            }
            return res.status(HTTP_STATUS.OK).send(success('All courses have been fetched successfully!', { courseList, size }));
        } catch (error) {

        }
    }

    async getCourseDetails(req, res, next) {
        try {
            const slug = req.params.slug;
            const course = await Course.findOne({ slug }).populate('trainer lessons',).exec();
            if (!course) return res.status(HTTP_STATUS.BAD_REQUEST).send(failure('Course not found'));
            return res.status(HTTP_STATUS.OK).send(success('All courses have been fetched successfully!', course));
        } catch (error) {
            next(error);
        }
    }
    async addCourse(req, res, next) {
        try {
            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                if (req.file) {
                    await fs.promises.unlink(path.join(__dirname, '..', 'uploads', 'courses', req.file.filename));
                }
                console.log(errors.array());
                return res.status(HTTP_STATUS.UNPROCESSABLE_ENTITY).send(failure('Invalid Inputs', errors.array()));
            }
            const { title, details, timing } = req.body;
            const image = req.file ? process.env.BACKEND_URI + '/uploads/courses/' + req.file.filename : "";
            const course = new Course({ title, image, details, timing, trainer: undefined, lessons: [] });

            await course.save();
            return res.status(HTTP_STATUS.OK).send(success('Course has added successfully', course));
        } catch (error) {
            next(error);
        }
    }

    async editCourse(req, res, next) {
        try {
            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                if (req.file) {
                    await fs.promises.unlink(path.join(__dirname, '..', 'uploads', 'courses', req.file.filename));
                }
                console.log(errors.array());
                return res.status(HTTP_STATUS.UNPROCESSABLE_ENTITY).send(failure('Invalid Inputs', errors.array()));
            }
            const { title, details, timing, imgClear } = req.body;
            const slug = req.params.slug;
            const updatedCourse = await Course.findOne({ slug }).exec();
            if (!updatedCourse) return res.status(HTTP_STATUS.BAD_REQUEST).send(failure('Course not found'));
            if (req.file || imgClear) {
                if (updatedCourse.image.startsWith(process.env.BACKEND_URI)) {
                    const filepath = path.join(__dirname, '..', updatedCourse.image.split(process.env.BACKEND_URI + '/')[1]);
                    if (fs.existsSync(filepath)) await fs.promises.unlink(filepath);
                }
                updatedCourse.image = req.file ? process.env.BACKEND_URI + '/uploads/courses/' + req.file.filename : '';
            }

            if (title) updatedCourse.title = title;
            if (details) updatedCourse.details = details;
            if (timing) updatedCourse.timing = timing;

            await updatedCourse.save();

            return res.status(HTTP_STATUS.OK).send(success('Course has updated successfully', updatedCourse));
        } catch (error) {
            next(error);
        }
    }

    async deleteCourse(req, res, next) {
        try {
            const slug = req.params.slug;
            const deletedCourse = await Course.findOneAndDelete({ slug }).exec();
            if (!deletedCourse) return res.status(HTTP_STATUS.BAD_REQUEST).send(failure('Course not found'));
            if (deletedCourse.image.startsWith(process.env.BACKEND_URI)) {
                const filepath = path.join(__dirname, '..', deletedCourse.image.split(process.env.BACKEND_URI + '/')[1]);
                if (fs.existsSync(filepath)) await fs.promises.unlink(filepath);
            }
            //$pull operator for removing element from array on match
            await Batch.updateMany({ assignedCourses: deletedCourse._id }, { $pull: { assignedCourses: deletedCourse._id } }).exec();
            await Lesson.deleteMany({ course: deletedCourse._id }).exec();
            const delEval = await Evaluation.find({ course: deletedCourse._id }).exec();
            //deleteMany returns object which indicates that result of the operation and so find is used to get all assessments first
            await Evaluation.deleteMany({ course: deletedCourse._id }).exec();
            if (delEval) {
                await Promise.all(delEval.map(async (item) => await Task.deleteMany({ assessment: item._id }).exec()));
            }

            return res.status(HTTP_STATUS.OK).send(success('Course has deleted successfully', deletedCourse));
        } catch (error) {
            next(error);
        }
    }

    async addLesson(req, res, next) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                console.log(errors.array());
                return res.status(HTTP_STATUS.UNPROCESSABLE_ENTITY).send(failure('Invalid Inputs', errors.array()));
            }
            const slug = req.params.slug;
            const course = await Course.findOne({ slug }).exec();
            if (!course) return res.status(HTTP_STATUS.BAD_REQUEST).send(failure('Course not found'));
            const { title, content } = req.body;
            const lesson = new Lesson({ title, content, course: course._id });
            await lesson.save();
            course.lessons.push(lesson._id);
            await course.save();
            return res.status(HTTP_STATUS.OK).send(success('Lesson has been added to course successfully', lesson));
        } catch (error) {
            next(error);
        }
    }

    async editLesson(req, res, next) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                console.log(errors.array());
                return res.status(HTTP_STATUS.UNPROCESSABLE_ENTITY).send(failure('Invalid Inputs', errors.array()));
            }

            const lessonID = req.params.lessonID;
            const lesson = await Lesson.findById(lessonID).exec();
            if (!lesson) return res.status(HTTP_STATUS.BAD_REQUEST).send(failure('Lesson not found'));
            const { title, content } = req.body;

            if (title) lesson.title = title;
            if (content) lesson.content = content;

            await lesson.save();
            return res.status(HTTP_STATUS.OK).send(success('Lesson has been updated successfully', lesson));
        } catch (error) {
            next(error);
        }
    }
    async deleteLesson(req, res, next) {
        try {
            const slug = req.params.slug;
            const lessonID = req.params.lessonID;
            const course = await Course.findOne({ slug }).exec();
            if (!course) return res.status(HTTP_STATUS.BAD_REQUEST).send(failure('Course not found'));
            const lesson = await Lesson.findByIdAndDelete(lessonID).exec();
            if (!lesson) return res.status(HTTP_STATUS.BAD_REQUEST).send(failure('Lesson not found'));

            course.lessons = course.lessons.filter((item) => item.toString() !== lesson._id.toString());//Remove lesson from course.lessons
            await course.save();
            return res.status(HTTP_STATUS.OK).send(success('Lesson has been deleted from course successfully', lesson));
        } catch (error) {
            next(error);
        }
    }

    async getLesson(req, res, next) {
        try {
            const lessonID = req.params.lessonID;
            const lesson = await Lesson.findById(lessonID).populate('course', 'title _id').exec();
            if (!lesson) return res.status(HTTP_STATUS.BAD_REQUEST).send(failure('Lesson not found'));
            return res.status(HTTP_STATUS.OK).send(success('Lesson has been fetched successfully', lesson));
        } catch (error) {
            next(error);
        }
    }

    async getBatchDetails(req, res, next) {
        try {
            const batchID = req.params.batchID;
            //multi-level population
            const batch = await Batch.findById(batchID).populate({
                path: "assignedCourses", // 1st level subdoc (get assignedCourses population)
                populate: { // 2nd level subdoc (get trainer population in assignedCourses)
                    path: "trainer",
                    select: 'name _id email'
                }
            }).populate({
                path: 'trainees',
                select: 'name _id email'
            }).exec();

            if (!batch) return res.status(HTTP_STATUS.BAD_REQUEST).send(failure('Batch was not found'));
            return res.status(HTTP_STATUS.OK).send(success('Batch has been fetched successfully', batch));

        } catch (error) {
            next(error);
        }
    }
}

module.exports = new CourseController();