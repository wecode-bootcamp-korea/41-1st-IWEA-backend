const productService = require("../services/productService");

const allProducts = async (req, res) => {
  try {
    const allProducts = await productService.allProducts();
    return res.status(200).json({ data: allProducts });
  } catch (err) {
    console.log(err);
    return res.status(err.statusCode || 500).json({ message: err.message });
  }
};

const productsOfCategoryList = async (req, res) => {
  try {
    const { categoryId } = req.params;
    const productsOfCategoryList = await productService.productsOfCategoryList(
      categoryId
    );
    return res.status(200).json({ data: productsOfCategoryList });
  } catch (err) {
    console.log(err);
    return res.status(err.statusCode || 500).json({ message: err.message });
  }
};

const productDetails = async (req, res) => {
  try {
    const { productId } = req.params;
    const productDetails = await productService.productDetails(productId);
    return res.status(200).json({ data: productDetails });
  } catch (err) {
    console.log(err);
    return res.status(err.statusCode || 500).json({ message: err.message });
  }
};

module.exports = {
  allProducts,
  productsOfCategoryList,
  productDetails,
};
