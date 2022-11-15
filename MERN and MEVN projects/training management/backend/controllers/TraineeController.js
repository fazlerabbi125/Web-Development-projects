const Evaluation = require('../models/Evaluation');
const Batch = require('../models/Batch');
const Task = require('../models/Task');
const { success,failure } = require('../utils/commonResponse');
const HTTP_STATUS = require('../utils/httpStatus');
const { validationResult } = require('express-validator');
const path = require('path');
const { promisify } = require('util');
const sendMail = require('../mail/config');
const ejs = require('ejs');
const ejsRenderFile = promisify(ejs.renderFile);
const getPagination = require('../utils/pagination');

class TraineeController{
    async getBatches(req,res,next){
        try {
            const page = req.query.page ? parseInt(req.query.page) : 1;
            const period = req.query.period ? req.query.period :"";
            let batchlist,total;
            const currentDate = new Date().toISOString().split('T')[0];
            if (period==="prev"){
                total = await Batch.find({trainees: req.user._id,endDate: {$lt:currentDate} }).count().exec();
                const itemsPerPage = req.query.itemsPerPage ? parseInt(req.query.itemsPerPage) : total;
                const { skip, limit } = getPagination(page, itemsPerPage);
                batchlist= await Batch.find({trainees: req.user._id,endDate: {$lt:currentDate} }).skip(skip).limit(limit).exec();
            }
            else if (period==="running"){
                total = await Batch.find({trainees: req.user._id,endDate:{$gte:currentDate}}).count().exec();
                const itemsPerPage = req.query.itemsPerPage ? parseInt(req.query.itemsPerPage) : total;
                const { skip, limit } = getPagination(page, itemsPerPage);
                batchlist= await Batch.find({trainees: req.user._id,endDate:{$gte:currentDate}}).skip(skip).limit(limit).exec();
            }
            else{
                total = await Batch.find({trainees: req.user._id}).count().exec();
                const itemsPerPage = req.query.itemsPerPage ? parseInt(req.query.itemsPerPage) : total;
                const { skip, limit } = getPagination(page, itemsPerPage);
                batchlist= await Batch.find({trainees: req.user._id}).skip(skip).limit(limit).exec();
            }
            return res.status(HTTP_STATUS.OK).send(success('Batches have been fetched successfully!',{batchlist,total}));
        } catch (error) {
            next(error);
        }
    }
    async getAssessmentList(req, res, next) {
        try {
            const batch= req.params.batchID;
            const course=req.params.courseID;
            const assessmentList = await Evaluation.find({batch,course}).populate('course batch').exec();
            return res.status(HTTP_STATUS.OK).send(success('Assessments have been fetched successfully!',assessmentList));
        } catch (error) {
            next(error);
        }
    }

    async getAssessmentDetails(req, res, next) {
        try {
            const evalID= req.params.evalID;
            const assessment = await Evaluation.findById(evalID).populate({ //multi-level population
                path: 'course',
                populate: { 
                    path: 'trainer',
                    select:'name _id email' 
                }
            }).populate('tasks').exec();

            if (!assessment) return res.status(HTTP_STATUS.BAD_REQUEST).send(failure('Assessment not found'));

            const total=  assessment.getTotalScore();
            return res.status(HTTP_STATUS.OK).send(success('Tasks have been fetched successfully!',{assessment,total}));
        } catch (error) {
            next(error);
        }
    }
    
}

module.exports = new TraineeController();