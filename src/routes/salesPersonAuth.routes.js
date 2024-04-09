const Router = require("express");
const {upload} = require("../middlewares/multer.middleware");
const { salesPersonLogin, salesPersonLogout, changePassword } = require("../controllers/salesPersonAuth.controller");
const verifySalesPerson = require("../middlewares/salesPersonAuth.middleware");


const router = Router();

router.route("/login").put(upload.none(), salesPersonLogin);
router.route("/logout").put(verifySalesPerson, salesPersonLogout);
router.route("/change-password").put(upload.none(),verifySalesPerson, changePassword);

module.exports = router;