const consul = require('../middlewares/consul')

module.exports = {
    port: process.env.PORT || 5000,
    url: process.env.URL || "http://localhost",
    dbURI: consul.dbURI || process.env.MONGODB_CLOUD_URI || 'mongodb://localhost/ManageBlue',
    secret: process.env.JWT_SECRET || "local development secret"
};
