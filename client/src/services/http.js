import axios from 'axios';
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
 */
export const get = (url, headers = {}, params = {}) => {
   let config = {
      url,
      method: 'get',
   };

   if(Object.keys(headers).length) {
      config['headers'] = headers;
   }

   if(Object.keys(params).length) {
      config['params'] = params;
   }

   return instance(config);
}


/**
 * Post Request
 * @param {String} url Server URL
 * @param {Object} data Post data
 * @param {Object} headers Headers to send
 */
export const post = (url, data, headers = {}) => {
   let config = {
      url,
      method: 'post',
      data,
   };

   if(Object.keys(headers).length) {
      config['headers'] = headers;
   }

   return instance(config);
}


/**
 * Put Request
 * @param {String} url Server URL
 * @param {Object} data Post data
 * @param {Object} headers Headers to send
 */
export const put = (url, data, headers = {}) => {
   let config = {
      url,
      method: 'put',
      data,
   };

   if(Object.keys(headers).length) {
      config['headers'] = headers;
   }

   return instance(config);
}


/**
 * Put Request
 * @param {String} url Server URL
 * @param {Object} data Post data
 * @param {Object} headers Headers to send
 */
export const remove = (url, data = {}, headers = {}) => {
   let config = {
      url,
      method: 'put',
      data,
   };

   if(Object.keys(headers).length) {
      config['headers'] = headers;
   }

   if(Object.keys(data).length) {
      config['data'] = data;
   }

   return instance(config);
}
