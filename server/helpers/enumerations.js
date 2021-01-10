import {
    enums
} from './constants/database';

const enumerations = {
    UserStatus: [ enums.USER_STATUS.ACTIVE, enums.USER_STATUS.INACTIVE, enums.USER_STATUS.DISABLED ],
    BalanceType: [ enums.BALANCE_TYPE.CREDIT, enums.BALANCE_TYPE.DEBIT ],
    Device: [ enums.DEVICE.android, enums.DEVICE.ios, enums.DEVICE.web ],
    RegisteredFrom: [ enums.REGISTERING_DEVICES.APP, enums.REGISTERING_DEVICES.FACEBOOK, enums.REGISTERING_DEVICES.GOOGLE ],
    Gender: [ enums.GENDER.MALE, enums.GENDER.FEMALE, enums.GENDER.OTHER ],
    PageSlug: [ enums.PAGE_SLUG.TERMS_AND_CONDITION, enums.PAGE_SLUG.PRIVACY_POLICY ],
}

export {
    enumerations
};
