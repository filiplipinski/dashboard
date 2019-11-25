const jwt = require('jsonwebtoken');
const config = require('../config');

const { jwtSecret } = config;

const decodeToken = authorization => {
  const token = authorization.split(' ')[1];

  const decodedUserName = jwt.verify(token, jwtSecret);
  // immediately invoked arrow function, copy part of the properties
  return (({ userName, _id }) => ({ userName, _id }))(decodedUserName);
};

module.exports = decodeToken;
