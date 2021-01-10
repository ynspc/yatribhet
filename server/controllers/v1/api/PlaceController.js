import {PLACE, GENERAL} from '../../../helpers/constants/server-messages';

import {getValidPage, isValidObjectId, paginateProvider} from "../../../helpers/common-scripts";
import PlaceModel from "../../../database/models/Places";

import fileUpload from "../../../modules/fileUpload";
import { uploadConfig } from "../../../config";
import placesRepository from "../../../repositories/placesRepository";

const uploadImages = async ( request, response, next ) => {
    try {
        const fileUploader = new fileUpload('places', false);
        const uploadedResponse = await fileUploader.multipleUpload('place_images', request, response, uploadConfig.image);
        let { identifier, type } = request.body;
        type = parseInt(type);
        const uploadedResult = await placesRepository.uploadImages(identifier, type, uploadedResponse);

        return response
            .status(PLACE.IMAGE_UPLOAD.SUCCESS.httpCode)
            .json({
                message: PLACE.IMAGE_UPLOAD.SUCCESS.message,
                data: uploadedResult
            });
    }
    catch (e) {
        return next(e);
    }
};

const myPlaces = async ( request, response, next ) => {
    try {
        const page = await getValidPage(request.query.page);
        const { sortBy, search, sortDesc, itemsPerPage } = request.query;

        const options = {
            limit: itemsPerPage,
            page,
            search,
            sortBy,
            sortDesc,
        };

        const aggregateQuery = PlaceModel.getPlaces(options);
        const places = await PlaceModel.aggregatePaginate(aggregateQuery, options);
        const getPagination = await paginateProvider(places);

        return response
            .status(GENERAL.SUCCESS.httpCode)
            .json({
                message: GENERAL.SUCCESS.message,
                ...getPagination
            });
    }
    catch (e) {
        return next(e);
    }
};

const placeDetail = async ( request, response, next ) => {
    try {
        const { placeId } = request.params;

        let placeDetail = await placesRepository.placeDetail(placeId);
        const recommendedPlaces = await placesRepository.listRecommendedPlaces({tags: placeDetail.tags});
        placeDetail = {
            ...placeDetail.toObject(),
            recommendedPlaces: recommendedPlaces
        }

        if ( !placeDetail ) {
            return response
                .status(GENERAL.NOT_FOUND.httpCode)
                .json({
                    message: GENERAL.NOT_FOUND.message,
                    data: {}
                });
        }

        return response
            .status(GENERAL.SUCCESS.httpCode)
            .json({
                message: GENERAL.SUCCESS.message,
                data: placeDetail
            });
    }
    catch (e) {
        return next(e);
    }
};

export default {
    myPlaces,
    uploadImages,
    placeDetail
};
