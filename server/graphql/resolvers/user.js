const { 
    get, 
    create,
    update,
} = require('@services/user');

module.exports = {
    Query: {
        users: async () => {
            const users = await get({}, false)
                .populate('avatar');
            return users;
        },

        user: async (root, { _id }, context, info) => {
            const users = await get({ _id })
                .populate('avatar');
            return users;
        }
    },

    Mutation: {
        register: async (root, args, context, info) => {
            try {
                return await create(args);
            } catch(e) {
                throw(e.message);
            }
        },

        update: async (root, args, context, info) => {
            try {
                const { _id } = args;
                delete args._id;
                return await update({ _id }, args);
            } catch(e) {
                throw(e.message);
            }
        }
    }
}