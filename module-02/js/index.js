'use strict';
const userInputArray = [];
let userInput;

while ((userInput = prompt('Please enter any mber you like')) != null) {
  const userNumber = Number(userInput);
  if (Number.isNaN(userNumber)) {
    alert('Your input is not correct, please try again one more time');
  } else {
    userInputArray.push(userNumber);
  }
}
let result = 0;
for (let temp of userInputArray) {
  result += temp;
}
alert(`Summ of all entered numbers is ${result}`);
