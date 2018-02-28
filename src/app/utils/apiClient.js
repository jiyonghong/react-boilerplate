import request from 'request-promise';


const API_URL = process.env.API_URL;
console.log(API_URL);


const requestCreator = (defaultOptions) => (additionalOptions = {}) => {
  const options = Object.assign(defaultOptions, additionalOptions);

  const {
    uri: optionUri,
  } = options;

  // is uri a path or has API_URL
  const uri = /^https?:\/\//.test(optionUri)
    ? optionUri : API_URL ? `${API_URL}${optionUri}` : optionUri;

  return request({
    ...options,    
    uri,
  });
}



class APIClient {
  constructor(transform = null) {
    this.transform = transform || (body => body);
  }

  _getRequestCreatorOrPromise(uri, method, options) {
    const rc = requestCreator({
      uri,
      method,
      transform: this.transform,
      ...options,
    });

    return options.promise ? rc() : rc;
  }

  get(uri, options) {
    return this._getRequestCreatorOrPromise(uri, 'GET', options);
  }

  post(uri, options) {
    return this._getRequestCreatorOrPromise(uri, 'POST', options);

  }

  patch(uri, options) {
    return this._getRequestCreatorOrPromise(uri, 'PATCH', options);

  }

  put(uri, options) {
    return this._getRequestCreatorOrPromise(uri, 'PUT', options);

  }

  delete(uri, options) {
    return this._getRequestCreatorOrPromise(uri, 'DELETE', options);

  }
}


export default APIClient;
