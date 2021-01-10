// import expressRouter from 'express-promise-router';
// import providerController from "../../../controllers/v1/api/ProviderController";
// import { requireJsonContent, validateBody } from '../../../middlewares/routes';
// import { validationSchemas } from '../../../request/providerSchemaValidation';
// import { passportVerification } from '../../../middlewares/strategies/appJwt';
//
// const router = expressRouter();
//
// /**
//  * @typedef providerResponseModel
//  * @property {string} message:Success
//  */
//
// /**
//  * List paginated providers
//  * @route GET /provider
//  * @group Provider - List provider detail
//  * @operationId listProviderDetail
//  * @produces application/json
//  * @consumes application/json
//  * @returns { providerResponseModel.model } 200 - Success
//  * @security JWT
//  */
//
// router
//     .route('/')
//     .get(
//         passportVerification,
//         providerController.list
//     );
//
// /**
//  * @typedef openingBalance
//  * @property {enum} balanceType.required - balance type - eg:credit,debit
//  * @property {string} amount.required - amount - eg:100
//  */
//
// /**
//  * @typedef newProvider
//  * @property {string} title.required - title - eg:title
//  * @property {string} name.required - name - eg:name
//  * @property {Array.<string>} designation.required
//  * @property {string} address.required - address - eg: full-address
//  * @property {string} logo.required - logo prefered - eg: logo
//  * @property {string} zip.required - zip code - eg: zip
//  * @property {string} contact.required - contact - eg: 9843637742
//  * @property {string} email.required - email - eg:yshrestha007@gmail.com
//  * @property {string} registrationNumber.required - registration number - eg:1234
//  * @property {openingBalance.model} openingBalance.required
//  * @property {boolean} status.required - status - eg:true
//  */
//
// /**
//  * Create new provider
//  * @route POST /provider
//  * @group Provider - Create new provider
//  * @operationId createProvider
//  * @param {newProvider.model} newProvider.body.required - Required(title,address)
//  * @produces application/json
//  * @consumes application/json
//  * @returns { providerResponseModel.model } 200 - Success
//  * @security JWT
//  */
//
// router
//     .route('/')
//     .post(
//         passportVerification,
//         requireJsonContent,
//         validateBody(validationSchemas.create, { abortEarly: true }),
//         providerController.create
//     );
//
// /**
//  * Get provider
//  * @route GET /provider/{providerId}
//  * @group Provider - Get provider detail
//  * @operationId getProviderDetail
//  * @param {string} providerId.path.required - providerId - eg:5f2787a103ec55708b77ee32
//  * @produces application/json
//  * @consumes application/json
//  * @returns { providerResponseModel.model } 200 - Success
//  * @security JWT
//  */
//
// router
//     .route('/:providerId')
//     .get(
//         passportVerification,
//         providerController.getProvider
//     );
//
// /**
//  * Update new provider
//  * @route PATCH /provider/{providerId}
//  * @group Provider - Get provider detail
//  * @operationId updateProvider
//  * @param {string} providerId.path.required - providerId - eg:5f2787a103ec55708b77ee32
//  * @param {newProvider.model} newProvider.body.required - Required(title,address)
//  * @produces application/json
//  * @consumes application/json
//  * @returns { providerResponseModel.model } 200 - Success
//  * @security JWT
//  */
//
// router
//     .route('/:providerId')
//     .patch(
//         passportVerification,
//         requireJsonContent,
//         // validateBody(validationSchemas.create, { abortEarly: true }),
//         providerController.update
//     );
//
// /**
//  * Delete provider
//  * @route DELETE /provider/{providerId}
//  * @group Provider - delete provider
//  * @operationId deleteProviderDetail
//  * @param {string} providerId.path.required - providerId - eg:5f2787a103ec55708b77ee32
//  * @produces application/json
//  * @consumes application/json
//  * @returns { providerResponseModel.model } 200 - Success
//  * @security JWT
//  */
//
// router
//     .route('/:providerId')
//     .delete(
//         passportVerification,
//         providerController.deleteProcess
//     );
//
// export default router;
