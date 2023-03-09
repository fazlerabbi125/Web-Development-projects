import mongoose, { Document, Model, ObjectId } from "mongoose";
import bcrypt from "bcrypt";

const schemaOptions = { discriminatorKey: "role", timestamps: true };

export interface UserDocument extends Document {
    name: string;
    email: string;
    password: string;
    date_of_birth: string | Date;
    isAdmin?: boolean;
    photo?: string;
    emailVerified: boolean;
    emailVerificationToken?: string;
    refreshToken?: string;
    resetPasswordToken?: string;
    resetPasswordExpire?: Date | string;
    createdAt: string; //may work if document type extends SchemaTimestampsConfig
    updatedAt: string;
}

export interface UserModel extends Model<UserDocument> {
    login(email: string, password: string): Promise<UserDocument | null>;
}

const userSchema = new mongoose.Schema<UserDocument, UserModel>({
    name: {
        type: String,
        trim: true,
        required: true,
        minlength: 2,
    },
    email: {
        type: String,
        unique: true,
        trim: true,
        required: [true, "Email is required"],
    },
    password: {
        type: String,
        trim: true,
        minlength: [6, "Password must at least contain 6 characters"],
        required: [true, "Password is required"],
    },

    date_of_birth: {
        type: Date,
        required: true,
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
    photo: {
        type: String,
        trim: true,
    },
    emailVerified: {
        type: Boolean,
        default: true,
    },
    emailVerificationToken: String,
    refreshToken: String,
    resetPasswordToken: String,
    resetPasswordExpire: Date,
}, schemaOptions)

userSchema.statics.login = async function (email: string, password: string) {
    const user = await this.findOne({ email }).exec();
    if (user) {
        const passMatch: boolean = await bcrypt.compare(password, user.password);
        if (passMatch) return user;
    }
    return null;
}

export interface RegUserDocument extends UserDocument {
    connectedMembers: Array<ObjectId>;
    groups: Array<ObjectId>;
}

export type RegUserModel = Model<RegUserDocument> & UserModel["login"];

export const User = mongoose.model<UserDocument, UserModel>('User', userSchema);

export const Admin = User.discriminator('Admin', new mongoose.Schema<UserDocument, UserModel>({}, schemaOptions));

export const RegUser = User.discriminator('RegUser', new mongoose.Schema<RegUserDocument, RegUserModel>({
    connectedMembers: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "RegUser"
        }
    ],
    groups: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Chat"
        }
    ]
}, schemaOptions));

