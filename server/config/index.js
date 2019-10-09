const dotenv = require("dotenv");
dotenv.config();

// jwtSecret for verifying the token's signature.
const port = process.env.PORT || port;
const jwtSecret = process.env.JWT_SECRET || "secret";
const dbLogin = process.env.DATABASE_LOGIN;
const dbPassword = process.env.DATABASE_PASSWORD;

module.exports = {
  port,
  jwtSecret,
  databaseUri: `mongodb+srv://${dbLogin}:${dbPassword}@cluster0-bo4cy.mongodb.net/dashboard?retryWrites=true&w=majority`
};
