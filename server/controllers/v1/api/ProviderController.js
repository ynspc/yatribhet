/*
* creator: yathartha shrestha
* description: A functional components handling provider related tasks.
* tasks:
*   - create
*   - edit
*   - delete
* background tasks:
* */

import ProviderModel from '../../../database/models/Providers';

import { PROVIDER, GENERAL } from '../../../helpers/constants/server-messages';
import { isValidObjectId, getValidPage, paginateProvider } from '../../../helpers/common-scripts';
import Errors from '../../../helpers/errors';
import moment from 'moment';

const list = async ( request, response, next ) => {
    try{
        const page = await getValidPage(request.query.page);
        const { sortBy, search, sortDesc, itemsPerPage } = request.query;

        const options = {
            limit: itemsPerPage,
            page,
            search,
            sortBy,
            sortDesc,
        };

        const aggregateQuery = ProviderModel.getProviders(options);
        const providers = await ProviderModel.aggregatePaginate(aggregateQuery, options);
        const getPagination = await paginateProvider(providers);

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

const create = async ( request, response, next ) => {
    try {
        let {
            title,
            name,
            designation,
            address,
            logo,
            zip,
            contact,
            email,
            registrationNumber,
            status,
            openingBalance
        } = request.body;

        let  providerModelObject = {
            title,
            name,
            designation,
            address,
            logo,
            zip,
            contact,
            email,
            registrationNumber,
            status,
            openingBalance
        };
        const createdProvider = new ProviderModel(providerModelObject);
        const providerObject = await createdProvider.save();

        return response
            .status(PROVIDER.CREATED.httpCode)
            .json({
                message: PROVIDER.CREATED.message,
                data: providerObject
            });
    }
    catch (e) {
        return next(e);
    }
};

const getProvider = async ( request, response, next ) => {
    try {
        let { providerId } = request.params;

        if ( !await isValidObjectId(providerId) )
            return next(Errors.invalidRequest());

        let providerObject = await ProviderModel.findByProviderId(providerId);
        if( !providerObject )
            return next(Errors.notFound(PROVIDER));

        return response
            .status(PROVIDER.SUCCESS.httpCode)
            .json({
                message: PROVIDER.SUCCESS.message,
                data: providerObject
            });
    }
    catch (e) {
        return next(e);
    }
};

const update = async ( request, response, next ) => {
    try {
        const { providerId } = request.params;
        const providerRequest = request.body;

        let providerObject = await ProviderModel.findByProviderId(providerId);
        if( !providerObject )
            return next(Errors.notFound(PROVIDER));

        const updatedProvider = await ProviderModel.findOneAndUpdate(
            { _id: providerObject._id },
            { $set: providerRequest },
            { new: true, useFindAndModify: false }
        );

        return response
            .status(PROVIDER.UPDATED.httpCode)
            .json({
                message: PROVIDER.UPDATED.message,
                data: updatedProvider
            });
    }
    catch (e) {
        return next(e);
    }
};

const deleteProcess = async ( request, response, next ) => {
    try {
        const { providerId } = request.params;

        let providerObject = await ProviderModel.findByProviderId(providerId);
        if( !providerObject )
            return next(Errors.notFound(PROVIDER));

        const updatedProvider = await ProviderModel.findOneAndUpdate(
            { _id: providerObject._id },
            {
                $set: {
                    status: false,
                    deletedAt: moment.utc().toDate()
                }
            },
            { new: true, useFindAndModify: false }
        );

        return response
            .status(PROVIDER.UPDATED.httpCode)
            .json({
                message: PROVIDER.UPDATED.message,
                data: updatedProvider
            });
    }
    catch (e) {
        return next(e);
    }
};

export default {
    list,
    update,
    create,
    getProvider,
    deleteProcess
}
