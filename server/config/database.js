const processConfig = process.env;
let mongodb = {
    host: processConfig.DB_HOST || '127.0.0.1',
    port: processConfig.DB_PORT || 27017,
    database: processConfig.DB_NAME || 'momo',
    user: processConfig.DB_USER || 'user',
    password: processConfig.DB_PASSWORD || 'password',
    url(){
        return `mongodb://${this.host}:${this.port}/${this.database}`;
    }
};

module.exports = mongodb;