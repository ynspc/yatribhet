import PageModel from '../../../database/models/Pages';
import { PAGE } from '../../../helpers/constants/server-messages';
import Errors from '../../../helpers/errors';
import { enumerations } from '../../../helpers/enumerations';

const getPageBySlug = async ( request, response, next ) => {
    try {
        const {slug} = request.params;
        if (!enumerations.PageSlug.includes(slug))
            return next(Errors.invalidRequest(PAGE));

        const pageData = await PageModel.findBySlug(slug);

        console.log(pageData)

        if ( !pageData )
            return next(Errors.notFound(PAGE));

        return response
            .status(PAGE.SUCCESS.httpCode)
            .json({
                message: PAGE.SUCCESS.message,
                data: pageData
            });
    }
    catch (e) {
        return next(e);
    }
};

export default {
    getPageBySlug
};
