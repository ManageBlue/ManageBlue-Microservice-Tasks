const router = require("express").Router();
//const authJWT = require("../middlewares/authJWT");
const tasksController = require("../controllers/tasks");

module.exports = tasksRouter => {

    tasksRouter.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    // Return task by ID
    router.get("/:id", tasksController.returnByID);

    // Return task by ID - filter by query parameters
    router.get("/", /*[authJWT.verifyTokenWhitelist],*/ tasksController.return);

    // Create task
    router.post("/", /*[authJWT.verifyTokenWhitelist],*/ tasksController.create);

    // Update task by ID
    router.put("/:id", /*[authJWT.verifyTokenWhitelist],*/ tasksController.update);

    // Delete task by ID
    router.delete("/:id", /*[authJWT.verifyTokenWhitelist],*/ tasksController.delete);

    // Delete tasks by project ID
    router.delete("/deleteProject/:id", /*[authJWT.verifyTokenWhitelist],*/ tasksController.deleteProjectTasks);

    tasksRouter.use('/api/v1/tasks', router);
};
