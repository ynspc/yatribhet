import { GENERAL } from '../../../helpers/constants/server-messages';
import tagsRepository from "../../../repositories/tagsRepository";
import placesRepository from "../../../repositories/placesRepository";

/**
 * TODO for near by places
 *
 * either the device can send the address
 * or the address of the user stored during the registration #paid-service
 *
 * */
const list = async (request, response, next) => {
    try {
        // let { favouriteTags } = request.user;
        let favouriteTags = await tagsRepository.getTagByNames(['animal']);//['5f915bb079b2267772a1c26b'];
        favouriteTags = favouriteTags.map(tag => tag._id);
        const tags = await tagsRepository.listTags();
        const recommendedPlaces = await placesRepository.listRecommendedPlaces({ tags: favouriteTags });
        const nearByPlaces = await placesRepository.listRecommendedPlaces({ tags: favouriteTags });

        return response
            .status(GENERAL.SUCCESS.httpCode)
            .json({
                message: GENERAL.SUCCESS.message,
                data: {
                    tags,
                    recommendedPlaces,
                    nearByPlaces
                }
            });
    }
    catch (e) {
        return next(e);
    }
};

export default {
    list
};
