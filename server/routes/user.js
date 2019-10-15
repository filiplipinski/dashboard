const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const atob = require("atob");

const config = require("../config");
const User = require("../models/user");

const router = express.Router();
const secret = config.jwtSecret;

router.post("/register", (req, res) => {
  const encodedData = req.headers.authorization.split(" ")[1];
  if (!encodedData)
    res.status(400).json({ error: "Basic authorization not correct" });
  const decodedData = atob(encodedData).split(":");
  if (decodedData.length !== 3)
    res
      .status(400)
      .json({ error: "Login, password and email address required" });
  const [userName, password, emailAddress] = decodedData;

  User.findOne({ emailAddress }).then(user => {
    if (user) {
      return res
        .status(400)
        .json({ error: "Email address exists unavailable" });
    } else {
      const newUser = new User({
        userName,
        password,
        emailAddress
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
                success: true,
                message: "Registered successfully"
              })
            )
            .catch(err => res.status(400).json(err));
        });
      });
    }
  });
});

router.post("/login", (req, res) => {
  const encodedData = req.headers.authorization.split(" ")[1];
  if (!encodedData)
    res.status(400).json({ error: "Basic authorization not correct" });
  const decodedData = atob(encodedData).split(":");
  if (decodedData.length !== 2)
    res.status(400).json({ error: "Login and password required" });
  const [userName, password] = decodedData;

  User.findOne({ userName }).then(user => {
    if (!user) {
      // res.statusMessage = "No Account Found";
      return res.status(404).json({ error: "No user found" });
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

          // 3600s = 1h, *1000 -> convert ms to (1000ms = 1s)
          // 1h=3600s=3600*1000ms
          const expirationDate = new Date(new Date().getTime() + 3600 * 1000);
          // ).toLocaleString();

          res.json({
            success: true,
            tokenData: {
              token,
              expirationDate
            }
          });
        });
      } else res.status(400).json({ error: "Data are incorrect" });
    });
  });
});

router.get("/authenticate", (req, res) => {
  if (!req.headers.authorization)
    res.status(401).json({ error: "No authorization" });

  const token = req.headers.authorization.split(" ")[1];
  if (!token) res.status(401).json({ error: "Bad authorization" });
  else
    jwt.verify(token, secret, (err, decoded) => {
      if (err) res.status(401).json({ error: err });
      res.json({
        authenticate: true
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
