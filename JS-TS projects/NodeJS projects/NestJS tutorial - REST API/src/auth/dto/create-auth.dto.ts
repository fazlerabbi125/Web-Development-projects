export class CreateAuthDto {
    name: string;
    email: string;
    password: string;
    isAdmin?: boolean;
    emailVerified?:boolean;
    refreshToken?: string;
    resetPasswordToken?: string;
    resetPasswordExpire?: Date;
    emailVerificationToken?: string;
}
