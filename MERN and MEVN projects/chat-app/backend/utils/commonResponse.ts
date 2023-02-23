import { ValidationError } from "express-validator";

interface CommonResponseType {
    success: boolean;
    message: string;
}

export interface SuccessResponseType<T = any> extends CommonResponseType {
    results: T;
}

export interface FailureResponseType extends CommonResponseType {
    err?: string | Record<string, ValidationError> | ValidationError[];
}

function success(message: string, data: unknown = null): SuccessResponseType {
    return {
        success: true,
        message,
        results: data,
    };
}

const failure = (
    message: string,
    err?: FailureResponseType["err"]
): FailureResponseType => {
    return {
        success: false,
        message,
        err,
    };
};

export { success, failure };