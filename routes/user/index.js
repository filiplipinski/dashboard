const express = require('express');
const passport = require('passport');
const UserController = require('./userController');

const router = express.Router();
const authenticateRoute = passport.authenticate('jwt', { session: false });

router.post('/register', UserController.registerUser);
router.post('/login', UserController.loginUser);
router.get('/authenticate', authenticateRoute, UserController.authenticate);

module.exports = router;
