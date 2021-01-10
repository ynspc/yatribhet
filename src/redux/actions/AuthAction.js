import {
    USER_LOADING,
    USER_LOADED,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT_SUCCESS,
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    CLEAR_DESTI
} from '../actions/type'
import { returnErrors } from './ErrorAction'
import { AUTH_ROUTES } from '../../constants/urls';
import AxiosHandler from "../../apis/AxiosHandler";

const apiCall = new AxiosHandler();

export const register = registerPayload => async dispatch => {
    console.log(registerPayload);
    const response = await apiCall.post('/auth/register', registerPayload);
    if ( response.status === 200 ) {
        dispatch({
            type: REGISTER_SUCCESS,
            payload: response.data
        })
    }
    else{
        dispatch(returnErrors(response))
        dispatch({
            type: 'REGISTER_FAIL',
        })
    }
}

export const login = loginPayload => async dispatch => {
    const response = await apiCall.post(AUTH_ROUTES.LOGIN, loginPayload);

    if ( response.status === 200 ) {
        dispatch({
            type: LOGIN_SUCCESS,
            payload: response.data
        })
    }
    else{
        dispatch(returnErrors(response))
        dispatch({
            type: 'LOGIN_FAIL',
        })
    }
}

export const logout = () => async dispatch => {
    dispatch({
        type: LOGOUT_SUCCESS
    })
    dispatch({
        type: CLEAR_DESTI
    })
}


