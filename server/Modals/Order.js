const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema({
  userId:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  products:[
    {
      productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product'
      },
      quantity: {
        type: Number,
        default: 1
      }
    }
  ],
 status:{
  type: String,
  default: 'pending'
 }
},
 {
    timestamps: true
  }
)


const orderTable = mongoose.model("Order", orderSchema);

module.exports = orderTable;



 