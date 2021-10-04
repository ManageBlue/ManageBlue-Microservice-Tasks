const router = require("express").Router();
const registerCheck = require("../middlewares/registerCheck")
const authenticationController = require("../controllers/authentication");
const authJWT = require("../middlewares/authJWT");


module.exports = authenticationRouter => {

    authenticationRouter.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });


    // Register new user
    router.post("/register", [authJWT.verifyTokenWhitelist, registerCheck.checkUniqueUsernameEmail], authenticationController.register);

    // Login user
    router.post("/login", authenticationController.login);

    // Logout user
    router.post("/logout", [authJWT.verifyTokenWhitelist], authenticationController.logout);

    // Verify token
    router.get("/verify", [authJWT.verifyTokenWhitelist], (
        req, res) => {
        return res.status(200).json({
            message: "Token valid."
        });
    });

    authenticationRouter.use('/api/auth', router);
}
