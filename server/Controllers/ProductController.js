require("dotenv").config();
const multer = require("multer");
const cloudinary = require("../config/Cloudinary");
const productTable = require("../Modals/Product");

const storage = multer.memoryStorage();

const upload = multer({ storage });

const fetchProduct = async (request, response) => {

  const products = await productTable.find();

  response.send({
    status: true,
    products: products
  })

};
const fetchOneProduct = async (request, response) => {
 const productId = request.params.id;
  const product = await productTable.findOne({_id: productId});

  response.send({
    status: true,
    product: product
  })

};

const addProduct = async (request, response) => {
  const { title, description, image, category, brand, price, stock, status } = request.body;
  const exists = await productTable.findOne({title});
 
  if(exists)
  {
    response.send({
      status: false,
      message: "Duplicate product",
      duplicate: true
    })
  }
  else
  {
    new productTable({
      title: title,
      description: description,
      image: image,
      category: category,
      brand: brand,
      price: price,
      stock: stock,
      status: status
    }).save().then(()=>{
      response.send({
        status: true,
        message: 'Product added successfully'
      })
    }).catch((error)=>{
       response.send({
        status: false,
        error: error
       })
    })
  }

};

const updateProduct = async (request, response) => {
  const productId = request.params.id;
  const { title, description, image, category, brand, price, stock, status } = request.body;

  const product = await productTable.findOne({_id: productId});

 const updatedData = {
      title: title ? title : product.title,
      description: description ? description : product.description,
      image: image ? image : product.image,
      category: category ? category : product.category,
      brand: brand ? brand : product.brand,
      price: price ? price : product.price,
      stock: stock ? stock : product.stock,
      status: status ? status : product.status
  }

  await productTable.findByIdAndUpdate(productId, updatedData);

    response.send({
      status: true,
      message: 'Product updated successfully'
    })

};

const deleteProduct = async (request, response) => {
  const productId = request.params.id;

  await productTable.deleteOne({_id: productId});

  response.send({
    status: true,
    message: 'Product deleted successfully'
  })

};

const uploadImage = async (request, response) => {
  try {
    if (request.file) {
      const file = request.file;
      const base64 = file.buffer.toString("base64");
      const dataURI = `data:${file.mimetype};base64,${base64}`;
      const cloudinaryResponse = await cloudinary.uploader.upload(dataURI, {
        folder: "products",
      });

      response.send({
        status: true,
        imageUrl: cloudinaryResponse.secure_url,
      });
    }
    if (!request.file) {
      return response.status(400).send({
        status: false,
        message: "No file uploaded",
      });
    }
  } catch (error) {
    response.send({
      status: false,
      message: error,
    });
  }
};

module.exports = {
  fetchProduct,
  addProduct,
  updateProduct,
  deleteProduct,
  uploadImage,
  upload,
  fetchOneProduct
};
