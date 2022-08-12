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
    MongooseModule.forFeature([{ name: Movie.name, schema: MovieSchema }]),
    JwtModule.register({}),
    RequestContextModule
  ],
  controllers: [MoviesController],
  providers: [MoviesService,isMovieTitleUniqueCreate,isMovieTitleUniqueUpdate]
})
export class MoviesModule {}
