const Contacts = require('./schemas/contacts');

const listContacts = async () => {
  return Contacts.find()  
}

const getContactById = async (contactId) => {
  return Contacts.findOne({_id: contactId});
}

const removeContact = async (contactId) => {
  return Contacts.findByIdAndRemove({ _id: contactId });
}

const addContact = async ({ name, email, phone }) => {
  return Contacts.create({ name, email, phone });
}

const updateContact = async (contactId, fields) => {
  return Contacts.findByIdAndUpdate({ _id: contactId }, fields, { new: true });
}

const updateStatusContact = async (contactId, { favorite }) => {
  return Contacts.findByIdAndUpdate({ _id: contactId }, { favorite }, { new: true });
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact,
}
