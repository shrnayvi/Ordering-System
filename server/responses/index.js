module.exports = {
    success: (res, opts = {}) => {
        const message = opts.message || 'Success';
        const data = opts.data || {};
        return res.send({ status: 200, message, data });
    },

    badRequest: (res, opts = {}) => {
        const message = opts.message || 'Bad Request';
        const data = opts.data || {};
        return res.send({ status: 400, message, error: data });
    },

    serverError: (res, opts = {}) => {
        const message = opts.message || 'Server Error';
        const data = opts.data || {};
        return res.send({ status: 500, message, error: data });
    },

}
