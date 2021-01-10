import expressRouter from 'express-promise-router';
import csvController from "../../../controllers/v1/api/CsvController";

const router = expressRouter();

/**
 * cms routes
 */

router
    .route('/import-tags')
    .post(
        csvController.importTags
    );

router
    .route('/import-places')
    .post(
        csvController.importPlaces
    );

export default router;
