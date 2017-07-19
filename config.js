
var config = {};

config.port = process.env.PORT || 3000;
config.sessionPassword = process.env.SESSION_PASSWORD || 'local key';
config.connectionString = process.env.MONGO_CONN_URI || 'mongodb://127.0.0.1:27017/eval_interface';

module.exports = config;
