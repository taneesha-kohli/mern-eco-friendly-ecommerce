const express = require('express');
const { addToCart, fetchCart, deleteCart, updateCart, addOrders } = require('../Controllers/CartControllers');

const cartRoutes = express.Router();

cartRoutes.post('/add', addToCart);
cartRoutes.get('/fetch/:id', fetchCart);
cartRoutes.delete('/delete', deleteCart);
cartRoutes.put('/update', updateCart);
cartRoutes.post('/addOrder', addOrders);

module.exports = cartRoutes