import Passport from "passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import userModel from "../../database/models/Users";
import { tokenConfig } from "../../config";

Passport.use('app-jwt', new Strategy(
    {
        jwtFromRequest: ExtractJwt.fromHeader('authorization'),
        secretOrKey: tokenConfig.secretAccessToken,
        passReqToCallback: true
    },
    async (request, jwtPayload, done) => {
        try {
            let accessToken = request.headers.Authorization || '';

            // let device = await deviceModel.findOne({accessToken}).exec();
            // if( !device ){
            //     let error = new Error(LOGIN.DEVICE_NOT_FOUND.message);
            //     error.status = LOGIN.DEVICE_NOT_FOUND.httpCode;
            //     return done(error, false);
            // }
            // const user = await userModel.findById(payload.sub);
            // if ( !user ) {
            //     let Err = new Error(LOGIN.INVALID_TOKEN.message);
            //     Err.code = Err.status = LOGIN.INVALID_TOKEN.httpCode;
            //     return done(Err);
            // }
            //
            // let status = user.status;
            // let Err;
            // switch (status) {
            //     case 0:
            //         Err = new Error(LOGIN.ACCOUNT_NOT_VERIFIED.message);
            //         Err.code = Err.status = LOGIN.ACCOUNT_NOT_VERIFIED.httpCode;
            //         return done(Err);
            //     case 2:
            //         Err = new Error(LOGIN.DISABLED_BY_ADMIN.message);
            //         Err.code = Err.status = LOGIN.DISABLED_BY_ADMIN.httpCode;
            //         return done(Err);
            //     default:
            //         break;
            // }
            // request.deviceId = device.deviceId;
            const user = await userModel.findById(jwtPayload.sub);
            return done(null, user);
        } catch (error) {
            return done(error, false);
        }
    }
));

export const passportVerification = async (request, response, next) => {
    await Passport.authenticate(
        'app-jwt',
        { session: false },
        (error, user, info) => {
            if ( info !== undefined ) {
                if (info && info.name === 'Error') {
                    let Err = new Error('Token not found.');
                    Err.code = Err.status = 401;
                    return next(Err);
                }
                if (info && info.name === 'TokenExpiredError') {
                    let Err = new Error(`Token has expired @ ${info.expiredAt}`);
                    Err.code = Err.status = 401;
                    return next(Err);
                }
                if (info && info.name === 'JsonWebTokenError') {
                    let Err = new Error(info.message);
                    Err.code = Err.status = 401;
                    return next(Err);
                }
            }

            if ( error )
                return next(error);

            if ( !user ) {
                let Err = new Error('User not found.');
                Err.code = Err.status = 401;
                return next(Err);
            }
            request.user = user;

            next();
        }
    )(request, response, next);
};
