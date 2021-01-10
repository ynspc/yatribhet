import expressRouter from 'express-promise-router';
import userController from "../../../controllers/v1/api/UserController";
// import { requireJsonContent, validateBody } from '../../../middlewares/routes';
import { passportVerification } from '../../../middlewares/strategies/appJwt';
import placeController from "../../../controllers/v1/api/PlaceController";

const router = expressRouter();

/*-----------user profile------------*/

/**
 * @typedef profileResponseModel
 * @property {string} message:Success
 */

/**
 * Logged user profile
 * @route GET /user/profile
 * @group User - Operations in user
 * @operationId userProfile
 * @produces application/json
 * @consumes application/json
 * @returns { profileResponseModel.model } 200 - Success
 * @security JWT
 */

router
    .route('/profile')
    .get(passportVerification, userController.profile);


/**
 * @typedef favouriteTagModel
 * @property {Array.<string>} tags.required - tag ids - eg:12345678
 */

/**
 * Record favourite tags of the user for getting recommendation places.
 * @route PATCH /user/favourite-tags
 * @param {favouriteTagModel.model} Tags.body.required - (tags is required)
 * @group User - Operations in user
 * @operationId record all favourite places
 * @produces application/json
 * @consumes application/json
 * @returns { validationResponse.model } 200 - Success
 * @security JWT
 */
router
    .route('/favourite-tags')
    .patch(
        passportVerification,
        userController.storeFavouriteTags
    );
export default router;
