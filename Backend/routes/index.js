const express = require('express');
const router = express.Router();

const ProductRouter = require("./product.router");
const UserRouter = require("./user.router")

router.use("/product", ProductRouter);
router.use("/user", UserRouter);

module.exports= router;