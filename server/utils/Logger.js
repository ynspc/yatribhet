import fs from 'fs';
import moment from "moment";
import {
    system
} from '../helpers/constants/database';

export default class Logger {
    constructor() {
        this.environment = process.env.ERROR_LOG_CONFIG;
    }

    log(message, level='INFO') {
        let path = `${bp}/storage/logs/`;
        switch (this.environment) {
            case system.LOGGER.DAILY:
                const currentDate = moment.utc().format("YYYY-MM-DD");
                path += `node-${currentDate}.log`;
                break;
            case system.LOGGER.SINGLE:
                path += 'node-logs.log';
                break;
        }
        const stream = fs.createWriteStream(path, {flags: "a"});
        message = `[${moment.utc().toDate()}] /${level}/: ${message}\n`;
        stream.write(message);
    }

    info(message) {
        this.log(message, 'INFO');
    }

    debug(message) {
        this.log(message, 'DEBUG');
    }

    error(message) {
        this.log(message, 'ERROR');
    }
}
