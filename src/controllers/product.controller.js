const asyncHandler = require("../utils/asyncHandler");
const ApiError = require("../utils/ApiError");
const ApiResponse = require("../utils/ApiResponse");
const pool = require("../config/database")
const product = require("../query/product.query");

const getAllProducts = asyncHandler(async (req, res) => {
    const result = await pool.query(product.getAllProducts);
    if (!result.rows.length) {
        throw new ApiError(401, "Error while fetching the products");
    }

    return res.status(200)
        .json(
            new ApiResponse(
                200,
                result.rows,
                "Successfully fetched all products"
        )
    )
})

const getProduct = asyncHandler(async (req, res) => {
    const id = parseInt(req.params.id);

    const result = await pool.query(product.getProduct, [id]);
    if (!result.rows.length) {
        throw new ApiError(400,"Error while getting the product")
    }

    return res.status(200)
        .json(
            new ApiResponse(
                200,
                result.rows,
                "Successfully fetched a product"
        )
    )
})


module.exports = { getAllProducts,getProduct };

