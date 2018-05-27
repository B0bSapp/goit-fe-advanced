'use strict';
class Hamburger {
  constructor(size, stuffing) {
    if (size === null || !Hamburger.SIZES.hasOwnProperty(size)) {
      throw new HamburgerException('Incorrect hamburger size');
    }
    if (stuffing === null || !Hamburger.STUFFINGS.hasOwnProperty(stuffing)) {
      throw new HamburgerException('Incorrect hamburger stuffing');
    }
    this._size = size;
    this._stuffing = stuffing;
    this._toppings = [];
  }
  get size() {
    return this._size;
  }
  get stuffing() {
    return this._stuffing;
  }
  get toppings() {
    return this._toppings;
  }
  addTopping(topping) {
    if (topping == null || !Hamburger.TOPPINGS.hasOwnProperty(topping)) {
      throw new HamburgerException('Incorrect hamburger topping');
    }
    if (this._toppings.includes(topping)) {
      throw new HamburgerException('This topping has already been added');
    }
    this._toppings.push(topping);
  }
  removeTopping(topping) {
    if (topping == null || !Hamburger.TOPPINGS.hasOwnProperty(topping)) {
      throw new HamburgerException('Incorrect hamburger topping');
    }
    if (!this._toppings.includes(topping)) {
      throw new HamburgerException("This topping wasn't added");
    }
    this._toppings = this._toppings.filter(
      innerTopping => topping !== innerTopping,
    );
  }
  calculatePrice() {
    let finalPrice = 0;
    finalPrice += Hamburger.SIZES[this._size].price;
    finalPrice += Hamburger.STUFFINGS[this._stuffing].price;
    finalPrice += this._toppings.reduce(
      (acc, topping) => acc + Hamburger.TOPPINGS[topping].price,
      0,
    );
    return finalPrice;
  }

  calculateCalories() {
    let finalCalories = 0;
    finalCalories += Hamburger.SIZES[this._size].calories;
    finalCalories += Hamburger.STUFFINGS[this._stuffing].calories;
    finalCalories += this._toppings.reduce(
      (acc, topping) => acc + Hamburger.TOPPINGS[topping].calories,
      0,
    );

    return finalCalories;
  }
}

class HamburgerException extends Error {
  constructor(message) {
    super(message);
    this._message = message;
  }
}

Hamburger.SIZE_SMALL = 'SIZE_SMALL';
Hamburger.SIZE_LARGE = 'SIZE_LARGE';

Hamburger.SIZES = {
  [Hamburger.SIZE_SMALL]: {
    price: 30,
    calories: 50,
  },
  [Hamburger.SIZE_LARGE]: {
    price: 50,
    calories: 100,
  },
};

Hamburger.STUFFING_CHEESE = 'STUFFING_CHEESE';
Hamburger.STUFFING_SALAD = 'STUFFING_SALAD';
Hamburger.STUFFING_MEAT = 'STUFFING_MEAT';

Hamburger.STUFFINGS = {
  [Hamburger.STUFFING_CHEESE]: {
    price: 15,
    calories: 20,
  },
  [Hamburger.STUFFING_SALAD]: { price: 20, calories: 5 },
  [Hamburger.STUFFING_MEAT]: { price: 35, calories: 15 },
};

Hamburger.TOPPING_SPICE = 'TOPPING_SPICE';
Hamburger.TOPPING_SAUCE = 'TOPPING_SAUCE';

Hamburger.TOPPINGS = {
  [Hamburger.TOPPING_SPICE]: {
    price: 10,
    calories: 0,
  },
  [Hamburger.TOPPING_SAUCE]: {
    price: 15,
    calories: 5,
  },
};
const hamburger = new Hamburger(Hamburger.SIZE_LARGE, Hamburger.STUFFING_MEAT);

try {
  hamburger.addTopping(null);
} catch (e) {
  console.log(e);
}
try {
  hamburger.addTopping(Hamburger.TOPPING_SAUCE);
} catch (e) {
  console.log(e);
}
try {
  hamburger.addTopping(Hamburger.TOPPING_SAUCE);
} catch (e) {
  console.log(e);
}
try {
  hamburger.removeTopping(Hamburger.TOPPING_SPICE);
} catch (e) {
  console.log(e);
}
hamburger.addTopping(Hamburger.TOPPING_SPICE);
console.log(hamburger.calculatePrice());
console.log(hamburger.calculateCalories());
