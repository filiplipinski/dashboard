const atob = require('atob');
const jwt = require('jsonwebtoken');
const config = require('../../config');
const UserService = require('./userService');

const secret = config.jwtSecret;

const registerUser = async (req, res) => {
  const encodedData = req.headers.authorization.split(' ')[1];
  if (!encodedData) res.status(400).json('Basic authorization not correct');
  const decodedData = atob(encodedData).split(':');
  if (decodedData.length !== 3) res.status(400).json('Login, password and email address required');
  const [userName, password, emailAddress] = decodedData;

  try {
    const newUser = await UserService.registerUser({ userName, password, emailAddress });
    res.json({
      success: true,
      message: 'Registered successfully',
      user: {
        userName: newUser.userName,
        _id: newUser._id,
      },
    });
  } catch (err) {
    res.status(400).json(err.message);
  }
};

const loginUser = async (req, res) => {
  const encodedData = req.headers.authorization.split(' ')[1];
  if (!encodedData) res.status(400).json('Basic authorization not correct');
  const decodedData = atob(encodedData).split(':');
  if (decodedData.length !== 2) res.status(400).json('Login and password required');
  const [userName, password] = decodedData;

  try {
    const tokenData = await UserService.loginUser({ userName, password });

    res.json({
      success: true,
      tokenData,
    });
  } catch (err) {
    res.status(400).json(err.message);
  }
};

const authenticate = (req, res) => {
  if (!req.headers.authorization) res.status(401).json('No authorization');
  else {
    const token = req.headers.authorization.split(' ')[1];
    if (!token) res.status(401).json('Bad authorization');
    else
      jwt.verify(token, secret, (err, decoded) => {
        if (err) res.status(401).json(err);
        else
          res.json({
            authenticate: true,
          });
      });
  }
};

module.exports = { registerUser, loginUser, authenticate };
