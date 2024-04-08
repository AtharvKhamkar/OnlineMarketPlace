const asyncHandler = require("../utils/asyncHandler")
const ApiError = require("../utils/ApiError");
const pool = require("../config/database");
const jwt = require("jsonwebtoken");
const getCustomer = require("../query/customer.query");

const verifyJWT = asyncHandler(async (req, res, next) => {
    try {
        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "");
        if (!token) {
            throw new ApiError(400, "Unauthorized request");
        }

        const decodedToken = jwt.decode(token, process.env.ACCESS_TOKEN_SECRET);
        
        const customer = await pool.query(getCustomer.checkCustomerByEmail, [decodedToken?.email]);
        if (!customer.rows.length) {
            throw new ApiError(400, "Invalid Access Token");
        }

        req.customer = customer.rows[0];
        next();
    } catch (error) {
        throw new ApiError(400, `${error.message}`);
    }
})

module.exports = verifyJWT;