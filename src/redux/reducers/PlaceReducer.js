import {
    TOP_DESTI,
    GET_DESTI_FAIL,
    CLEAR_DESTI
} from '../actions/type'

const initialState = {
    topDestiLists: '',
    reload:true
}

export default function (state = initialState, action) {
    switch(action.type){
        case TOP_DESTI:
            return{
                ...state,
                topDestiLists:[...state.topDestiLists, ...action.payload],
                reload:false
            }
        case GET_DESTI_FAIL:
            return{
                ...state,
            }
        case CLEAR_DESTI:
         return{
             ...state,
             topDestiLists: '',
             reload:true
         }
        default:
        return state
    }
} 