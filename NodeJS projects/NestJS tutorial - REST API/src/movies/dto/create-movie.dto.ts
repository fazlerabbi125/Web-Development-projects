import {  IsNotEmpty,MinLength,IsInt,Min,Max,IsString,IsOptional,Validate } from 'class-validator';
import { isMovieTitleUniqueCreate } from './uniqueFieldDecorators';
import {Type} from 'class-transformer'

export class CreateMovieDto {
    @IsNotEmpty({message:'Title is required'})
    @IsString()
    @MinLength(3,{
        message: 'Title Must be at least 3 characters',
    })
    @Validate(isMovieTitleUniqueCreate,{
        message: 'Movie title must be unique',
    })
    title:string;

    @IsNotEmpty({message:'genre is required'})
    @IsString()
    @MinLength(2,{
        message: 'genre must be at least 2 characters',
    })
    genre:string;

    @IsNotEmpty({message:'year is required'})
    @Type(() => Number)
    @IsInt()
    @Min(1980)
    @Max(2023)
    year:number;

    @IsOptional()
    @Type(() => Number)
    @IsInt()
    @Min(0)
    @Max(10)
    rating?:number;

    @IsNotEmpty({message:'description is required'})
    @IsString()
    @MinLength(5,{
        message: 'description must be at least 5 characters',
    })
    description:string;

    @IsNotEmpty({message:'country is required'})
    @IsString()
    @MinLength(2,{
        message: 'country must be at least 2 characters',
    })
    country:string;

    @IsNotEmpty({message:'language is required'})
    @IsString()
    @MinLength(3,{
        message: 'language must be at least 3 characters',
    })
    language:string;

    @IsOptional()
    @IsString()
    imgUrl?:string|null|undefined;
}
