import { serverConfig } from '../../config/index';
const enums = {
    USER_STATUS: {
        INACTIVE: 0,
        ACTIVE: 1,
        DISABLED: 2,
    },
    USER_ROLES: {
        ADMIN: 1,
        SHOPKEEPER: 2,
        WAITER: 3
    },
    BALANCE_TYPE: {
        CREDIT: 'credit',
        DEBIT: 'debit'
    },
    DEVICE: {
        android: 1,
        ios: 2,
        web: 3
    },
    REGISTERING_DEVICES: {
        FACEBOOK: 'facebook',
        GOOGLE: 'google',
        APP: 'normal'
    },
    PARTIAL_ROUTE_FOR_URL_GENERATION: {
        EMAIL_VERIFICATION: `${serverConfig.URL}/vi/api/user/verify-email`
    },
    GENDER: {
        MALE: 'male',
        FEMALE: 'female',
        OTHER: 'other',
    },
    PAGE_SLUG: {
        PRIVACY_POLICY: "privacy-policy",
        TERMS_AND_CONDITION: "terms-and-conditions"
    },
    UPLOAD_IMAGE_TYPE: {
        DISPLAY_IMAGE: 1,
        IMAGES: 2
    }
};

const system = {
    LOGGER: {
        DAILY: 'daily',
        SINGLE: 'single'
    }
}

export {
    enums,
    system
};
