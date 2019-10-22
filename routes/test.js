const express = require("express");
const router = express.Router();

router.get("/", (req, res, next) => {
  const { body } = req;

  res.json({
    message: "test"
  });
});

module.exports = router;
