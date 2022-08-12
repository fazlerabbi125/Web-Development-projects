import { Injectable } from '@nestjs/common';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Movie, MovieDocument } from '../schemas/movie.schema';
import * as fs from 'fs';
import * as path from 'path';
import { Express } from 'express';

@Injectable()
export class MoviesService {
  constructor(@InjectModel(Movie.name) private movieModel: Model<MovieDocument>) {}
  
  async create(body: CreateMovieDto,file: Express.Multer.File):Promise<Movie> {
    const {title,genre,year,rating,description,country,language}=body;
    const imgUrl = file?process.env.BACKEND_URI+'/uploads/'+file.filename:"";
    const movie = new this.movieModel({title,genre,year,imgUrl,rating,description,country,language});
    await movie.save();
    return movie;
  }

  async findAll(): Promise<Movie[]> {
    return this.movieModel.find().exec();
  }

  async findOne(field:string,value):Promise<Movie> {
    return this.movieModel.findOne({[field]:value}).exec();
  }

  async update(id: string, body: UpdateMovieDto,file:Express.Multer.File):Promise<Movie> {
    
    const {title,genre,year,imgUrl,rating,description,country,language} = body;
    const updatedMovie = await this.movieModel.findById(id).exec();
    
    if (updatedMovie){
      updatedMovie.rating=rating;    
      if (file||!imgUrl) {
        if (updatedMovie.imgUrl.startsWith(process.env.BACKEND_URI)){
          const filepath=path.join(__dirname, '..', '..', updatedMovie.imgUrl.split(process.env.BACKEND_URI)[1]);
          if (fs.existsSync(filepath)) {
            console.log(filepath);
            await fs.promises.unlink(filepath);
          }
        }
        updatedMovie.imgUrl = file? process.env.BACKEND_URI+'/uploads/'+file.filename:imgUrl;
      }
      

      if (title) updatedMovie.title=title;
      if (genre) updatedMovie.genre=genre;
      if (year) updatedMovie.year=year;
      if (description) updatedMovie.description=description;
      if (country) updatedMovie.country=country;
      if (language) updatedMovie.language=language;

      await updatedMovie.save();
    }
    return updatedMovie;
  }

  async remove(id: string):Promise<Movie> {
    const movie=await this.movieModel.findByIdAndDelete(id).exec();
    return movie;
  }
}
