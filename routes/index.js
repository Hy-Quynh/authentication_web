const express =  require('express');
const homeController = require('../controllers/index');
const router = express.Router();

router.get('/', homeController.GET_HOME)
module.exports = router;
