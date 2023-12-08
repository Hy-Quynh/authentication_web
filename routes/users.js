const express =  require('express');
const usersController = require('../controllers/users');
const router = express.Router();

// Sign in
router.get('/sign-in', usersController.GET_SIGNIN);
router.post('/sign-in', usersController.SIGNIN);
router.get('/sign-up', usersController.GET_SIGNUP);
router.post('/sign-up', usersController.SIGNUP);
router.get('/home', usersController.GET_HOME);
router.get('/signout', usersController.SIGNOUT);
module.exports = router;
