const express = require('express')
const router = express.Router();
const contacts = require("../controller/index");

router.get('/contacts', contacts.get);
router.get('/contacts/:contactId', contacts.getById);
router.post('/contacts', contacts.create);
router.put('/contacts/:contactId', contacts.update);
router.delete('/contacts/:contactId', contacts.remove);
router.patch('/contacts/:contactId/favorite', contacts.updateStatus);

module.exports = router
