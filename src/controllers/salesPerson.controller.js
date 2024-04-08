const bcrypt = require("bcrypt");
const asyncHandler = require("../utils/asyncHandler");
const ApiError = require("../utils/ApiError");
const ApiResponse = require("../utils/ApiResponse");
const pool = require("../config/database");
const salesPerson = require("../query/salesPerson.query");


const addSalesPerson = asyncHandler(async (req, res) => {
    //get all fields from the req.body
    //hash password before adding user in table
    const { first_name, last_name, email, street, city, state, zip, phone, birth_date, sex, date_hired, password } = req?.body;

    const checkAdded = await pool.query(salesPerson.checkSalesPerson, [email]);
    if (checkAdded.rows.length) {
        throw new ApiError(400, "Sales person is already registered");
    }
    

    const hashedPassword = await bcrypt.hash(password, 10);
    const query = salesPerson.addSalesPerson;
    const values = [first_name, last_name, email, street, city, state, zip, phone, birth_date, sex, date_hired, hashedPassword]
    const result = await pool.query(query,values );
    if (!result.rows.length) {
        throw new ApiError(400, "Error while adding sales person");
    }

    return res.status(200)
        .json(
            new ApiResponse(
                200,
                result.rows,
                "Successfully added sales person"

        )
    )
})

const getAllSalesPersons = asyncHandler(async (req, res) => {
    const result = await pool.query(salesPerson.getAllSalesPersons);
    if (!result.rows.length) {
        throw new ApiError(400, "Error while getting sales person");
    }

    return res.status(200)
        .json(
            new ApiResponse(
                200,
                result.rows,
                "Succussfully fetched all the sales person"
        )
    )
})

const getSalesPerson = asyncHandler(async (req, res) => {
    const id = parseInt(req.params?.id);

    const result = await pool.query(salesPerson.getSalesPerson, [id]);
    if (!result.rows.length) {
        throw new ApiError(400, "Sales person not found");
    }

    return res.status(200)
        .json(
            new ApiResponse(
                200,
                result.rows,
                "Successfully fetched sales person"
        )
    )
})

const updateSalesPerson = asyncHandler(async (req, res) => {
    const id = parseInt(req.params?.id);

    const { first_name, last_name, email, street, city, state, zip, phone, birth_date, sex, date_hired } = req?.body;

    const isRegistered = await pool.query(salesPerson.getSalesPerson, [id]);
    if (!isRegistered.rows.length) {
        throw new ApiError(400, "Please register first");
    }

    const oldSalesPerson = isRegistered?.rows;

    const oldFirst_name = oldSalesPerson.first_name;
    const oldLast_name = oldSalesPerson.last_name;
    const oldEmail = oldSalesPerson.email;
    const oldStreet = oldSalesPerson.street;
    const oldCity = oldSalesPerson.city;
    const oldState = oldSalesPerson.state;
    const oldZip = oldSalesPerson.zip;
    const oldPhone = oldSalesPerson.phone;
    const oldBirth_date = oldSalesPerson.birth_date;
    const oldSex = oldSalesPerson.sex;
    const oldDate_hired = oldSalesPerson.date_hired;

    const query = salesPerson.updateSalesPerson
    const values = [first_name ?? oldFirst_name, last_name ?? oldLast_name, email ?? oldEmail, street ?? oldStreet, city ?? oldCity, state ?? oldState, zip ?? oldZip, phone ?? oldPhone, birth_date ?? oldBirth_date, sex ?? oldSex, date_hired ?? oldDate_hired,id]
    
    const updatedSalesPerson = await pool.query(query, values);
    if (!updatedSalesPerson.rows.length) {
        throw new ApiError(400, "Error while updating the sales_person");
    }

    return res.status(200)
        .json(
            new ApiResponse(
                200,
                updatedSalesPerson.rows,
                "Successfully updated sales person"
        )
    )

    

})

const removeSalesPerson = asyncHandler(async (req, res) => {
    const id = parseInt(req.params?.id);

    const result = await pool.query(salesPerson.deleteSalesPerson, [id]);
    if (!result.rows.length) {
        throw new ApiError(400, "Error while deleting the sales person");
    }

    return res.status(200)
        .json(
            new ApiResponse(
                200,
                {
                    deleted_salesPerson : result.rows
                },
                "Successfully removed sales person"
        )
    )

})



module.exports = {addSalesPerson,getAllSalesPersons,getSalesPerson,updateSalesPerson,removeSalesPerson};