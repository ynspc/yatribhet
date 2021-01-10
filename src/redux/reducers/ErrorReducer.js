import {
    GET_ERRORS,
    CLEAR_ERRORS
} from '../actions/type'

const initialState = {
    message: "",
    code: 0
}

export default function(state = initialState, action) {
    switch(action.type){

        case GET_ERRORS:
            return {
                ...state,
                message: action.payload.message,
                code: action.payload.code
            };

        case CLEAR_ERRORS:
            return initialState;

        default:
            return state
    }
}