/*
* Creator: Yathartha Shrestha
* About: Common functions to be used throughout the project where needed.
*
* Included: bCrypt library helper functions
*
* */
import mongoose from 'mongoose';
import dotEnv from 'dotenv';
dotEnv.config();
import { genSalt, hash, compare } from 'bcrypt';

export const HashPassword = async (plainText) => {
    try {
        const salt = await genSalt(10, '');
        return await hash(plainText, salt);
    }
    catch (error) {
        console.log("common-scripts error encountered-", error);
        throw new Error(error.message);
        // return error;
    }
};

export const CompareHashWith = async ( plainText, ourStoredHash ) => {
    try {

        return await compare(plainText, ourStoredHash);
    }
    catch (error) {
        console.log("common-scripts error encountered-", error);
        throw new Error(error.message);
    }
};

export const MakeDomainLowerCaseOfEmail = email => {
    if( !email )
        return email;

    try {
        email = email.split('@');
        email[1] = email[1].toLowerCase();
        return email.join('@');
    } catch (e) {
        return email;
    }
};

export const isValidObjectId = async objectId => {
    return mongoose.Types.ObjectId.isValid(objectId)
};

export const objectId = async stringId => {
    /*this is used in case of aggregation*/
    return mongoose.Types.ObjectId(stringId);
};

export const getValidPage = async page => {
    page = parseInt(page);
    if (isNaN(page) || typeof page === 'undefined')
        return 1;

    return page <= 0 ? 1 : page
};

export const paginateProvider = async (dataObj) => {
    let pageData;
    let records = dataObj.docs;
    if (records.length > 0) {

        let pagination = {
            totalRecords: dataObj.totalDocs,
            limit: dataObj.limit,
            hasPrevPage: dataObj.hasPrevPage,
            hasNextPage: dataObj.hasNextPage,
            currentPage: dataObj.page,
            totalPage: dataObj.totalPages,
            pagingCounter: dataObj.pagingCounter,
            prevPage: dataObj.prevPage,
            nextPage: dataObj.nextPage
        };
        pageData = {
            data: records,
            pagination: pagination
        };

        return pageData;


    }
    else {
        pageData = {
            data: records,
            pagination: {
                totalRecords: 0,
                limit: 0,
                hasPrevPage: false,
                hasNextPage: false,
                currentPage: 1,
                totalPage: 1,
                pagingCounter: 1,
                prevPage: null,
                nextPage: null
            }
        }
    }
    return pageData;
};

export const requestFilter = (requestBody) => {
    for ( const attribute in requestBody ) {
        console.log(attribute)
    }
};

export const isValidPlaceRow = place => {
    return (
        place.country !== '' &&
        place.name !== '' &&
        place.description !== '' &&
        place.popularName !== '' &&
        place.latitude !== '' &&
        place.longitude !== '' &&
        // place.displayImage !== '' &&
        place.placeType !== '' &&
        place.state !== '' &&
        place.zone !== '' &&
        place.district !== '' &&
        place.myUniqueCode !== '' &&
        place.tags !== '' &&
        place.famousRating !== ''
    );
};

export const fullURL = filename => {
    return `http://${process.env.SERVER_URL}/places/sharp/${filename.split(".")[0]}.webp`;
}
