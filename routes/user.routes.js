const userRoute = require("express").Router();
const { verify } = require("../middleware/jwtAuth.middleware");
const {
	userRegistration,
	userLogin,
} = require("../controller/user.controller");

userRoute.get("/", verify, userDetails);

userRoute.post("/register", userRegistration);

userRoute.post("/login",verify, userLogin);

module.exports = { userRoute };
