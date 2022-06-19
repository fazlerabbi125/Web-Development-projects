const Movie = require('../models/Movie');
const WatchList = require('../models/WatchList')
const { success,failure } = require('../utils/commonResponse');
const HTTP_STATUS = require('../utils/httpStatus');
const { validationResult } = require('express-validator');
const path = require('path');
const fs = require('fs');


class AdminController {

    async addMovie(req, res, next) {
        try {
            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                if (req.file) {
                    await fs.promises.unlink(path.join(__dirname, '..', 'uploads',req.file.filename));
                }
                console.log(errors.array());
                return res.status(HTTP_STATUS.UNPROCESSABLE_ENTITY).send(failure('Invalid Inputs', errors.array()));
            }
            const {title,genre,year,rating,description,country,language}=req.body;
            
            const imgUrl = req.file?process.env.BACKEND_URI+'/uploads/'+req.file.filename:"";
            const movie = new Movie({title,genre,year,imgUrl,rating,description,country,language});

            await movie.save();
            return res.status(HTTP_STATUS.OK).send(success('Movie has added successfully', movie));
        } catch (error) {
            next(error);
        }
    }


    async editMovie(req, res, next) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                if (req.file) {
                    await fs.promises.unlink(path.join(__dirname, '..', 'uploads',req.file.filename));
                }
                console.log(errors.array());
                return res.status(HTTP_STATUS.UNPROCESSABLE_ENTITY).send(failure('Invalid Inputs', errors.array()));
            }
            const {title,genre,year,imgUrl,rating,description,country,language} = req.body;
            const id =req.params.id;
            const updatedMovie = await Movie.findById(id).exec();
            
            if (updatedMovie){

            updatedMovie.rating=rating;
            if (req.file) {
                if (updatedMovie.imgUrl.startsWith(process.env.BACKEND_URI)){
                    const filepath=path.join(__dirname, '..', updatedMovie.imgUrl.split(process.env.BACKEND_URI+'/')[1]);
                    if (fs.existsSync(filepath)) await fs.promises.unlink(filepath);
                }
                updatedMovie.imgUrl = process.env.BACKEND_URI+'/uploads/'+req.file.filename;
            }
            else if (!imgUrl){
                if (updatedMovie.imgUrl.startsWith(process.env.BACKEND_URI)){
                    const filepath=path.join(__dirname, '..', updatedMovie.imgUrl.split(process.env.BACKEND_URI+'/')[1]);
                    if (fs.existsSync(filepath)) await fs.promises.unlink(filepath);
                }
                updatedMovie.imgUrl = imgUrl;
            }
            
            if (title) updatedMovie.title=title;
            if (genre) updatedMovie.genre=genre;
            if (year) updatedMovie.year=year;
            if (description) updatedMovie.description=description;
            if (country) updatedMovie.country=country;
            if (language) updatedMovie.language=language;

            await updatedMovie.save();
            return res.status(HTTP_STATUS.OK).send(success('Movie details updated successfully', updatedMovie));
            }
            return res.status(HTTP_STATUS.BAD_REQUEST).send(failure('Movie not found for update'));
        } catch (error) {
            next(error);
        }
    }

    async deleteMovie(req, res, next) {
        try {
            const id = req.params.id;
            const list= await WatchList.find({ 'movies.movie': id }).exec();
            if (list){
                for (let i = 0; i < list.length;i++){
                    await list[i].removeFromList(id);
                }
            }
            const movie=await Movie.findOneAndDelete({_id: id}).exec();
            if (movie.imgUrl.startsWith(process.env.BACKEND_URI)){
                const filepath=path.join(__dirname, '..', movie.imgUrl.split(process.env.BACKEND_URI+'/')[1]);
                if (fs.existsSync(filepath)) await fs.promises.unlink(filepath);
            }
            return res.status(HTTP_STATUS.OK).send(success('Movie has been deleted successfully'));
        } catch (error) {
            next(error);
        }
    }
}

module.exports = new AdminController();