import Jwt from 'jsonwebtoken';
import { tokenConfig } from '../config/index';

export const generateAccessToken = async (user) => {
    try {
        const expiry = Math.floor(Date.now()/1000) + parseInt(tokenConfig.expiryAccessToken);
        const accessToken = await Jwt.sign(
            {
                iss: '',
                sub: user,
                iat: new Date().getTime(),
                exp: expiry
            },
            tokenConfig.secretAccessToken
        );

        return {
            accessToken,
            expiry
        }
    }
    catch (error) {
        console.log('error', error);
    }
};

export const generateRefreshToken = (user) => {
    try {
        const expiry = Math.floor(Date.now()/1000) + parseInt(tokenConfig.expiryRefreshToken);
        return Jwt.sign(
            {
                iss: '',
                sub: user,
                iat: new Date().getTime(),// current time in milliseconds
                exp: expiry //milliseconds
            },
            tokenConfig.secretRefreshToken
        );
    }
    catch (error) {
        console.log('error', error);
    }
};
