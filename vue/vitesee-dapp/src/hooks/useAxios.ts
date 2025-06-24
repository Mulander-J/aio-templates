import { service } from "~/plugins/axios"

import { AxiosPromise } from 'axios'


export const useAxios = () => {
    const request = <T>(option: any): AxiosPromise<T> => {
        const { url, method, params, data, headersType, responseType } = option
        return service({
            url: url,
            method,
            params,
            data,
            responseType: responseType,
            headers: {
                // application/x-www-form-urlencoded multipart/form-data
                'Content-Type': headersType || 'application/json'
            }
        })
    }

    return {
        request
    }
}
