import fs from "fs";
import parser from 'csv-parser';

// noinspection JSUndefinedPropertyAssignment
export default class ParserCsv {

    constructor() {
    }

    /**
    * option for configuration
    * separator
    * error handling
    **/
    parse(fileLocation, { separator, deleteFile }) {
        return new Promise((resolve, reject) => {
            let result = [];
            fs
                .createReadStream(fileLocation)
                .on("error", (error) => {
                    //handle error
                    // console.log("Error caught", error)
                    let err = new Error(error.message);
                    err.status = 400;
                    return reject(err);
                })
                .pipe(parser(separator))
                .on("data", row => {
                    console.log('each row', row)
                    result.push(row);
                })
                .on('end', async () => {
                    console.log('old',result);
                    // if (deleteFile)
                    //     fs.unlinkSync(fileLocation);

                    return resolve(result);
                })
        });
    }

}
