const express = require("express");
const router = express.Router();

router.get("/", (req, res, next) => {
  res.send("<h1>Web Server works !</h1> <p>Docs: swagger.io</p>");
});

module.exports = router;
