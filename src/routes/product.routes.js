const Router = require("express");
const { getAllProducts,getProduct } = require("../controllers/product.controller");

const router = Router();


router.route("/all").get(getAllProducts);
router.route("/:id").get(getProduct);

module.exports = router;