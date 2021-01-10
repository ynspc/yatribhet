import expressRouter from 'express-promise-router';
import tagController from "../../../controllers/v1/api/TagController";
import { passportVerification } from '../../../middlewares/strategies/appJwt';

const router = expressRouter();

/**
 * Retrieve all the places.
 * @route GET /tag
 * @group Tag - Tag
 * @operationId retrieve all tags
 * @param {number} page.query - Optional
 * @param {string} search.query - Optional
 * @produces application/json
 * @consumes application/json
 * @returns { validationResponse.model } 200 - Success
 * @security JWT
 */
router
    .route('/')
    .get(
        passportVerification,
        tagController.list
    );

export default router;
