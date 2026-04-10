import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios";

const initialState = {
  products: [],
  wishlist: JSON.parse(localStorage.getItem('wishlist')) || [],
  singleProduct: {},
  isLoading: true,
}

export const uploadImage = createAsyncThunk('/product/uploadImage',
  async(multipartImageData)=>{
    console.log("upload image function is called")
    const response = await axios.post('http://localhost:5000/product/uploadImage', multipartImageData);
    return response.data
  }
)

export const addProduct = createAsyncThunk('/product/add',
  async(formData)=>{
    const response = await axios.post('http://localhost:5000/product/add', formData);
    console.log("response of product add");
    return response.data;
  }
)
export const fetchProducts = createAsyncThunk('/product/fetch',
  async()=>{
    const response = await axios.get('http://localhost:5000/product/fetch');
    // console.log("response of product fetch", response);
    return response.data;
  }
)
export const deleteProduct = createAsyncThunk('/product/delete',
  async(id)=>{
    const response = await axios.delete(`http://localhost:5000/product/delete/${id}`);
    console.log("response of product add");
    return response.data;
  }
)
export const updateProduct = createAsyncThunk('/product/update',
  async(formData)=>{
    const response = await axios.put(`http://localhost:5000/product/update/${formData._id}`, formData);
    console.log("response of product add");
    return response.data;
  }
)
export const getProduct = createAsyncThunk('/product/fetchOne',
  async(id)=>{
    const response = await axios.get(`http://localhost:5000/product/fetchOne/${id}`);
    console.log("response of product add");
    return response.data;
  }
)



const ProductSlice = createSlice({
  name : 'product',
  initialState,
  reducers: {
    addToWishlist: (state, action)=>{
      console.log("add to wishlist function called", action.payload)
      const productId = action.payload
      const exists = state.wishlist.find((item)=> item.productId == action.payload);
      if(exists)
      {
        const filteredProducts = state.wishlist.filter((item)=> item.productId != action.payload);
        state.wishlist = filteredProducts
          localStorage.setItem("wishlist", JSON.stringify(state.wishlist));
      }
      else
      {
            state.wishlist = state.wishlist.length > 0 ? [...state.wishlist, {productId:productId}] : [{productId: productId}]
      localStorage.setItem("wishlist", JSON.stringify(state.wishlist));
      }
  
    }
  },
  extraReducers: (builder)=>{
    builder
    .addCase('/product/fetch/pending',(state, action)=>{
      state.isLoading = true
    })
    .addCase('/product/fetch/rejected',(state, action)=>{
      state.isLoading = false
    })
    .addCase('/product/fetch/fulfilled',(state, action)=>{
      // console.log("action in fullfilled of fetch product", action)
      state.isLoading = false
      state.products = action.payload.status ? action.payload.products : []
    })
    .addCase('/product/fetchOne/pending',(state, action)=>{
      state.isLoading = true
    })
    .addCase('/product/fetchOne/rejected',(state, action)=>{
      state.isLoading = false
    })
    .addCase('/product/fetchOne/fulfilled',(state, action)=>{
      // console.log("action in fullfilled of fetch product", action)
      state.isLoading = false
      state.singleProduct = action.payload.status ? action.payload.product : {}
    })
  }
})

export const { addToWishlist, setActiveCategory } = ProductSlice.actions
export default ProductSlice.reducer