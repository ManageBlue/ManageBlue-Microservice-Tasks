const router = require("express").Router();
const metricsController = require("../controllers/metrics");

module.exports = metricsRouter => {

    metricsRouter.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    // Return metrics
    router.get("/", metricsController.return)

    metricsRouter.use('/metrics', router);
};
