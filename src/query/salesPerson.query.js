const addSalesPerson = `INSERT INTO 
                        sales_person (first_name, last_name, email, street, city, state, zip, phone, birth_date, sex, date_hired, password)
                        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) RETURNING *`;

const checkSalesPerson = `SELECT * FROM sales_person WHERE email = $1`;

const updateSalesPerson = "UPDATE sales_person SET first_name = $1, last_name=$2, email=$3, street=$4, city=$5, state=$6, zip=$7, phone=$8, birth_date=$9, sex=$10, date_hired=$11 WHERE id = $12 RETURNING *";

const getAllSalesPersons = `SELECT * FROM sales_person`;

const getSalesPerson = `SELECT * FROM sales_person WHERE id = $1`;

const deleteSalesPerson = `DELETE FROM sales_person WHERE id = $1 RETURNING *`;


module.exports = {addSalesPerson,getAllSalesPersons,updateSalesPerson,getSalesPerson,deleteSalesPerson,checkSalesPerson };