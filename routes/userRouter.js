const express = require('express');
const router = express.Router();
const controller = require('../controller/userController');
const checkJwt = require('../middlewares/checkJwt');
const { validateUser } = require('../middlewares/validation');

router.post('/register', validateUser, controller.register);
router.post('/login', controller.login);
router.get('/logout', checkJwt, controller.logout);
router.post('/current', checkJwt, controller.current);

module.exports = router;