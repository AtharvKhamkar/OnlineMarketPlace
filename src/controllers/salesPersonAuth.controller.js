const bcrypt = require("bcrypt");
const salesPerson = require("../query/salesPerson.query");
const pool = require("../config/database");
const asyncHandler = require("../utils/asyncHandler");
const ApiResponse = require("../utils/ApiResponse");
const ApiError = require("../utils/ApiError");
const salesPersonAuth = require("../query/salesPersonAuth.query");
const { isPasswordCorrectSales, generateAccessToken,generateRefreshToken} = require("../utils/salesPersonFunction");


const salesPersonLogin = asyncHandler(async (req, res) => {
    const { email, password } = req?.body;

    const isRegistered = await pool.query(salesPerson.checkSalesPerson, [email]);
    if (!isRegistered.rows.length) {
        throw new ApiError(400, "Please register first");
    }

    

    const checkPassword = await isPasswordCorrectSales(email, password);
    if (!checkPassword) {
        throw new ApiError(400, "Password is incorrect");
    }

    const accessToken = await generateAccessToken(email);
    const refreshToken = await generateRefreshToken(email);

    const result = await pool.query(salesPersonAuth.addRefreshToken, [refreshToken, isRegistered.rows[0]?.id]);
    if (!result.rows.length) {
        throw new ApiError(400, "Error while updating refresh token");
    }

    const options = {
        httpOnly: true,
        secure:true
    }

    return res.status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json(
            new ApiResponse(
                200,
                {
                    sales_person: result.rows[0],accessToken,refreshToken
                },
                "User logged in successfully"
           )
    )
    
})

const salesPersonLogout = asyncHandler(async (req, res) => {
    const result = await pool.query(salesPersonAuth.updateRefreshToken, [1, req.salesPerson?.id]);
    if (!result.rows.length) {
        throw new ApiError(400, "Error while logging out the user");
    }

    

    const options = {
        httpOnly: true,
        secure:true
    }

    return res.status(200)
        .clearCookie("accessToken", options)
        .clearCookie("refreshToken", options)
        .json(new ApiResponse(200, {}, "Sales person logged out successfully"));
})

const changePassword = asyncHandler(async (req, res) => {
    const { oldPassword, newPassword } = req?.body;

    const checkPassword = await isPasswordCorrectSales(req.salesPerson?.email, oldPassword);
    if (!checkPassword) {
        throw new ApiError(400, "Incorrect Password");
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    const updatedPassword = await pool.query(salesPersonAuth.updatePassword, [hashedPassword, req.salesPerson?.id]);
    if (!updatedPassword.rows.length) {
        throw new ApiError(400, "Error while updating the password");
    }


    return res.status(200)
        .json(
            new ApiResponse(
                200,
                {},
                "Password updated successfully"
        )
    )
    
})


module.exports = {
    salesPersonLogin,
    salesPersonLogout,
    changePassword
}