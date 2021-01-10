import expressRouter from 'express-promise-router';
import userController from "../../../controllers/v1/api/UserController";
import { requireJsonContent, validateBody } from '../../../middlewares/routes';
import { validationSchemas } from '../../../request/userSchemaValidation';
import { passportAppAuthenticate } from '../../../middlewares/strategies/appLocal';
import { passportFacebookSignup, passportFacebookLogin } from '../../../middlewares/strategies/appFacebook';
// import { passportGoogleSignup } from "../../../middlewares/strategies/appGoogle";
import { passportVerification } from '../../../middlewares/strategies/appJwt';

const router = expressRouter();

/*-----------register------------*/

/**
 * @typedef registrationModel
 * @property {string} firstName.required
 * @property {string} lastName.required
 * @property {string} password
 * @property {string} email.required - valid email - eg:abc@xx.com
 * @property {string} userName.required -valid username - eg: 12345678
 * @property {string} gender.required -valid gender male|female|other - eg: male
 * @property {boolean} termsAndCondition.required
 * @property {boolean} privacyPolicy.required
 * @property {string} googleAccessToken - access token from google - eg: access_token
 * @property {string} facebookAccessToken - access token from facebook - eg: access_token
 */

/**
 * @typedef registrationResponseModel
 * @property {string} message:Success
 */

/**
 * Registration of the new user
 * @route POST /auth/register
 * @param {registrationModel.model} User.body.required - (FirstName, password, email and userName are required)
 * @group Authentication - Operations in authentication
 * @operationId registration
 * @produces application/json
 * @consumes application/json
 * @returns {registrationResponseModel.model} 200 - Success
 * @returns {validationResponse.model} 422 - Data validation message
 * @returns {validationResponse.model} 409 - Already exists(Email or userName or contactNumber or access_token)
 * @returns {validationResponse.model} 302 - Already exists(But Not verified)
 * @returns {validationResponse.model} 301 - Link with facebook
 * @returns {validationResponse.model} 403 - Disabled by admin
 */

router
    .route('/register')
    .post(
        requireJsonContent,
        validateBody( validationSchemas.registerSchema, {abortEarly:true} ),
        passportFacebookSignup,
        // passportGoogleSignup,
        userController.register
    );

/*----------login-------------*/

/**
 * @typedef loginModel
 * @property {string} userName.required - valid userName - eg:abc@xx.com
 * @property {string} password.required - valid password  - eg:secret
 * @property {integer} deviceType.required - 0-ios/1-android/2-web - eg:1
 * @property {string} deviceId.required - valid device id - eg:123456
 * @property {string} deviceToken.required - valid device token - eg:1234
 */

/**
 * @typedef loginResponseModel
 * @property {string} message:Success
 */

/**
 * Login in the valid user.
 * @route POST /auth/login
 * @param {loginModel.model} User.body.required - (userName, password are required)
 * @group Authentication - Operations in authentication
 * @operationId login
 * @produces application/json
 * @consumes application/json
 * @returns {loginResponseModel.model} 200 - Success
 * @returns {validationResponse.model} 422 - Data validation message
 * @returns {validationResponse.model} 409 - Already exists(Email or userName or contactNumber or access_token)
 * @returns {validationResponse.model} 302 - Already exists(But Not verified)
 * @returns {validationResponse.model} 301 - Link with facebook
 * @returns {validationResponse.model} 403 - Disabled by admin
 */

router
    .route('/login')
    .post(
        requireJsonContent,
        validateBody(validationSchemas.loginSchema),
        passportAppAuthenticate,
        userController.login
    );

/*-----------refresh token---------------*/
/**
 * @typedef refreshAccessTokenModel
 * @property {string} refreshToken.required - the token obtained during login.
**/

/**
 * @typedef refreshAccessTokenResponseModel
 * @property {string} message:Success
 * @property {string} data
 */

/**
 * Refresh access token.
 * @route GET /auth/refreshToken
 * @param { refreshAccessTokenModel.model } refreshToken.query.required - Required (refreshToken)
 * @group Authentication - Operations in authentication
 * @operationId refreshAccessToken
 * @produces application/json
 * @consumes application/json
 * @returns {refreshAccessTokenResponseModel.model} 200 - Success
 */

router
    .route('/refreshToken')
    .get( userController.refreshAccessToken );

/**
 * @typedef checkUserName
 * @property {string} userName.required - check username -eg:user-name
 */

/**
 * check availability of user name
 * @route POST /auth/username-availability/{userId}
 * @group Authentication - Operations in authentication
 * @operationId checkUserName
 * @param { string } userId.path - check for userId - eg: userId
 * @param { checkUserName.model } userName.body.required - eg: userName
 * @produces application/json
 * @consumes application/json
 * @returns {refreshAccessTokenResponseModel.model} 200 - Success
 */
router
.route('/username-availability/:userId?')
.post(
    userController.checkUserNameAvailability
);






/**
 * @typedef facebook
 * @property {string} access_token.required - facebook access token
 * @property {string} deviceId.required - device id
 * @property {string} deviceToken - device token
 * @property {Integer} deviceType.required - device type(ios:1,android:2) - eg:1
 */

/**
 * login using facebook that is already linked/registered with system
 * @route POST /auth/social/facebook
 * @group Authentication - Operations about guest user
 * @param {facebook.model} access_token.body - Required( access_token,deviceId,deviceToken,deviceType(1,2) ) sign in using facebook access_token
 * @operationId facebook
 * @produces application/json
 * @consumes application/json
 */

router
    .route('/social/facebook')
    .post( 
        requireJsonContent, 
        validateBody(validationSchemas.facebookLoginSchema),
        passportFacebookLogin, 
        userController.login
    );


/**
 *
 * Logout the valid user.
 * @route DELETE /auth/logout
 * @group Authentication - Logout authenticated user
 * @operationId logout
 * @produces application/json
 * @consumes application/json
 * @returns {loginResponseModel.model} 200 - Success
 * @returns {validationResponse.model} 422 - Data validation message
 * @returns {validationResponse.model} 409 - Already exists(Email or userName or contactNumber or access_token)
 * @returns {validationResponse.model} 302 - Already exists(But Not verified)
 * @returns {validationResponse.model} 301 - Link with facebook
 * @returns {validationResponse.model} 403 - Disabled by admin
 * @security JWT
 */
router.route('/logout')
    .delete(
        passportVerification,
        userController.logout
    )

export default router;
