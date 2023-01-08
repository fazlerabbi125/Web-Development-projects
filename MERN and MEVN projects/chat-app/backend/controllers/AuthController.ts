import { success } from "../utils/commonResponse";
import bcrypt from "bcrypt";
import multer from "multer";
import HTTP_STATUS from "../utils/httpStatus";

export const JWT_keys = {
    access: process.env.JWT_ACCESS_KEY || '9f7d5ba0d0',
    refresh: process.env.JWT_REFRESH_KEY || 'b13df694aa'
}

class AuthController {

}

export default new AuthController();