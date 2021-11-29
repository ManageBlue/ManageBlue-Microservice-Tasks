/*const jwt = require("jsonwebtoken");
const config = require("../config/auth");
const mongoose = require('mongoose');
const Token = mongoose.model('Token');


// Verify token in whitelist
verifyTokenWhitelist = (req, res, next) => {

    let token = req.headers["x-access-token"];

    // check token existence
    if (!token) {
        return res.status(403).send({message: "No token provided!"});
    }

    // verify token
    jwt.verify(token, config.secret, (err, decoded) => {

        // invalid token
        if (err) {
            return res.status(401).send({message: "Unauthorized!"});
        }

        Token.findOne({'token': token})
            .then(token => {
                if (!token) {
                    return res.status(401).json({
                        message: "Unauthorized!"
                    });
                }

                req.params.tokenId = decoded.id

                next();

            })
            .catch(error => {
                res.status(500).send({
                    message: error.message || "An error occurred while checking whitelist!"
                });
            });
    })
};
//----------------------------------------------------------------------------------------------------------------------


const authJwt = {
    verifyTokenWhitelist: verifyTokenWhitelist
};
module.exports = authJwt;*/
