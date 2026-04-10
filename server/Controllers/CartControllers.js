const cartTable = require("../Modals/Cart");
const orderTable = require("../Modals/Order");

const addToCart = async(request, response)=>{
  const {userId, productId} = request.body;

  const user = await cartTable.findOne({userId});

  if(user)
  {

    
   const product = user.products.find((item)=> item.productId == productId);
   if(product)
   {
    product.quantity = product.quantity < 6 ? product.quantity+1 : product.quantity

   }
   else{
    user.products.push({productId: productId})
   }
    if(product && product.quantity == 6)
    {
      response.send({
        status: false,
        message: "you can't add more than 5 quantity",
        limit: true
      })
    }
    else
    {
      
   user.save().then(()=>{
     response.send({
      status: true,
      message: "Product added to cart"
    })
   }).catch((error)=>{
    response.send({
    status: false,
    message: error
    })
  })
  
    }
  }
  else
  {

  new cartTable({
    userId: userId,
    products: [{productId: productId }]
  }).save().then(()=>{
    response.send({
      status: true,
      message: "Product added to cart"
    })
  }).catch((error)=>{
    response.send({
    status: false,
    message: error
    })
  })
  }


}

const fetchCart = async(request, response)=>{
  const userId = request.params.id;
  try {
    const cart = await cartTable.findOne({userId}).populate('products.productId');
    response.send({
      status: true,
      cart: cart
    })
  } catch (error) {
    response.send({
      status: false,
      message: error
    })
  }

}
const deleteCart = async(request, response)=>{

  const {productId, userId} = request.body

  const user = await cartTable.findOne({userId});
  
  const filteredProducts = user.products.filter((item)=> item.productId != productId)

  user.products = filteredProducts

 
  user.save().then(()=>{
    response.send({
      status: true,
      message: 'Product deleted successfully'
    })
  }).catch((error)=>{
    response.send({
       status: false,
    message: error
    })
   
  })

}
const updateCart = async(request, response)=>{
  const { userId, productId, action } = request.body
  let updatedCart = [];
  const cart = await cartTable.findOne({userId});


  if(action == 'inc')
  {
     updatedCart = cart.products.map((item)=> {
      if(item.productId == productId)
      {
        item.quantity = item.quantity < 5 ? item.quantity + 1 : item.quantity
        return item
      }
      else {
        return item;
      }
    })
  }
  if(action == 'dec')
  {
     updatedCart = cart.products.map((item)=> {
      if(item.productId == productId)
      {
        item.quantity = item.quantity > 1 ? item.quantity - 1 : item.quantity
        return item
      }
      else {
        return item;
      }
    })
  }

  cart.products = updatedCart;

 cart.save().then(()=>{
  response.send({
    status: true,
    message: 'Quantity updated successfully'
  })
 })
}

const addOrders = async(request, response)=>{
  const {userId} = request.body

  const cart = await cartTable.findOne({userId});


  new orderTable({
    userId: userId,
    products: cart.products
  }).save().then(()=>{
    response.send({
      status: true,
      message: 'Order added successfully'
    })
  })

  cart.products = [];
  await cart.save()
}

module.exports = { addToCart, fetchCart, deleteCart, updateCart, addOrders }