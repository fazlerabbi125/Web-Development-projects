import { MoviesService } from '../movies.service';
import {Injectable} from '@nestjs/common';
import { Request } from 'express';
import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface
} from "class-validator";
import { RequestContext } from 'nestjs-request-context';

@ValidatorConstraint({ async: true })
@Injectable()
export class isMovieTitleUniqueCreate implements ValidatorConstraintInterface{
  constructor(protected readonly movieService: MoviesService,) {}
  async validate(title: string, args: ValidationArguments) {
      let movie:any =  await this.movieService.findOne('title',title);
      if(movie) return false;
      return true; 
  }
  defaultMessage(args: ValidationArguments) {
    return `Movie exists already`;
  }
}

@ValidatorConstraint({ async: true })
@Injectable()
export class isMovieTitleUniqueUpdate implements ValidatorConstraintInterface{
  constructor(protected readonly movieService: MoviesService,) {}
  async validate(title: string, args: ValidationArguments) {
      let movie:any =  await this.movieService.findOne('title',title);
      const req: Request = RequestContext.currentContext.req;
      
      if(movie && req.params.id!==movie._id.toString()) return false;
      return true; 
  }
  defaultMessage(args: ValidationArguments) {
    return `Movie exists already`;
  }
}
