import { CustomError } from './CustomError';
import { ValidationError } from 'express-validator';
export class RequestValidationError extends CustomError {
    statusCode = 400;
    // eslint-disable-next-line no-unused-vars
    constructor(public errors: ValidationError[]) {
        super('Invalid Request Parameters');
        Object.setPrototypeOf(this, RequestValidationError.prototype);
    }
    serializeErrors() {
        return this.errors.map((err) => {
            return { message: err.msg, field: err.param };
        });
    }
}