'use strict';
const products = {
  bread: 10,
  milk: 15,
  apples: 20,
  chicken: 50,
  pork: 80,
  cheese: 60,
  tea: 20,
  candy: 25,
};

function Cashier(name, products) {
  this.name = name;
  this.products = products;
  this.totalPrice = 0;
  this.customerMoney = 0;
  this.changeAmount = 0;
  this.countTotalPrice = function(order) {
    for (const productKey of Object.keys(order)) {
      const productCount = order[productKey];
      this.totalPrice += productCount * this.products[productKey];
    }
  };
  this.getCustomerMoney = function() {
    do {
      let userInput = prompt(
        `Total summ of your buyings is ${this.totalPrice}`,
        0,
      );
      if (userInput === null) {
        return null;
      }
      userInput = Number(userInput);
      if (!Number.isNaN(userInput)) {
        this.customerMoney = userInput;
      }
    } while (this.customerMoney < this.totalPrice);
  };
  this.countChange = function() {
    this.changeAmount = this.customerMoney - this.totalPrice;
  };
  this.reset = function() {
    this.totalPrice = 0;
    this.customerMoney = 0;
    this.changeAmount = 0;
  };
  this.serve = function(order) {
    this.countTotalPrice(order);
    if (this.getCustomerMoney() !== null) {
      this.countChange();
      alert(`Thanks for coming, here's your change ${this.changeAmount}`);
    } else {
      alert('Too bad, something went wrong, see you later');
    }
    this.reset();
  };
}

const order = {
  bread: 2,
  milk: 2,
  apples: 1,
  cheese: 1,
};

const cashier = new Cashier('Mango', products);
cashier.serve(order);
