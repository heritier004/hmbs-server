const express = require("express");
const router = express.Router();
const userContoller = require("../controller/userContoller");


router.post("/signIn",userContoller.verifyUser);
router.post("/SignUp", userContoller.signupUser)

module.exports = router;

