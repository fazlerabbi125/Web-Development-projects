import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from 'src/schemas/user.schema'; 

@Module({
  imports: [
    JwtModule.register({}),
    MongooseModule.forFeature([{ name: "User", schema: UserSchema }])
  ],
  controllers: [AuthController],
  providers: [AuthService,],
  exports:[]
})
export class AuthModule {}
