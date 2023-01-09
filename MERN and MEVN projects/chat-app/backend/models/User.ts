import mongoose, { Document, Model, ObjectId, Schema } from "mongoose";
import bcrypt from "bcrypt";

const schemaOptions = { discriminatorKey: "role", timestamps: true };

const userSchema: Schema = new mongoose.Schema({
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
}, schemaOptions)

userSchema.statics.login = async function (email: string, password: string) {
    const user = await this.findOne({ email }).exec();
    if (user) {
        const passMatch: boolean = await bcrypt.compare(password, user.password);
        if (passMatch) return user;
    }
    return null;
}

interface UserStatics {
    login(email: string, password: string): Promise<UserDocument | null>;
}

export interface UserDocument extends Document {
    name: string;
    email: string;
    password: string;
    date_of_birth: string | Date;
    isAdmin: boolean;
    createdAt: string; //may work if document type extends SchemaTimestampsConfig
    updatedAt: string;
}
export type UserModel = Model<UserDocument> & UserStatics;

export interface RegUserDocument extends UserDocument {
    connectedMembers: Array<ObjectId>;
    groups: Array<ObjectId>;
}

export type RegUserModel = Model<RegUserDocument> & UserStatics;

export const User = mongoose.model('User', userSchema);

export const Admin = User.discriminator('Admin', new mongoose.Schema({}, schemaOptions));

export const RegUser = User.discriminator('RegUser', new mongoose.Schema<RegUserDocument>({
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

