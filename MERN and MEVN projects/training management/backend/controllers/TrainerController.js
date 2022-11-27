const Evaluation = require('../models/Evaluation');
const Course = require('../models/Course');
const Batch = require('../models/Batch');
const Task = require('../models/Task');
const { success,failure } = require('../utils/commonResponse');
const HTTP_STATUS = require('../utils/httpStatus');
const { validationResult } = require('express-validator');
const getPagination = require('../utils/pagination');

class TrainerController  {
    async getTrainerCourses(req, res, next) {
        try {
            const page = req.query.page ? parseInt(req.query.page) : 1;
            const querytitle = req.query.title ? req.query.title : "";
            let total,itemsPerPage,courseList;
            if (querytitle){
                const regex = new RegExp(querytitle,"i");
                total = await Course.find({title:regex,trainer:req.user._id}).count().exec();
                itemsPerPage = req.query.itemsPerPage ? parseInt(req.query.itemsPerPage) : total;
                const { skip, limit } = getPagination(page, itemsPerPage);            
                courseList= await Course.find({title:regex,trainer:req.user._id}).skip(skip).limit(limit).populate('trainer','_id name email').exec();
            }
            else{
                total = await Course.find({trainer:req.user._id}).count().exec();
                itemsPerPage = req.query.itemsPerPage ? parseInt(req.query.itemsPerPage) : total;
                const { skip, limit } = getPagination(page, itemsPerPage);            
                courseList= await Course.find({trainer:req.user._id}).skip(skip).limit(limit).populate('trainer','_id name email').exec();
            }
            return res.status(HTTP_STATUS.OK).send(success('All courses have been fetched successfully!',{courseList,total}));
        } catch (error) {
            next(error);
        }
    }
    async getTrainingBatches(req, res, next) {
        try {
            const page = req.query.page ? parseInt(req.query.page) : 1;
            const period = req.query.period ? req.query.period :"";
            let batchlist,total;
            const assignedCourses= await Course.find({trainer:req.user._id}).select('_id').exec();
            const dbquery=assignedCourses.map(item=>{
                return item._id;
            });

            const currentDate = new Date().toISOString().split('T')[0];
            if (period==="prev"){ //using $in to check if an attribute value or an array element of an array field is inside another array
                total = await Batch.find({assignedCourses: { $in: dbquery },endDate: {$lt:currentDate} }).count().exec();
                const itemsPerPage = req.query.itemsPerPage ? parseInt(req.query.itemsPerPage) : total;
                const { skip, limit } = getPagination(page, itemsPerPage);
                batchlist= await Batch.find({assignedCourses: { $in: dbquery },endDate: {$lt:currentDate} }).skip(skip).limit(limit).exec();
            }
            else if (period==="running"){
                total = await Batch.find({assignedCourses: { $in: dbquery },endDate:{$gte:currentDate}}).count().exec();
                const itemsPerPage = req.query.itemsPerPage ? parseInt(req.query.itemsPerPage) : total;
                const { skip, limit } = getPagination(page, itemsPerPage);
                batchlist= await Batch.find({assignedCourses: { $in: dbquery },endDate:{$gte:currentDate}}).skip(skip).limit(limit).exec();
            }
            else{
                total = await Batch.find({assignedCourses: { $in: dbquery }}).count().exec();//$in with array checks if its elements are within dbquery
                const itemsPerPage = req.query.itemsPerPage ? parseInt(req.query.itemsPerPage) : total;
                const { skip, limit } = getPagination(page, itemsPerPage);
                batchlist= await Batch.find({assignedCourses: { $in: dbquery }}).skip(skip).limit(limit).exec();
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
    async addAssessment(req, res, next) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                console.log(errors.mapped());
                return res.status(HTTP_STATUS.UNPROCESSABLE_ENTITY).send(failure('Invalid Inputs', errors.array()));
            }
            const {title,startTime,endTime}=req.body;
            const course=req.params.courseID;
            const batch=req.params.batchID;
            const assessment=new Evaluation({title,tasks:[],startTime,endTime,course,batch,traineeScores:[]});
            await assessment.save();
            return res.status(HTTP_STATUS.OK).send(success('Assessment has added successfully', assessment));
        } catch (error) {
            next(error);
        }
    }

    async editAssessment(req, res, next) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                console.log(errors.mapped());
                return res.status(HTTP_STATUS.UNPROCESSABLE_ENTITY).send(failure('Invalid Inputs', errors.array()));
            }
            const {title,startTime,endTime}=req.body;
            const evalID=req.params.evalID;
            const assessment=await Evaluation.findById(evalID).exec();

            if (!assessment) return res.status(HTTP_STATUS.BAD_REQUEST).send(failure('Assessment not found'));
            
            if (title) assessment.title=title;
            if (startTime) assessment.startTime=startTime;
            if (endTime) assessment.endTime=endTime;

            await assessment.save();
            return res.status(HTTP_STATUS.OK).send(success('Assessment has updated successfully', assessment));
        } catch (error) {
            next(error);
        }
    }

    async deleteAssessment(req, res, next) {
        try {
            const evalID=req.params.evalID;
            const deletedEval = await Evaluation.findByIdAndDelete(evalID).exec();
            if (!deletedEval) return res.status(HTTP_STATUS.BAD_REQUEST).send(failure('Assessment not found'));
            await Task.deleteMany({ assessment: deletedEval._id }).exec();
            return res.status(HTTP_STATUS.OK).send(success('Assessment has been deleted successfully', deletedEval));
        } catch (error) {
            next(error);
        }        
    }

    async getAssessmentDetails(req, res, next) {
        try {
            const evalID= req.params.evalID;
            // populate can be chained and with multiple-level population
            const assessment = await Evaluation.findById(evalID).populate({ 
                path: "batch", // 1st level subdoc (get assignedCourses)
                populate: { // 2nd level subdoc (get trainer in assignedCourses)
                    path: "trainees",
                    select:'name _id email'
                }
            }).populate({ 
                path: "course", // 1st level subdoc (get assignedCourses)
                populate: { // 2nd level subdoc (get trainer in assignedCourses)
                    path: "trainer",
                    select:'name _id email'
                }
            }).populate({
                path:'tasks',
            }).exec();
            const total=  assessment.getTotalScore();
            return res.status(HTTP_STATUS.OK).send(success('Tasks have been fetched successfully!',{assessment,total}));
        } catch (error) {
            next(error);
        }
    }
    async addTask(req, res, next) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                console.log(errors.mapped());
                return res.status(HTTP_STATUS.UNPROCESSABLE_ENTITY).send(failure('Invalid Inputs', errors.array()));
            }
            const evalID=req.params.evalID;
            const assessment= await Evaluation.findById(evalID).select('_id tasks').exec();
            
            if (!assessment) return res.status(HTTP_STATUS.BAD_REQUEST).send(failure('Assessment not found for adding task'));
        
            const {score,content}=req.body;
            const task=new Task({score,content,assessment:assessment._id});
            await task.save();

            assessment.tasks.push(task);
            await assessment.save();
            return res.status(HTTP_STATUS.OK).send(success('Task has been updated successfully', task));

        } catch (error) {
            next(error);
        }
    }

    async editTask(req, res, next){
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                console.log(errors.mapped());
                return res.status(HTTP_STATUS.UNPROCESSABLE_ENTITY).send(failure('Invalid Inputs', errors.array()));
            }
            const taskID=req.params.taskID;
            const task= await Task.findById(taskID).exec();
            
            if (!task) return res.status(HTTP_STATUS.BAD_REQUEST).send(failure('Task not found'));
        
            const {score,content}=req.body;
            if (score) task.score=score;
            if (content) task.content=content;
            await task.save();
            return res.status(HTTP_STATUS.OK).send(success('Task has been updated successfully', task));
        } catch (error) {
            next(error);
        }
    }
    async deleteTask(req, res, next) {
        try {
            const taskID=req.params.taskID;
            await Evaluation.updateMany({tasks:taskID}, {$pull: {tasks:taskID}}).exec();
            const task = await Task.findByIdAndDelete(taskID).exec();
            if (!task) return res.status(HTTP_STATUS.BAD_REQUEST).send(failure('Task not found'));
            return res.status(HTTP_STATUS.OK).send(success('Task has been deleted successfully', task));
        } catch (error) {
            next(error);
        } 
    }
    async setTraineeScores(req, res, next) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                console.log(errors.mapped());
                return res.status(HTTP_STATUS.UNPROCESSABLE_ENTITY).send(failure('Invalid Inputs', errors.array()));
            }
            const evalID=req.params.evalID;
            const assessment= await Evaluation.findById(evalID).select('_id traineeScores').exec();
            
            if (!assessment) return res.status(HTTP_STATUS.BAD_REQUEST).send(failure('Assessment not found'));
        
            const {trainee,score}=req.body;
            const idx= assessment.traineeScores.findIndex((item) =>item.trainee.toString()===trainee.toString());
            if (idx<0) assessment.traineeScores.push({trainee,score:score||0});
            else assessment.traineeScores[idx].score=score||0;

            await assessment.save();
            return res.status(HTTP_STATUS.OK).send(success('Score has been saved successfully', assessment));
        } catch (error) {
            next(error);
        }
    }
}

module.exports = new TrainerController();