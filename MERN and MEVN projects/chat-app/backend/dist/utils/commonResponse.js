"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.failure = exports.success = void 0;
const success = (message, data = null) => {
    return {
        success: true,
        message: message,
        results: data
    };
};
exports.success = success;
const failure = (message, error = {}) => {
    return {
        success: false,
        message: message,
        errors: error
    };
};
exports.failure = failure;
