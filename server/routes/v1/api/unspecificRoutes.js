import expressRouter from 'express-promise-router';
import userController from "../../../controllers/v1/api/UserController";

const router = expressRouter();
/*------------------forgot password--------------------*/

router
    .route('/forgot-password')
    .post( userController.login );



/*------------------change password--------------------*/

router
    .route('/change-password')
    .post( userController.login );

export default router;
