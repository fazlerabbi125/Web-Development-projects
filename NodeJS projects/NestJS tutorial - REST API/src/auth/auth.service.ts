import { Injectable, LogLevel } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { LoginDto } from './dto/login.dto';
import { UserDocument,User,UserModel } from 'src/schemas/user.schema'; 
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  
  constructor(@InjectModel(User.name) private readonly userModel: UserModel) {}

  async create(body: CreateAuthDto):Promise<UserDocument> {
    const {name,email,isAdmin} = body;
    const password = await bcrypt.hash(body.password, 10);
    const user:UserDocument = new this.userModel({name,email,password,isAdmin});
    await user.save();
    return user;
  }

  findAll() {
    return `This action returns all auth`;
  }

  async validateUser(body:LoginDto):Promise<UserDocument|null|undefined>{
    const {email,password}= body;
    const user:UserDocument|null|undefined = await this.userModel.login(email,password);
    // if (user) {
    //     const passMatch = await bcrypt.compare(body.password, user.password);
    //     if (passMatch) return user;
    // }
    return user;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  update(id: number, updateAuthDto: UpdateAuthDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}
