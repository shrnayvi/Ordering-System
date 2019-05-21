module.exports = {
    SECRET_KEY: 'secret5kd9hfdnv9835sfj',
    JWT_EXPIRATION: Math.floor(Date.now() / 1000) + 60 * 60 * 24,
    SOCIAL_LOGIN: ['google', 'local'],
    ROLES: ['admin', 'customer'],
    UPLOAD_PATH: `${__dirname}/../uploads/`,
}