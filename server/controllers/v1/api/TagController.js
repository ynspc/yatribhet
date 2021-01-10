import { GENERAL } from '../../../helpers/constants/server-messages';

import {getValidPage, paginateProvider} from "../../../helpers/common-scripts";
import TagModel from "../../../database/models/Tags";

const list = async ( request, response, next ) => {
    try {
        const page = await getValidPage(request.query.page);
        const { sortBy, search, sortDesc, itemsPerPage } = request.query;

        const options = {
            limit: 100, //itemsPerPage,//design specific
            page,
            search,
            sortBy,
            sortDesc
        };

        const aggregateQuery = TagModel.getTags(options);
        const tags = await TagModel.aggregatePaginate(aggregateQuery, options);
        const getPagination = await paginateProvider(tags);

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

export default {
    list
};
