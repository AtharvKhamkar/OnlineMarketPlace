const customer = require("../query/customer.query");
const pool = require("../config/database");
const bcrypt = require("bcrypt");
const ApiResponse = require("../utils/ApiResponse");
const ApiError = require("../utils/ApiError");
const asyncHandler = require("../utils/asyncHandler");
const { uploadOnCloudinary } = require("../utils/cloudinary");

const getAllCustomers = asyncHandler(async (req, res) => {
    const result = await pool.query(customer.getAllCustomers);

    if (!result.rows.length) {
        throw new ApiError(400, "Error while fetching the customers");
    }
    return res.
        status(200)
        .json(
            new ApiResponse(
                200,
                result.rows,
                "Successfully fetched all customers"
            )
        )
})

const addCustomer = asyncHandler(async (req, res) => {
    const { first_name, last_name, email, company, street, city, state, zip, phone, birth_data, sex,password } = req?.body


    //Check first customer is already registered or not
    const isRegistered = await pool.query(customer.checkCustomerByEmail, [email]);
    if (isRegistered.rows.length) {
        throw new ApiError(401, "User is already registered");
    }

    const avatarLocalPath = req.files?.avatar[0]?.path;
    if (!avatarLocalPath) {
        throw new ApiError(400, "Avatar file is required");
    }

    const avatar = await uploadOnCloudinary(avatarLocalPath);
    
    if (!avatar) {
        throw new ApiError(401, "Error while uploading the avatar file");
    }



    const hashedPassword = await bcrypt.hash(password, 10);
    const query = customer.addCustomer;
    const values = [first_name, last_name, email, company, street, city, state, zip, phone, birth_data, sex,hashedPassword,avatar.url];
    const result = await pool.query(query, values);

    if (!result) {
        throw new ApiError(400, "Error while adding the customer");
    }

    return res.status(200)
        .json(
            new ApiResponse(
                200,
                result.rows,
                "Successfully created new customer"
        )
    )

})

const getCustomer = asyncHandler(async (req, res) => {
    const id = parseInt(req.params?.id);

    const result = await pool.query(customer.getCustomer, [id]);
    if (!result.rows.length) {
        throw new ApiError(401, "Customer not found");
    }

    return res.status(200)
        .json(
            new ApiResponse(
                200,
                result.rows,
                "Successfully fetched desired user"
        )
    )

})

const updateCustomerDetails = asyncHandler(async (req, res) => {
    //get user id from the query parameter
    //first check whether the user exists in the database or not
    //If it exist store the user info in seperate variables
    //only change field that customer want to update remaining fields update with the old  values

    const id = parseInt(req.params?.id);
    const { first_name, last_name, email, company, street, city, state, zip, phone, birth_date, sex } = req?.body

    const isRegistered = await pool.query(customer.getCustomer, [id]);
    if (!isRegistered) {
        throw new ApiError(401, "Please register first");
    }

    const oldCustomer = isRegistered?.rows;
    const oldFirst_name = oldCustomer?.first_name;
    const oldLast_name = oldCustomer?.last_name;
    const oldEmail = oldCustomer?.email;
    const oldCompany = oldCustomer?.company;
    const oldStreet = oldCustomer?.street;
    const oldCity = oldCustomer?.city;
    const oldState = oldCustomer?.state;
    const oldZip = oldCustomer?.zip;
    const oldPhone = oldCustomer?.phone;
    const oldBirth_date = oldCustomer?.birth_date;
    const oldSex = oldCustomer?.sex;
    
    
    const query = customer.updateCustomerDetails
    const values = [first_name??oldFirst_name, last_name??oldLast_name, email??oldEmail, company??oldCompany, street?? oldStreet,city??oldCity, state??oldState, zip??oldZip, phone??oldPhone, birth_date??oldBirth_date, sex??oldSex, id]

    const updatedCustomer = await pool.query(query, values);
    if (!updatedCustomer) {
        throw new ApiError(401, "Error while updating the customer");
    }

    return res.status(200)
        .json(
            new ApiResponse(
                200,
                updatedCustomer.rows,
                "Successfully updated the customer details"
        )
    )


})

const removeCustomer = asyncHandler(async (req, res) => {
    const id = parseInt(req.params?.id);

    const isRegistered = await pool.query(customer.getCustomer, [id]);
    if (!isRegistered.rows.length) {
        throw new ApiError(401, "Customer is not registered");
    }

    const deletedCustomer = await pool.query(customer.removeCustomer, [id]);
    if (deletedCustomer.rows.length) {
        return res.status(200)
            .json(
                new ApiResponse(
                    200,
                    { removed_customer: deletedCustomer.rows },
                    "Successfully removed customer"
            )
        )
    } else {
        throw new ApiError(400,"Error while deleting the user")
    }

})
    


module.exports = {
    getAllCustomers,
    addCustomer,
    getCustomer,
    updateCustomerDetails,
    removeCustomer
}