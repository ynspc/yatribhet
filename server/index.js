'use strict';

import Express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import path from 'path';
import _ from 'lodash';

import Database from './database';
import { swaggerConfig, serverConfig } from './config';
import apiRoutes from "./routes/v1/apiRoutes";
import Logger from "./utils/Logger";

const app = new Express();
const logger = new Logger();
global.bp = process.cwd();
global.TEMP_FOLDER = `${process.cwd()}/storage/system/temp`;
global.SYSTEM_FOLDER = `${process.cwd()}/storage/system`;
/*absolute path / relative path*/

const buildPath = path.join(__dirname, '..', 'build');
app.use(Express.static(buildPath));

new Database().connect();

const expressSwagger = require('express-swagger-generator')(app);
let options = {
    swaggerDefinition: {
        info: swaggerConfig.INFO,
        host: swaggerConfig.HOST,
        basePath: swaggerConfig.BASE_PATH,
        produces: swaggerConfig.PRODUCES,
        schemes: swaggerConfig.SCHEMES,
        securityDefinitions: swaggerConfig.SECURITY,
    },
    basedir: __dirname, //app absolute path
    files: ['./routes/**/*.js'] //Path to the API handle folder
};
expressSwagger(options);

/*activating middleware*/
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

app.use(Express.static(`${__dirname}/storage/system`));

/*routes enabled*/
apiRoutes(app);

/*404case handling*/
app.use(function (request, response, next) {
    let error = new Error('Page Not Found.');
    error.status = 404;
    next(error);
});

/*error handling*/
app.use(function (error, request, response, next) {
    console.log(
        "original URL- ", request.originalUrl,
        "base URL- ", request.baseUrl,
        "path- ", request.path,
        'error has been sent::', error
    );

    // logger.error(`originalUrl: ${request.originalUrl} | path: ${request.path} | error: ${error}`);

    if (request.xhr && request.accepts('json')) {
        return response.json({
            message: error.message || 'Internal Server Error.',
            data: {}
        });
    }
    else {
        const list = [
            ..._.range(400, 410, 1),
            ..._.range(500, 510, 1)
        ];
        const errorStatus = list.includes(error.status) || list.includes(error.code) ?
            error.status || error.code :
            500;
        return response
            .status(errorStatus)
            .json({
                message: error.message || 'Internal Server Error.',
                errorProvider: error.name || 'Unknown.',
                data: {}
            });
    }
});

app.listen(serverConfig.PORT, () => {
    console.log(`Server has started on port ${serverConfig.PORT}`);
});
