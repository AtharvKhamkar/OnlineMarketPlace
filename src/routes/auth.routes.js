const Router = require("express");
const { login, logout } = require("../controllers/auth.controller");
const verifyJWT = require("../middlewares/auth.middleware")

const router = Router();

router.route("/login").post(login);
router.route("/logout").put(verifyJWT,logout)

module.exports = router;