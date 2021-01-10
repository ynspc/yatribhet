import HJoi from '@hapi/joi';
import { enumerations } from '../helpers/enumerations';

module.exports = {
    validationSchemas: {

        registerSchema: HJoi.object().keys({
            firstName: HJoi.string().trim().max(25).required().label('First name'),
            lastName: HJoi.string().allow('').max(25).label('Last Name'),
            email: HJoi.string().required().email().label('Email'),
            password: HJoi.string().trim().required().label('Password'),
            gender: HJoi.string().trim().required().label('Gender'),
            userName: HJoi.string().trim().required().min(8).max(25).label('User name'),
            facebookAccessToken: HJoi.string().trim().empty('').allow(null).optional().label('Facebook token'),
            termsAndCondition: HJoi.boolean().valid(true).label('Terms And Condition')
                .error( () => 'Please accept out terms and condition before you continue'),
            privacyPolicy: HJoi.boolean().valid(true).label('Privacy Policy')
            .error( () => 'Please accept out privacy policy before you continue')
        }),

        facebookLoginSchema: HJoi.object().keys({
            access_token: HJoi.string().trim().required().label('Access token'),
            deviceId: HJoi.string().trim().required().label('Device id'),
            deviceToken: HJoi.string().trim().empty('').optional().default(null).label('Device token'),
            deviceType: HJoi.number().integer().optional().default(1).label('Device type'),
        }),

        // facebookLinkAndLoginSchema: {

        // },

        loginSchema: HJoi.object().keys({
            userName: HJoi.string().trim().required().label('userName'), //email or userName itself
            password: HJoi.string().trim().required().label('Password'),
            deviceId: HJoi.string().trim().required().label('Device id'),
            deviceToken: HJoi.string().allow('').default(null).label('Device token'),
            deviceType: HJoi.number().integer().default(1).label('Device type'),
        }),
    }
};
