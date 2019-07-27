import axios from 'axios';
import authHeader from '../helpers/authHeader';
const baseURL = 'http://localhost:8000';

const instance = axios.create({
  baseURL,
  responseType: 'json',
});


/**
 * Get Request
 * @param {String} url Server URL
 * @param {Object} headers Headers to send
 * @param {Object} params Query parameters
 * @param {Boolean} setToken Whether to send the token or not
 */
export const get = (url, setToken = true, headers = {}, params = {}) => {
  let config = {
    url,
    method: 'get',
  };

  if (setToken) {
    const { token } = authHeader();
    headers = {
      ...headers,
      Authorization: `Bearer ${token}`,
    }
  }

  if (Object.keys(headers).length) {
    config['headers'] = headers;
  }

  if (Object.keys(params).length) {
    config['params'] = params;
  }

  return instance(config);
}


/**
 * Post Request
 * @param {String} url Server URL
 * @param {Object} data Post data
 * @param {Object} headers Headers to send
 * @param {Boolean} setToken Whether to send the token or not
 */
export const post = (url, data, setToken = true, headers = {}) => {
  let config = {
    url,
    method: 'post',
    data,
  };

  if (setToken) {
    const { token } = authHeader();
    headers = {
      ...headers,
      Authorization: `Bearer ${token}`,
    }
  }

  if (Object.keys(headers).length) {
    config['headers'] = headers;
  }

  return instance(config);
}


/**
 * Put Request
 * @param {String} url Server URL
 * @param {Object} data Post data
 * @param {Object} headers Headers to send
 * @param {Boolean} setToken Whether to send the token or not
 */
export const put = (url, data, setToken = true, headers = {}) => {
  let config = {
    url,
    method: 'put',
    data,
  };

  if (setToken) {
    const { token } = authHeader();
    headers = {
      ...headers,
      Authorization: `Bearer ${token}`,
    }
  }

  if (Object.keys(headers).length) {
    config['headers'] = headers;
  }

  return instance(config);
}


/**
 * Put Request
 * @param {String} url Server URL
 * @param {Object} data Post data
 * @param {Object} headers Headers to send
 * @param {Boolean} setToken Whether to send the token or not
 */
export const remove = (url, setToken = true, data = {}, headers = {}) => {
  let config = {
    url,
    method: 'delete',
    data,
  };

  if (setToken) {
    const { token } = authHeader();
    headers = {
      ...headers,
      Authorization: `Bearer ${token}`,
    }
  }

  if (Object.keys(headers).length) {
    config['headers'] = headers;
  }

  if (Object.keys(data).length) {
    config['data'] = data;
  }

  return instance(config);
}
