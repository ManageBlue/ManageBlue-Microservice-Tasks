const router = require("express").Router();
const healthController = require("../controllers/healthcheck");

module.exports = tasksRouter => {

    tasksRouter.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    // Return Healthcheck status
    router.get("/", healthController.health)  
    
    // Simulate bad health
    router.post("/simulate", healthController.simulate)

    tasksRouter.use('/health', router);
};
