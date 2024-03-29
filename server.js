const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
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
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(passport.initialize());
app.use(cors());
// app.set('x-powered-by', false);

// Routes
const userRouter = require('./routes/user');
const ticketRouter = require('./routes/ticket');
const groupRouter = require('./routes/group');
const fileRouter = require('./routes/file');

const authenticateRoute = passport.authenticate('jwt', { session: false });

app.use('/api/user', userRouter);
app.use('/api/ticket', authenticateRoute, ticketRouter);
app.use('/api/group', authenticateRoute, groupRouter);
app.use('/api/files', authenticateRoute, fileRouter);

if (config.nodeEnv === 'production') {
  app.use(serveStatic('client/build'));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

module.exports = app;
