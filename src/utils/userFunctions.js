const bcrypt = require('bcrypt');
const customer = require("../query/customer.query");
const pool = require("../config/database");
const ApiError = require('./ApiError');
const jwt = require("jsonwebtoken");


const isPasswordCorrect = async (email, password) => {
    try {
        const result = await pool.query(customer.checkCustomerByEmail, [email]);
        if (!result.rows.length) {
            throw new ApiError(400, "Please register first");
        }
        const hashedPassword = result.rows[0].password;
        return await bcrypt.compare(password, hashedPassword);
    } catch (error) {
        throw new ApiError(400, `${error.message}`);
    }
}

const generateAccessToken = async (email) => {
    return jwt.sign(
        { email },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn:process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}

const generateRefreshToken = async (email) => {
    return jwt.sign(
        { email },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn:process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}


module.exports = {
    isPasswordCorrect,
    generateAccessToken,
    generateRefreshToken
};