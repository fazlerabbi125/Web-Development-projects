import jwt, { JwtPayload } from "jsonwebtoken";
import { Response, Request, NextFunction } from "express";
import HTTP_STATUS from "../utils/httpStatus";
import { failure } from "../utils/commonResponse";
import { JWT_keys } from "../controllers/AuthController";

class AuthMiddleware {
    checkAuth(req: Request, res: Response, next: NextFunction) {
        if (
            req.get("authorization") &&
            req.get("authorization")?.startsWith("Bearer")
        ) {
            const token = req.headers.authorization?.split(" ")[1]; //authorization="Bearer "+token
            try {
                if (!token) throw new Error("No token found");
                const decodedData: JwtPayload | string = jwt.verify(
                    token,
                    JWT_keys.access
                );
                if (typeof decodedData === "string")
                    throw new Error("Verification failed");
                req.user = {
                    _id: decodedData._id,
                    name: decodedData.name,
                    email: decodedData.email,
                    isAdmin: decodedData.isAdmin,
                }; //Decoded data is passed this way instead of using spread operator becauses expiration time (exp) and iat in token will cause error when vertified
                next();
            } catch (error: any) {
                return res.status(HTTP_STATUS.FORBIDDEN).send(failure(error.message));
            }
        } else {
            return res
                .status(HTTP_STATUS.UNAUTHORIZED)
                .send(failure("Unauthorized request"));
        }
    }
    isAdmin(req: Request, res: Response, next: NextFunction) {
        if (req.user?.isAdmin) {
            next();
        } else {
            return res
                .status(HTTP_STATUS.FORBIDDEN)
                .send(failure("You are forbidden for that request"));
        }
    }
    isRegUser(req: Request, res: Response, next: NextFunction) {
        if (!req.user?.isAdmin) {
            next();
        } else {
            return res
                .status(HTTP_STATUS.FORBIDDEN)
                .send(failure("You are forbidden for that request"));
        }
    }
    guest(req: Request, res: Response, next: NextFunction) {
        if (!req.get("authorization")) {
            next();
        } else {
            return res
                .status(HTTP_STATUS.FORBIDDEN)
                .send(failure("You are forbidden for that request"));
        }
    }
}

export default new AuthMiddleware();
