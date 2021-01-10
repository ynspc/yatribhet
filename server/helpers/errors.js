import { GENERAL } from './constants/server-messages';

class Errors {
    constructor() {
    }

    invalidRequest() {
        let error = new Error(GENERAL.BAD_REQUEST.message);
        error.status = GENERAL.BAD_REQUEST.httpCode;
        return error;
    }

    notFound(errorModel= GENERAL) {
        let error = new Error(errorModel.NOT_FOUND.message);
        error.status = errorModel.NOT_FOUND.httpCode;
        return error;
    }
}

const errors = new Errors();
module.exports = errors;
