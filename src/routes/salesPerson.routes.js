const Router = require("express");
const { getAllSalesPersons, getSalesPerson, removeSalesPerson, addSalesPerson, updateSalesPerson } = require("../controllers/salesPerson.controller");
const { upload } = require("../middlewares/multer.middleware");


const router = Router();

router.route("/add").post(upload.none(),addSalesPerson);
router.route("/all").get(getAllSalesPersons);
router.route("/:id").get(getSalesPerson);
router.route("/update/:id").put(upload.none(),updateSalesPerson);
router.route("/remove/:id").delete(removeSalesPerson);

module.exports = router;