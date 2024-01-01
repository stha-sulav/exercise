const { Router } = require("express");
const { loginUser, registerUser } = require("../controllers/user.controller");

const router = Router();

router.route("/login").post(loginUser);
router.route("/signup").post(registerUser);

module.exports = router;
