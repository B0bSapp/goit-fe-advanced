'use strict';
const logins = ['Mango', 'robotGoogles', 'Poly', 'Aj4x1sBozz', 'qwerty123'];

const userInput = prompt('Please enter login');
const result = addLogins(logins, userInput);
alert(result);
function addLogins(logins, login) {
  if (checkLoginValidity(login)) {
    if (!checkIfLoginExists(logins, login)) {
      logins.push(login);
      return `Login ${login} was successfully added`;
    } else {
      return `Login ${login} is already been used`;
    }
  } else {
    return `Error! ${login} should have more than 4 and less than 16 symbols`;
  }
}

function checkLoginValidity(login) {
  return login !== null && login.length > 4 && login.length <= 16;
}

function checkIfLoginExists(logins, login) {
  return logins.includes(login);
}
