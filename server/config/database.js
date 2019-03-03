const processConfig = process.env;
let mongodb = {
    host: processConfig.HOST || '127.0.0.1',
    port: processConfig.PORT || 27017,
    database: processConfig.DATABASE || 'momo',
    user: processConfig.DB_USER || 'user',
    password: processConfig.DB_PASSWORD || 'password',
    url(){
        return `mongodb://${this.host}:${this.port}/${this.database}`;
    }
};

module.exports = mongodb;