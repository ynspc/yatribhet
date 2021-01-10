import Passport from "passport";
import FacebookTokenStrategy from "passport-facebook-token";
import userModel from "../../database/models/Users";
import { LOGIN } from "../../helpers/constants/server-messages";
import { oauthConfig } from "../../config/index";

Passport.use('facebookSignup', new FacebookTokenStrategy(
    {
        clientID: oauthConfig.FACEBOOK.APP_ID,
        clientSecret: oauthConfig.FACEBOOK.APP_SECRET,
        enableProof: true
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

Passport.use('facebookLogin', new FacebookTokenStrategy(
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

            /*check if user has already logged in with facebook before*/
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
                Err = new Error("User is not registered in our system. Redirect to login page.");
                Err.code = Err.status = 441;
                return done(Err);
            }

            if (facebookUser.status === 2) {
                let Err = new Error("This user is disabled. Contact the administration.");
                Err.code = Err.status = 401;
                return done(Err);
            }
            done(null, facebookUser);
        }
        catch (error) {
            console.log("exception caught while signin with facebook.", error);
            done(error);
        }
    }
));

export const passportFacebookSignup = async (request, response, next) => {
    request.body.access_token = request.body.facebookAccessToken;

    Passport.authenticate(
        'facebookSignup',
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

export const passportFacebookLogin = async (request, response, next) => {
    await Passport.authenticate(
        'facebookLogin',
        { session: false },
        function (error, user, info) {
            try {
                console.log("error", error);
                console.log("user", user);
                console.log("info", info);
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
};

export const passportLinkWithFacebook = async (request, response, next) => {
    await Passport.use('facebookLinkAndSingIn', new FacebookTokenStrategy({
            clientID: oauthConfig.FACEBOOK.APP_ID,
            clientSecret: oauthConfig.FACEBOOK.APP_SECRET,
            enableProof: true,
            passReqToCallback: true
        },
        async (req, accessToken, refreshToken, profile, done) => {
            try {
                req.body.access_token = accessToken;
                let {password} = req.body;
                let info = profile._json || {};
                const fbUser = await userModel.findOne({fbId: profile.id}, secureUser);

                let user;
                // check if user with facebook_id already exists
                if (!fbUser) {
                    if (info && info.email) {
                        let emailUser = await userModel.findOne({email: info.email}, secureUser); // check if user with provided email already exists
                        if (emailUser) {
                            if (emailUser.status === 2) { // error of account disabled by admin
                                let Err = new Error(LOGIN.DISABLED_BY_ADMIN.message);
                                Err.code = Err.status = LOGIN.DISABLED_BY_ADMIN.httpCode;
                                return done(Err);
                            }
                            user = emailUser;
                        }
                        else {
                            // redirect to registration
                            let Err = new Error(LOGIN.FB_EMAIL_NOT_FOUND.message);
                            Err.code = Err.status = LOGIN.FB_EMAIL_NOT_FOUND.httpCode;
                            return done(Err);
                        }
                    }
                    else {
                        // redirect to registration
                        let Err = new Error(LOGIN.FB_EMAIL_NOT_FOUND.message);
                        Err.code = Err.status = LOGIN.FB_EMAIL_NOT_FOUND.httpCode;
                        return done(Err);
                    }
                }
                else {
                    // console.log('user already exists with id::' + fbUser._id);
                    user = fbUser;
                }
                let isValidUser = await user.isValidPassword(password);
                if (isValidUser) {
                    //unset fbAccessToken of user if existing fb user has to be replaced otherwise previous token will be misused in fb contact sync
                    if (user.status === 2) {
                        let Err = new Error(LOGIN.DISABLED_BY_ADMIN.message);
                        Err.code = Err.status = LOGIN.DISABLED_BY_ADMIN.httpCode;
                        return done(Err);
                    }
                    await user.updateOne({
                        fbAccessToken: null,
                        status: 1,
                        fbId: profile.id,
                        emailVerifiedAt: new Date().getTime()
                    });
                    done(null, user);
                }
                else {
                    let Err = new Error(LOGIN.INVALID_PASSWORD.message);
                    Err.code = Err.status = LOGIN.INVALID_PASSWORD.httpCode;
                    return done(Err);
                }
            } catch (error) {
                done(error);
            }
        }));
};
