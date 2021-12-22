const router = require("express").Router();

module.exports = readinessRouter => {

    readinessRouter.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    // Return Readiness status
    router.get("/", (req,res) => {
        return res.status(200).json({
            ready: true
        })
    })

    readinessRouter.use('/tasks/ready', router);
};
