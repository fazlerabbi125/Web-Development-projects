import {  IsNotEmpty,IsEmail,IsString } from 'class-validator';

export class LoginDto {
    @IsNotEmpty()
    @IsString()
    @IsEmail()
    email: string;
    
    @IsNotEmpty()
    @IsString()
    password: string;
}
