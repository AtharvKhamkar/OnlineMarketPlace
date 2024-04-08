const { Router } = require("express")
const { getAllCustomers,
    addCustomer,
    getCustomer,
    updateCustomerDetails,
    removeCustomer } = require("../controllers/customer.controller")

const router = Router();

router.route("/all").get(getAllCustomers);
router.route("/add").post(addCustomer);
router.route("/:id").get(getCustomer);
router.route("/update/:id").put(updateCustomerDetails);
router.route("/remove/:id").delete(removeCustomer);

module.exports = router;