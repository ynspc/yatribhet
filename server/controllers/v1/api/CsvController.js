import { CSV } from '../../../helpers/constants/server-messages';
import { parserConfig, uploadConfig } from "../../../config";
import fileUpload from "../../../modules/fileUpload";
import parserCsv from "../../../modules/parserCsv";
import tagsRepository from "../../../repositories/tagsRepository";
import placesRepository from "../../../repositories/placesRepository";
// import CsvService from "../../../modules/csvService";

const importTags = async ( request, response, next ) => {
    try {
        const fileUploader = new fileUpload('csv');
        const csvParser = new parserCsv();

        const { path, ...rest } = await fileUploader.singleUpload('tags', request, response, uploadConfig.csv);

        const parsedData = await csvParser.parse(path, parserConfig.csv);
        const uploadedResult = await tagsRepository.storeTags(parsedData, rest);

        return response
            .status(CSV.TAGS.SUCCESS.httpCode)
            .json({
                message: CSV.TAGS.SUCCESS.message,
                data: uploadedResult
            });

        /*const csv = new CsvService();
        const parsedData = await csv.parse(path);
        return response
            .status(CSV.TAGS.SUCCESS.httpCode)
            .json({
                message: CSV.TAGS.SUCCESS.message,
                data: parsedData
            });*/
    }
    catch (e) {
        return next(e);
    }
};

const importPlaces = async ( request, response, next ) => {
    try {
        const fileUploader = new fileUpload('csv');
        const csvParser = new parserCsv();

        const { path, ...rest } = await fileUploader.singleUpload('places', request, response, uploadConfig.csv);
        const parsedData = await csvParser.parse(path, parserConfig.csv);
        const uploadedResult = await placesRepository.storePlaces(parsedData, rest);

        return response
            .status(CSV.PLACES.SUCCESS.httpCode)
            .json({
                message: CSV.PLACES.SUCCESS.message,
                data: uploadedResult
            });
    }
    catch (e) {
        return next(e);
    }
};

export default {
    importTags,
    importPlaces
};
