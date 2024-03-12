const router = require('express').Router();
const loginController = require('../controllers/LoginController')

router.post('/login',loginController.auth);

module.exports =router;