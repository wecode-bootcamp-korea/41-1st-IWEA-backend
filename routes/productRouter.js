const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");

router.get("/categoryId/:categoryId", productController.productsOfCategoryList);
router.get("/productId/:productId", productController.productDetails);
router.get("/", productController.allProducts);

module.exports = {
  router,
};
