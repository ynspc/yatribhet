import { getRoute } from '../../utilities/apis/Apis';

export const AUTH_ROUTES = {
    LOGIN: getRoute("auth", "login"),
    REGISTER: getRoute("auth", "register"),
    FORGOT_PASSWORD: getRoute("auth", "forgot-password"),
    EMAIL_VERIFY: getRoute("auth", "verify-email"),
    LOGOUT: getRoute("auth", "logout"),
    RESEND_VERIFICATION_EMAIL: getRoute("auth", "resend-email-verification"),
    PAGE: getRoute("page", ""),
    CHANGE_PASSWORD : getRoute("auth", "change-password") //private route
};

export const PROFILE_ROUTES = {
    PREFIX: '/edit-profile',
    DETAIL: '/edit-profile/detail',
    AVAILABILITY: '/edit-profile/availability'
};

export const MY_PROFILE_ROUTES = {
    PREFIX: '/my-profile',
    PROJECTS: '/my-profile/my-projects',
};

export const CSV_ROUTES = {
    PLACES: '/csv/import-places',
    TAGS: '/csv/import-tags',
};

export const IMAGE_UPLOAD_ROUTES = {
    UPLOAD: '/place/upload-images'
};