const express = require('express')
const router = express.Router();
const ctrlContacts = require("../controller/index");
const checkJwt = require('../middlewares/checkJwt');

router.get('/contacts', checkJwt, ctrlContacts.get);
router.get('/contacts/:contactId', checkJwt, ctrlContacts.getById);
router.post('/contacts', checkJwt, ctrlContacts.create);
router.put('/contacts/:contactId', checkJwt, ctrlContacts.update);
router.delete('/contacts/:contactId', checkJwt, ctrlContacts.remove);
router.patch('/contacts/:contactId/favorite', checkJwt, ctrlContacts.updateStatus);

module.exports = router
