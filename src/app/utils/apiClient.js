import request from 'request-promise';


const API_URL = process.env.API_URL;


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

  get(uri, options) {
    return requestCreator({
      uri,
      method: 'GET',
      transform: this.transform,
      ...options,
    });
  }

  post(uri, options) {
    return requestCreator({
      uri,
      method: 'POST',
      transform: this.transform,
      ...options,
    });
  }

  patch(uri, options) {
    return requestCreator({
      uri,
      method: 'PATCH',
      transform: this.transform,
      ...options,
    });
  }

  put(uri, options) {
    return requestCreator({
      uri,
      method: 'PUT',
      transform: this.transform,
      ...options,
    });
  }

  delete(uri, options) {
    return requestCreator({
      uri,
      method: 'DELETE',
      transform: this.transform,
      ...options,
    });
  }
}


export default APIClient;
