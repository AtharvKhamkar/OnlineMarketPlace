const ApiError = require("../utils/ApiError");
const ApiResponse = require("../utils/ApiResponse");
const pool = require("../config/database");
const salesPerson = require("../query/salesPerson.query");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");




const isPasswordCorrectSales = async (email, password) => {
    try {
        const isRegistered = await pool.query(salesPerson.checkSalesPerson, [email]);
        if (!isRegistered.rows.length) {
            throw new ApiResponse(400, "Please register first");
        }

        const hashedPassword = isRegistered.rows[0]?.password;
        return await bcrypt.compare(password, hashedPassword);
    } catch (error) {
        throw new ApiError(400,`${error.message}`)
    }
}

const generateAccessToken = async (email)=>{
    return jwt.sign(
        { email },
        process.env.ACCESS_TOKEN_SECRET,
        {expiresIn:process.env.ACCESS_TOKEN_EXPIRY}
    )
}

const generateRefreshToken = async (email) => {
    return jwt.sign(
        { email },
        process.env.REFRESH_TOKEN_SECRET,
        {expiresIn:process.env.REFRESH_TOKEN_EXPIRY}
    )
}

module.exports = {
    isPasswordCorrectSales,
    generateAccessToken,
    generateRefreshToken
}