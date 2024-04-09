const asyncHandler = require("../utils/asyncHandler");
const ApiError = require("../utils/ApiError");
const jwt = require("jsonwebtoken");
const pool = require("../config/database");
const fetchSalesPerson = require("../query/salesPerson.query")


const verifySalesPerson = asyncHandler(async (req, res,next) => {
    try {
        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "");
        if (!token) {
            throw new ApiError(400, "Unauthorized request");
        }

        const decodedToken = jwt.decode(token, process.env.ACCESS_TOKEN_SECRET);
        
        const salesPerson = await pool.query(fetchSalesPerson.checkSalesPerson, [decodedToken?.email]);
        if (!salesPerson.rows.length) {
            throw new ApiError(400, "Error while decoding the token");
        }

        req.salesPerson = salesPerson.rows[0];
        next();
    } catch (error) {
        throw new ApiError(400, `${error.message}`);
    }
})

module.exports = verifySalesPerson;