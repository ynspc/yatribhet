import {
    GET_ERRORS,
    CLEAR_ERRORS
} from './type'

export const returnErrors = payload => dispatch => {
    dispatch({
        type: GET_ERRORS,
        payload: {
            message: payload.message,
            code: payload.status
        }
    })
}

export const clearErrors = () => dispatch => {
    dispatch({
        type: CLEAR_ERRORS,
    })
}
