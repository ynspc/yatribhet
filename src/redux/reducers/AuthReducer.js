import {
    USER_LOADING,
    USER_LOADED,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT_SUCCESS,
    REGISTER_SUCCESS,
    REGISTER_FAIL
} from '../actions/type'

const initialState = {
    accessToken: localStorage.getItem('accessToken'),
    refreshToken: localStorage.getItem('refreshToken'),
    isAuthenticated: false,
    isLoading: false,
    user: {
        firstName:'sa'
    }
}

export default function (state = initialState, action) {
    switch (action.type) {

        case USER_LOADING:
            return {
                ...state,
                isLoading: true
            };

        case USER_LOADED:
            return {
                ...state,
                isAuthenticated: true,
                isLoading: false,
                user: action.payload
            };

        case LOGIN_SUCCESS:
            localStorage.setItem('accessToken', action.payload.tokenData.accessToken)
            localStorage.setItem('refreshToken', action.payload.tokenData.refreshToken)
            return {
                ...state,
                accessToken: action.payload.tokenData.accessToken,
                refreshToken: action.payload.tokenData.refreshToken,
                user:action.payload.userProfile,
                isAuthenticated: true,
                isLoading: false,
            };

        case AUTH_ERROR:
        case LOGIN_FAIL:
        case LOGOUT_SUCCESS:
        case REGISTER_FAIL:
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
            return {
                ...state,
                token: null,
                isAuthenticated: false,
                isLoading: false,
                // user: null
            };

        default:
            return state;

    }
}