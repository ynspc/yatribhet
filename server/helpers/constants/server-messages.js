module.exports = {
    GENERAL: {
        SUCCESS: {
            httpCode: 200,
            message: 'Success'
        },
        BAD_REQUEST: {
            httpCode: 400,
            message: 'Not a valid request.'
        },
        ERROR: {
            httpCode: 500,
            message: 'Server error. Report this issue to the administrator.'
        },
        NOT_FOUND: {
            httpCode: 404,
            message: 'Page not found.'
        }
    },

    USER: {
        USER_NAME_EXISTS: {
            httpCode: 411,
            message: 'Sorry, It seems like your requested user name has already been taken. Please try another.'
        },

        PROFILE: {
            httpCode: 200,
            message: 'User profile is listed successfully.'
        },

        UNAVAILABLE: {
            httpCode: 404,
            message: 'Unable to find the user in our system.'
        }
    },

    REGISTER: {
        EMAIL_EXISTS: {
            httpCode: 402,
            message: 'Email already exists. Please sign in.'
        },

        TERMS_AND_CONDITION: {
            httpCode: 422,
            message: 'Please read and accept our terms and condition before you continue.'
        },

        PRIVACY_POLICY: {
            httpCode: 422,
            message: 'Please read and accept our privacy policy before you continue.'
        },
        
        SENT_FOR_VERIFICATION: {
            httpCode: 200,
            message: 'Email sent for verification. Please sign in after the successful verification.'
        },

        SUCCESS: {
            httpCode: 200,
            message: 'You have successfully registered.'
        },
    },

    LOGIN: {
        NOT_LOGGED_IN: {
            httpCode: 401,
            message: 'Access Forbidden. Please sign in.'
        },

        SUCCESS: {
            httpCode: 200,
            message: 'You have successfully logged in.'
        },

        INVALID_CREDENTIALS: {
            httpCode: 401,
            message: 'Credentials do not match our record. Please try again later.'
        },
    },

    LOGOUT: {

        SUCCESS: {
            httpCode: 200,
            message: 'You have successfully logged out.'
        },
    },

    PAGE: {
        SUCCESS: {
            httpCode: 200,
            message: 'Requested page is displayed successfully.'
        },
        CREATED: {
            httpCode: 200,
            message: 'New page is created successfully.'
        },
        UPDATED: {
            httpCode: 200,
            message: 'Page is updated successfully.'
        },
        DELETED: {
            httpCode: 200,
            message: 'Page is deleted successfully.'
        },
        NOT_FOUND: {
            httpCode: 404,
            message: 'Requested page is not available.'
        },
        BAD_REQUEST: {
            httpCode: 400,
            message: 'Not a valid request in page.'
        },
    },

    CSV: {
        TAGS: {
            SUCCESS: {
                httpCode: 200,
                message: 'Tags has been imported successfully.'
            },
            FAILURE: {
                httpCode: 400,
                message: 'Unable to import tags.'
            },
            BAD_REQUEST: {
                httpCode: 400,
                message: 'Not a valid request importing tag.'
            },
        },

        PLACES: {
            SUCCESS: {
                httpCode: 200,
                message: 'Places has been imported successfully.'
            },
            FAILURE: {
                httpCode: 400,
                message: 'Unable to import places.'
            },
            BAD_REQUEST: {
                httpCode: 400,
                message: 'Not a valid request importing place.'
            },
        }
    },

    PLACE: {
        IMAGE_UPLOAD: {
            SUCCESS: {
                httpCode: 200,
                message: 'Images for the place is uploaded successfully.'
            }
        },

        SUCCESS: {
            httpCode: 200,
            message: 'Places are listed successfully.'
        },
        NOT_FOUND: {
            httpCode: 404,
            message: 'Requested place is not available.'
        }
    },

    PROVIDER: {
        SUCCESS: {
            httpCode: 200,
            message: 'Provider detail is displayed successfully.'
        },
        CREATED: {
            httpCode: 200,
            message: 'Provider is created successfully.'
        },
        UPDATED: {
            httpCode: 200,
            message: 'Provider is updated successfully.'
        },
        DELETED: {
            httpCode: 200,
            message: 'Provider is deleted successfully.'
        },
        NOT_FOUND: {
            httpCode: 404,
            message: 'Requested provider is not available.'
        }
    }
};
