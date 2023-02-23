import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private jwtService: JwtService) {}
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const req = context.switchToHttp().getRequest();
        if (req.get('authorization') && req.get('authorization').startsWith("Bearer")) {
            const token = req.headers.authorization.split(' ')[1];//authorization="Bearer "+token
            try {
                const decodedData = this.jwtService.verify(token,{secret: process.env.JWT_ACCESS_SECRET});
                req.user = {
                    _id: decodedData._id,
                    name: decodedData.name,
                    email: decodedData.email,
                    isAdmin: decodedData.isAdmin
                }
                return true;
            } catch (error) {
                return false;            
            }
        } else {
            return false;            
        }
    }
}