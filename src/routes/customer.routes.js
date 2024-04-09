const { Router } = require("express")
const { getAllCustomers,
    addCustomer,
    getCustomer,
    updateCustomerDetails,
    removeCustomer, 
    allCustomerOrders} = require("../controllers/customer.controller");
const { upload } = require("../middlewares/multer.middleware");
const verifyJWT = require("../middlewares/auth.middleware");

const router = Router();

router.route("/all").get(getAllCustomers);
router.route("/add").post(upload.fields([
    {
        name: "avatar",
        maxCount:1
    }
]),addCustomer);
router.route("/:id").get(getCustomer);
router.route("/update/:id").put(updateCustomerDetails);
router.route("/remove/:id").delete(removeCustomer);
router.route("/orders/:id").get(upload.none(),allCustomerOrders);

module.exports = router;