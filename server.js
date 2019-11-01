const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const passport = require('passport');
const cors = require('cors');
const serveStatic = require('serve-static');
const config = require('./config');
const passportConfig = require('./config/passport-config');

mongoose
  .connect(config.databaseUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => err && console.log('Error in connecting with DB: ', err));

const app = express();
// Middlewares
passport.use(passportConfig);
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(passport.initialize());
app.use(cors());

// Routes
const userRouter = require('./routes/user');
const ticketRouter = require('./routes/ticket');

app.use('/api/user', userRouter);
app.use('/api/ticket', passport.authenticate('jwt', { session: false }), ticketRouter);

if (config.nodeEnv === 'production') {
  app.use(serveStatic('client/build'));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

module.exports = app;
