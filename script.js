let SearchName = document.querySelector(".SearchNumberName");
let SaveName = document.querySelector(".AddNumberName");
let DeleteName = document.querySelector(".DeleteNumberName");

let SearchNumberValue = document.querySelector(".SearchNumberValue");
let AddNumberValue = document.querySelector(".AddNumberValue");
let DeleteNumberValue = document.querySelector(".DeleteNumberValue");

let callButton = document.querySelector(".callButton");
let saveButton = document.querySelector(".saveButton");
let deleteButton = document.querySelector(".deleteButton");

// Dropdown logic for SearchName
let dropdownContainerSearch = document.createElement("div");
dropdownContainerSearch.classList.add("dropdown-container");
document.querySelector(".Search-input").appendChild(dropdownContainerSearch);

SearchName.addEventListener("input", () => {
  let value = SearchName.value;
  dropdownContainerSearch.innerHTML = ""; // Clear previous dropdown

  if (value) {
    let allValues = trie.autocomplete(value);
    allValues.sort();

    if (allValues.length) {
      let dropdown = document.createElement("div");
      dropdown.classList.add("dropdown");

      allValues.forEach((name) => {
        if (ContactList[name]) {
          ContactList[name].sort(); // Sort the phone numbers for each contact
          ContactList[name].forEach((phoneNumber) => {
            let item = document.createElement("div");
            item.classList.add("dropdown-item");
            item.textContent = `${name} ${phoneNumber}`;
            item.addEventListener("click", () => {
              SearchName.value = name;
              SearchNumberValue.textContent = `${phoneNumber}`; // Update the search number value
              dropdownContainerSearch.innerHTML = ""; // Clear dropdown after selection
            });
            dropdown.appendChild(item);
          });
        }
      });
      dropdownContainerSearch.appendChild(dropdown);
    }
  }
});
// Dropdown logic for DeleteName
let dropdownContainerDelete = document.createElement("div");
dropdownContainerDelete.classList.add("dropdown-container");
document.querySelector(".Delete-input").appendChild(dropdownContainerDelete);

DeleteName.addEventListener("input", () => {
  let value = DeleteName.value;
  dropdownContainerDelete.innerHTML = "";

  if (value) {
    let allValues = trie.autocomplete(value);
    allValues.sort();

    if (allValues.length) {
      let dropdown = document.createElement("div");
      dropdown.classList.add("dropdown");

      allValues.forEach((name) => {
        if (ContactList[name]) {
          ContactList[name].sort(); // Sort the phone numbers for each contact
          ContactList[name].forEach((phoneNumber) => {
            let item = document.createElement("div");
            item.classList.add("dropdown-item");
            item.textContent = `${name} ${phoneNumber}`;
            item.addEventListener("click", () => {
              DeleteName.value = name;
              DeleteNumberValue.textContent = `${phoneNumber}`; // Update the delete number value
              dropdownContainerDelete.innerHTML = ""; // Clear dropdown after selection
            });
            dropdown.appendChild(item);
          });
        }
      });
      dropdownContainerDelete.appendChild(dropdown);
    }
  }
});
// Save button
saveButton.addEventListener("click", () => {
  let value = AddNumberValue.value;
  let name = SaveName.value;
  if (value.length === 0 && name.length === 0) {
    alert("Please enter details");
    return;
  }
  if (value.length < 10 || value.length > 10) {
    alert("Please enter a valid number :) ");
    return;
  }
  if (name.length < 1) {
    alert("Please enter the name");
    return;
  }
  value = "+91 " + value;
  addContact(ContactList, name, value);
  trie.insert(name);
  alert("Contact added successfully.");
  AddNumberValue.value = "";
  SaveName.value = "";
});
// Delete button
deleteButton.addEventListener("click", () => {
  let name = DeleteName.value;
  if (!name || !ContactList[name]) {
    alert("Please enter a valid name to delete.");
    return;
  }

  delete ContactList[name];
  trie.delete(name);

  alert("Contact deleted successfully.");
  DeleteName.value = "";
  DeleteNumberValue.textContent = "+91";
});
// Call button
callButton.addEventListener("click", () => {
  let name = SearchName.value;
  let contact = SearchNumberValue.textContent;
  alert(`Calling ${name} (${contact})`);
  SearchNumberValue.textContent = "+91";
  SearchName.value = "";
});
