import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"

const initialState = {
 user : null,
 isLoading: true,
 isAuthenticated: false
}



export const registerUser = createAsyncThunk('/auth/register',
  async(formData)=>{
    const response = await axios.post('http://localhost:5000/auth/register', formData)
    return response.data;
  }
)

export const loginUser = createAsyncThunk('/auth/login',
  async(formData)=>{
    const response = await axios.post('http://localhost:5000/auth/login', formData, {
      withCredentials: true
    });
    return response.data;
  }
)

export const checkAuth = createAsyncThunk('/auth/checkAuth',
  async()=>{
    const response = await axios.get('http://localhost:5000/auth/checkAuth',{
        withCredentials: true
      })
      
      console.log("response of checkauth", response);
     
      return response.data
  }
)

export const logoutUser = createAsyncThunk('/auth/logout',
  async()=>{
    const response = await axios.post('http://localhost:5000/auth/logout', {},
      {
        withCredentials: true
      }
    );
    console.log("response of logoutuser", response)
    return response.data
  }
)

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
   
  },
  extraReducers:(builder)=>{
    builder
    .addCase('/auth/login/pending',(state, action)=>{
      state.isLoading = true
    })
    .addCase('/auth/login/rejected',(state, action)=>{
      state.isLoading = false
    })
    .addCase('/auth/login/fulfilled',(state, action)=>{
      // console.log("fulfilled action of login", action)
      state.isLoading = false;
      state.isAuthenticated = action.payload.status ? true : false;
      state.user = action.payload.status ? action.payload.user : null;
    })
    .addCase('/auth/checkAuth/pending',(state, action)=>{
      state.isLoading = true
    })
    .addCase('/auth/checkAuth/rejected',(state, action)=>{
      state.isLoading = false
    })
    .addCase('/auth/checkAuth/fulfilled',(state, action)=>{
      console.log("fullfilled action result of checkAuth", action)
      state.isLoading = false;
      state.isAuthenticated = action.payload.status ? true : false;
      state.user = action.payload.status ? action.payload.user : null;
      console.log("checkAuth action : user ",state.user, "is authenticated ", state.isAuthenticated, "is loading ", state.isLoading);
    })
      .addCase('/auth/logout/pending',(state, action)=>{
      state.isLoading = true
    })
    .addCase('/auth/logout/rejected',(state, action)=>{
      state.isLoading = false
    })
    .addCase('/auth/logout/fulfilled',(state, action)=>{
      // console.log("fulfilled action of login", action)
      state.isLoading = false;
      state.isAuthenticated = false
      state.user = null;
    })

  }
})

export default authSlice.reducer