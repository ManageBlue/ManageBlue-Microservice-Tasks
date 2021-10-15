const router = require("express").Router();
const authJWT = require("../middlewares/authJWT");
const usersController = require("../controllers/users");


module.exports = usersRouter => {

    usersRouter.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });


    // Return calling user data
    router.get("/me", [authJWT.verifyTokenWhitelist], usersController.returnMe);

    // Return user by ID
    router.get("/:id", [authJWT.verifyTokenWhitelist], usersController.returnByID);

    // Return all users
    router.get("/", [authJWT.verifyTokenWhitelist], usersController.returnAll);

    // Update user by ID
    router.put("/:id", [authJWT.verifyTokenWhitelist], usersController.update);

    // Update user password by ID
    router.put("/pass/:id", [authJWT.verifyTokenWhitelist], usersController.updateUserPass);

    // Delete user by ID
    router.delete("/:id", [authJWT.verifyTokenWhitelist], usersController.delete);

    usersRouter.use('/api/users', router);
};
