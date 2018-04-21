'use strict';
const sharm = 'sharm';
let sharmCapacity = 15;
const hurgada = 'hurgada';
let hurgadaCapacity = 25;
const taba = 'taba';
let tabaCapacity = 6;

const input = prompt('Please enter number of required places');
const userInput = Number(input);
if (
  userInput === null ||
  Number.isNaN(userInput) ||
  Number.parseInt(userInput) <= 0
) {
  alert('Error! Incorrect input');
} else {
  let userMadeChoise = false;
  if (tabaCapacity >= userInput) {
    userMadeChoise = confirm(
      `${taba} group has required capacity, would you like to join?`,
    );
    if (userMadeChoise) {
      tabaCapacity -= userInput;
      alert(`Happy traveling in group ${taba}`);
    }
  }
  if (!userMadeChoise && sharmCapacity >= userInput) {
    userMadeChoise = confirm(
      `${sharm} group has required capacity, would you like to join?`,
    );
    if (userMadeChoise) {
      sharmCapacity -= userInput;
      alert(`Happy traveling in group ${sharm}`);
    }
  }
  if (!userMadeChoise && hurgadaCapacity >= userInput) {
    userMadeChoise = confirm(
      `${hurgada} group has required capacity, would you like to join?`,
    );
    if (userMadeChoise) {
      hurgadaCapacity -= userInput;
      alert(`Happy traveling in group ${hurgada}`);
    }
  }
  if (!userMadeChoise) {
    alert(`Sorry we dont't have required capacity`);
  }
}
