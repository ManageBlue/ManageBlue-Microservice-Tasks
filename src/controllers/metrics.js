// setup Prometheus metrics collection
const Prometheus = require('prom-client');
const register = new Prometheus.Registry();
Prometheus.collectDefaultMetrics({register});

exports.return = async (req, res) => {

    //console.log(register.contentType)
    //text/plain; version=0.0.4; charset=utf-8

    // return Prometheus metrics
    res.setHeader('Content-Type', register.contentType);
    res.send(await register.metrics());
}