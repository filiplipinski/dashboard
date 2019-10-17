const config = require("./config");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const mongoose = require("mongoose");
const passport = require("passport");
const cors = require("cors");
const serveStatic = require("serve-static");
const passportConfig = require("./config/passport-config");
passport.use(passportConfig);

const app = express();
mongoose.connect(config.databaseUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const indexRouter = require("./routes/index");
const userRouter = require("./routes/user");
const testRouter = require("./routes/test");

// middlewares
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(passport.initialize());
app.use(cors());

if (config.nodeEnv === "production") {
  app.use(serveStatic("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

app.use("/", indexRouter);
app.use("/api/user", userRouter);
app.use("/test", passport.authenticate("jwt", { session: false }), testRouter);

module.exports = app;
