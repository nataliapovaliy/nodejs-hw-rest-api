const express = require('express')
const contacts = require("../../models/contacts");
const router = express.Router()

router.get('/', async (req, res, next) => {
  try {
    const data = await contacts.listContacts();
    res.json(data);
  } catch (error) { next(error); }
})

router.get('/:contactId', async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contact = await contacts.getContactById(contactId);
    if (!contact) {
      res.status(400).json({status: 'Not found!'})
    }
    res.status(201).json(contact);
  } catch (error) { next(error); }
})

router.post('/', async (req, res, next) => {
  try {
    const newContacts = await contacts.addContact(req.body);
    res.status(201).json(newContacts);
  } catch (error) { next(error); }
})

router.delete('/:contactId', async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const newContacts = await contacts.removeContact(contactId);
    res.status(201).json(newContacts);
  } catch (error) { next(error); }
})

router.put('/:contactId', async (req, res, next) => {
  try {
    const { contactId, body } = req.params;
    const newContacts = await contacts.updateContact(contactId, body);
    res.status(201).json(newContacts);
  } catch (error) { next(error); }
})

module.exports = router
