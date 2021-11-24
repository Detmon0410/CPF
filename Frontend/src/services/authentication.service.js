import httpClient from "./httpClient.service";
import { server } from "./constants.service";

export function requestOTP(data) {
    const Axiosmodel = server.REQUEST_OTP;
    return new Promise((resolve, reject) => {
        httpClient({
            method: "POST",
            url: Axiosmodel.url,
            config: Axiosmodel,
            data: data,
        })
        .then((res) => {
            resolve(res);
        })
        .catch((err) => {
            reject(err);
        });
    });
}

export function signInAPI(data) {
    const Axiosmodel = server.SIGN_IN;
    return new Promise((resolve, reject) => {
        httpClient({
            method: "POST",
            url: Axiosmodel.url,
            config: Axiosmodel,
            data: data,
            withCredentials: true,
        })
        .then((res) => {
            resolve(res);
        })
        .catch((err) => {
            reject(err);
        });
    });
}

export function uploadFile(data) {
    const Axiosmodel = server.SIGN_IN;
    return new Promise((resolve, reject) => {
        httpClient({
            method: "POST",
            url: Axiosmodel.url,
            config: Axiosmodel,
            data: data,
            withCredentials: true,
        })
        .then((res) => {
            resolve(res);
        })
        .catch((err) => {
            reject(err);
        });
    });
}