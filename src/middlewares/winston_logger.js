const winston = require('winston');
const WinstonLogStash = require('winston3-logstash-transport');

const logConfiguration = {
    'transports': [
        new winston.transports.Console(),
        /*new winston.transports.Http({
            host: "b3935fa5-8747-4ea5-8e14-086132e5aa66-ls.logit.io",
            port: "30201",
        })*/
    ],
    format: winston.format.combine(
        winston.format.timestamp({
            format: 'YYYY-MM-DD HH:mm:ss',
        }),
        winston.format.printf((info) => {
            let logData = {...info};
            if (info.error instanceof Error) {
                logData.error = {
                    message: info.error.message,
                    stack: info.error.stack,
                };
            }
            return JSON.stringify(logData, null, 2);
        }),
    ),
    exitOnError: false,
};


const logger = winston.createLogger(logConfiguration);
logger.add(new WinstonLogStash({
    mode: 'udp',
    host: '554c0f1a-d975-405d-bb0b-646c1c29cc22-ls.logit.io',
    port: 30203
}))

module.exports = logger
