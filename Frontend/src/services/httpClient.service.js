import axios from "axios";
import { BACKEND_URL, NOT_CONNECT_NETWORK, NETWORK_CONNECTION_MESSAGE } from './constants.service';
import join from "url-join";

const isAbsoluteURLRegex = /^(?:\w+:)\/\//;

axios.interceptors.request.use( request => {
    let Config = request.config

    if (!isAbsoluteURLRegex.test(request.url)) {
        if (Config.param !== null) request.url = join(BACKEND_URL, request.url, Config.param)
        else request.url = join(BACKEND_URL, request.url)
    }

    return request
})

axios.interceptors.response.use(
    response => {
        return response
    },
    error => {
        if (axios.isCancel(error)) {
            return Promise.reject(error);
        } else if (!error.response) {
            return Promise.reject({
                code: NOT_CONNECT_NETWORK,
                message: NETWORK_CONNECTION_MESSAGE,
            });
        }

        return Promise.reject(error)
    }
)

export default axios;