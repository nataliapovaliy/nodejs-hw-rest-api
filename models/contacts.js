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
  // const result = JSON.parse(dataContacts);
  // for (const key in result) {
  //           if (result[key].id === contactId.toString()) {
  //               delete result[key];
  //           }
  // } 
  // const newContacts = JSON.stringify(result);
  fs.writeFile(contactsPath, newContacts);
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
  const dataContacts = await listContacts();
  const result = JSON.parse(dataContacts);
  const indexUpdate = result.indexOf(contactId);
  const newContacts = result.splice(indexUpdate, 1, body);
  fs.writeFile(contactsPath, JSON.stringify(newContacts));
  return newContacts;
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
