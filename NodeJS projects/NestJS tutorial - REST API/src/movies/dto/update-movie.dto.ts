import { PartialType } from '@nestjs/mapped-types';
import { CreateMovieDto } from './create-movie.dto';
import { ExecutionContext  } from '@nestjs/common';
import {  IsNotEmpty,MinLength,IsInt,Min,Max,IsString,IsOptional,Validate  } from 'class-validator';
import {Type} from 'class-transformer'
import { isMovieTitleUniqueUpdate } from './uniqueFieldDecorators';

// To create a type with the same fields, but with each one optional, use PartialType() passing the class reference as an argument
export class UpdateMovieDto extends PartialType(CreateMovieDto){
    @IsOptional()
    @IsString()
    @MinLength(3,{
        message: 'Title Must be at least 3 characters',
    })
    @Validate(isMovieTitleUniqueUpdate,{
        message: 'Movie title must be unique',
    })
    title:string;
}
