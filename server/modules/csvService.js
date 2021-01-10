import * as csv from 'fast-csv';

export default class CsvService {

    constructor() {
    }

    parse(fileLocation) {
        let parseResponse = {
            result: [],
            total: 0,
            success: 0,
            failure: 0,
            failureRecord: []
        };
        return new Promise((resolve, reject) => {
            csv
                .parseFile(fileLocation, {
                    headers: true,
                    delimiter: ","
                })
                .validate(function(data){
                  /*basic validation rule*/
                    parseResponse.total++;
                    const mobile = data['Mobile Number'] ? data['Mobile Number'] : null;

                    return mobile !== null && typeof mobile === 'string' && mobile.length > 0
                })
                .on("data-invalid", function(data,index){
                    parseResponse.failure++;
                    parseResponse.failureRecord.push(`Unable to record this row with index: ${index}`)
                })
                .on("data", async function (data) {
                    parseResponse.success++;
                    parseResponse.result.push(data)
                })
                .on("error", function (data) {
                    return reject(data);
                })
                .on("end", function () {
                    return resolve(parseResponse);
                });
        });
    }
}
