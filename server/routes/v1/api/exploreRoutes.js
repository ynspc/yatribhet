import expressRouter from 'express-promise-router';
import exploreController from "../../../controllers/v1/api/ExploreController";
import { passportVerification } from "../../../middlewares/strategies/appJwt";

const router = expressRouter();

/**
 * Data retrieval for the explore section.
 * @route GET /explore
 * @group Explore - Explore
 * @operationId retrieval
 * @produces application/json
 * @consumes application/json
 * @returns { validationResponse.model } 200 - Success
 * @security JWT
 */

router
    .route('/')
    .get(
        passportVerification,
        exploreController.list
    );

export default router;
