const mongoose = require('mongoose');

let simulationActive = false

exports.health = (req, res) => {

    let status = 200
    let mongoStatus = 200
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

    return res.status(status).json({
        outcome: status === 200 ? 'UP' : 'DOWN',
        checks: [
            {
                name: 'MongoDB connection',
                outcome: mongoStatus === 200 ? 'UP' : 'DOWN',
                status: mongoStatus,
                reason: mongoStatus === 200 ? '' : 'Not connected'
            },
            {
                name: 'Simulation',
                outcome: simulationStatus === 200 ? 'UP' : 'DOWN',
                status: simulationStatus,
                reason: simulationStatus === 200 ? '' : 'Simulating health problem'
            }
        ]
    });
}

exports.simulate = (req, res) => {
    
    simulationActive = req.body.simulate || false

    return res.status(200).send()
}