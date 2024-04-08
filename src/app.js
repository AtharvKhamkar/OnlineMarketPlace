const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();


app.use(express.json({
    limit:"16kb"
}));

app.use(express.urlencoded({
    extended: true,limit:"16kb"
}))

app.use(express.static("public"))

app.use(cookieParser())

//import routes
const customerRouter = require("./routes/customer.routes")
const productRouter = require("./routes/product.routes");
const authRouter = require("./routes/auth.routes");
const salesPersonRoutes = require("./routes/salesPerson.routes");

app.use("/api/v1/customers", customerRouter);
app.use("/api/v1/products", productRouter);
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/sales-persons", salesPersonRoutes);

module.exports = app;