// setup Prometheus metrics collection
const Prometheus = require('prom-client');
const register = new Prometheus.Registry();
Prometheus.collectDefaultMetrics({register});

exports.return = async (req, res) => {

    // return Prometheus metrics
    res.setHeader('Content-Type', register.contentType);
    res.send(await register.metrics());
}