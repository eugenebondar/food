import SessionUserActions from 'Stores/SessionUser/SessionUserActions';

/**
 * @param {string} url
 * @param {Object} requestOptions
 * @param {{isJson?: boolean, isHandlingUnauthorized?: boolean}} options
 * @return {Promise.<Response|{}>}
 */
function customFetch(url, requestOptions = {}, options = {isResponseJson: true, isHandlingUnauthorized: true}) {
    const {isResponseJson, isHandlingUnauthorized} = options;
    const optionsWithCustoms = Object.assign({}, commonRequestOptions, requestOptions);

    const responseMiddlewares = [
        isHandlingUnauthorized && handleUnauthorized,
        ...customMiddlewares,
        isResponseJson && (response => response.json())
    ];

    const fetchResult = fetch(url, optionsWithCustoms);

    return responseMiddlewares.reduce((currentResponse, currentMiddleware) => {
        if (currentMiddleware instanceof Function) {
            return currentResponse.then(currentMiddleware);
        }
        return currentResponse;
    }, fetchResult);
}

/**
 @name Response~json
 @function
 @return {Promise.<{}>}
 **/

/**
 * @param {Response} [response]
 * @return {Promise.<Response, string>}
 */
function handleUnauthorized(response) {
    if (response.status === 401 && isResponseJson(response)) {
        return response.json().then(json => {
            SessionUserActions.setUnauthorized(json.error);
            return Promise.reject(json.error);
        });
    }
    if (response.status === 401) {
        SessionUserActions.setUnauthorized('unknown');
        return Promise.reject('unknown');
    }
    return Promise.resolve(response);
}

function isResponseJson(response) {
    return response.headers.get('Content-Type').includes('application/json');
}

const commonRequestOptions = {
    credentials: 'same-origin'
};

export default customFetch;

/**
 * @callback registerResponseMiddleware~middleware
 * @param {Response} [middleware]
 * @return {Promise.<Response, string>}
 */

/**
 * @type {registerResponseMiddleware~middleware[]}
 */
const customMiddlewares = [];

/**
 * @param {registerResponseMiddleware~middleware} middleware
 */
export function registerResponseMiddleware(middleware) {
    customMiddlewares.push(middleware);
}
