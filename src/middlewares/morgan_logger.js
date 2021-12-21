// morgan logging

const morgan = require('morgan')
const logger = require('./winston_logger')

logger.stream = {
    write: function(message, encoding){

        // parse status out of morgan message
        let status = (message.split('<')[1].split('>')[0])

        // log with winston depending on response status
        if(status >= 400){
            logger.error(message)
        }
        else if(status >= 300){
            logger.warn(message)
        }
        else{
            logger.info(message);
        }

    }
};

// set morgan logging for express, then export it
const morgan_log = morgan(':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" <:status> :res[content-length] ":referrer" ":user-agent"', { "stream": logger.stream })
module.exports = morgan_log