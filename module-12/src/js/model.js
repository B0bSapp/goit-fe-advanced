'use strict';
import uuid from 'uuid';

export default class Model {
  constructor() {
    if (!localStorage.getItem('urlAdder')) {
      const urlAdderStorage = {
        items: [],
      };
      localStorage.setItem('urlAdder', JSON.stringify(urlAdderStorage));
    }
  }

  getExistingItems() {
    return JSON.parse(localStorage.getItem('urlAdder')).items;
  }

  saveItem(urlContent) {
    const response = {
      urlContent: urlContent,
      id: uuid.v4(),
    };
    const urlAdder = JSON.parse(localStorage.getItem('urlAdder'));
    urlAdder.items.push(response);
    localStorage.setItem('urlAdder', JSON.stringify(urlAdder));
    return response;
  }

  itemExists(urlContent) {
    return (
      JSON.parse(localStorage.getItem('urlAdder')).items.filter(
        item => item.urlContent === urlContent,
      ).length !== 0
    );
  }

  removeItem(id) {
    const urlAdder = JSON.parse(localStorage.getItem('urlAdder'));
    const items = urlAdder.items;
    urlAdder.items = items.filter(item => item.id !== id);
    localStorage.setItem('urlAdder', JSON.stringify(urlAdder));
  }
}
