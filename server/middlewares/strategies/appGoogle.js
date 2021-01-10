import Passport from "passport";
import GoogleOAuth from "passport-google-oauth20";
import userModel from "../../database/models/Users";
import { LOGIN } from "../../helpers/constants/server-messages";
import { oauthConfig } from "../../config/index";
let GoogleStrategy = GoogleOAuth.Strategy;

Passport.use('googleSignup', new GoogleStrategy(
    {
        clientID: oauthConfig.GOOGLE.APP_ID,
        clientSecret: oauthConfig.GOOGLE.APP_SECRET,
        callbackURL: "http://localhost:5000"
    },
    async (accessToken, refreshToken, profile, done) => {
        try{
            const facebookProfile = profile._json || {};
            
            return done(null, facebookProfile);
        }
        catch (error) {
            console.log("exception caught while signin with facebook.", error);
            return done(error);
        }
    }
));

/*Passport.use('googleLogin', new FacebookTokenStrategy(
    {
        clientID: oauthConfig.FACEBOOK.APP_ID,
        clientSecret: oauthConfig.FACEBOOK.APP_SECRET,
        enableProof: true,
        passReqToCallback: true
    },
    async (request, accessToken, refreshToken, profile, done) => {
        try{
            request.body.access_token = accessToken;
            let Err;
            const facebookProfile = profile._json || {};
            const facebookUser = await userModel.findOne({ facebookAccessToken: facebookProfile.id });

            if (!facebookUser) {
                if ( facebookProfile.hasOwnProperty('email') ) {
                    if (typeof facebookProfile.email === 'string' && facebookProfile.email.length > 0) {
                        let localUser = await userModel.findOne({ email: facebookProfile.email });
                        
                        // if (localUser && parseInt(localUser.status) === 2) {
                        //     Err = new Error(LOGIN.DISABLED_BY_ADMIN.message);
                        //     Err.code = Err.status = LOGIN.DISABLED_BY_ADMIN.httpCode;
                        //     return done(Err);
                        // } else if (localUser) {
                        //     Err = new Error(LOGIN.FB_UNLINKED_EMAIL_EXISTS.message);
                        //     Err.code = Err.status = LOGIN.FB_UNLINKED_EMAIL_EXISTS.httpCode;
                        //     return done(Err);
                        // } else {
                        //     //
                        // }
                    }
                }
                // redirect to registration
                // Err = new Error(LOGIN.FB_NOT_REGISTERED_IN_SYSTEM.message);
                // Err.code = Err.status = LOGIN.FB_NOT_REGISTERED_IN_SYSTEM.httpCode;
                return done(Err);
            }

            // if (user.status === 2) {
            //     let Err = new Error(LOGIN.DISABLED_BY_ADMIN.message);
            //     Err.code = Err.status = LOGIN.DISABLED_BY_ADMIN.httpCode;
            //     return done(Err);
            // }
            done(null, facebookUser);
        }
        catch (error) {
            console.log("exception caught while signin with facebook.", error);
            done(error);
        }
    }
));*/

export const passportGoogleSignup = async (request, response, next) => {
    request.body.access_token = request.body.googleAccessToken;

    Passport.authenticate(
        'googleSignup',
        function (error, user, info) {
            try {
                if (error) {
                    console.log('debug', error)
                    if ( error.oauthError ) {
                        const code = error.oauthError.statusCode;
                        const oauthError = JSON.parse(error.oauthError.data);
                        let err = new Error(oauthError.error.message);
                        err.status = code;
                        return next(err);
                    }
                    return next(error);
                }
                else {
                    request.facebookObject = user;
                    return next();
                }
            }
            catch(exception) {
                console.log("caught", exception);
                return next(exception);
            }
        }
    )(request, response, next);
};

/*export const passportGoogleLogin = async (request, response, next) => {
    await Passport.authenticate(
        'facebookLogin',
        { session: false },
        function (error, user, info) {
            try {
                if (error)
                    return next(error);

                if(info && info.hasOwnProperty('message')){
                    let error = new Error(info.message);
                    error.code = 400;
                    return next(error);
                }

                if ( !user ) {
                    let error = new Error(LOGIN.INVALID_CREDENTIALS.message);
                    error.code = error.status = LOGIN.INVALID_CREDENTIALS.httpCode;

                    return next(error);
                }

                request.user = user;
                return next();
            }
            catch(exception) {
                console.log("caught", exception);
                next(exception);
            }
        }
    )(request, response, next);
};*/
