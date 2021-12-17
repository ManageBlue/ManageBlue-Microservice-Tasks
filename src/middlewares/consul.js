const consul = require('consul')({host:"34.159.202.70", port:80, promisify: true});

let watchDB = consul.watch({
    method: consul.kv.get,
    options: { key: 'MONGODB_CLOUD_URI' },
    backoffFactor: 1000,
});
let dbURI

watchDB.on('change', function(data, res) {
    try {
        dbURI = data.Value
        console.log(dbURI)
    }
    catch (e){
        console.log(e)
    }
});

watchDB.on('error', function(err) {
    console.log('error:', err);
});

//setTimeout(function() { watch.end(); }, 30 * 1000);
module.exports = {
    dbURI: dbURI
}
