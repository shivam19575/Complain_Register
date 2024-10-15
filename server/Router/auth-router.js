const express = require("express");
const router = express.Router();
const authControllers = require("../controllers/Auth-controllers");
const validate = require("../middlewares/validate-middleware");
const { signUPSchema, loginSchema } =  require("../validators/auth-validator.js");
const authMiddleware = require("../middlewares/auth-middleware");



router.route("/").get(authControllers.home);

router.route("/register").post(validate(signUPSchema), authControllers.register);

router.route("/login").post(validate(loginSchema),authControllers.login);

router.route("/user").get(authMiddleware , authControllers.user);


module.exports = router;