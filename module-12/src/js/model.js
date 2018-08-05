'use strict';
import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:3000';
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
    return axios.post('/urls', { urlContent }).then(response => {
      if (response.status === 201) {
        const urlAdder = JSON.parse(localStorage.getItem('urlAdder'));
        urlAdder.items.push(response.data);
        localStorage.setItem('urlAdder', JSON.stringify(urlAdder));
        return response.data;
      } else {
        throw Error(`Response status ${response.status}`);
      }
    });
  }

  itemExists(urlContent) {
    return (
      JSON.parse(localStorage.getItem('urlAdder')).items.filter(
        item => item.urlContent === urlContent,
      ).length !== 0
    );
  }

  removeItem(id) {
    return axios.delete(`/urls/${id}`).then(response => {
      if (response.status === 200) {
        const urlAdder = JSON.parse(localStorage.getItem('urlAdder'));
        const items = urlAdder.items;
        urlAdder.items = items.filter(item => item.id !== Number(id));
        localStorage.setItem('urlAdder', JSON.stringify(urlAdder));
        return response.data;
      } else {
        throw new Error(`Response status ${response.status}`);
      }
    });
  }
}
