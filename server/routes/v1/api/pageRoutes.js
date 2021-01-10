import expressRouter from 'express-promise-router';
import pageController from "../../../controllers/v1/api/PageController";

const router = expressRouter();

/**
 * Privacy policy of yatribhet
 * @route GET /page/{slug}
 * @group Page - Pages
 * @operationId getPageBasedOnSlug
 * @param {string} slug.path.required - slug - eg:privacy-policy
 * @produces application/json
 * @consumes application/json
 * @returns { validationResponse.model } 200 - Success
 */

router
    .route('/:slug')
    .get(
        pageController.getPageBySlug
    );

export default router;
