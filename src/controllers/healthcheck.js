const mongoose = require('mongoose');
const axios = require("axios");

let simulationActive = false

exports.health = (req, res) => {

    let status = 200
    let mongoStatus = 200
    let consulStatus = 200
    let simulationStatus = 200

    // readyState == 1 means mongo connected
    if(mongoose.connection.readyState !== 1){
        mongoStatus = 503
        status = 503
    }

    //test for simulation
    if(simulationActive){
        simulationStatus = 503
        status = 503
    }

    // Ping consul if working
    axios.get('http://34.159.202.70/v1/kv/lan' )
        .catch(() => {

            consulStatus = 503
            status = 503

        }).finally(() => {

        return res.status(status).json({
            outcome: status === 200 ? 'UP' : 'DOWN',
            checks: [
                {
                    name: 'MongoDB connection',
                    outcome: mongoStatus === 200 ? 'UP' : 'DOWN',
                    reason: mongoStatus === 200 ? '' : 'Not connected'
                },
                {
                    name: 'Consul connection',
                    outcome: consulStatus === 200 ? 'UP' : 'DOWN',
                    reason: consulStatus === 200 ? '' : 'Not connected'
                },
                {
                    name: 'Simulation',
                    outcome: simulationStatus === 200 ? 'UP' : 'DOWN',
                    reason: simulationStatus === 200 ? '' : 'Simulating health problem'
                }
            ]
        });
    })




}

exports.simulate = (req, res) => {
    
    simulationActive = req.body.simulate || false

    return res.status(200).send()
}