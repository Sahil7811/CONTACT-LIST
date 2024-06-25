// Creating contact list
let ContactList = {};
function addContact(ContactList, name, phoneNumber) {
  if (!ContactList[name]) {
    ContactList[name] = [];
  }
  ContactList[name].push(phoneNumber);
}
// generate Random Name
function generateRandomName() {
  const alphabet = "abcdefghijklmnopqrstuvwxyz";
  const nameLength = Math.floor(Math.random() * 5) + 3; // Random name length between 3 and 7
  let name = "";

  for (let i = 0; i < nameLength; i++) {
    const randomIndex = Math.floor(Math.random() * alphabet.length);
    name += alphabet[randomIndex];
  }

  return name.charAt(0).toUpperCase() + name.slice(1); // Capitalize the first letter
}
// genrate phone number
function generateRandomPhoneNumber() {
  let phoneNumber = "+91 ";
  for (let i = 0; i < 10; i++) {
    phoneNumber += Math.floor(Math.random() * 10);
  }
  return phoneNumber;
}
// Storing 1000 of contactes
for (let i = 0; i < 1000; i++) {
  let name = generateRandomName();
  let phoneNumber = generateRandomPhoneNumber();
  trie.insert(name);
  addContact(ContactList, name, phoneNumber);
}
