const APIError = require('@utils/APIError');

module.exports = {
   badRequest: opts => {
      const message = opts.message || 'bad_request';
      const errors = opts.data || [];
      throw new APIError({ status: 400, message, errors });
   },

   unAuthorized: opts => {
      const message = opts.message || 'unauthorized';
      const errors = opts.data || [];
      throw new APIError({ status: 401, message, errors });
   },

   notFound: opts => {
      const message = opts.message || 'not_found';
      const errors = opts.data || [];
      throw new APIError({ status: 404, message, errors });

   },

   serverError: opts => {
      const message = opts.message || 'server_error';
      const errors = opts.data || [];
      throw new APIError({ status: 500, message, errors });
   },

   success: (res, opts = {}) => {
      const message = opts.message || 'success';
      const data = opts.data || [];
      return res.send({ status: 200, message, data });
   },

   forbidden: opts => {
      const message = opts.message || 'forbidden';
      const errors = opts.data || [];
      throw new APIError({ status: 403, message, errors });
   },

   conflict: opts => {
      const message = opts.message || 'confilct';
      const errors = opts.data || [];
      throw new APIError({ status: 409, message, errors });
   },

}
