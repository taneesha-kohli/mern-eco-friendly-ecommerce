const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  title: {
    type:String,
    required: true,
    unique: true
  },
  description:{
   type: String,
   required: true
  },
  image: {
   type: String,
   required: true,
   unique: true
  },
  category: {
    type: String,
    required: true
  },
  brand: {
   type: String
  },
  price: {
    type: Number,
    required: true
  },
  stock: {
    type: Number,
    default: 1
  },
  status: {
    type: String,
    default: 'Active'
  }
})


const productTable = mongoose.model("Product", productSchema);

module.exports = productTable;