module.exports = {
    port: process.env.PORT || 3000,
    url: process.env.URL || "http://localhost",
    dbURI: process.env.MONGODB_CLOUD_URI || 'mongodb://localhost/ManageBlue',
    secret: process.env.JWT_SECRET || "local development secret"
};
