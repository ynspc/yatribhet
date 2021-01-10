import multer from 'multer';

export const validateBody = (schema) => {
    return (request, response, next) => {
        const result = schema.validate(request.body, { abortEarly: false });

        if( result.error ){
            const errors = result.error
                ? _createErrorObject(result.error.details)
                : null;

            return response
                .status(422)
                .json({
                    message:errors,
                });
        }

        if( !request.value ) {
            request.value = {};
        }

        request.value['body'] = result.value;
        next();
    }
};

export const requireJsonContent = (request, response, next) => {

    const contentType = request.headers['content-type'].toLowerCase();

    if (contentType === 'application/json' ||
        contentType === 'application/json; charset=utf-8'  ||
        contentType === 'application/json;charset=utf-8'){ next(); }
    else {
        response
            .status(400)
            .json({
                status: 400,
                message: `Bad Request.Server requires application/json got ${request.headers['content-type']}`,
                data: {}
            });
    }
};

export const uploadedFileTypes = (allowedExtensions) => {
    return true;
   /* return (request, response, next) => {
        multer({
            fileFilter: (request, file, callback) => {
                console.log('here', file);
                callback(null, true);
            }
        });
    };*/
};

const _createErrorObject = (errors) => {
    let message = "";

    errors.map( error => {
        let errorMessage = `${error.message.replace(/['"]/g, '')}`;
        message += message ? "\n" : "";
        message += `${errorMessage}.`;
    });

    return message;
};
