const consul = require('consul')({host:"34.159.202.70", port:80, promisify: true});
const mongoose = require('mongoose');
const logger = require('./winston_logger')


let watchDB = consul.watch({
    method: consul.kv.get,
    options: { key: 'MONGODB_CLOUD_URI' },
    backoffFactor: 1000,
});
let dbURI

watchDB.on('change', function(data, res) {
    try {
        dbURI = data.Value.replace(/['"]+/g, '')

        logger.info(`dbURI changed to ${dbURI} on consul`)

        mongoose.disconnect().then(() => {
            mongoose.connect(dbURI, {
                useNewUrlParser: true,
                // TODO: check
                // useCreateIndex: true,
                // useUnifiedTopology: true,
                // useFindAndModify: false,
            }).catch((err) => {
                logger.error(`dbURI change on consul error - ${err}`)
            });
        })

    }
    catch (e){
        logger.error(`dbURI change on consul error - ${e}`)
    }
});

watchDB.on('error', function(err) {
    console.log('error:', err);
});

//setTimeout(function() { watch.end(); }, 30 * 1000);
module.exports = {
    dbURI: dbURI
}
