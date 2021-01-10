import dotEnv from 'dotenv';
dotEnv.config();

const deployment = process.env.DEPLOYMENT || "development:local";
const deploymentSplit = deployment.split(":");
let uri = '';

switch (deploymentSplit[0]) {
    case "development":
        if ( deploymentSplit[1] === 'local')
            uri = `${process.env.DB_DRIVER}://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`;
        if ( deploymentSplit[1] === 'mongodb')
            uri = `${process.env.DB_DRIVER}+srv://${process.env.DB_NAME}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}/${process.env.DB_NAME}?retryWrites=true&w=majority`;
        if ( deploymentSplit[1] === 'mlab')
            uri = `${process.env.DB_DRIVER}://${process.env.DB_NAME}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`;
        break;

    case "production":
        if ( deploymentSplit[1] === 'local')
            uri = '';
        if ( deploymentSplit[1] === 'mongodb')
            uri = '';
        if ( deploymentSplit[1] === 'mlab')
            uri = '';
        break;
}

const serverConfig = {
    PORT: process.env.SERVER_PORT || 5000,
    URL: process.env.SERVER_URL || "localhost"
};

const dbConfig = {
    URI: uri,
    OPTIONS: {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true
    }
};

const swaggerConfig = {
    INFO: {
        description: process.env.SWG_DESCRIPTION || 'Give the description',
        title: process.env.SWG_TITLE || 'Give the title',
        version: '1.0.0',
    },
    HOST: process.env.SERVER_URL || 'localhost:5000',
    BASE_PATH: '/v1/api',
    PRODUCES: [
        "application/json",
        "application/xml"
    ],
    SCHEMES: ['http', 'https'],
    SECURITY: {
        JWT: {
            type: 'apiKey',
            in: 'header',
            name: 'Authorization',
            description: "",
        }
    }
};

const oauthConfig = {
    FACEBOOK: {
        APP_ID: process.env.FB_APP_ID,
        APP_SECRET: process.env.FB_APP_SECRET,
        REDIRECT_URL: process.env.FB_REDIRECT_URL
    },
    GOOGLE: {
        APP_ID: process.env.G_ID,
        APP_SECRET: process.env.G_SECRET_KEY,
        REDIRECT_URL: process.env.FB_REDIRECT_URL
    }
};

const systemConfig = {
    facebookLink: process.env.FACEBOOK_LINK,
    systemName: process.env.SYSTEM_NAME,
    systemContactNumber: process.env.SYSTEM_CONTACT_NUMBER,
    systemEmail: process.env.SYSTEM_EMAIL || 'no-reply@yatribhet.com'
};

const emailConfig = {
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
    authUserName: process.env.MAIL_USER,
    authPassword: process.env.MAIL_PASSWORD
};

const tokenConfig = {
    expiryAccessToken: process.env.ACCESS_TOKEN_EXPIRY_IN_SECONDS || 4 * 60 * 60,
    expiryRefreshToken: process.env.REFRESH_TOKEN_EXPIRY_IN_SECONDS || 2 * 24 * 60 * 60,
    secretAccessToken: process.env.REFRESH_TOKEN_EXPIRY_IN_SECONDS,
    secretRefreshToken: process.env.REFRESH_TOKEN_EXPIRY_IN_SECONDS
};

const parserConfig = {
    csv: {
        separator: {
            separator: ","
        },
        deleteFile: true
    }
};

const uploadConfig = {
    csv: {
        allowedExtension: {
            extensions: [
                ".csv"
            ],
            message: 'Only .csv format allowed!', //from-server-message
            httpCode: 400 //from-server-message
        },
    },

    image: {
        allowedExtension: {
            extensions: [
                ".jpg",
                ".png",
                ".jpeg",
                ".gif"
            ],
            message: 'Only image file extensions allowed!', //from-server-message
            httpCode: 400 //from-server-message
        },
    }
};

export {
    swaggerConfig,
    systemConfig,
    parserConfig,
    uploadConfig,
    serverConfig,
    tokenConfig,
    oauthConfig,
    emailConfig,
    dbConfig
}
