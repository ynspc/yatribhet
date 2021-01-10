import { passportAppAuthenticate } from './appLocal';
import { passportVerification } from './appJwt';
import { passportFacebookLogin } from './appFacebook';

export default {
    passportAppAuthenticate,
    passportFacebookLogin,
    passportVerification
};
