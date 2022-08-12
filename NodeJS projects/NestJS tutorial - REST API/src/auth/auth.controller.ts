import { Controller, Get, Post, Body, Patch, Param, Delete,Res, HttpStatus,Next } from '@nestjs/common';
import { Response,NextFunction } from 'express';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { LoginDto } from './dto/login.dto';
import {successResponse,failureResponse} from '../utils/helpers'
import { JwtService } from '@nestjs/jwt';
import { UserDocument } from 'src/schemas/user.schema';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private jwtService: JwtService) {}

  @Post('register')
  async signup(@Res() res,@Body() body: CreateAuthDto,@Next() next:NextFunction) {
        try {
        const user :UserDocument= await this.authService.create(body);
        
        const userData = {
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
        };
        const accessToken = await this.jwtService.sign(userData,{
          secret: process.env.JWT_ACCESS_SECRET,
          expiresIn: process.env.ACCESS_EXPIRATION,
        })
        const refreshToken= await this.jwtService.sign(userData,{
          secret: process.env.JWT_REFRESH_SECRET,
          expiresIn: process.env.REFRESH_EXPIRATION,
        })
        return res.status(HttpStatus.OK).send(successResponse('User found',{userData,accessToken,refreshToken}));
        } catch (error) {
          next(error.message);
        }
        
}

  @Get()
  findAll() {
    return this.authService.findAll();
  }

  @Post('/login')
  async login(@Body() body: LoginDto,@Res() res:Response) {
    const user:any = await this.authService.validateUser(body);
    if (!user) res.status(HttpStatus.OK).send(failureResponse('User not found',user));
    const userData = {
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
    };
    const accessToken = await this.jwtService.sign(userData,{
      secret: process.env.JWT_ACCESS_SECRET,
      expiresIn: process.env.ACCESS_EXPIRATION,
    })
    const refreshToken= await this.jwtService.sign(userData,{
      secret: process.env.JWT_REFRESH_SECRET,
      expiresIn: process.env.REFRESH_EXPIRATION,
    })
    return res.status(HttpStatus.OK).send(successResponse('Login successful',{userData,accessToken,refreshToken}));
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAuthDto: UpdateAuthDto) {
    return this.authService.update(+id, updateAuthDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.authService.remove(+id);
  }
}
