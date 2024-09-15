const express=require("express");
const router =express.Router();
const authControllers = require("../controllers/auth-controller")
const {home} = require("../controllers/auth-controller")
const {signupSchema,loginSchema}=require("../validators/auth-validator")
const validate=require("../middleware/validate-middleware")
const authMiddleware = require("../middleware/auth-middleware")
router.route("/").get(home)

router.route("/register").post(validate(signupSchema),authControllers.register)
router.route("/login").post(validate(loginSchema),authControllers.login)
router.route("/user").get(authMiddleware,authControllers.user)

module.exports = router