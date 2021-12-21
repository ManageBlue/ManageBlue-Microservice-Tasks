const winston = require('winston');

const logConfiguration = {
    'transports': [
        new winston.transports.Console()
    ],
    format: winston.format.combine(
        winston.format.timestamp({
            format: 'YYYY-MM-DD HH:mm:ss',
        }),
        winston.format.printf((info) => {
            let logData = { ...info };
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

module.exports = logger