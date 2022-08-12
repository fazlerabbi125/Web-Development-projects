import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document,Model } from 'mongoose';
import * as bcrypt from 'bcrypt';


@Schema()
class User {
    @Prop({
        required:[true, 'Name is required'],
        minLength:[3,'Must be at least 3 characters, got {VALUE}'],
    })
    name: string;

    @Prop({
        require: true,
        unique: true,
    })
    email: string;

    @Prop({
        require: true,
        minLength:[6,'Must be at least 6 characters, got {VALUE}'],
        })
    password: string;

    @Prop({default: false})
    isAdmin: boolean;

    @Prop({default: false})
    emailVerified:boolean;

    @Prop()
    refreshToken: string;

    @Prop()
    resetPasswordToken: string;

    @Prop()
    resetPasswordExpire: Date;

    @Prop()
    emailVerificationToken: string;

}

interface UserStatics{
    login:(email:string,password:string)=>Promise<UserDocument|null>
}
type UserDocument = User & Document; //for instance methods, add method to class or add interface or type with & here 

type UserModel=Model<UserDocument> &  UserStatics;

const UserSchema = SchemaFactory.createForClass(User);

UserSchema.statics.login =  async function(email:string,password:string):Promise<UserDocument|null>{
    const user = await this.findOne({ email}).exec();
    if (user) {
        const passMatch = await bcrypt.compare(password, user.password);
        if (passMatch) return user;
    }
    return null;
}

export {User,UserSchema,UserDocument,UserModel}