import Passport from "passport";
import { Strategy } from "passport-local";
import userModel from "../../database/models/Users";
import { LOGIN } from '../../helpers/constants/server-messages';

Passport.use('app-local', new Strategy(
    {
        usernameField: 'userName',
        passwordField: 'password'
    },
    async (username, password, done) => {
        try{
            let error;
            let userName = username.split('@');

            if ( userName.length > 1){
                userName[0] = userName[0].toLowerCase();
                let domain = userName[1].split('.');
                domain[0] = domain[0].toLowerCase();
                domain[1] = domain[1].toLowerCase();
                userName[1] = domain.join('.');
                userName = userName.join('@');
            }
            else{
                userName = username.replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, '').toLowerCase();
            }
            const userFound = await userModel
                .findOne(
                    {
                        $or: [
                            { email: userName },
                            { userName: userName }
                        ]
                    }
                )
                .exec();

            if ( !userFound ) {
                error = new Error(LOGIN.INVALID_CREDENTIALS.message);
                error.code = error.status = LOGIN.INVALID_CREDENTIALS.httpCode;

                return done(error);
            }

            const didPasswordMatch = await userModel.didPasswordMatch(password, userFound.password);

            if (!didPasswordMatch) {
                error = new Error(LOGIN.INVALID_CREDENTIALS.message);
                error.code = error.status = LOGIN.INVALID_CREDENTIALS.httpCode;

                return done(error);
            }

            let status = userFound.status;

            switch (status) {
                case 0:
                    error = new Error('Account not verified.');
                    error.code = error.status = 401;
                    return done(error);
                case 2:
                    error = new Error('Account has been disabled. Contact the administration.');
                    error.code = error.status = 401;
                    return done(error);
                default:
                    break;
            }
            return done(null, userFound);
        }
        catch (error) {
            done(error);
        }
    }
));

export const passportAppAuthenticate = async (request, response, next) => {
    await Passport.authenticate(
        'app-local',
        { session: false },
        function (error, user, info) {
            if (error)
                return next(error);

            if(info && info.hasOwnProperty('message')){
                let error = new Error('Missing credentials.');
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
    )(request, response, next);
};
