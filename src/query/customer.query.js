const getAllCustomers = "SELECT * FROM customer";
const addCustomer = "INSERT INTO customer(first_name,last_name,email,company,street,city,state,zip,phone,birth_date,sex,password,avatar) VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13) RETURNING *";
const checkCustomerByEmail = "SELECT * FROM customer WHERE email = $1";
const getCustomer = "SELECT * FROM customer WHERE id = $1";
const updateCustomerDetails = "UPDATE customer SET first_name = $1, last_name=$2, email=$3, company=$4, street=$5, city=$6, state=$7, zip=$8, phone=$9, birth_date=$10,sex=$11 WHERE id = $12 RETURNING *";
const removeCustomer = "DELETE FROM customer WHERE id = $1 RETURNING *";


module.exports = {
    getAllCustomers,
    addCustomer,
    checkCustomerByEmail,
    getCustomer,
    updateCustomerDetails,
    removeCustomer
}