const express = require('express')
const contacts = require("../../models/contacts");
const router = express.Router()
const Joi = require('joi');

router.get('/', async (req, res, next) => {
  try {
    const data = await contacts.listContacts();
    res.status(201).json(data);
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
  const schema = Joi.object({
    name: Joi.string().alphanum().min(3).max(30).required(),
    email: Joi.string()
      .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
    phone: Joi.string().required()
  })
  const validationResult = schema.validate(req.body);
  if (validationResult.error) {
    return res.status(400).json({status: validationResult.error.details})
  }

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
  const schema = Joi.object({
    name: Joi.string().alphanum().min(3).max(30).optional(),
    email: Joi.string()
      .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).optional(),
    phone: Joi.string().optional()
  })
  const validationResult = schema.validate(req.body);
  if (validationResult.error) {
    return res.status(400).json({status: validationResult.error})
  }

  const { contactId } = req.params;
  const { name, email, phone } = req.body;
  try {
    const newContacts = await contacts.updateContact(contactId, { name, email, phone });
    res.status(201).json(newContacts);
  } catch (error) { next(error); }
})

module.exports = router
