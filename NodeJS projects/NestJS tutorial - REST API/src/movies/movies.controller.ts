import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
  // Query,
  UploadedFile,
  UseInterceptors,
  HttpStatus,
  UseGuards
} from '@nestjs/common';
import {FileInterceptor} from '@nestjs/platform-express'
import { MoviesService } from './movies.service';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { Response,Request,Express } from 'express';
import { diskStorage } from 'multer'
import * as path from 'path';
import {successResponse,failureResponse} from '../utils/helpers'
import { AuthGuard } from 'src/guards/authentication.guard';
import {MovieDocument} from '../schemas/movie.schema';

const fileStorage = diskStorage({
  destination: (req:Request, file:Express.Multer.File, cb:(error:Error,destination:string) => void) => {
      if (file) {
          cb(null, path.join(__dirname,'..', '..','uploads'));
      } 
  },
  filename: (req:Request, file:Express.Multer.File, cb: (error: Error, filename: string) => void) => {
      if (file) {
          const uniqueSuffix = '-'+ Date.now() + '-' + Math.round(Math.random() * 1E9)
          cb(
              null,
              file.originalname.split('.')[0].replace(/\ /g, '') +
                  uniqueSuffix +
                  path.extname(file.originalname)
          );
      }
  },
});

const checkImage = (req, file:Express.Multer.File, cb) => {
  if (file) {
      if ( ['image/jpeg','image/jpg','image/png'].includes(file.mimetype)) {
          cb(null, true);
      } else {
          cb('Invalid file type', false);
      }
  }
};

const upload = {
  storage: fileStorage,
  fileFilter: checkImage,
};

@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Post('create')
  @UseGuards(AuthGuard)
  @UseInterceptors(FileInterceptor('poster',upload))
  async create(@Body() createMovieDto: CreateMovieDto,@Res() res:Response, @UploadedFile() file: Express.Multer.File|undefined) {
    const movie:MovieDocument= await this.moviesService.create(createMovieDto,file);
    return res.status(HttpStatus.OK).send(successResponse('Movie added successfully',movie));
  }

  @Get()
  async findAll(@Res() res:Response) {
    const movies:MovieDocument[]= await this.moviesService.findAll();
    return res.status(HttpStatus.OK).send(successResponse('All movies fetched successfully',movies));
  }

  @Get(':id')
  async findOne(@Param('id') id: string,@Res() res:Response) {
    const movie:MovieDocument|undefined|null= await this.moviesService.findOne('_id',id);
    if (!movie) res.status(HttpStatus.BAD_REQUEST).send(failureResponse('Movie not found'));
    return res.status(HttpStatus.OK).send(successResponse('Movie fetched successfully',movie));
  }

  @Patch(':id/edit')
  @UseGuards(AuthGuard)
  @UseInterceptors(FileInterceptor('poster',upload))
  async update(@Param('id') id: string, @Body() updateMovieDto: UpdateMovieDto,@Res() res:Response,@UploadedFile() file: Express.Multer.File|undefined) {
    const movie:MovieDocument|undefined|null= await this.moviesService.update(id, updateMovieDto,file);
    if (!movie) res.status(HttpStatus.BAD_REQUEST).send(failureResponse('Movie not found'));
    return res.status(HttpStatus.OK).send(successResponse('Movie updated successfully',movie));
  }

  @Delete(':id/delete')
  async remove(@Param('id') id: string,@Res() res:Response) {
    const movie:MovieDocument|undefined|null= await this.moviesService.remove(id);
    if (!movie) res.status(HttpStatus.BAD_REQUEST).send(failureResponse('Movie not found'));
    return res.status(HttpStatus.OK).send(successResponse('Movie deleted successfully',movie));
  }
}
