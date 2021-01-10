/**
* creator: yathartha shrestha
* description: A functional components handling user related tasks.
* tasks:
*   - register
*   - login
*   - logout
*   - refreshAccessToken
*   - profile
* background tasks:
*   - sends email after new user registration
* */

import moment from "moment";
import uuidV1  from 'uuid/v1';
import Jwt from 'jsonwebtoken';
import UserModel from '../../../database/models/Users';
import { sendMail } from '../../../modules/nodeMailer';
import { generateAccessToken, generateRefreshToken } from '../../../modules/token';
import {
    REGISTER,
    GENERAL,
    LOGIN,
    USER
} from '../../../helpers/constants/server-messages';
import { enums } from '../../../helpers/constants/database';
import { isValidObjectId } from "../../../helpers/common-scripts";
import Generator from '../../../utils/Generator';
import { updateOrCreateUserDevices, logoutDevices } from '../../../helpers/queries/database';
import { tokenConfig } from '../../../config';
import Errors from "../../../helpers/errors";
const customGenerator = new Generator();

const register = async ( request, response, next ) => {
    try {
        let {
            firstName,
            lastName,
            userName,
            email,
            password,
            gender,
            termsAndCondition,
            // privacyPolicy
        } = request.body;
        let emailIsNotVerified = true;
        let message = '';
        let randomUUID = uuidV1();

        let userModelObject = {
            firstName,
            lastName,
            email,
            userName,
            password,
            gender,
            emailTokenUuid: randomUUID,
            emailVerifiedAt: ''
        };

        if( !termsAndCondition ){
            console.log('i should not be here')
            let Err = new Error(REGISTER.TERMS_AND_CONDITION.message);
            Err.code = Err.status = REGISTER.TERMS_AND_CONDITION.httpCode;
            return next(Err);
        }
       /* if( privacyPolicy !== true ){
            let Err = new Error(REGISTER.PRIVACY_POLICY.message);
            Err.code = Err.status = REGISTER.PRIVACY_POLICY.httpCode;
            return next(Err);
        }*/

        if(request.facebookObject){
            userModelObject.facebookAccessToken = request.facebookObject.id;
            userModelObject.registeredFrom = enums.REGISTERING_DEVICES.FACEBOOK;
            //check FB email address is same as requested email or not
            if(request.facebookObject.email === email) {
                emailIsNotVerified = false;
                userModelObject.status = 1;
                userModelObject.emailVerifiedAt = moment.utc();
                userModelObject.emailTokenUuid = null;
            }
        }

        userModelObject.termsAndConditionAcceptedAt = moment.utc();
        userModelObject.privacyPolicyAcceptedAt = moment.utc();

        const createdUser = new UserModel(userModelObject);
        await createdUser.save();
        let userObject = createdUser.toObject();

        delete userObject.password;
        delete userObject.emailTokenUuid;

        if(emailIsNotVerified) {
            console.log('email sending process begins');
            let emailObject = {
                from: 'no-reply@yatribhet.com',
                to: email,
                subject: 'Email verification',
                emailTemplate: 'emailVerification',
                emailDataObject: {
                    userName: firstName,
                    emailVerificationLink: customGenerator.linkGenerate('emailVerification', randomUUID),
                }
            };

            sendMail(emailObject);

            message = REGISTER.SENT_FOR_VERIFICATION.message;
        }
        else{
            message = REGISTER.SUCCESS.message;
        }

        return response
            .status(REGISTER.SUCCESS.httpCode)
            .json({
                message
            });
    }catch (e) {
        return next(e);
    }
};

const login = async ( request, response, next ) => {
    const { deviceType, deviceId, deviceToken } = request.body;
    const user = request.user;

    try {
        const { accessToken, expiry } = await generateAccessToken(user._id);
        const refreshToken = await generateRefreshToken(user._id);
        await updateOrCreateUserDevices(user._id, deviceId, deviceType, deviceToken, accessToken, refreshToken, expiry);

        response.set('accessToken', accessToken);
        response.set('refreshToken', refreshToken);
        response.set('expiresIn', expiry);

        return response
            .status(LOGIN.SUCCESS.httpCode)
            .json({
                message: LOGIN.SUCCESS.message,
                data: {
                    userProfile: await UserModel.details(user._id),
                    tokenData:{
                        accessToken,
                        refreshToken,
                        expiry
                    }
                }
            });
    } catch (e) {
        return next(e);
    }
};

const refreshAccessToken = async (request, response, next) => {
    const { refreshToken } = request.query;
    try {
        const decoded = Jwt.verify(
            refreshToken,
            tokenConfig.secretRefreshToken
        );

        if ( !decoded )
            return next(Errors.notFound());

        const { accessToken, expiry } = await generateAccessToken(decoded.sub);
        return response
            .status(GENERAL.SUCCESS.httpCode)
            .json({
                message: GENERAL.SUCCESS.message,
                data: {
                    accessToken,
                    expiry
                }
            });

    }
    catch (error) {
        console.log(error);
        next(error);
    }
};

const logout = async ( request, response, next ) => {
    try{
        const { _id, isFirstTimeLogin } = request.user;

        if ( isFirstTimeLogin )
            await UserModel.updateOne({ _id: _id, isFirstTimeLogin: true }, { $set: { isFirstTimeLogin: false } });

        await logoutDevices({ accessToken: request.headers.authorization });
        await request.logout();

        return response
            .status(200)
            .json({
                message: LOGIN.SUCCESS.message,
                data: {}
            })

    } catch (e) {
        next(e);
    }
};

const profile = async ( request, response, next ) => {
    try{
        const userInfo = await UserModel.details(request.user._id);


        return response
            .status(USER.PROFILE.httpCode)
            .json({
                message: USER.PROFILE.message,
                data: userInfo
            })
    } catch (e) {
        next(e);
    }
};

const checkUserNameAvailability = async ( request, response, next ) => {
    try{
        const { userId } = request.params;//nullable field
        const { userName } = request.body;
        let user, httpCode, httpMessage;

        if ( typeof userId === 'string' && await isValidObjectId(userId) )
            user = await UserModel.findOne({ userName: userName, _id: { $ne: userId } });
        else
            user = await UserModel.findOne({ userName: userName });

        if ( user ){
            httpCode = USER.USER_NAME_EXISTS.httpCode;
            httpMessage = USER.USER_NAME_EXISTS.message
        }
        else {
            httpCode = GENERAL.SUCCESS.httpCode
            httpMessage = GENERAL.SUCCESS.message
        }

        return response
            .status(httpCode)
            .json({
                message: httpMessage
            })
    } catch (e) {
        next(e);
    }
};

const storeFavouriteTags = async (request, response, next) => {
    try {
        const { tags } = request.body;
        const loggedUser = request.user;

        /*tags validation*/

        await UserModel.findOneAndUpdate(
            {
                _id: loggedUser._id
            },
            {
                $set: {
                    favouriteTags: tags
,                }
            },
            {
                new: true,
                useFindAndModify: false
            }
        );

        return response
            .status(GENERAL.SUCCESS.httpCode)
            .json({
                message: GENERAL.SUCCESS.message
            })
    }
    catch (e) {
        return next(e);
    }
};

export default {
    register,
    login,
    logout,
    refreshAccessToken,
    profile,
    checkUserNameAvailability,
    storeFavouriteTags
}
