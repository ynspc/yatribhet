import {
    TOP_DESTI,
    GET_DESTI_FAIL
} from '../actions/type'
import { returnErrors } from './ErrorAction'
import { AUTH_ROUTES } from '../../constants/urls';
import AxiosHandler from "../../apis/AxiosHandler";
import axios from 'axios'


const apiCall = new AxiosHandler();

export const getDestiPlaces = (page) => async dispatch => {
    console.log(page);
    const response = await apiCall.get(`/place/my-places?page=${page}`)
    console.log(response.status);
    console.log(response.data);
    if ( response.status === 200 ) {
        dispatch({
            type:TOP_DESTI,
            payload:response.data
        })
    }
    else{
        dispatch(returnErrors(response))
        dispatch({
            type: 'GET_DESTI_FAIL',
        })
    }
}
