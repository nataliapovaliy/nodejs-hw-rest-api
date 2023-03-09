const fs = require('fs/promises')
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const contactsPath = path.join(__dirname, './contacts.json');

const listContacts = async () => {
  const dataContacts = await fs.readFile(contactsPath, 'utf-8');
  return (JSON.parse(dataContacts));
}

const getContactById = async (contactId) => {
  const dataContacts = await listContacts();
  const contactById = dataContacts.filter(contact => contact.id === contactId);
  return (contactById);
}

const removeContact = async (contactId) => {
  const dataContacts = await listContacts();
  const newContacts = dataContacts.filter(contact => contact.id !== contactId);
  fs.writeFile(contactsPath, JSON.stringify(newContacts));
  return newContacts;
}

const addContact = async (body) => {
  const dataContacts = await listContacts();
  const contactForAdd = {id: uuidv4(), ...body}
  dataContacts.push(contactForAdd);
  fs.writeFile(contactsPath, JSON.stringify(dataContacts));
  return dataContacts;
}

const updateContact = async (contactId, body) => {
  const { name, email, phone } = body;
  const dataContacts = await listContacts();
  dataContacts.forEach(contact => {
    if (contact.id === contactId) {
      contact.name = name;
      contact.email = email;
      contact.phone = phone;
    } 
  } );
  fs.writeFile(contactsPath, JSON.stringify(dataContacts));
  return dataContacts;
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
