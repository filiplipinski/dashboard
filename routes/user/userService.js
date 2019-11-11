const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../../config');
const User = require('./userModel');

const secret = config.jwtSecret;

const registerUser = async ({ userName, password, emailAddress }) => {
  const user = await User.findOne({ emailAddress });
  if (user) throw Error('Email address exists unavailable');
  const user2 = await User.findOne({ userName });
  if (user2) throw Error('User name exists unavailable');

  const newUser = new User({
    userName,
    password,
    emailAddress,
  });

  const addUserToDB = await new Promise((resolve, reject) => {
    bcrypt.genSalt(10, (saltError, salt) => {
      if (saltError) throw saltError;
      bcrypt.hash(newUser.password, salt, (hashError, hash) => {
        if (hashError) throw hashError;
        newUser.password = hash;
        // save zapisuje w bazie danych
        newUser
          .save()
          .then(data => resolve(data))
          .catch(err => reject(err));
      });
    });
  });

  return addUserToDB;
};

const loginUser = async ({ userName, password }) => {
  const user = await User.findOne({ userName });
  if (!user) throw Error('User not found');

  const isPasswordsMatch = await bcrypt.compare(password, user.password);

  if (isPasswordsMatch) {
    const payload = {
      _id: user._id,
      userName: user.userName,
    };
    const token = jwt.sign(payload, secret, { expiresIn: 3600 });
    const expirationDate = new Date(new Date().getTime() + 3600 * 1000);

    return { token, expirationDate };
  }
  throw Error('Data are incorrect');
};

module.exports = { registerUser, loginUser };
