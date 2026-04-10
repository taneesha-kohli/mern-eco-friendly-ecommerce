import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios";


export const addToCart = createAsyncThunk('/cart/add',
  async(data)=>{
    const response = await axios.post('https://mern-eco-friendly-ecommerce.onrender.com/cart/add', data);
    console.log("response of add to cart", response)
    return response.data
  }
)
export const fetchCart = createAsyncThunk('/cart/fetch',
  
  async(userId)=>{

    const response = await axios.get(`https://mern-eco-friendly-ecommerce.onrender.com/cart/fetch/${userId}`);
    console.log("response of fetch cart", response);
    
    return response.data;
  }
)
export const deleteCart = createAsyncThunk('/cart/delete',
  async(data)=>{
    console.log("data is deletecart", data)
    const response = await axios.delete('https://mern-eco-friendly-ecommerce.onrender.com/cart/delete',{data: data});
    console.log("response of delete cart", response)
    return response.data
  }
)
export const updateCart = createAsyncThunk('/cart/update',
  async(data)=>{
    const response = await axios.put('https://mern-eco-friendly-ecommerce.onrender.com/cart/update', data);
    return response.data
  }
)

export const addOrders = createAsyncThunk('/cart/addOrder',
  async(userId)=>{
    const response = await axios.post('https://mern-eco-friendly-ecommerce.onrender.com/cart/addOrder', {userId: userId});
    console.log("response of add order", response)
    return response.data
  }
)

const cartSlice = createSlice({
  initialState: {
    cartData: [],
    cartTotal: JSON.parse(localStorage.getItem('cartTotal')) || 0
  },
  name: 'cart',
 reducers: {
  getCartTotal: (state)=>{
    console.log("get cart total function called");
     state.cartTotal = state.cartData ? state.cartData.reduce((total, item)=>{
         return total+item.quantity
  },0) : 0
  console.log("cart total is get cart total", state.cartTotal, "cart data", state.cartData);
   localStorage.setItem('cartTotal', JSON.stringify(state.cartTotal));
  }
 },
 extraReducers: (builder)=>{
  builder
  .addCase('/cart/fetch/pending',(state, action)=>{
    
  })
  .addCase('/cart/fetch/rejected',(state, action)=>{

  })
  .addCase('/cart/fetch/fulfilled',(state, action)=>{
      state.cartData = action.payload.status ? action.payload.cart.products : []
  })
 }
})

export const {getCartTotal} = cartSlice.actions 
export default cartSlice.reducer;                                   