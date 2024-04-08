const asyncHandler = require("../utils/asyncHandler");
const ApiResponse = require("../utils/ApiResponse");
const ApiError = require("../utils/ApiError");
const auth = require("../query/auth.query");
const customer = require("../query/customer.query");
const pool = require("../config/database");
const {isPasswordCorrect,generateAccessToken,generateRefreshToken} = require("../utils/userFunctions");


const login = asyncHandler(async (req, res) => {
    //Get email and password from user through req.body
    //check whether the user is registered or not using email
    //then compare password with hashed value
    //if matches the password then send access token and refresh token
    
    const { email, password } = req?.body;
    
    const checkPassword = await isPasswordCorrect(email, password);
    if (!checkPassword) {
        throw new ApiError(400, "Incorrect Password");
    }

    const accessToken = await generateAccessToken(email);
    const refreshToken = await generateRefreshToken(email);
    
    const result = await pool.query(auth.addRefreshToken, [refreshToken, email]);
    if (!result.rows.length) {
        throw new ApiError(401, "Error while loggin in user");
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
                    user:result.rows,accessToken,refreshToken
                },
                "User logged in successfully"
        )
    )




})

const logout = asyncHandler(async (req, res) => {
    //get user from req.customer
    //Set refresh_token as 1 in database using Update query
    //clear cookies
    const result = await pool.query(auth.removeRefreshToken, [1, req.customer?.id]);
    if (!result.rows.length) {
        throw new ApiError(400, "Error while logging out");
    }

    const options = {
        httpOnly: true,
        secure:true
    }

    return res.status(200)
        .clearCookie("accessToken", options)
        .clearCookie("refreshToken", options)
        .json(new ApiResponse(200, {}, "User logged out"));
})

module.exports = { login,logout };