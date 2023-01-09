const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");

router.get("/productId/:productId", productController.productDetails);
router.get("", productController.productsList);

module.exports = {
  router,
};
