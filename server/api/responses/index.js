module.exports = {
   badRequest: (res, opts = {}) => {
      const message = opts.message || 'bad_request';
      const data = opts.data || {};
      return res.send({ status: 400, message, error: data });
   },

   invalidToken: (res, opts = {}) => {
      const message = opts.message || 'token_invalid';
      const data = opts.data || {};
      return res.send({ status: 401, message, error: data });
   },

   notFound: (res, opts = {}) => {
      const message = opts.message || 'not_found';
      const data = opts.data || {};
      return res.send({ status: 404, message, error: data });

   },

   serverError: (res, opts = {}) => {
      const message = opts.message || 'server_error';
      const data = opts.data || {};
      return res.send({ status: 500, message, error: data });
   },

   success: (res, opts = {}) => {
      const message = opts.message || 'success';
      const data = opts.data || {};
      return res.send({ status: 200, message, data });
   },

   unauthorized: (res, opts = {}) => {
      const message = opts.message || 'unauthorized';
      const data = opts.data || {};
      return res.send({ status: 403, message, error: data });
   },

   conflict: (res, opts = {}) => {
      const message = opts.message || 'confilct';
      const data = opts.data || {};
      return res.send({ status: 409, message, error: data });
   },

}
