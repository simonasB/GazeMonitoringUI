let config = {};

config.web = {};
config.web.port = process.env.WEB_PORT || 3000;
config.postgresql = process.env.POSTGRESQL;
console.log(process.env);

module.exports = config;