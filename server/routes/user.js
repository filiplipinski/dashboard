const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const atob = require("atob");

const config = require("../config");
const User = require("../models/user");

const router = express.Router();
const secret = config.jwtSecret;

router.post("/register", (req, res) => {
  User.findOne({ emailAddress: req.body.emailAddress }).then(user => {
    if (user) {
      return res
        .status(400)
        .json({ error: "Email Address Exists in Database" });
    } else {
      const encodedData = req.headers.authorization.split(" ")[1];
      // if (!encodedData)
      //   res.status(400).json({ error: "Basic authorization not correct" });
      const decodedData = atob(encodedData).split(":");
      if (decodedData.length !== 3)
        res
          .status(400)
          .json({ error: "Login, password and email address required" });

      const newUser = new User({
        userName: decodedData[0],
        password: decodedData[1],
        emailAddress: decodedData[2]
      });
      bcrypt.genSalt(10, (err, salt) => {
        if (err) throw err;
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          // save zapisuje ponownie w bazie danych
          newUser
            .save()
            .then(user =>
              res.json({
                data: {
                  success: true,
                  message: "Registered successfully"
                }
              })
            )
            .catch(err => res.status(400).json(err));
        });
      });
    }
  });
});

router.post("/login", (req, res) => {
  const emailAddress = req.body.emailAddress;
  const password = req.body.password;
  let errors = {};

  User.findOne({ emailAddress }).then(user => {
    if (!user) {
      errors.emailAddress = "No Account Found";
      return res.status(404).json(errors);
    }

    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        const payload = {
          id: user._id,
          name: user.userName
        };
        jwt.sign(payload, secret, { expiresIn: 3600 }, (err, token) => {
          if (err)
            res.status(500).json({ error: "Error signing token", raw: err });
          res.json({
            success: true,
            token: `Bearer ${token}`
          });
        });
      } else {
        errors.password = "Password is incorrect";
        res.status(400).json(errors);
      }
    });
  });
});

// router.post("/logout", (req, res) => {
//   const emailAddress = req.body.emailAddress;
//   console.log(emailAddress);
//   res.json({
//     success: true
//   });
// });

module.exports = router;
