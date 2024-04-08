const Router = require("express");
const { login, logout, changePassword } = require("../controllers/auth.controller");
const verifyJWT = require("../middlewares/auth.middleware")

const router = Router();

router.route("/login").post(login);
router.route("/logout").put(verifyJWT, logout)
router.route("/change-password").put(verifyJWT, changePassword);

module.exports = router;