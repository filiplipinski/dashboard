// const dotenv = require("dotenv");
// dotenv.config();

// jwtSecret for verifying the token's signature.
const port = process.env.PORT || 8080;
const jwtSecret = process.env.JWT_SECRET || "no-sekret";
const dbLogin = process.env.DATABASE_LOGIN;
const dbPassword = process.env.DATABASE_PASSWORD;
const nodeEnv = process.env.NODE_ENV || "development";

module.exports = {
  port,
  jwtSecret,
  nodeEnv,
  databaseUri: `mongodb+srv://${dbLogin}:${dbPassword}@cluster0-bo4cy.mongodb.net/dashboard?retryWrites=true&w=majority`
};
