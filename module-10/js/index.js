'use strict';
const allUserBtn = document.querySelector('.all-user-btn');
allUserBtn.addEventListener('click', onGetAllUsers);
const allUsersList = document.querySelector('.all-users-list');

const getUserForm = document.querySelector('.get-user-form');
getUserForm.addEventListener('submit', onGetUser);
const getUserInput = document.querySelector('.get-user-input');
const userContainer = document.querySelector('.user-by-id');

const addUserForm = document.querySelector('.add-user-form');
addUserForm.addEventListener('submit', onAddUser);
const addUserName = document.querySelector('.add-user-name');
const addUserAge = document.querySelector('.add-user-age');
const addUserContainer = document.querySelector('.add-user');

const removeUserForm = document.querySelector('.remove-user-form');
removeUserForm.addEventListener('submit', onRemoveUser);
const removeUserInput = document.querySelector('.remove-user-input');
const removeUserContainer = document.querySelector('.remove-user');

const updateUserForm = document.querySelector('.update-user-form');
updateUserForm.addEventListener('submit', onUpdateUser);
const updateUserInput = document.querySelector('.update-user-input');
const updateUserName = document.querySelector('.update-user-name');
const updateUserAge = document.querySelector('.update-user-age');
const updateUserContainer = document.querySelector('.update-user');

function getAllUsers() {
  return fetch('https://test-users-api.herokuapp.com/users/')
    .then(response => {
      if (response.ok) return response.json();
      throw new Error('Error: ', response.statusText);
    })
    .catch(error => console.error(error));
}
function onGetAllUsers() {
  getAllUsers()
    .then(payload => {
      const allUsers = payload.data.reduce((acc, currentItem) => {
        const user = document.createElement('p');
        user.textContent = `UserId: ${currentItem.id},
        UserName: ${currentItem.name},
        UserAge: ${currentItem.age}`;
        acc.push(user);
        return acc;
      }, []);
      return allUsers;
    })
    .then(allUsers => {
      allUsersList.append(...allUsers);
    });
}
function getUser(userId) {
  return fetch(`https://test-users-api.herokuapp.com/users/${userId}`)
    .then(response => {
      if (response.ok) return response.json();
      throw new Error('Error: ' + response.statusText);
    })
    .then(payload => {
      if (payload.errors.length === 0) return payload.data;
      throw new Error('Error: ' + JSON.stringify(payload.errors));
    })
    .catch(error => console.error(error));
}
function onGetUser(event) {
  event.preventDefault();
  getUser(getUserInput.value).then(user => {
    const userElement = document.createElement('p');
    userElement.textContent = `UserId: ${user.id},
    UserName: ${user.name},
    UserAge: ${user.age}`;
    const previousGet = userContainer.querySelector('p');
    if (previousGet) {
      userContainer.removeChild(previousGet);
    }
    userContainer.appendChild(userElement);
  });
  event.target.reset();
}
function addUser({ name, age }) {
  return fetch('https://test-users-api.herokuapp.com/users/', {
    method: 'POST',
    body: JSON.stringify({ name, age }),
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  })
    .then(response => {
      if (response.ok) return response.json();
      throw new Error('Error: ' + response.statusText);
    })
    .then(payload => {
      if (payload.errors.length === 0) return payload.data;
      throw new Error('Error: ' + JSON.stringify(payload.errors));
    })
    .catch(error => console.error(error));
}
function onAddUser(event) {
  event.preventDefault();
  addUser({ name: addUserName.value, age: addUserAge.value }).then(
    addedUser => {
      console.log(addedUser);
      const addedUserLine = document.createElement('p');
      addedUserLine.textContent = `UserId: ${addedUser._id},
      UserName: ${addedUser.name},
      UserAge: ${addedUser.age}`;
      addUserContainer.appendChild(addedUserLine);
    },
  );
  event.target.reset();
}
function removeUser(userId) {
  return fetch(`https://test-users-api.herokuapp.com/users/${userId}`, {
    method: 'DELETE',
  })
    .then(response => {
      if (response.ok) return response.json();
      throw new Error('Error : ' + response.statusText);
    })
    .then(payload => {
      if (payload.errors.length === 0) return payload.data;
      throw new Error('Error: ' + JSON.stringify(payload.errors));
    })
    .catch(error => console.error(error));
}
function onRemoveUser(event) {
  event.preventDefault();
  removeUser(removeUserInput.value).then(removedUser => {
    const removedUserLine = document.createElement('p');
    removedUserLine.textContent = `The user ${
      removedUser.name
    } has been deleted`;
    removeUserContainer.appendChild(removedUserLine);
  });
  event.target.reset();
}
function updateUser({ userId, name, age }) {
  console.log(userId);
  console.log(name);
  console.log(age);
  return fetch(`https://test-users-api.herokuapp.com/users/${userId}`, {
    method: 'PUT',
    body: JSON.stringify({ name, age }),
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  })
    .then(response => {
      console.log(response);
      if (response.ok) return response.json();
      throw new Error('Error: ' + response.statusText);
    })
    .then(payload => {
      console.log(payload);
      if (payload.errors.length === 0) return payload.data;
      throw new Error('Error: ' + JSON.stringify(payload.errors));
    })
    .catch(error => console.error(error));
}
function onUpdateUser(event) {
  event.preventDefault();
  updateUser({
    userId: updateUserInput.value,
    name: updateUserName.value,
    age: updateUserAge.value,
  }).then(updatedUser => {
    const updatedUserLine = document.createElement('p');
    updatedUserLine.textContent = `User ${updatedUser.name} has been updated`;
    updateUserContainer.appendChild(updatedUserLine);
  });
  event.target.reset();
}
