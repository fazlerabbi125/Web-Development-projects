"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const HTTP_STATUS = {
    OK: 200,
    INTERNAL_SERVER_ERROR: 500,
    NOT_FOUND: 404,
    UNAUTHORIZED: 401,
    METHOD_NOT_ALLOWED: 405,
    UNPROCESSABLE_ENTITY: 422,
    BAD_REQUEST: 400,
    FORBIDDEN: 403,
};
exports.default = HTTP_STATUS;
