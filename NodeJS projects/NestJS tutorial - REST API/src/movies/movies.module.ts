import { Module } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { MoviesController } from './movies.controller';
import { Movie, MovieSchema } from '../schemas/movie.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';
import {isMovieTitleUniqueUpdate,isMovieTitleUniqueCreate} from './dto/uniqueFieldDecorators'
import { RequestContextModule } from 'nestjs-request-context';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Movie.name, schema: MovieSchema }]),//registers models to be used.
    //The name property is a string of the model name which can either be passed directly or by importing the modelSchemaClass and using modelSchemaClass.name
    JwtModule.register({}),
    RequestContextModule
  ],
  controllers: [MoviesController],
  providers: [MoviesService,isMovieTitleUniqueCreate,isMovieTitleUniqueUpdate]
})
export class MoviesModule {}
