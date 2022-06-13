const Movie = require('../models/Movie');
const WatchList = require('../models/WatchList');
const { validationResult } = require('express-validator');
const getPagination = require('../utils/pagination');
const { success,failure } = require('../utils/commonResponse');
const HTTP_STATUS = require('../utils/httpStatus');

class MovieController {
    async getAll(req, res, next) {
        try {
            const movies = await Movie.find().exec();
            return res.status(HTTP_STATUS.OK).send(success('All movies have been fetched successfully', movies));
        } catch (error) {
            next(error);
        }
    }

    async getMovie(req, res, next) {
        const eID = req.params.id;
        try {
            const movie = await Movie.findById(eID).exec();
            if (movie) {
                return res.status(HTTP_STATUS.OK).send(success('Employee Found', movie));       
            }
            return res.status(HTTP_STATUS.BAD_REQUEST).send(failure('Employee not Found'));
        } catch (error) {
            next(error);   
        }
        
    }

    async postWatchList (req, res, next) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(HTTP_STATUS.UNPROCESSABLE_ENTITY).send(failure('Invalid Inputs', errors.array()));
            }
            const eID = req.body.id.toString();
        
            const watchList = await WatchList.findOne({userId: req.user._id}).exec();

            // check if any cart exists under the reqested user.
            if (watchList) {
                //if exists, then add the movie to that user cart
                if (!watchList.movies.find(mov=>mov.movie==eID)) await watchList.addToList(eID);
                else return res.status(HTTP_STATUS.BAD_REQUEST).send(failure('Movie already exists in list'));
            } else {
                // if doesn't exists, then create a cart for that user first
                const newItem = new WatchList({userId: req.user._id, movies: []});
                await newItem.save();
                // then add the product to that user cart
                await newItem.addToList(eID);
            }
            return res.status(HTTP_STATUS.OK).send(success('Movie has been added to list',watchList));
        } catch (error) {
            console.log(error);
            next(error);
        }
    }

    async deleteMovieFromWatchList (req, res, next){
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(HTTP_STATUS.UNPROCESSABLE_ENTITY).send(failure('Invalid Inputs', errors.array()));
            }
            const prodId = req.params.listItemID;
            const movie = await WatchList.findOne({ userId: req.user._id }).exec();
            // check if any cart exists under the reqested user.
            if (movie) {
                //if exists, then remove the product from that user cart
                await movie.removeFromList(prodId);
            } else {
                return res.status(HTTP_STATUS.NOT_FOUND).send(failure("Movie doesn't exist!!"));
            }
            return res.status(HTTP_STATUS.OK).send(success('Movie has been removed from list'));
        } catch (error) {
            console.log(error);
            next(error);
        }
    }
    
    
    async putChangeStatus (req, res, next){
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(HTTP_STATUS.UNPROCESSABLE_ENTITY).send(failure('Invalid Inputs', errors.array()));
            }
            const prodId = req.params.listItemID;
            const movie = await WatchList.findOne({ userId: req.user._id }).exec();
            // check if any cart exists under the reqested user.
            if (movie) {
                //if exists, then remove the product from that user cart
                await movie.changeStatus(prodId,req.body.status);
            } else {
                return res.status(HTTP_STATUS.NOT_FOUND).send(failure("Movie doesn't exist!!"));
            }
            return res.status(HTTP_STATUS.OK).send(success('Movie has been removed from list'));
        } catch (error) {
            console.log(error);
            next(error);
        }
    }

    async getWatchList (req, res, next){
        //Backend Pagination
        try {
            const page = req.query.page ? Number(req.query.page) : 1;
            const userlist = await WatchList.findOne({userId: req.user._id}).populate('userId','name -_id').populate('movies.movie').exec();
            const itemsPerPage = req.query.itemsPerPage ? Number(req.query.itemsPerPage) : userlist.movies.length;
            const { skip, limit } = getPagination(page, itemsPerPage);
            const firstIndex = skip;
            const lastIndex = skip+limit;
            const count=userlist.movies.length;
            //console.log(firstIndex,lastIndex);
            if (lastIndex >= userlist.movies.length){
                userlist.movies=userlist.movies.slice(count-limit,count);
            }
            else if (firstIndex<0){
                userlist.movies=userlist.movies.slice(0,limit);
            }
            else {
                userlist.movies=userlist.movies.slice(firstIndex,lastIndex);
            }
            return res.status(HTTP_STATUS.OK).send(success('movies are fetched from list', {userlist,count}));
        } catch (error) {
            console.log(error);
            next(error);
        }
    }
}

module.exports = new MovieController();