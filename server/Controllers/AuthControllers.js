const userTable = require("../Modals/Users");
require("dotenv").config();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const registerUser = async (request, response) => {
  const { username, email, password } = request.body;

  const userExists = await userTable.findOne({ email });

  const hashPassword = await bcrypt.hash(password, 10);

  if (userExists) {
    response.send({
      status: false,
      duplicate: true,
      message: "Can't save user already exists",
    });
  }

  new userTable({
    username: username,
    email: email,
    password: hashPassword,
  })
    .save()
    .then(() => {
      response.send({
        status: true,
        message: "User added successfully",
      });
    })
    .catch(() => {
      response.send({
        status: false,
        message: "Error occurred",
      });
    });
};

const loginUser = async (request, response) => {
  const { email, password, role } = request.body;
  let decryptedPass;

  const user = await userTable.findOne({ email });

  if (user && user.role == role) {
    decryptedPass = await bcrypt.compare(password, user.password);
  }

  if (!user) {
    response.send({
      status: false,
      message: "User doesn't exists",
    });
  }

  if (!decryptedPass) {
    response.send({
      status: false,
      wrongPass: true,
      message: "Incorrect email or password",
    });
  }

  if (user && decryptedPass) {

         const token = jwt.sign(
      {
        username: user.username,
        email: email,
        userId: user._id,
        role: role,
      },
      process.env.CLIENT_SECRET_KEY,
      { expiresIn: "60m" },
    );

response.cookie("token", token, {
  httpOnly: true,
  secure: true,
  sameSite: "None"
}).json({
  status: true,
  message: "Logged in successfully",
  user: {
    username: user.username,
    email: email,
    userId: user._id,
    role: user.role
  }
});
  
  }
};

const authMiddleware = async (request, response) => {

  try {

    const token = request.cookies.token;

    if (token) {
      try {
        const decoded = jwt.verify(token, process.env.CLIENT_SECRET_KEY);
          return response.send({
            status: true,
            message: "Authorized User",
            user: decoded,
          });
      } catch (error) {
        return response.send({
          status: false,
          message: "Token is invalid",
        });
      }
    } else {
      return response.send({
        status: false,
        message: "No token is there",
      });
    }
  } catch (error) {
    return response.send({
      status: false,
      error: error,
    });
  }
};

const logoutUser = (request, response) => {
  response.clearCookie("token", {
    httpOnly: true,
  });

  response.send({
    status: true,
    message: "Logged out successfully",
  });
};

module.exports = { registerUser, loginUser, authMiddleware, logoutUser };
