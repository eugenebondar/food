import {param} from 'node-qs-serialization';
import customFetch from './customFetch';

import Cookies from 'browser-cookies';

const Api = {
    /**
     * @param {string} url
     * @param {Object} params?
     * @return {Promise.<{}>}
     */
    get(url, params = {}) {
        const urlWithParams = params ? `${url}?${param(params)}` : url;
        return customFetch(urlWithParams, {});
    },
    /**
     * @param {string} url
     * @param {Object} params?
     * @return {Promise.<Response>}
     */
    getFull(url, params = {}) {
        const urlWithParams = params ? `${url}?${param(params)}` : url;
        return customFetch(urlWithParams, {}, {isResponseJson: false});
    },
    /**
     * @param {string} url
     * @param {Object} json
     * @return {Promise.<{}>}
     */
    post(url, json) {
        const requestOptions = getJsonRequestOptions({json});
        return customFetch(url, requestOptions, {isResponseJson: false});
    },
    /**
     * @param {string} url
     * @param {Object} json
     * @return {Promise.<{}>}
     */
    login(url, json) {
        const requestOptions = getJsonRequestOptions({json});
        return customFetch(url, requestOptions, {isHandlingUnauthorized: false});
    },
    /**
     * @param {string} url
     * @param {{}} json
     * @return {Promise.<Response>}
     */
    putWithoutCheck(url, json) {
        const requestOptions = getJsonRequestOptions({json, method: 'PUT'});
        return customFetch(url, requestOptions, {isResponseJson: false, isHandlingUnauthorized: false});
    },
    /**
     * @param {string} url
     * @param {*} data
     * @return {Promise.<Response>}
     */
    sendFile(url, data) {
        const requestOptions = getRequestOptions({body: data});
        return customFetch(url, requestOptions, {isResponseJson: false});
    },
    /**
     * @param {string} url
     * @param {{}} data
     * @return {Promise.<Response>}
     */
    sendMultipart(url, data) {
        const formData = dataMapToFormData(data);
        const requestOptions = getRequestOptions({body: formData});
        return customFetch(url, requestOptions, {isResponseJson: false});
    },
    /**
     * @param {string} url
     * @param {{}} data
     * @return {Promise.<Response>}
     */
    updateMultipart(url, data) {
        const formData = dataMapToFormData(data);
        const requestOptions = getRequestOptions({body: formData, method: 'PUT'});
        return customFetch(url, requestOptions, {isResponseJson: false});
    },
    /**
     * @param {string} url
     * @param {{}} data
     * @return {Promise.<Response>}
     */
    updateForm(url, data) {
        const requestOptions = getRequestOptions({body: data, method: 'PUT'});
        return customFetch(url, requestOptions, {isResponseJson: false});
    },
    /**
     * @param {string} url
     * @param {{}} json
     * @return {Promise.<Response>}
     */
    put(url, json) {
        const requestOptions = getJsonRequestOptions({json, method: 'PUT'});
        return customFetch(url, requestOptions, {isResponseJson: false});
    },
    /**
     * @param {string} url
     * @param {{}} json
     * @return {Promise.<Response>}
     */
    delete(url, json) {
        const requestOptions = getJsonRequestOptions({json, method: 'DELETE'});
        return customFetch(url, requestOptions, {isResponseJson: false});
    }
};

/**
 * @param {*|string} body
 * @param {string} method
 * @param {{}} headers
 * @return {{method: string, body: *, headers: *}}
 */
function getRequestOptions({body, method = 'POST', headers = {}}) {
    return {
        method: method,
        body: body,
        headers: Object.assign(headers, {
            'X-CSRF-TOKEN': getToken()
        })
    };
}

/**
 * @param {{}} json
 * @param {string} method
 * @return {{method: string, body: *, headers: *}}
 */
function getJsonRequestOptions({json, method = 'POST'}) {
    return getRequestOptions({
        body: JSON.stringify(json),
        method: method,
        headers: {
            'Content-type': 'application/json'
        }
    });
}

/**
 * Converts data map to FormData instance
 * @param {{}} data
 * @return {FormData|{}} FormData or empty object
 */
function dataMapToFormData(data) {
    const formData = new FormData();
    let isDataEmpty = true;

    Object.keys(data).forEach((key) => {
        const value = data[key];
        if (value) {
            isDataEmpty = false;
            formData.append(key, data[key]);
        }
    });

    return isDataEmpty ? {} : formData;
}

function getToken() {
    const token = Cookies.get('XSRF-TOKEN');
    return token ? token : '';
}

export default Api;

