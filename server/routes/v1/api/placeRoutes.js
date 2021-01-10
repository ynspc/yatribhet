import expressRouter from 'express-promise-router';
import placeController from "../../../controllers/v1/api/PlaceController";
import { passportVerification } from '../../../middlewares/strategies/appJwt';

const router = expressRouter();

/**
 * Retrieve all the places.
 * @route GET /place/my-places
 * @group Place - Place
 * @operationId retrieve all places
 * @param {number} page.query - Optional
 * @param {string} search.query - Optional
 * @produces application/json
 * @consumes application/json
 * @returns { validationResponse.model } 200 - Success
 * @security JWT
 */

router
    .route('/my-places')
    .get(
        passportVerification,
        placeController.myPlaces
    );

/**
 * Detail of the selected place.
 * @route GET /place/{placeId}
 * @group Place - Place detail
 * @operationId detail of place
 * @param {string} placeId.path - Optional
 * @produces application/json
 * @consumes application/json
 * @returns { validationResponse.model } 200 - Success
 * @security JWT
 */
router
    .route('/:placeId')
    .get(
        passportVerification,
        placeController.placeDetail
    );

/*cms route*/
router
    .route('/upload-images')
    .patch(
        placeController.uploadImages
    );

export default router;
