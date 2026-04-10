const dns = require('dns');
dns.setServers(['8.8.8.8', '8.8.4.4']);

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRouter = require('./BackendRoutes/authRoutes');
const cookieParser = require('cookie-parser');
const productRoutes = require('./BackendRoutes/ProductRoutes');
const cartRoutes = require('./BackendRoutes/CartRoutes');
require('dotenv').config();


const app = express();

app.use(express.json());
app.use(cors({
  origin: 'https://mern-eco-friendly-ecommerce.vercel.app',
  credentials: true
}))

app.use(cookieParser());

app.use("/auth", authRouter);
app.use("/product", productRoutes);
app.use("/cart", cartRoutes);

mongoose.connect(process.env.DB_URL).then(()=>{
   console.log("Successfully connected with DB");
   app.listen(process.env.PORT,()=>{
    console.log("Server is running on port", process.env.PORT);
    
   });
})