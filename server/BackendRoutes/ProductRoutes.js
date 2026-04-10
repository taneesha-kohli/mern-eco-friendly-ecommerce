const express = require('express');
const { fetchProduct, addProduct, updateProduct, deleteProduct, uploadImage, upload, fetchOneProduct } = require('../Controllers/ProductController');

const productRoutes = express.Router();

productRoutes.get("/fetch", fetchProduct);
productRoutes.get("/fetchOne/:id", fetchOneProduct);
productRoutes.post("/add", addProduct);
productRoutes.put("/update/:id", updateProduct);
productRoutes.delete("/delete/:id", deleteProduct);
productRoutes.post("/uploadImage",upload.single('image'), uploadImage);

module.exports = productRoutes
