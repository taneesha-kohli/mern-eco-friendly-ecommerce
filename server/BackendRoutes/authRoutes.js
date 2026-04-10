const express = require('express');
const { registerUser, loginUser, authMiddleware, logoutUser } = require('../Controllers/AuthControllers');

const authRouter = express.Router();

authRouter.post("/register", registerUser);
authRouter.post("/login", loginUser);
authRouter.get("/checkAuth", authMiddleware);
authRouter.post("/logout", logoutUser);

module.exports = authRouter