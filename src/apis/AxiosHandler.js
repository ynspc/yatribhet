import Axios from "axios";
import {SYSTEM_CONFIG} from '../configurations';
import {urlHandler} from "../utilities/apis/Apis";

/*const commonResponse = {
    status: 200,
    message: "",
    data: {}
}*/



export default class AxiosHandler {
    
    constructor() {
        this.api = Axios.create({
            baseURL: SYSTEM_CONFIG.SERVER_URL,
            timeout: 2 * 60 * 1000,//second
        });

        this.api.interceptors.request.use(
            config => {
                const token = localStorage.getItem('accessToken')
                config.headers.Authorization = token;
                return config;
            },
            error => Promise.reject(error)
        )
    }


    post = async (url, payload) => {
        try {
            url = typeof url === 'string' ? url : urlHandler(url);
            let response = await this.api.post(url, payload);

            return {
                status: response.status,
                message: response.data.message,
                data: response.data.data
            }
        } catch (error) {
            return AxiosHandler.exceptionHandler(error);
        }
    }

    get = async (url, filterPayload) => {
        try {
            url = typeof url === 'string' ? url : urlHandler(url);
            let response = await this.api.get(url, filterPayload);

            return {
                status: response.status,
                message: response.data.message,
                data: response.data.data
            }
        } catch (error) {
            return AxiosHandler.exceptionHandler(error);
        }
    }

    patch = async (url, payload) => {
        try {
            url = typeof url === 'string' ? url : urlHandler(url);
            let response = await this.api.patch(url, payload);

            return {
                status: response.status,
                message: response.data.message,
                data: response.data.data
            }
        } catch (error) {
            return AxiosHandler.exceptionHandler(error);
        }
    }

    delete = async (url, payload) => {
        try {
            url = typeof url === 'string' ? url : urlHandler(url);
            let response = await this.api.patch(url, payload);

            return {
                status: response.status,
                message: response.data.message,
                data: response.data.data
            }
        } catch (error) {
            return AxiosHandler.exceptionHandler(error);
        }
    }

    static exceptionHandler = (e) => {
        let responseContent = {};
        if (e.response) {
            responseContent = {
                status: e.response.status,
                message: e.response.data.message,
                data: e.response.data.data
            }
        }
        else if (e.request) {
            responseContent = {
                status: 503,
                message: "Service Unavailable",
                data: ""
            }
        }
        else {
            responseContent = {
                status: 500,
                message: e.message,
                data: ""
            }
        }

        return responseContent;
    }
}

// // Setup config.Header token
// export const tokenConfig = getState => {
//     //Get token from localStorage
//     const token = getState().authentication.accessToken;
//     console.log(token);

//     //If token then add to header
//     if (token) {
//         //applying token
//         this.api.defaults.headers.common['Authorization'] = token;
//         } else {
//         //deleting the token from header
//         delete this.api.defaults.headers.common['Authorization'];
//         }
// }
